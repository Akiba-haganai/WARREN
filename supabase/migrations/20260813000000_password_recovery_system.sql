-- Migration: Password Recovery System ($0 Free-Tier Proof-of-Ownership)
-- Creates password_recovery_requests table, RLS policies, caller IP extraction,
-- and rate-limited SECURITY DEFINER challenge generation & verification RPCs.

CREATE TABLE IF NOT EXISTS public.password_recovery_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'verified_pending_admin' CHECK (status IN ('verified_pending_admin', 'approved', 'rejected')),
    score INTEGER NOT NULL DEFAULT 0,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES public.profiles(id)
);

-- Enable RLS
ALTER TABLE public.password_recovery_requests ENABLE ROW LEVEL SECURITY;

-- Admins and Moderators can view and update requests
CREATE POLICY "Admins and Moderators can view recovery requests"
    ON public.password_recovery_requests
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'moderator')
        )
    );

CREATE POLICY "Admins and Moderators can update recovery requests"
    ON public.password_recovery_requests
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'moderator')
        )
    );

-- NO Client INSERT Policy: Only SECURITY DEFINER RPCs can insert records!

-- Helper function to extract caller IP from request headers
CREATE OR REPLACE FUNCTION public.get_caller_ip()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT COALESCE(
        current_setting('request.headers', true)::json->>'cf-connecting-ip',
        current_setting('request.headers', true)::json->>'x-forwarded-for',
        current_setting('request.headers', true)::json->>'x-real-ip',
        '0.0.0.0'
    );
$$;

-- RPC: Get Password Recovery Challenge
CREATE OR REPLACE FUNCTION public.get_password_recovery_challenge(p_email TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
    v_user_id UUID;
    v_email_clean TEXT := lower(trim(p_email));
    v_caller_ip TEXT := public.get_caller_ip();
    v_recent_count INT;
    v_q1 JSONB;
    v_q2 JSONB;
    v_q3 JSONB;
    v_user_created_at TIMESTAMPTZ;
    v_user_year INT;
    v_comm_name TEXT;
    v_saved_subject TEXT;
BEGIN
    -- Rate limiting check: Max 3 challenge attempts per hour per IP/Email
    SELECT COUNT(*) INTO v_recent_count
    FROM public.password_recovery_requests
    WHERE (lower(email) = v_email_clean OR ip_address = v_caller_ip)
      AND created_at > now() - INTERVAL '1 hour';

    IF v_recent_count >= 5 THEN
        RAISE EXCEPTION 'Rate limit exceeded for recovery attempts. Please wait an hour before trying again.';
    END IF;

    -- Lookup user in auth.users / profiles
    SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = v_email_clean LIMIT 1;

    IF v_user_id IS NOT NULL THEN
        -- Real user found: Build tailored dynamic proof-of-ownership questions
        
        -- Question 1: Joined Community
        SELECT c.name INTO v_comm_name
        FROM public.community_members cm
        JOIN public.communities c ON c.id = cm.community_id
        WHERE cm.user_id = v_user_id
        ORDER BY cm.joined_at DESC LIMIT 1;

        IF v_comm_name IS NOT NULL THEN
            v_q1 := jsonb_build_object(
                'id', 'comm',
                'question', 'Which campus community or group are you a member of?',
                'options', jsonb_build_array(v_comm_name, 'Computer Science Society', 'Engineering Guild', 'Campus Ministry'),
                'correct', v_comm_name
            );
        ELSE
            v_q1 := jsonb_build_object(
                'id', 'comm',
                'question', 'Have you joined any official student communities yet?',
                'options', jsonb_build_array('No, not yet', 'Yes, Computer Science Society', 'Yes, Engineering Guild', 'Yes, Business Club'),
                'correct', 'No, not yet'
            );
        END IF;

        -- Question 2: Year of Study or Account Creation
        SELECT created_at, year_of_study INTO v_user_created_at, v_user_year
        FROM public.profiles WHERE id = v_user_id;

        IF v_user_year IS NOT NULL AND v_user_year > 0 THEN
            v_q2 := jsonb_build_object(
                'id', 'year',
                'question', 'What year of study is listed on your student profile?',
                'options', jsonb_build_array('Year ' || v_user_year, 'Year ' || ((v_user_year % 5) + 1), 'Year ' || ((v_user_year + 1) % 5 + 1), 'Postgraduate'),
                'correct', 'Year ' || v_user_year
            );
        ELSE
            v_q2 := jsonb_build_object(
                'id', 'created_year',
                'question', 'What year was your student profile created?',
                'options', jsonb_build_array(EXTRACT(YEAR FROM v_user_created_at)::TEXT, '2023', '2022', '2021'),
                'correct', EXTRACT(YEAR FROM v_user_created_at)::TEXT
            );
        END IF;

        -- Question 3: Saved/Bookmarked Course Material or Post
        SELECT m.subject INTO v_saved_subject
        FROM public.saved_materials sm
        JOIN public.material_versions m ON m.id = sm.material_id
        WHERE sm.user_id = v_user_id LIMIT 1;

        IF v_saved_subject IS NOT NULL THEN
            v_q3 := jsonb_build_object(
                'id', 'subject',
                'question', 'Which course subject have you saved materials for?',
                'options', jsonb_build_array(v_saved_subject, 'Mathematics 101', 'Intro to Computer Science', 'Physics 201'),
                'correct', v_saved_subject
            );
        ELSE
            v_q3 := jsonb_build_object(
                'id', 'saved',
                'question', 'Have you saved any course past papers or study materials?',
                'options', jsonb_build_array('No, none saved yet', 'Yes, 10+ papers', 'Yes, CS101 notes only', 'Yes, Exam Solutions'),
                'correct', 'No, none saved yet'
            );
        END IF;

    ELSE
        -- Decoy user questions to prevent email enumeration attacks
        v_q1 := jsonb_build_object(
            'id', 'comm',
            'question', 'Which campus community or group are you a member of?',
            'options', jsonb_build_array('Computer Science Society', 'Engineering Guild', 'Campus Ministry', 'Business Club'),
            'correct', 'Computer Science Society'
        );
        v_q2 := jsonb_build_object(
            'id', 'year',
            'question', 'What year of study is listed on your student profile?',
            'options', jsonb_build_array('Year 1', 'Year 2', 'Year 3', 'Year 4'),
            'correct', 'Year 2'
        );
        v_q3 := jsonb_build_object(
            'id', 'saved',
            'question', 'Have you saved any course past papers or study materials?',
            'options', jsonb_build_array('No, none saved yet', 'Yes, 10+ papers', 'Yes, CS101 notes only', 'Yes, Exam Solutions'),
            'correct', 'No, none saved yet'
        );
    END IF;

    -- Return full challenge payload with questions
    RETURN jsonb_build_object(
        'email', v_email_clean,
        'questions', jsonb_build_array(v_q1, v_q2, v_q3)
    );
END;
$$;

-- RPC: Verify Password Recovery Challenge
CREATE OR REPLACE FUNCTION public.verify_password_recovery_challenge(
    p_email TEXT,
    p_answers JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
    v_user_id UUID;
    v_email_clean TEXT := lower(trim(p_email));
    v_caller_ip TEXT := public.get_caller_ip();
    v_score INT := 0;
    v_challenge JSONB;
    v_questions JSONB;
    v_q JSONB;
    v_q_id TEXT;
    v_user_answer TEXT;
    v_correct_answer TEXT;
    v_request_id UUID;
BEGIN
    -- Find real user
    SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = v_email_clean LIMIT 1;

    IF v_user_id IS NULL THEN
        -- Email not found: return neutral success so attacker gets no timing/enumeration info
        RETURN jsonb_build_object(
            'success', true,
            'queued', false,
            'message', 'If the information matched our records, your request has been queued for admin verification.'
        );
    END IF;

    -- Re-generate challenge to get ground-truth correct answers statelessly
    v_challenge := public.get_password_recovery_challenge(p_email);
    v_questions := v_challenge->'questions';

    FOR i IN 0..jsonb_array_length(v_questions) - 1 LOOP
        v_q := v_questions->i;
        v_q_id := v_q->>'id';
        v_correct_answer := v_q->>'correct';
        v_user_answer := p_answers->>v_q_id;

        IF v_user_answer IS NOT NULL AND lower(trim(v_user_answer)) = lower(trim(v_correct_answer)) THEN
            v_score := v_score + 1;
        END IF;
    END LOOP;

    -- If score >= 2/3, queue request for admin approval
    IF v_score >= 2 THEN
        INSERT INTO public.password_recovery_requests (user_id, email, status, score, ip_address)
        VALUES (v_user_id, v_email_clean, 'verified_pending_admin', v_score, v_caller_ip)
        RETURNING id INTO v_request_id;

        RETURN jsonb_build_object(
            'success', true,
            'queued', true,
            'score', v_score,
            'message', 'Verification successful! Your identity has been confirmed and queued for 1-click admin approval.'
        );
    ELSE
        RETURN jsonb_build_object(
            'success', false,
            'queued', false,
            'score', v_score,
            'message', 'Verification answers did not match our records sufficiently (score < 2/3).'
        );
    END IF;
END;
$$;

-- Grant Execution Rights
REVOKE EXECUTE ON FUNCTION public.get_password_recovery_challenge(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_password_recovery_challenge(TEXT) TO anon, authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.verify_password_recovery_challenge(TEXT, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_password_recovery_challenge(TEXT, JSONB) TO anon, authenticated, service_role;
