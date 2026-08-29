-- 1. Safely add missing columns to existing password_recovery_requests table
ALTER TABLE public.password_recovery_requests
    ADD COLUMN IF NOT EXISTS verification_details JSONB DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- 2. Update RLS policies to match the new blueprint requirements (Admins only for update/view)
DROP POLICY IF EXISTS "Admins and Moderators can view recovery requests" ON public.password_recovery_requests;
DROP POLICY IF EXISTS "Admins can view reset requests" ON public.password_recovery_requests;
CREATE POLICY "Admins can view reset requests"
    ON public.password_recovery_requests
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator'))
    );

DROP POLICY IF EXISTS "Admins and Moderators can update recovery requests" ON public.password_recovery_requests;
DROP POLICY IF EXISTS "Admins can update reset requests" ON public.password_recovery_requests;
CREATE POLICY "Admins can update reset requests"
    ON public.password_recovery_requests
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator'))
    );

-- 3. Create the Direct Request RPC (Simple queue bypass of the challenge for the new flow)
CREATE OR REPLACE FUNCTION public.request_password_reset(p_email TEXT)
RETURNS JSONB AS $$
DECLARE
    v_target_user RECORD;
    v_recent_count INT;
    v_existing_req UUID;
    v_request_id UUID;
    v_caller_ip TEXT;
BEGIN
    -- Extract caller IP
    SELECT COALESCE(
        current_setting('request.headers', true)::json->>'cf-connecting-ip',
        current_setting('request.headers', true)::json->>'x-forwarded-for',
        current_setting('request.headers', true)::json->>'x-real-ip',
        '0.0.0.0'
    ) INTO v_caller_ip;

    -- [A] 3-per-hour Free Tier Quota Check
    SELECT count(*) INTO v_recent_count
    FROM public.password_recovery_requests
    WHERE status = 'approved' AND updated_at >= now() - interval '1 hour';

    IF v_recent_count >= 3 THEN
        RAISE EXCEPTION 'Due to high traffic, our password reset queue is currently full (max 3 per hour). Please try again in 20 minutes.';
    END IF;

    -- [B] Check if Email Exists in Profiles
    SELECT id INTO v_target_user
    FROM auth.users
    WHERE lower(email) = lower(p_email)
    LIMIT 1;

    IF v_target_user.id IS NULL THEN
        RAISE EXCEPTION 'Email address not found in our records.';
    END IF;

    -- [C] Prevent Spam (Only 1 pending request per user)
    SELECT id INTO v_existing_req
    FROM public.password_recovery_requests
    WHERE user_id = v_target_user.id 
      AND status = 'verified_pending_admin'
    LIMIT 1;

    IF v_existing_req IS NOT NULL THEN
        RAISE EXCEPTION 'You already have a password reset request pending admin approval.';
    END IF;

    -- [D] Insert into queue
    INSERT INTO public.password_recovery_requests (user_id, email, status, score, verification_details, ip_address)
    VALUES (v_target_user.id, lower(p_email), 'verified_pending_admin', 100, '{"source": "direct_request"}'::jsonb, v_caller_ip)
    RETURNING id INTO v_request_id;

    RETURN jsonb_build_object(
        'success', true,
        'message', 'Your password reset request has been queued for admin approval.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Apply Execution Permissions
REVOKE EXECUTE ON FUNCTION public.request_password_reset(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.request_password_reset(TEXT) TO anon, authenticated, service_role;
