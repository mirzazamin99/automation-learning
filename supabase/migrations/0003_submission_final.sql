-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Adds operator-review state to submissions: "final" holds Aamir's edited
-- version of the draft (same shape as the "draft" column, edited in the
-- operator screen), and "sent"/"sent_at" record when a reading has gone out.

alter table submissions
  add column if not exists final jsonb,
  add column if not exists sent boolean not null default false,
  add column if not exists sent_at timestamptz;
