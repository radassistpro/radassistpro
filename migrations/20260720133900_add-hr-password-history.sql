-- Track previous password hashes for HR accounts (reuse prevention)

ALTER TABLE public.hr_profiles
  ADD COLUMN IF NOT EXISTS password_history jsonb NOT NULL DEFAULT '[]'::jsonb;
