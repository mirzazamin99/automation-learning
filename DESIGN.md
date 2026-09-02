---
name: Dr. Aamir — Personal Brand
description: Canva's warm approachability and Apple's spacious restraint, anchored by Dr. Aamir's confident editorial identity — with light/dark modes.
colors:
  surface-light: "#fffdfb"
  surface-tint-light: "#f7eee6"
  foreground-light: "#1a140f"
  foreground-dim-light: "#6b5c4d"
  foreground-faint-light: "#9c8a78"
  edge-light: "#e7ddd2"
  surface-dark: "#3d0f18"
  surface-tint-dark: "#4a1720"
  foreground-dark: "#f4ebdc"
  foreground-dim-dark: "#c7b49b"
  foreground-faint-dark: "#a8877c"
  edge-dark: "#5c2a34"
  accent-light: "#82232f"
  accent-hover-light: "#9a2c3a"
  accent-press-light: "#5c1822"
  accent-dark: "#b8324f"
  accent-hover-dark: "#d13d5c"
  accent-press-dark: "#8c2540"
  accent-soft-light: "#f4dedc"
  accent-soft-dark: "#522029"
  cta-band-light: "#16110c"
  cta-band-dark: "#1c070d"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.5rem, 8vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  pill: "9999px"
  badge: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover-light}"
  button-primary-dark:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
---

# Design System: Dr. Aamir — Personal Brand

## Overview

**Creative North Star: "Confident Stillness, Given Room to Breathe"**

Most of the page lives on a warm, spacious ground with Apple-scale whitespace and Canva-style soft, friendly structure: pill-shaped buttons, gently tinted alternating sections, small rounded accent badges, subtle scroll-triggered reveals. Every page closes on one deliberate contrast band, the "raised voice" moment where the booking CTA lives.

The system ships in two modes, light (default) and dark, toggled by the visitor and remembered across visits. Dark mode is not a dimmed version of light mode: its base ground is a rich, solid maroon (user-specified), not a warm near-black. The closing CTA band stays a distinct, genuinely re-themed surface in both modes: warm near-black in light mode, and an even deeper near-black maroon than the page itself in dark mode, so it still reads as the one raised voice rather than disappearing into a now-maroon page. Canva's and Apple's actual color systems are not imported anywhere; only their structural habits (pill controls, whitespace, soft tinting) were borrowed.

**Key Characteristics:**
- Warm, theme-aware ground (`surface`/`surface-tint`) for most sections; a separately-tuned `cta-band` token (not the same as `surface`) for every closing CTA, distinct in both modes
- Every interactive control is a full pill (`rounded-full`)
- Generous, Apple-scale vertical rhythm: `py-24` to `py-44` depending on section weight
- Content reveals with a short, subtle fade-and-rise as it scrolls into view (`Reveal` component, `IntersectionObserver`-driven, once per element)
- A sticky, frosted header on every breakpoint: desktop shows inline nav + theme toggle + compact CTA; mobile shows wordmark + theme toggle + hamburger only, no CTA in the bar. The hamburger opens a genuine full-screen (`100dvh`) panel, not a partial dropdown.
- No dedicated mobile CTA bar; the booking action lives in the header (desktop), the full-screen mobile menu, and every closing CTA band

## Colors

### Primary
- **`accent` (button fill), theme-aware:** Oxblood in light mode (`#82232f`, hover `#9a2c3a`, pressed `#5c1822`); a brighter, more saturated Ruby in dark mode (`#b8324f`, hover `#d13d5c`, pressed `#8c2540`). The light-mode oxblood reads muddy/brown against a dark ground, so dark mode gets its own richer value rather than reusing the light one. Used for the primary CTA fill only.
- **`accent-text` (inline text/marks), theme-aware:** Oxblood in light mode (same `#82232f`), Bright Rose in dark mode (`#dd8188`). Used for the emphasized hero clause, numeral-badge digits, and checkmarks. Distinct from `accent`: text needs a lighter touch than a filled button does.
- **Blush / Deep Wine** (`accent-soft`): pale wine in light mode (`#f4dedc`), muted wine in dark mode (`#522029`, lightened from an earlier value so it still reads as its own surface against the new maroon ground). Numeral-badge background only.

### Neutral — theme-aware (`surface`, `surface-tint`, `foreground`, `foreground-dim`, `foreground-faint`, `edge`)
| Role | Light | Dark |
|---|---|---|
| Page ground | Warm White `#fffdfb` | Deep Maroon `#3d0f18` (user-specified; not a near-black) |
| Alt section tint | Soft Blush `#f7eee6` | Lifted Maroon `#4a1720` |
| Primary text | Warm Charcoal `#1a140f` | Bone `#f4ebdc` |
| Secondary text | Warm Taupe `#6b5c4d` | Warm Taupe (light) `#c7b49b` |
| Tertiary text | Faint Umber `#9c8a78` | Warm Mauve `#a8877c` (brightened from an earlier value for legibility against the maroon ground) |
| Hairline | `#e7ddd2` | `#5c2a34` (brightened from an earlier near-invisible value) |
| Accent-on-text (`accent-text`) | Oxblood `#82232f` | Bright Rose `#dd8188` |

### Closing CTA band (`cta-band`, theme-aware, always distinct from `surface`)
- **Light:** Warm Near-Black `#16110c` (unchanged from the original single-dark-band system).
- **Dark:** Near-Black Maroon `#1c070d`, a genuinely darker step below the page's own `#3d0f18` ground. Since dark mode's base ground is now maroon itself, the closing band has to go darker (not brighter, and not the old near-black) to still read as the one raised-voice moment.

### Named Rules
**The Closing Band Is Never Surface.** `cta-band` is its own token in every theme. It must never be aliased to `surface`, even where the values happen to be close, because the two are allowed to diverge (as they now do in dark mode) without a code change.

**The One Accent Rule.** Oxblood never fills a background larger than a button or a badge.

## Typography

**Display Font:** Bodoni Moda (with Georgia, serif fallback)
**Body Font:** Public Sans (with system-ui fallback)

**Character:** A high-contrast Didone display face carries the personality; body copy stays in a quiet grotesque. Headlines are centered within a constrained measure.

### Hierarchy
- **Display / Hero** (500 weight, `clamp(2.5rem, 8vw, 5.5rem)`, line-height 1.05, tracking -0.02em, centered, max 16–20ch)
- **Headline** (500 weight, 1.875–3rem, line-height 1.2, centered): section headings, philosophy statement, credibility heading, services intro.
- **Title** (500 weight, 1.5–1.875rem): process step names, service names.
- **Body** (400 weight, 1.125–1.25rem, line-height 1.6, measure 46–65ch, centered blocks)
- **Label** (500 weight): numeral badges, credential pills, service format tags, nav links (0.875rem).

### Named Rules
**No Em Dashes.** All visitor-facing copy uses periods, commas, or colons in place of em dashes. This is a standing content rule, not a one-time cleanup — it applies to every future copy edit.

## Layout

Centered, single-column, Apple-style reading columns (`max-w-[840px]`–`max-w-[1000px]` per section). Sections alternate `surface` / `surface-tint`. The process and services list sections share a numeral/title/body row pattern, divided by hairlines, `py-10`–`py-16` per row, each row revealed with a small staggered delay (`i * 80ms`) as it scrolls in.

### Header
Sticky (`sticky top-0 z-50`), frosted (`bg-surface/80 backdrop-blur-md`), hairline bottom border.
- **Desktop:** wordmark, inline nav (How it works / Who it's for / Services), theme toggle, compact CTA pill.
- **Mobile:** wordmark, theme toggle, hamburger. **No CTA in the bar.** The hamburger opens a full-screen (`height: 100dvh`) panel: nav links, a labeled "Dark mode / Light mode" toggle row, and a full-width CTA at the bottom. Body scroll locks while open; `Escape` closes it.

## Elevation & Depth

Flat by default; depth lives only on the primary CTA pill, as a soft, offset, accent-tinted glow.

### Shadow Vocabulary
- **CTA rest** (`0 14px 28px -12px rgba(130,35,47,0.5)`)
- **CTA hover** (`0 18px 34px -10px rgba(154,44,58,0.55)`)

## Shapes

**The Pill Rule.** Every button is a full pill; numeral and credential badges are pill/circular. Hairlines stay 1px, never thicker, never colored. No structural container takes a radius except the labeled theme-toggle row inside the mobile menu (`rounded-2xl`, an intentional exception for a tappable settings-style row).

## Components

### Buttons
- **Shape:** full pill.
- **Primary:** `accent` background, `paper` text (constant in both themes), `px-8 py-4`; compact header variant `px-4 py-2 text-[0.8rem]`. Trailing `→` glyph shifts right on hover.
- **Hover / Focus:** background → `accent-hover`; site-wide `:focus-visible` gets a 2px `accent-hover` outline at 3px offset.

### Badges
- **Numeral badge:** circular, `accent-soft` background, `accent-text` digits. Process and services sections (real sequence).
- **Credential pill:** outlined (`border border-edge`), `foreground-dim` text, no fill. Used once, in the credibility section, for PhD / speaker / individuals-and-organizations tags.

### Checkmarked List
"Who this is for" uses an authored check-mark SVG (`CheckIcon`, one stroke weight, `accent-text`) as its bullet, not an em dash or a generic dot.

### Navigation (Header)
See Layout → Header above.

### Mobile Menu Panel
Full-screen (`fixed inset-0`, `height: 100dvh`), `bg-surface`, opaque. Nav links in `font-display text-2xl`, hairline-divided. Bottom section: labeled theme toggle row (`bg-surface-tint`, rounded-2xl) then a full-width CTA.

### Reveal (scroll animation)
`app/components/Reveal.tsx`. Wraps a content block; on first intersection (`threshold: 0.15`, `rootMargin: "0px 0px -80px 0px"`) it transitions from `opacity-0 translate-y-6` to `opacity-100 translate-y-0` over 700ms, once, then disconnects its observer. Reduced-motion is handled globally (see below), not per-instance.

### Footer
Three-column (stacks on mobile): brand + one-line tagline, Explore (nav links), Get in touch (email + book link). Closing bar: copyright plus a one-line service summary. `bg-surface-tint`.

### Theme Toggle
A 40×40px circular icon button (sun in dark mode, moon in light mode), present in the desktop header, the mobile header bar, and again as a labeled row inside the mobile menu. State is written to `data-theme` on `<html>` and persisted to `localStorage`; a blocking `next/script` (`strategy="beforeInteractive"`) applies the stored or system-preferred theme before first paint.

## Motion

**Reduced motion is handled once, globally**, in `globals.css`: `prefers-reduced-motion: reduce` forces both `animation-duration` and `transition-duration` to near-zero for every element. Individual components (hero entrance, `Reveal`) do not duplicate this check; they just use standard CSS transitions/animations and inherit the global override.

## Do's and Don'ts

### Do:
- **Do** keep every button and badge a full pill/circle.
- **Do** keep `cta-band` a distinct token from `surface` in both themes.
- **Do** keep the mobile header free of a CTA button; hamburger + theme toggle only.
- **Do** use `accent-text` (not bare `accent`) for colored inline text on a `surface` background.
- **Do** write all visitor-facing copy without em dashes.
- **Do** wrap new below-the-fold content blocks in `Reveal` for consistency with the rest of the page.

### Don't:
- **Don't** add a CTA button back into the mobile top header.
- **Don't** alias `cta-band` to `surface`, even when their values happen to match.
- **Don't** round any structural container beyond buttons, badges, and the mobile menu's toggle row.
- **Don't** import Canva's or Apple's actual color palettes.
- **Don't** invent specific prices; the Services page states that pricing is set on the consultation call.
- **Don't** fabricate credentials, testimonials, or outcome statistics beyond what's been explicitly confirmed. The credibility section (PhD, national/international speaking, organizational sessions) reflects facts the user supplied directly; it does not include invented specifics (no conference names, dates, or counts) beyond what was actually stated.
