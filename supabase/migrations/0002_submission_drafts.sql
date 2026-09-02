-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Adds AI drafting state to submissions: the generated draft itself, a
-- manual-review flag (currently unused, kept for future manual handling),
-- and a status column so every row's drafting outcome is known honestly
-- rather than assumed.

alter table submissions
  add column if not exists draft jsonb,
  add column if not exists flagged boolean not null default false,
  add column if not exists draft_status text not null default 'pending';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'submissions_draft_status_check'
  ) then
    alter table submissions
      add constraint submissions_draft_status_check
      check (draft_status in ('pending', 'generated', 'flagged', 'failed'));
  end if;
end $$;
