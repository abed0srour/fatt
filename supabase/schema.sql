-- Run this once in your Supabase project:
-- SQL Editor -> New query -> paste -> Run.

create table if not exists public.miss_you_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  device text,
  user_agent text
);

create index if not exists miss_you_responses_created_at_idx
  on public.miss_you_responses (created_at desc);

-- Keep the table locked down. The app writes through server-side code only.
alter table public.miss_you_responses enable row level security;
