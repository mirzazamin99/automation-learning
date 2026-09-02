-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Adds operator reply state to submissions: the personal reply text Aamir
-- sends to a flagged submitter, and whether/when it was sent.

alter table submissions
  add column if not exists reply_body text,
  add column if not exists replied boolean not null default false,
  add column if not exists replied_at timestamptz;
