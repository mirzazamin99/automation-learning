-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Adds the three per-submission tracking tables the app writes to after the
-- initial reading: the daily practice sheet ("days"), the plot worksheet
-- ("plots"), and the weekly revision check-in ("revisions"). Each row is
-- looked up/upserted by submission_id (and by date for "days"), so the
-- unique indexes below back the ON CONFLICT clauses the API routes rely on.

create table if not exists days (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions (id) on delete cascade,
  date date not null,
  morning_entry text,
  did_it boolean,
  evening_detail text,
  updated_at timestamptz not null default now()
);

create unique index if not exists days_submission_id_date_idx
  on days (submission_id, date);

alter table days enable row level security;

create table if not exists plots (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions (id) on delete cascade,
  direction text not null,
  cost text not null,
  giving_up jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create unique index if not exists plots_submission_id_idx
  on plots (submission_id);

alter table plots enable row level security;

create table if not exists revisions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions (id) on delete cascade,
  missed_day text,
  direction_check text,
  updated_at timestamptz not null default now()
);

create unique index if not exists revisions_submission_id_idx
  on revisions (submission_id);

alter table revisions enable row level security;
