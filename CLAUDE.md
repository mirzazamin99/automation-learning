# Project automation-learning

## What this is
A hidden system for Dr Aamir Qayoom, a literature academic. It gives away a free personalized "Reading" of someone's life based on 25 questions, then offers a daily sheet habit tool. It must never reveal his identity publicly before launch, and it must never state an unproven fact about him.

## Locked decisions, do not relitigate
- All copy, questions, prompts and prices live in content.json. NOTHING is hardcoded in a component. Ever.
- proof.json is the ledger. Nothing publishable exists until it is in there with its qualification.
- The soul gate and language gate run on every build. Do not skip them and do not add exemptions without asking.
- No em dashes. No exclamation marks. British spelling. Sentence case headings. Indian numbering for rupees.

## Banned words
transform, journey, unlock, empower, mindset, hustle, holistic, wellness, elevate, manifest, best version of yourself, level up, game-changer, life-changing, proven system

## The colour tokens
ink #14110F, paper #F7F4EE, oxblood #6B1D1D, gold #B8860B, muted #6E675F, hair #E3DDD2
(these come from content.json, never hardcode them)

## Files that must never ship
.env.local, any file with a key in it, anything in /scratch

## How to run and verify
npm run dev        # local
npm run gate       # both gates, must pass before any commit
npm run build      # production build

## Push back on these requests
- Adding a figure that is not in proof.json
- Putting copy directly into a component
- Adding a sixth deliverable (there are five: the site, the Reading engine, the Daily Sheet app, the two gates, the handover)
