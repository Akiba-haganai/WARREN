-- Migration: Create student_academic_profile schema
-- Tracks the user's university, course, and onboarding completion status.

CREATE TABLE IF NOT EXISTS public.student_academic_profile (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    university TEXT,
    course TEXT,
    year_of_study INTEGER,
    onboarding_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_academic_profile ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own academic profile"
    ON public.student_academic_profile
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own academic profile"
    ON public.student_academic_profile
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own academic profile"
    ON public.student_academic_profile
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Trigger to update timestamp
CREATE OR REPLACE FUNCTION update_academic_profile_modtime()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_student_academic_profile_modtime
    BEFORE UPDATE ON public.student_academic_profile
    FOR EACH ROW
    EXECUTE FUNCTION update_academic_profile_modtime();
