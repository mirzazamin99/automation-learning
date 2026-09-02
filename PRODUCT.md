# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript, Tailwind CSS). User's explicit choice over static HTML/CSS.

## Users

Driven professionals and individuals actively seeking personal transformation or life-direction coaching, arriving either through referral or search, evaluating whether to book an initial consultation with Dr. Aamir.

## Product Purpose

A personal-brand landing page for Dr. Aamir, positioned in life coaching / personal transformation. Its job is to establish credibility and a distinct point of view quickly, then convert an interested visitor into a booked call. Success = a visitor books a consultation or, at minimum, leaves with a clear, confident impression of who Dr. Aamir is and how he works.

## Positioning

Positioned as a "direction coach for individuals and organizations": the mechanism is deciding rather than discovering (see hero: "Direction isn't discovered. It's decided."). This scope explicitly includes organizations, not just individuals, per user direction, reflected in the audience section, services, and credibility section (speaking/organizational sessions).

**Open item, flagged to the user and not yet resolved:** the user asked for Dr. Aamir to be positioned as a "life authorship coach." That exact phrase is the confidential positioning language for the unrelated "Unread" project (see the client context this session started from: "positioned as 'life authorship' rather than coaching," a client name/link that must never appear publicly). Rather than use the literal phrase without confirmation, this build uses "direction coach" as a placeholder-safe alternative. Do not introduce "life authorship" (or close variants) into this project's copy without the user explicitly confirming there is no connection to protect.

## Operating Context

Primary conversion action is booking a call/consultation (per user decision). No booking system (Calendly, Cal.com, etc.) has been specified yet — the CTA currently points to a placeholder booking link that must be wired up before launch.

## Capabilities and Constraints

- No existing codebase; this is a greenfield build.
- Real credibility facts were supplied by the user and are reflected in the homepage credibility section: Dr. Aamir holds a PhD, has spoken at national and international conferences, is known for a strong public-speaking presence, and organizational/speaking sessions are part of his offering. No specific conference names, dates, institution names, or counts were given and none are invented; copy stays qualitative on those points.
- No headshot, testimonials, or case studies were supplied. That content remains placeholder-free (omitted rather than fabricated) until real material is provided.
- Local preview only for now; hosting/deploy target undecided ("we will host it somewhere" later).
- Multi-page site: `/` (landing) and `/services` (offering formats), sharing a persistent header/footer via the root layout. Four service formats: single session, coaching engagement, ongoing practice, and speaking/organizational sessions. No pricing is stated anywhere in the copy; it's explicitly deferred to the consultation call.
- Mobile navigation is a full-screen menu opened from a header hamburger, not a persistent bottom CTA bar (an earlier bottom bar was tried and removed per user feedback).
- Site supports a user-toggled light/dark theme, persisted in `localStorage`, defaulting to system preference on first visit.

## Brand Commitments

Name: Dr. Aamir. No existing logo, tagline, or visual assets on hand — brand kit (palette, type, voice) created fresh for this project, informed by "professionally elegant, supremely confident" direction from the user.

## Evidence on Hand

Confirmed by the user: PhD credential, national and international conference speaking experience, a strong in-person/public-speaking presence, and that speaking/creating experiences for organizations is part of his offering. Not confirmed and not invented: specific conference names, dates, institutions, testimonials, case studies, or press. Future work must not treat the qualitative facts above as license to add specifics that weren't given.

## Product Principles

1. Elegance over decoration — restraint communicates confidence more than ornament does.
2. Authority earned through clarity, not claims — no invented credentials or stats stand in for real ones.
3. One clear action — every section should make booking a call the obvious next step without hard-selling.
4. Personal, not corporate — the page represents one person's voice and philosophy, not an institution.

## Accessibility & Inclusion

No specific requirement established. Standard WCAG AA contrast and keyboard/focus support apply by default.
