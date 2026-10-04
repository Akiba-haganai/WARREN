-- Migration: Implement normalized Library Reference Model (LRM) for 515
-- Separates academic structures from the actual resources to prevent duplicates.

-- 1. Universities
CREATE TABLE IF NOT EXISTS public.universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    country TEXT DEFAULT 'ZM',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Campuses
CREATE TABLE IF NOT EXISTS public.campuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Schools / Faculties
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Departments
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Programmes
CREATE TABLE IF NOT EXISTS public.programmes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    award_type TEXT NOT NULL, -- e.g., 'BSc', 'BA', 'MSc'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Curriculum Versions
CREATE TABLE IF NOT EXISTS public.curriculum_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    programme_id UUID REFERENCES public.programmes(id) ON DELETE CASCADE,
    academic_year_start INTEGER NOT NULL,
    academic_year_end INTEGER NOT NULL,
    version TEXT NOT NULL, -- e.g., '2026/2027'
    status TEXT DEFAULT 'active', -- active, draft, archived
    source_document TEXT,
    verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Courses (Global/Independent of programme)
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    credits INTEGER,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Curriculum Courses (Mapping Courses to Curriculums)
CREATE TABLE IF NOT EXISTS public.curriculum_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    curriculum_version_id UUID REFERENCES public.curriculum_versions(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    year_of_study INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    course_type TEXT DEFAULT 'core', -- core, elective, etc.
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(curriculum_version_id, course_id)
);

-- 9. Materials (The physical/digital resource itself)
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    author TEXT,
    publisher TEXT,
    publication_year INTEGER,
    edition TEXT,
    isbn TEXT,
    material_type TEXT NOT NULL, -- textbook, notes, summary, video, past_paper
    description TEXT,
    language TEXT DEFAULT 'en',
    thumbnail_url TEXT,
    file_url TEXT,
    status TEXT DEFAULT 'published',
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Course Materials (Mapping Materials to Courses)
CREATE TABLE IF NOT EXISTS public.course_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    material_id UUID REFERENCES public.materials(id) ON DELETE CASCADE,
    curriculum_version_id UUID REFERENCES public.curriculum_versions(id) ON DELETE SET NULL, -- Optional scope
    relationship_type TEXT DEFAULT 'prescribed', -- prescribed, recommended, supplementary, past_paper
    priority INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(course_id, material_id, curriculum_version_id)
);

-- 11. Past Paper Metadata (Specific properties for past papers)
CREATE TABLE IF NOT EXISTS public.past_paper_metadata (
    material_id UUID PRIMARY KEY REFERENCES public.materials(id) ON DELETE CASCADE,
    exam_period TEXT NOT NULL, -- e.g., 'June', 'December', 'Midterm'
    academic_year TEXT NOT NULL -- e.g., '2025/2026'
);

-----------------------------------------------------------
-- ENABLE ROW LEVEL SECURITY
-----------------------------------------------------------
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.past_paper_metadata ENABLE ROW LEVEL SECURITY;

-----------------------------------------------------------
-- PUBLIC READ POLICIES
-----------------------------------------------------------
CREATE POLICY "Public read access for universities" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Public read access for campuses" ON public.campuses FOR SELECT USING (true);
CREATE POLICY "Public read access for schools" ON public.schools FOR SELECT USING (true);
CREATE POLICY "Public read access for departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Public read access for programmes" ON public.programmes FOR SELECT USING (true);
CREATE POLICY "Public read access for curriculum_versions" ON public.curriculum_versions FOR SELECT USING (true);
CREATE POLICY "Public read access for courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read access for curriculum_courses" ON public.curriculum_courses FOR SELECT USING (true);
CREATE POLICY "Public read access for materials" ON public.materials FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access for course_materials" ON public.course_materials FOR SELECT USING (true);
CREATE POLICY "Public read access for past_paper_metadata" ON public.past_paper_metadata FOR SELECT USING (true);

-----------------------------------------------------------
-- AUTHENTICATED USER UPLOAD POLICIES (Materials)
-----------------------------------------------------------
CREATE POLICY "Users can upload materials" ON public.materials
    FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-----------------------------------------------------------
-- ADMIN / MODERATOR WRITE POLICIES
-- Uses a hypothetical is_admin_or_mod() function for brevity
-- Assuming roles are checked via public.profiles
-----------------------------------------------------------
-- Note: Replace these write policies with your precise Role-Based Access Control logic.
-- Currently allowing all authenticated users to link materials as a fallback,
-- but restricting core hierarchy to staff.

CREATE POLICY "Anyone can link materials to courses" ON public.course_materials
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can add past paper metadata" ON public.past_paper_metadata
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
