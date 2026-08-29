# Unread

A web app for guided self-reflection — answer written questions, receive a personal reading, and track daily progress against a plan.

## What this is

Someone answers 25 written questions about their life. An AI drafts a first-pass "reading" from their answers, which gets reviewed and edited by a person before being sent back by email. From there, they can set a plot (their direction), keep a daily sheet, and do a weekly revision.

## Stack

- Next.js, deployed on Vercel
- Supabase (Postgres) for data
- Resend for email
- Google Gemini for AI drafting

## Running locally

npm install
npm run dev

## Before committing

npm run gate
npm run build

`npm run gate` checks copy against language and content rules. `npm run build` confirms the code compiles.

## Deploying

git add .
git commit -m "a clear message"
git push

Vercel deploys automatically on push to `main`.

## Structure

- `/read` — the 25-question intake form
- `/operator` — private, password-protected review screen
- `/plot`, `/sheet`, `/revision` — ongoing tracking pages
- `content.json` — all copy, questions, and prompts live here, never hardcoded
- `gate.mjs` — the content/language check script

See the full handover document for architecture details, honest status, and known gaps.
