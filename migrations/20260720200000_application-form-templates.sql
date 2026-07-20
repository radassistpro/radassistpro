-- Application form templates for role-specific career apply forms

CREATE TABLE IF NOT EXISTS public.application_form_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  fields jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.jobs
  ADD COLUMN IF NOT EXISTS form_template_id uuid
  REFERENCES public.application_form_templates(id) ON DELETE SET NULL;

ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS form_responses jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS jobs_form_template_id_idx ON public.jobs (form_template_id);

ALTER TABLE public.application_form_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY application_form_templates_public_read
  ON public.application_form_templates FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY application_form_templates_hr_all
  ON public.application_form_templates FOR ALL
  TO authenticated
  USING (public.is_hr_member())
  WITH CHECK (public.is_hr_member());

-- Default templates
INSERT INTO public.application_form_templates (slug, name, description, fields)
VALUES
  (
    'video-editor',
    'Video Editor',
    'Portfolio-heavy form for creative and video editing roles.',
    '[
      {"id":"firstName","label":"First name","type":"text","required":true,"width":"half"},
      {"id":"lastName","label":"Last name","type":"text","required":true,"width":"half"},
      {"id":"email","label":"Email","type":"email","required":true,"width":"half"},
      {"id":"phone","label":"Phone","type":"tel","required":true,"width":"half"},
      {"id":"linkedin","label":"LinkedIn URL","type":"url","required":true,"width":"full","placeholder":"https://linkedin.com/in/…"},
      {"id":"city","label":"Current city / location","type":"text","required":true,"width":"half"},
      {"id":"yearsExperience","label":"Years of experience","type":"text","required":true,"width":"half","placeholder":"e.g. 4"},
      {"id":"primarySoftware","label":"Primary editing software","type":"text","required":true,"width":"full","placeholder":"e.g. Adobe Premiere Pro"},
      {"id":"portfolioUrl","label":"Portfolio / showreel URL","type":"url","required":true,"width":"full","placeholder":"https://…"},
      {"id":"videoLinks","label":"Links to AI / tech videos you edited","type":"textarea","required":true,"width":"full","rows":3,"placeholder":"Paste links, one per line"},
      {"id":"currentComp","label":"Current compensation","type":"text","required":true,"width":"half","placeholder":"e.g. ₹40,000 / month"},
      {"id":"expectedComp","label":"Expected compensation","type":"text","required":true,"width":"half","placeholder":"e.g. ₹50,000 / month"},
      {"id":"coverNote","label":"Additional information","type":"textarea","required":false,"width":"full","rows":4,"placeholder":"Anything else you''d like us to know"},
      {"id":"resume","label":"Resume (PDF, DOC, DOCX)","type":"file","required":true,"width":"full","accept":".pdf,.doc,.docx"}
    ]'::jsonb
  ),
  (
    'clinical-pacs',
    'Clinical / PACS',
    'For PACS administration, teleradiology, and clinical support roles.',
    '[
      {"id":"firstName","label":"First name","type":"text","required":true,"width":"half"},
      {"id":"lastName","label":"Last name","type":"text","required":true,"width":"half"},
      {"id":"email","label":"Email","type":"email","required":true,"width":"half"},
      {"id":"phone","label":"Phone","type":"tel","required":true,"width":"half"},
      {"id":"linkedin","label":"LinkedIn URL","type":"url","required":true,"width":"full","placeholder":"https://linkedin.com/in/…"},
      {"id":"city","label":"Current city / location","type":"text","required":true,"width":"half"},
      {"id":"yearsExperience","label":"Years of experience","type":"text","required":true,"width":"half","placeholder":"e.g. 6"},
      {"id":"pacsSystems","label":"PACS / RIS systems experience","type":"textarea","required":true,"width":"full","rows":3,"placeholder":"List systems and your depth of experience"},
      {"id":"certifications","label":"Certifications & licenses","type":"textarea","required":true,"width":"full","rows":3,"placeholder":"ARRT, RHIA, vendor certs, state licenses, etc."},
      {"id":"clinicalBackground","label":"Clinical / radiology background","type":"textarea","required":true,"width":"full","rows":4,"placeholder":"Modality experience, workflow familiarity, prior employers"},
      {"id":"currentComp","label":"Current compensation","type":"text","required":true,"width":"half"},
      {"id":"expectedComp","label":"Expected compensation","type":"text","required":true,"width":"half"},
      {"id":"coverNote","label":"Additional information","type":"textarea","required":false,"width":"full","rows":4},
      {"id":"resume","label":"Resume (PDF, DOC, DOCX)","type":"file","required":true,"width":"full","accept":".pdf,.doc,.docx"}
    ]'::jsonb
  ),
  (
    'operations',
    'Operations / General',
    'General application form for ops, account management, and admin roles.',
    '[
      {"id":"firstName","label":"First name","type":"text","required":true,"width":"half"},
      {"id":"lastName","label":"Last name","type":"text","required":true,"width":"half"},
      {"id":"email","label":"Email","type":"email","required":true,"width":"half"},
      {"id":"phone","label":"Phone","type":"tel","required":true,"width":"half"},
      {"id":"linkedin","label":"LinkedIn URL","type":"url","required":true,"width":"full","placeholder":"https://linkedin.com/in/…"},
      {"id":"city","label":"Current city / location","type":"text","required":true,"width":"half"},
      {"id":"yearsExperience","label":"Years of experience","type":"text","required":true,"width":"half"},
      {"id":"relevantExperience","label":"Relevant experience","type":"textarea","required":true,"width":"full","rows":4,"placeholder":"Roles, industries, and outcomes most relevant to this position"},
      {"id":"toolsPlatforms","label":"Tools & platforms","type":"text","required":true,"width":"full","placeholder":"CRM, project tools, healthcare systems, etc."},
      {"id":"currentComp","label":"Current compensation","type":"text","required":true,"width":"half"},
      {"id":"expectedComp","label":"Expected compensation","type":"text","required":true,"width":"half"},
      {"id":"coverNote","label":"Additional information","type":"textarea","required":false,"width":"full","rows":4},
      {"id":"resume","label":"Resume (PDF, DOC, DOCX)","type":"file","required":true,"width":"full","accept":".pdf,.doc,.docx"}
    ]'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;

-- Assign editor template to existing jobs without a template
UPDATE public.jobs
SET form_template_id = (
  SELECT id FROM public.application_form_templates WHERE slug = 'video-editor' LIMIT 1
)
WHERE form_template_id IS NULL;
