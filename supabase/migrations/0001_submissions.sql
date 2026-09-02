-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create extension if not exists pgcrypto;

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  answers jsonb not null,
  submitted_at timestamptz not null default now()
);

-- Speeds up the "has this email submitted in the last 10 minutes" check
-- the API route runs before every insert.
create index if not exists submissions_email_submitted_at_idx
  on submissions (email, submitted_at);

-- Lock the table down: no policies are created below, so only requests
-- made with the service role key (server-side only, never the browser's
-- anon key) can read or write this table.
alter table submissions enable row level security;
