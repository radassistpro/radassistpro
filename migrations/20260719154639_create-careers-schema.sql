-- Careers schema: jobs, applications, HR profiles

CREATE TABLE IF NOT EXISTS public.hr_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  email text NOT NULL,
  full_name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'hr' CHECK (role IN ('admin', 'hr')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  employment_type text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured boolean NOT NULL DEFAULT false,
  summary text NOT NULL DEFAULT '',
  about text NOT NULL DEFAULT '',
  responsibilities jsonb NOT NULL DEFAULT '[]'::jsonb,
  requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  looking_for jsonb NOT NULL DEFAULT '[]'::jsonb,
  must_know_software jsonb NOT NULL DEFAULT '[]'::jsonb,
  important_note text,
  application_includes jsonb NOT NULL DEFAULT '[]'::jsonb,
  pay text NOT NULL DEFAULT '',
  benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  posted_at date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS jobs_status_idx ON public.jobs (status);
CREATE INDEX IF NOT EXISTS jobs_department_idx ON public.jobs (department);

CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  linkedin text,
  city text NOT NULL DEFAULT '',
  years_experience text NOT NULL DEFAULT '',
  primary_software text NOT NULL DEFAULT '',
  portfolio_url text NOT NULL DEFAULT '',
  video_links text NOT NULL DEFAULT '',
  current_comp text NOT NULL DEFAULT '',
  expected_comp text NOT NULL DEFAULT '',
  cover_note text,
  resume_file_name text,
  resume_key text,
  resume_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS applications_job_id_idx ON public.applications (job_id);
CREATE INDEX IF NOT EXISTS applications_status_idx ON public.applications (status);
CREATE INDEX IF NOT EXISTS applications_created_at_idx ON public.applications (created_at DESC);

ALTER TABLE public.hr_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Public can read published jobs
CREATE POLICY jobs_public_read_published
  ON public.jobs FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Helper: is current user an HR member (SECURITY DEFINER avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_hr_member()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.hr_profiles hp WHERE hp.user_id = auth.uid()
  );
$$;

CREATE POLICY jobs_hr_all
  ON public.jobs FOR ALL
  TO authenticated
  USING (public.is_hr_member())
  WITH CHECK (public.is_hr_member());

CREATE POLICY applications_public_insert
  ON public.applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY applications_hr_select
  ON public.applications FOR SELECT
  TO authenticated
  USING (public.is_hr_member());

CREATE POLICY applications_hr_update
  ON public.applications FOR UPDATE
  TO authenticated
  USING (public.is_hr_member())
  WITH CHECK (public.is_hr_member());

CREATE POLICY applications_hr_delete
  ON public.applications FOR DELETE
  TO authenticated
  USING (public.is_hr_member());

CREATE POLICY hr_profiles_self_read
  ON public.hr_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_hr_member());

GRANT SELECT ON public.jobs TO anon, authenticated;
GRANT INSERT ON public.applications TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.jobs TO authenticated;
GRANT SELECT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT SELECT ON public.hr_profiles TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_hr_member() TO authenticated;
