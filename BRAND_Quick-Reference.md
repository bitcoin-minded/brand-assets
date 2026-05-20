---
title: Brand Quick Reference
type: brand-voice
status: active
version: 1.0
owner: Black Corn
created: 2026-05-11
modified: 2026-05-11
tags: [brand, quick-reference, tokens, ai-context]
---

# Bitcoin-Minded — Brand Quick Reference

Dense reference for use as AI prompt context. For full reasoning see
[[STD_Brand-Kit]] and [[STD_Design-System]].

## Colors — Master Palette

| Token | Hex | Use |
|---|---|---|
| Paper | `#F4EFE6` | Default background (70-80% of surface) |
| Paper warm | `#EBE3D4` | Cards, pricing panels, closing CTA |
| Ink | `#1A1714` | Body type, headings (never `#000`) |
| Ink mute | `#5A4F45` | Captions, meta, footer |
| Rule | `#D8CDB8` | Hairlines |
| Rule strong | `#BFB39A` | Stronger dividers, disabled state |
| Accent (terracotta) | `#B85C2A` | Italic emphasis on shared surfaces, hero CTA hover |

## Colors — Per-Course Imprints

| Course | Hex | Applied |
|---|---|---|
| BFP — honey ochre | `#8C6A2F` | Light touch (BFP eyebrows stay in ink-mute, not imprint) |
| BFB — slate teal | `#2D4A47` | Full intensity |
| BFA — ink navy | `#1F2748` | Full intensity (navy nav permitted on BFA only) |

Imprint colors appear only in: eyebrows, italic emphasis inside H1/H2,
section numbers, curriculum left-edge stripes, hairlines above trust
meta-rows, closing CTA top band. **Never** in: backgrounds, button fills,
body type.

## Excluded — Never Use

`#F7931A` Bitcoin orange · `#000000` pure black · `#FFFFFF` pure white ·
`#0F766E` SaaS teal · `#003366` corporate finance navy · electric purple ·
neon green · any high-saturation digital accent.

## Typefaces

| Family | Use | Weights |
|---|---|---|
| **Fraunces** (display serif) | H1-H4, page titles, pull quotes, italic emphasis | 400 or 500 only — never below 400, never above 500 |
| **DM Sans** (humanist sans) | Body, nav, buttons, eyebrows, captions | 400 body · 500/600 emphasis & buttons · 700 strong |
| **JetBrains Mono** | Trace meta only (hex codes, section numbers, small URL labels) | 400 or 500 — never body |

Italic Fraunces inside headlines = emphasis words. Color: accent on shared
surfaces, course imprint on per-course surfaces. Italics never in body copy.

**Never substitute** Fraunces with Tiempos/Merriweather/Times. **Never
substitute** DM Sans with Inter.

## Type Scale (desktop)

| Token | Size | LH | Family | Weight | Notes |
|---|---|---|---|---|---|
| Display | 56px | 1.08 | Fraunces | 500 | Hero H1 only |
| H1 | 44px | 1.12 | Fraunces | 500 | Inner page titles |
| H2 | 36px | 1.15 | Fraunces | 400 | Section titles |
| H3 | 24px | 1.25 | Fraunces | 500 | Sub-section |
| H4 | 20px | 1.30 | Fraunces | 500 | Curriculum / FAQ / pricing-panel titles |
| Body-lg | 19px | 1.55 | DM Sans | 400 | Hero subhead only |
| Body | 17px | 1.60 | DM Sans | 400 | Default running text |
| Body-sm | 15px | 1.55 | DM Sans | 400 | Micro-copy |
| Eyebrow | 13px | 1.30 | DM Sans | 500 | Uppercase, letter-spacing 0.14em |
| Trace | 12px | 1.40 | JetBrains Mono | 400 | Section numbers, hex codes |
| Button | 16px | 1.20 | DM Sans | 500 | All button variants |
| Nav | 15px | 1.20 | DM Sans | 500 | Top nav links |

Mobile (<768px): Display 40 · H1 32 · H2 28 · H3 22 · H4 18 · Body-lg 18 ·
all others unchanged.

Body max line-length ≈ 68ch. Container narrow 680px · default 960px ·
wide 1200px.

## Spacing Scale (base 4px)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 192`

Tokens `--space-1` … `--space-12`. Section padding default 96px desktop /
64px mobile (`--space-9`). Hero padding 128px desktop / 80px mobile
(`--space-10`).

## Breakpoints

`--bp-sm` 0-767 (phone) · `--bp-md` 768-1023 (tablet) · `--bp-lg` 1024+
(desktop). Gutters: 24 · 48 · 64.

## Border Radius

`0` (default, hairlines, bands) · `2px` (buttons, inputs, pricing) ·
`4px` (cards). Never above 8px — pill shapes read as SaaS.

## No Shadows

No drop shadows, glow, or outline effects on any component. Depth comes
from paper / paper-warm background contrast, not shadow.

## Color Proportions per Surface

Paper / paper-warm 70-80% · Ink 15-25% · Accent under 5% · Imprint under
5% on per-course, zero on shared.

## Imprint Application Map

| Position | Per-course surface | Shared/master surface |
|---|---|---|
| Hero eyebrow | Imprint color | `--color-ink-mute` |
| Italic emphasis in H1/H2 | Imprint color | Accent (terracotta) |
| Section eyebrows | Imprint (BFB/BFA) · ink-mute (BFP exception) | `--color-ink-mute` |
| Curriculum section number | Imprint, JetBrains Mono 12px | n/a (no curriculum) |
| Curriculum left-edge stripe | 2px solid imprint | n/a |
| Closing CTA top band | 3px solid imprint | absent |
| Button fills | Always `--color-ink` (imprint never tints buttons) | Always `--color-ink` |
| Backgrounds | Always paper / paper-warm (imprint never tints bgs) | Always paper / paper-warm |

## 5 Critical Usage Rules

1. **No `#000` and no `#FFF`.** Use `--color-ink` (`#1A1714`) and
   `--color-paper` (`#F4EFE6`). The warmth is load-bearing.
2. **No Bitcoin orange.** The brand sits outside maximalist visual
   register. Use `--color-accent` (`#B85C2A` terracotta) for the role
   "warm accent" the orange would play.
3. **Imprint colors only in trace positions.** Never tint backgrounds,
   button fills, or body type — even on per-course pages.
4. **Italics in headlines only.** One to three words per headline,
   colored accent (shared) or imprint (per-course). Never italic body.
5. **No font-variation-settings on live type.** opsz, SOFT, WONK live
   only in the wordmark SVG. Use only family, weight, size,
   italic-toggle, line-height on every other surface.

## Logo Use — One-Line Summary

Default = `BRAND_Lockup_primary-positive.svg`. Minimum lockup width 100px
digital. Minimum emblem 16px square. No effects, no recoloring outside
the 11 lockup / 8 emblem variants in `/Branding/Logos/`. Clear space =
emblem height around lockup.

## Voice Constraints That Affect Design

- No disclaimer footers ("not financial advice" etc.) — design must not
  reserve disclaimer space.
- No urgency ribbons, countdown timers, "limited time" badges.
- No social proof badges from crypto exchanges or affiliate programs.
- Founding-student pricing language is fine; "X people enrolled today"
  is not.

---

**Companion files:** `STD_Brand-Kit.md` (full identity rules),
`STD_Design-System.md` (full component specs and flagged decisions),
`brand-tokens.css` (drop-in CSS custom properties).
