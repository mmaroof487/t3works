-- T3 AI Works — Supabase schema
-- Run this once in the Supabase SQL editor for your project.

create extension if not exists "pgcrypto";

-- ============================================================
-- Candidates
-- ============================================================
create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  candidate_id text not null unique,
  full_name text not null,
  email text not null,
  phone text not null,
  academic_status text not null,
  degree text not null,
  university text not null,
  passing_year text,
  has_built_ai_apps boolean not null default false,
  tech_stack_url text,
  internships_completed text not null,
  internship_details text,
  hackathons text,
  dream_role_1 text not null,
  dream_role_2 text not null,
  target_companies text,
  resume_path text not null,
  created_at timestamptz not null default now()
);

create index if not exists candidates_created_at_idx on public.candidates (created_at desc);

alter table public.candidates enable row level security;

-- Only the service role (used by /api/candidates) may read/write. No public access.
create policy "service role full access to candidates"
  on public.candidates
  for all
  to service_role
  using (true)
  with check (true);

-- ============================================================
-- Hiring requirements
-- ============================================================
create table if not exists public.hiring_requirements (
  id uuid primary key default gen_random_uuid(),
  requirement_id text not null unique,
  company_name text not null,
  industry_sector text not null,
  contact_name text not null,
  corporate_email text not null,
  business_phone text not null,
  job_title text not null,
  engagement_model text not null,
  city text not null,
  work_model text not null,
  tech_stack text not null,
  jd_text text,
  jd_path text,
  expected_start_date text not null,
  target_seniority text not null,
  talent_architect text not null,
  created_at timestamptz not null default now()
);

create index if not exists hiring_requirements_created_at_idx on public.hiring_requirements (created_at desc);

alter table public.hiring_requirements enable row level security;

create policy "service role full access to hiring requirements"
  on public.hiring_requirements
  for all
  to service_role
  using (true)
  with check (true);

-- ============================================================
-- Storage buckets (private — accessed only via the service role from /api handlers)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('job-descriptions', 'job-descriptions', false)
on conflict (id) do nothing;

create policy "service role full access to resumes bucket"
  on storage.objects
  for all
  to service_role
  using (bucket_id = 'resumes')
  with check (bucket_id = 'resumes');

create policy "service role full access to job-descriptions bucket"
  on storage.objects
  for all
  to service_role
  using (bucket_id = 'job-descriptions')
  with check (bucket_id = 'job-descriptions');
