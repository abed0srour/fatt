-- Run this once in your Supabase project: SQL Editor → New query → paste → Run.

create table if not exists public.miss_you_responses (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  device     text,
  user_agent text
);

-- Keep the table locked down; the app talks to it through the service role
-- key from server-side route handlers only, which bypasses RLS.
alter table public.miss_you_responses enable row level security;
