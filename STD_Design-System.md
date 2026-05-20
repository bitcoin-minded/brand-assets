---
title: Design System
type: standard
status: active
scope: marketing
owner: Black Corn
version: 1.1
version-notes: Wording-only revision. Three instances of "publisher" / "publication" replaced where they could be misread as describing what Bitcoin-Minded is rather than the visual register the design system targets. No substantive changes to type scale, spacing scale, components, or any rule. Three remaining "editorial publications" references retained as design-vocabulary lineage references.
created: 2026-05-11
modified: 2026-05-11
tags: [design, design-system, typography, spacing, components, tokens, standards]
---

# Bitcoin-Minded — Design System

This document defines the concrete numeric values and component
specifications that implement the visual identity described in
[[STD_Brand-Kit]]. The Brand Kit states *what* the identity is —
which colors, which typefaces, which proportional rules. This
document states *what numbers to use* — exact type sizes, exact
spacing increments, exact breakpoints, exact component states.

Where the Brand Kit gives a range (e.g. H1 40-58px), this document
picks a value. Where the Brand Kit is silent on a value that must
be chosen for production work (e.g. button corner radius), this
document picks one and states the reasoning so the choice can be
reviewed. Choices that are not directly derivable from the Brand
Kit are flagged with **[INFERRED]** so they can be audited.

The intent: an AI agent or designer given only this document and
[[STD_Brand-Kit]] can produce any standard Bitcoin-Minded web,
email, or ad surface without further input.

Related documents:
- [[STD_Brand-Kit]]
- [[STD_Brand-Voice]]
- [[STD_Ideal-Customer-Profiles]]
- [[STD_Naming-Convention]]

**Domain of Authority:** This document is authoritative on numeric
implementation values for the brand — type scale sizes and line
heights, spacing scale values, layout grid columns and breakpoints,
border radius values, focus ring specifications, and the component
specifications for every standard production component (nav, hero,
button, body section, list block, media+text, curriculum row,
pricing panel, FAQ item, closing CTA band, footer, email capture
form). It is not authoritative on color values, typeface choices,
imprint application rules, or logo usage (see [[STD_Brand-Kit]]).
When this document specifies a value that would conflict with a
rule in [[STD_Brand-Kit]], the Brand Kit governs.

**Conflicts and Precedence:** When this document appears to conflict
with another standard, see [[STD_Standards-Hierarchy]].

---

## How This Document Is Organized

1. Foundations — type scale, spacing scale, layout grid, breakpoints,
   border radius, focus rings. These are the primitives.
2. Component specifications — each component listed in inventory
   order, with default state plus every applicable variant and state.
3. Cross-surface adaptations — how the system applies to email and
   ads where web-only properties (hover, focus, JavaScript) are not
   available.
4. Flagged decisions — every place this document chose a value the
   Brand Kit does not specify. Audit these first when reviewing.

---

## 1. Foundations

### 1.1 Type Scale

[[STD_Brand-Kit]] gives size *ranges* for each level. This document
picks specific values inside those ranges.

**Reasoning behind the chosen values.** The audience defined in
[[STD_Ideal-Customer-Profiles]] is 40-65, college-educated, paying
$99 to $697 for course access. The reference tier (Tim Ferriss,
Tiago Forte, serious independent course creators) runs body type at
17-19px and display headlines at 56-80px — wider H1-to-body ratios
than typical SaaS layouts (which run 14-16px body and 36-48px H1).
The values below sit in that editorial register. The Brand Kit's
ranges are wide enough to support either register; this document
picks the editorial end of each range deliberately.

**Fraunces at the chosen sizes.** Fraunces' opsz axis runs 9 to
144pt. The Brand Kit prohibits manual font-variation-settings on
live type — but `font-optical-sizing: auto` (the browser default)
applies optical sizing automatically without violating that rule.
At 56px H1, the browser will render Fraunces with display-tier
contrast; at 24px H3, with sub-display contrast; both look correct
without manual axis manipulation.

#### Desktop type scale

| Token | Level | Family | Weight | Size | Line height | Letter-spacing | Notes |
|---|---|---|---|---|---|---|---|
| `--type-display` | Display / hero H1 | Fraunces | 500 | 56px | 1.08 | 0 | Hero pages. Use sparingly — one per page. |
| `--type-h1` | H1 (page title, non-hero) | Fraunces | 500 | 44px | 1.12 | 0 | Page titles below the fold and on inner pages. |
| `--type-h2` | H2 (section title) | Fraunces | 400 | 36px | 1.15 | 0 | Section openers. Weight 400 — not 500 — keeps H2 visibly lighter than H1. |
| `--type-h3` | H3 (sub-section) | Fraunces | 500 | 24px | 1.25 | 0 | Within-section grouping headers. |
| `--type-h4` | H4 (block header) | Fraunces | 500 | 20px | 1.30 | 0 | **[INFERRED]** Brand Kit does not specify H4. Curriculum block headers and pricing panel titles need a level between H3 and body. 20px Fraunces 500 fits — large enough to read as headline, small enough to nest inside H3-led sections without crowding. |
| `--type-body-lg` | Lead paragraph | DM Sans | 400 | 19px | 1.55 | 0 | Hero subhead, lead paragraphs. **[INFERRED]** Brand Kit specifies body 15-17px; 19px lead is a deliberate one-step-larger emphasis size used for subheads only, not running body. Outside the Brand Kit body range — flagged. |
| `--type-body` | Body | DM Sans | 400 | 17px | 1.60 | 0 | Default running text. |
| `--type-body-sm` | Small body / micro-copy | DM Sans | 400 | 15px | 1.55 | 0 | Captions, guarantee line, "below CTA" copy. |
| `--type-eyebrow` | Eyebrow / meta | DM Sans | 500 | 13px | 1.30 | 0.14em | Uppercase. Hero eyebrow, section eyebrow. |
| `--type-trace` | Trace meta | JetBrains Mono | 400 | 12px | 1.40 | 0 | Hex codes, section numbers (S1, S2…), small URL labels. Never body. |
| `--type-button` | Button label | DM Sans | 500 | 16px | 1.20 | 0 | Primary and secondary CTAs. |
| `--type-nav` | Nav link | DM Sans | 500 | 15px | 1.20 | 0 | Top-level nav text. |

#### Mobile type scale

At narrow viewports (under 768px), display sizes shrink. Body and
below stay constant — DM Sans at 17px is already the lower edge of
the readability range and should not shrink further. Mobile-only
overrides:

| Token | Mobile size | Mobile line height |
|---|---|---|
| `--type-display` | 40px | 1.10 |
| `--type-h1` | 32px | 1.15 |
| `--type-h2` | 28px | 1.20 |
| `--type-h3` | 22px | 1.30 |
| `--type-h4` | 18px | 1.35 |
| `--type-body-lg` | 18px | 1.55 |
| All other tokens | unchanged | unchanged |

The display step from 56px to 40px is roughly 70% — preserves the
editorial register without overflowing a 380px viewport.

#### Italic emphasis inside headlines

Per [[STD_Brand-Kit]]: italic Fraunces is used for one to three
words inside H1 and H2 headlines. Italic words on the master-palette
surface take `--color-accent` (terracotta). Italic words on a
per-course surface take that course's `--color-imprint-*`.
Implementation: wrap the emphasis words in `<em>` and style with
`font-style: italic` plus the appropriate color token. No
font-variation-settings, no opsz override.

#### What never to apply

Per [[STD_Brand-Kit]]:
- No font-variation-settings on live type (the wordmark in logo
  files is the only place SOFT, WONK, opsz are tuned manually).
- No fractional letter-spacing values except the eyebrow's `0.14em`.
- No body type in Fraunces. No body type in JetBrains Mono.
- No substitution of Inter for DM Sans or any serif for Fraunces.

### 1.2 Spacing Scale

**Base unit: 4px.** Reasoning: the brand uses warm paper backgrounds
for 70-80% of any surface (Brand Kit color usage rules), so
whitespace is the primary visual element. The scale must support
generous open layouts at the editorial end and tight composition at
the component end. 4px is the finest meaningful step on standard
displays at standard zoom — finer than 4px is invisible; coarser
(8px Material-style) loses positions in the small/medium range.
4px also rounds cleanly at common email and ad render resolutions.

Scale values (CSS tokens `--space-1` through `--space-12`):

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Hairline gaps, between adjacent inline elements. |
| `--space-2` | 8px | Within tight components — eyebrow to headline, badge padding. |
| `--space-3` | 12px | Button vertical padding, list item gap. |
| `--space-4` | 16px | Default gap between paragraphs of the same block. |
| `--space-5` | 24px | Headline to subhead, button horizontal padding. |
| `--space-6` | 32px | Sub-section gap, between H3 block and following content. |
| `--space-7` | 48px | Between major blocks within a section. |
| `--space-8` | 64px | H2 to body block gap. |
| `--space-9` | 96px | Default section vertical padding (top and bottom). Editorial breathing room. |
| `--space-10` | 128px | Hero section vertical padding. |
| `--space-11` | 160px | Wide vertical separator — between fundamentally different page regions (e.g., hero block to first content section on top-tier landing pages). |
| `--space-12` | 192px | Reserved for future use (full-bleed editorial chapters). |

**Mobile spacing scale.** Scale shrinks at narrow viewports. Below
768px:
- `--space-9` → 64px (section padding)
- `--space-10` → 80px (hero padding)
- `--space-11` → 96px
- `--space-12` → 128px
- All `--space-1` through `--space-8` unchanged.

**Why not 8px base.** Common SaaS systems (Material, Tailwind
default) use 8px. At this brand's display sizes (Fraunces at 56px,
H2 at 36px), 8px steps lose useful positions in the type-to-headline
range — eyebrow-to-headline at 8/16/24 reads as stepped, where 8/12
gives finer control. The granularity matters at editorial scale.

### 1.3 Layout Grid and Breakpoints

**Container widths.** A single column with a wide gutter is the
editorial pattern (Stripe Press, NYT Opinion, Forte Labs). Multi-column
information density is reserved for genuine list content (curriculum
rows, FAQ stacks).

| Token | Value | Use |
|---|---|---|
| `--container-narrow` | 680px | Body prose, FAQ stack — keeps measure inside the 68-character target from Brand Kit body rules. |
| `--container-default` | 960px | Default landing page content width. Heroes, sections, curriculum, pricing. |
| `--container-wide` | 1200px | Two-up media+text blocks, comparison tables, full-bleed editorial banding. |
| `--container-full` | 100% | CTA bands, footer — surfaces that need to extend to the viewport edge. |

**Breakpoints.** **[INFERRED]** — Brand Kit does not state breakpoints.
Three breakpoints chosen to handle the realistic device range for
the 40-65 audience:

| Token | Value | Range covered |
|---|---|---|
| `--bp-sm` | 0-767px | Phones. |
| `--bp-md` | 768-1023px | Tablets, narrow laptops. |
| `--bp-lg` | 1024px+ | Desktop, where the editorial layout is at its best. |

Two-breakpoint systems (mobile / desktop) are simpler but produce
awkward tablet-range layouts at this audience's hardware (iPads,
older laptops at scaled resolutions). Three breakpoints is the
minimum that keeps the editorial spacing scale legible at every
realistic width.

**Gutter widths.** Outside the container, the gutter (page margin)
provides the editorial breathing room:

| Breakpoint | Page margin (gutter) |
|---|---|
| `--bp-sm` | 24px |
| `--bp-md` | 48px |
| `--bp-lg` | 64px minimum, grows to fill any width beyond `--container-default + 128px`. |

### 1.4 Border Radius

**[INFERRED]** — Brand Kit is silent on radius. Editorial publications
use 0-4px radius; SaaS uses 8-16px+. The Brand Kit explicitly
positions the identity outside SaaS, which constrains radius to the
low end.

| Token | Value | Use |
|---|---|---|
| `--radius-0` | 0px | Hairline rules, full-bleed bands. Default for everything unless otherwise specified. |
| `--radius-1` | 2px | Buttons, form inputs, pricing panels. Just enough to soften without reading as "rounded". |
| `--radius-2` | 4px | Cards with content density — testimonial cards, premium pricing panels. |
| `--radius-3` | 8px | Reserved. Currently unused. Adding for future flexibility but no current component uses it. |

### 1.5 Focus Rings

**[INFERRED]** — Brand Kit prohibits pure black and does not specify
focus styles. Accessible focus rings are required for keyboard
navigation. The audience definition includes a meaningful share of
40-65 year-olds who may use keyboard navigation more than younger
users (mobility, accessibility tools).

Default focus ring (on paper backgrounds):
- 2px solid `--color-ink`
- 2px offset (gap between element and ring)
- Applied via `:focus-visible`, not `:focus`, so mouse users do not
  see persistent rings

On dark/imprint/accent backgrounds (where Ink would have insufficient
contrast):
- 2px solid `--color-paper`
- 2px offset

On Ink buttons specifically:
- 2px solid `--color-accent` (terracotta)
- 2px offset
- Reasoning: Ink ring on Ink button is invisible; Paper ring on Ink
  reads as outline-only-not-focus. Accent is the only available
  high-contrast option that does not violate the Brand Kit's
  excluded-colors list.

### 1.6 Shadows and Effects

**No shadows on any standard component.** Reasoning: the Brand Kit
prohibits drop shadows, glow, and outlines on logo marks ("The
marks are designed to read flat"). This document extends that
principle to all components. Editorial publications do not use card
shadows; SaaS does. The decision is consistent with the brand's
positioning.

The only permitted depth cue is the warm-tone background change
between `--color-paper` (page) and `--color-paper-warm` (card,
panel, CTA closing band). Color contrast carries the depth, not
shadow.

---

## 2. Component Specifications

Components are listed in the order they typically appear on a
landing page, from top to bottom.

### 2.1 Nav

The site navigation bar. Used on every web surface.

**Layout.**
- Full-width container, height 72px desktop / 64px mobile.
- Lockup left-aligned at 32px from left gutter (40px on `--bp-lg`).
- Nav links right-aligned, gap `--space-5` (24px) between links.
- On `--bp-sm`: replace nav links with hamburger icon, lockup remains.

**Logo lockup.**
- Use `BRAND_Lockup_primary-positive.svg` on `--color-paper` background (default).
- On per-course pages, the imprint or quiet-two-tone variant may be
  used per [[STD_Brand-Kit]] "Per-course nav and footer logos" rule.
  Default remains primary positive — substitute only when course
  identity should dominate the nav.
- Lockup height 28px desktop / 24px mobile (within the Brand Kit
  minimum-100px-width rule via aspect ratio).

**Nav links.**
- Token: `--type-nav` (DM Sans 500, 15px).
- Color: `--color-ink` default; `--color-accent` on hover; underline
  appears on hover with 1px solid `--color-accent`, 2px offset below
  text baseline.
- Active page indicator: 1px solid `--color-ink` underline, 2px
  offset, always visible.

**Background.**
- Default: `--color-paper`.
- On per-course landing pages: `--color-paper` remains. The Brand
  Kit allows navy nav bars on BFA "where appropriate to the
  surface" but does not require it. **[INFERRED]** Default to paper
  nav on all surfaces unless a specific BFA campaign explicitly
  requests the navy variant; mixing nav backgrounds across the
  site would weaken brand coherence.

**Bottom border.**
- 1px solid `--color-rule` (hairline). Provides separation from
  page content without becoming a graphic element.

**States.**
- Default: paper background, ink links, no hover styling.
- Hover (on link): link goes accent, accent 1px underline appears.
- Focus (keyboard): default focus ring on the focused link.

### 2.2 Hero

The opening block on landing pages. Carries the heaviest typographic
load and the primary conversion CTA.

**Layout.**
- Container: `--container-default` (960px) on desktop, full-width
  with `--bp-sm` gutter on mobile.
- Vertical padding: `--space-10` top (128px desktop / 80px mobile),
  `--space-10` bottom.
- Single column, left-aligned content (not centered — centered
  display type reads as SaaS marketing; left-aligned reads as
  editorial). Image/photo, when present, sits to the right at
  `--bp-md` and above; stacks below text on `--bp-sm`.

**Composition (top to bottom).**
1. **Eyebrow** — `--type-eyebrow`, color per surface:
   - Shared/master-palette surfaces: `--color-ink-mute`.
   - Per-course surfaces: course `--color-imprint-*`.
   - **[INFERRED]** Brand Kit specifies eyebrow color on per-course
     surfaces explicitly. On shared surfaces it does not — the only
     remaining options that fit the palette rules are `--color-ink-mute`
     or `--color-accent`. Ink-mute is the more restrained choice
     and is selected as default. Accent eyebrow would compete with
     the italic emphasis words inside the H1.
   - Margin-bottom: `--space-5` (24px).
2. **Display headline (H1)** — `--type-display`, color `--color-ink`,
   italic emphasis words in surface-appropriate color (accent on
   shared, imprint on per-course). Margin-bottom: `--space-5` (24px).
3. **Subhead** — `--type-body-lg` (19px lead paragraph),
   color `--color-ink`. Maximum width 60ch. Margin-bottom: `--space-7`
   (48px).
4. **Primary CTA** — Button primary variant (see 2.3 Button).
5. **Secondary CTA** — Button text-link variant, sits to the right
   of primary on `--bp-md`+ with `--space-5` gap; stacks below on
   `--bp-sm` with `--space-4` gap.
6. **Below-CTA micro-copy** — `--type-body-sm`, color
   `--color-ink-mute`. Margin-top: `--space-4` (16px). Used for the
   30-day guarantee line and the "book a free call" inline link
   that appears on BFB and BFA hero blocks.
7. **Pasco caption** — Where used, sits below the Pasco photo (when
   photo is in hero) — `--type-body-sm`, color `--color-ink-mute`.

**Background.**
- `--color-paper`. Hero never uses paper-warm — the paper-warm tone
  is reserved for cards and the closing CTA per Brand Kit.

**Pasco photo placement (when used).**
- Right column at `--bp-md`+, occupying ~40% of container width.
- Photograph follows [[STD_Brand-Kit]] photography direction —
  warm natural light, matter-of-fact framing, no neon-on-dark.
- No drop shadow, no rounded mask beyond `--radius-1` (2px) max.

**States.**
- Hero has no interactive states of its own. CTAs inside it follow
  Button states (2.3).

### 2.3 Button

Buttons appear throughout: hero CTAs, pricing panel CTAs, closing
CTA, inline page CTAs.

Three variants: **Primary**, **Secondary**, **Text link**.

#### 2.3a Primary button

The strong-conversion action. "Enroll — $99 founding student price."

**Default.**
- Background: `--color-ink` (warm near-black).
- Text color: `--color-paper`.
- Type: `--type-button` (DM Sans 500, 16px).
- Padding: `--space-4` (16px) vertical, `--space-6` (32px) horizontal.
- Border radius: `--radius-1` (2px).
- Border: none.

**Hover.**
- Background: `--color-accent` (terracotta). Per
  [[STD_Brand-Kit]] color rules — "Used for italic emphasis words
  in headlines, hero CTAs on hover, the quiet two-tone emblem
  mark." This is the explicit Brand Kit rule.
- Text color: `--color-paper` (unchanged).
- Transition: 150ms ease-out on background-color only.

**Active / pressed.**
- Background: darken accent by ~10% (use `--color-accent-pressed`
  if added to tokens, or transform via `filter: brightness(0.92)`).
- **[INFERRED]** — Brand Kit is silent on active state. The accent
  hover is established; active needs to read as "click registered"
  without introducing a new color.

**Focus.**
- Focus ring per 1.5 — 2px solid `--color-accent`, 2px offset.

**Disabled.**
- Background: `--color-rule-strong` (`#BFB39A`).
- Text color: `--color-ink-mute`.
- Cursor: not-allowed.
- **[INFERRED]** — Brand Kit does not address disabled states. The
  rule-strong tone keeps the disabled button in the master palette
  while reading clearly as inactive.

**Per-course override.**
- Per [[STD_Brand-Kit]]: "Imprint colors never tint backgrounds,
  button fills, or body type." Primary buttons remain `--color-ink`
  even on per-course pages. Hover remains accent on per-course
  pages — the Brand Kit explicitly names accent (not imprint) for
  hero CTAs on hover.

#### 2.3b Secondary button

The lower-emphasis action. "Watch 4 free lessons."

**Default.**
- Background: transparent.
- Text color: `--color-ink`.
- Type: `--type-button` (DM Sans 500, 16px).
- Padding: `--space-4` (16px) vertical, `--space-6` (32px) horizontal
  (matches primary so the two read as a pair).
- Border: 1px solid `--color-ink`.
- Border radius: `--radius-1` (2px).

**Hover.**
- Background: `--color-ink`.
- Text color: `--color-paper`.
- Border color: `--color-ink` (unchanged).
- Transition: 150ms ease-out.

**Active / pressed.**
- Filter: brightness(0.92) on the hover background.

**Focus.**
- 2px solid `--color-ink`, 2px offset.

**Disabled.**
- Border color: `--color-rule-strong`.
- Text color: `--color-ink-mute`.

#### 2.3c Text-link button

The lowest-emphasis action. "[Learn about Bitcoin for People →]"

**Default.**
- Background: transparent.
- Text color: `--color-ink`.
- Type: `--type-button` (DM Sans 500, 16px).
- Padding: 0.
- Border: none.
- Underline: 1px solid `--color-ink`, 2px offset below baseline.

**Hover.**
- Text color: `--color-accent`.
- Underline color: `--color-accent`.

**Focus.**
- 2px solid `--color-ink`, 2px offset.

**Arrow character.**
- Many copy blocks include "→" at end (e.g., "Learn about Bitcoin
  for People →"). Keep the arrow as a literal character in the
  text; spacing handled by the surrounding string. No special icon
  treatment.

### 2.4 Body Section

The repeating prose block: eyebrow (optional) + H2 + paragraphs.
Used for "Why This Matters," "How We Operate," "Who This Course Is
For" intro text, and similar.

**Layout.**
- Container: `--container-narrow` (680px) for prose-only sections;
  `--container-default` (960px) for sections with mixed media or
  multi-column content (List Block inside Body Section, etc.).
- Vertical padding: `--space-9` (96px desktop / 64px mobile) top
  and bottom.

**Composition.**
1. **Eyebrow** (optional) — `--type-eyebrow`, color per surface
   (see Hero composition rule for shared vs per-course colors).
   Margin-bottom: `--space-4` (16px).
2. **H2** — `--type-h2`, color `--color-ink`. Italic emphasis
   words follow surface rules. Margin-bottom: `--space-7` (48px)
   when followed by body; `--space-6` (32px) when followed by H3.
3. **Body paragraphs** — `--type-body`, color `--color-ink`.
   Inter-paragraph margin: `--space-4` (16px).
4. **H3** (when used) — `--type-h3`, color `--color-ink`.
   Margin-top: `--space-6` (32px) when following a paragraph.
   Margin-bottom: `--space-4` (16px).

**Background.**
- `--color-paper` default.
- Alternate sections may use `--color-paper-warm` to provide
  visual rhythm down a long page. The Brand Kit specifies
  paper-warm for "Card backgrounds, closing CTA panels, surfaces
  that need to differentiate from primary paper without leaving
  the warm range." Body section on paper-warm is a legitimate
  use of this — alternating section backgrounds is the editorial
  rhythm pattern this brand wants.

**Hairline separator (optional).**
- Where a body section needs an explicit top boundary without using
  a background change: 1px solid `--color-rule`, full container width,
  at section top edge.

### 2.5 List Block

Bulleted lists — "Who This Course Is For," "What's Included,"
"Who This Course Is NOT For." Appears multiple times per landing
page.

**Layout.**
- Sits inside a Body Section; inherits that container.
- List items align flush-left, bullet marker hangs in the gutter.

**Bullet character.**
- **[INFERRED]** — Brand Kit does not specify. Editorial publications
  typically use either a centered dot (·), an em dash (—), or a small
  hairline glyph. The em dash is already used heavily in body copy as
  the brand's preferred punctuation; using it as a bullet marker
  would create visual confusion with inline em dashes. The centered
  dot is the cleanest available option that does not clash with
  body punctuation patterns. Selected: `·` (U+00B7 middle dot), color
  `--color-ink-mute`.

**Item styling.**
- Type: `--type-body` (DM Sans 400, 17px).
- Color: `--color-ink`.
- Line height: 1.60 (inherited from body).
- Vertical gap between items: `--space-3` (12px).
- Indent: bullet sits at -24px from text edge (hanging indent).

**Lists on dark/imprint backgrounds.**
- Bullet color: `--color-paper`.
- Text color: `--color-paper`.

### 2.6 Media + Text Block

Two-column layout with image on one side, text on the other. The
"Meet Your Instructor" block is the primary use case. Also used
for any future block that pairs a photograph with explanatory copy.

**Layout.**
- Container: `--container-default` (960px).
- On `--bp-md`+: two columns, 50/50 split, gap `--space-7` (48px).
  Image may be left or right.
- On `--bp-sm`: stacks vertically, image first.
- Vertical padding: `--space-9` (96px desktop / 64px mobile).

**Image side.**
- Photograph per [[STD_Brand-Kit]] photography direction.
- Image fills its column width.
- No drop shadow. No rounded mask beyond `--radius-1` (2px).
- Caption (optional) below image: `--type-body-sm`, color
  `--color-ink-mute`. Margin-top: `--space-3` (12px).

**Text side.**
- Eyebrow (optional) — same rules as Body Section.
- H2 or H3 depending on hierarchy — usually H3 since Media+Text
  blocks are typically subordinate to a section. Margin-bottom:
  `--space-5` (24px).
- Body paragraphs — `--type-body`, inter-paragraph margin
  `--space-4` (16px).
- Inline link or CTA at end: text-link button, margin-top
  `--space-5` (24px).

### 2.7 Curriculum Row

The repeating section block within "What You'll Learn." Each course
has five sections (S1 Get Started, S2 History, S3 Bitcoin, S4 Action,
S5 Graduation). The row is structurally repeated five times per
course landing page.

**Layout.**
- Container: `--container-default` (960px).
- Each row: full container width.
- Internal grid: 4-column on `--bp-md`+ (section number cell |
  content cell), where number cell is `--space-11` (160px) wide and
  content takes the rest. On `--bp-sm`, number sits above content
  in a single column.
- Inter-row vertical gap: `--space-7` (48px).

**Per Brand Kit imprint rules on curriculum rows.**
- The Brand Kit specifies: "Curriculum section numbers and
  left-edge stripes — the section identifier (S1, S2, S3...) and
  a 2px vertical stripe along the left edge of each curriculum row."

**Left-edge stripe.**
- 2px wide, full row height.
- Color: course `--color-imprint-*` on per-course pages.
- On the homepage and other shared surfaces (which do not display
  curriculum), this stripe is not applicable.

**Section number.**
- Type: `--type-h4` (Fraunces 500, 20px) for the prefix "S1" /
  "S2" etc., or `--type-trace` (JetBrains Mono 400, 12px) for the
  minimal trace-meta version.
- **[INFERRED]** — Brand Kit names section numbers as a place
  imprint color appears, but does not specify which typeface
  carries the number. JetBrains Mono is the "trace meta" face per
  Brand Kit and is the natural fit for short labels like "S1" /
  "S2". Selected: JetBrains Mono 400, 12px, uppercase, in course
  imprint color. The label reads as a navigation marker rather
  than a design element.
- Padding-left: `--space-5` (24px) — sits to the right of the
  imprint stripe.

**Row content.**
- Eyebrow line (optional, e.g. "Section 2 —"): `--type-eyebrow`,
  course imprint color, margin-bottom `--space-2` (8px). On BFP,
  per Brand Kit's "BFP applies the imprint with a lighter touch —
  the section eyebrows on BFP surfaces stay in warm grey, not
  honey ochre" — use `--color-ink-mute` instead of imprint.
- H4 — "The Surprising History of Money" or equivalent. Color
  `--color-ink`. Margin-bottom: `--space-4` (16px).
- Body paragraph — `--type-body`, color `--color-ink`.

**Background.**
- `--color-paper`. Curriculum rows alternate paper / paper-warm
  on long lists if visual rhythm is needed, but default is uniform
  paper.

### 2.8 Pricing Panel

The structured block that contains a price, what's included, and
a CTA. Each landing page has two: Full Course panel and Premium
Support panel.

**Layout.**
- Container: `--container-default` (960px).
- Each panel: full container width on `--bp-sm` and `--bp-md`,
  two panels side-by-side at 50/50 on `--bp-lg` with `--space-7`
  (48px) gap.

**Background.**
- `--color-paper-warm` (`#EBE3D4`) — per [[STD_Brand-Kit]]:
  "Card backgrounds, closing CTA panels."
- Border: none. Background change carries the separation.
- Border radius: `--radius-2` (4px).
- Internal padding: `--space-8` (64px) all sides on `--bp-md`+;
  `--space-6` (32px) all sides on `--bp-sm`.

**Composition.**
1. **Panel title** — H3 or H4 — "Full Course — $99 founding
   student price" / "Premium Support — $99/month (optional)".
   Color `--color-ink`. Margin-bottom: `--space-5` (24px).
2. **Body intro** (optional) — `--type-body`, one short paragraph.
   "Founding students pay $99 — a discount we're offering..."
   Margin-bottom: `--space-6` (32px).
3. **Bullet list** — List Block component nested inside.
   Margin-bottom: `--space-7` (48px).
4. **Primary CTA** — `[Enroll — $99]` button.
5. **Below-CTA micro-copy** — `--type-body-sm`,
   `--color-ink-mute`. "100% money-back guarantee within 30
   days." Margin-top: `--space-4` (16px).

**Premium panel variant.**
- Same layout. Includes additional text: "No auto-pay. We invoice
  you monthly." — treat as body paragraph. "Annual option:..." —
  treat as second body paragraph.

### 2.9 FAQ Item

The Q+A pattern used in "Common Questions" on every landing page.

**Layout.**
- Container: `--container-narrow` (680px) — Q+A is prose and stays
  within the prose measure.
- Each item full container width.
- Inter-item gap: `--space-6` (32px).

**Default (static) variant.**
- All items visible, no expand/collapse interaction.
- Question — `--type-h4` (Fraunces 500, 20px), color `--color-ink`.
  Margin-bottom: `--space-3` (12px).
- Answer — `--type-body`, color `--color-ink`. Inter-paragraph
  margin: `--space-4` (16px).
- Hairline between items: 1px solid `--color-rule`, full container
  width, padding-bottom `--space-6` before line, padding-top
  `--space-6` after.
- No item separator before the first item or after the last.

**Accordion variant (optional, where space is constrained).**
- Question becomes interactive — adds chevron right-edge.
- Closed state: answer hidden, chevron points right.
- Open state: answer revealed, chevron rotates to point down,
  transition 200ms ease-out.
- Hover (on question): question text color `--color-accent`.
- Focus: 2px solid `--color-ink`, 2px offset on the question row.
- **[INFERRED]** — Accordion is not strictly necessary for the
  current landing pages (the static stack works on the existing
  copy length). Included as an optional variant for future use
  on pages where the FAQ stack would otherwise dominate the page.

### 2.10 Closing CTA Band

The final conversion block at the bottom of every landing page.

**Layout per [[STD_Brand-Kit]].**
- Full viewport width (`--container-full`).
- Top edge: 3px imprint-color band on per-course pages.
- Background: `--color-paper-warm` per Brand Kit ("CTA closing
  panels").
- Internal padding: `--space-10` (128px desktop / 80px mobile)
  vertical; `--space-9` (96px / 64px mobile) horizontal beyond
  container.

**Composition.**
1. **Top band** (per-course only) — 3px solid course
   `--color-imprint-*`, full width. No content inside band.
2. **Inside container `--container-narrow` (680px), centered:**
3. **Eyebrow** (optional) — `--type-eyebrow`, color per surface.
   Margin-bottom: `--space-4` (16px).
4. **Headline** — `--type-h2` (or `--type-h1` for top-tier pages).
   Color `--color-ink`. Center-aligned. Margin-bottom:
   `--space-6` (32px).
5. **Primary CTA** — full-width button on `--bp-sm`,
   intrinsic-width on larger.
6. **Below-CTA micro-copy** — `--type-body-sm`,
   `--color-ink-mute`. Center-aligned. Margin-top: `--space-4`
   (16px).

**Center alignment exception.**
- This is the only component that uses center alignment for body
  copy. Reasoning: it's a single short block functioning as a
  capstone, and centered display type at this scale reads as
  closing punctuation. Center alignment is otherwise prohibited
  throughout the system.

### 2.11 Footer

The minimal footer at the bottom of every page.

**Layout.**
- Full viewport width (`--container-full`).
- Background: `--color-paper`.
- Top border: 1px solid `--color-rule`.
- Padding: `--space-7` (48px) vertical; gutter horizontal.
- Single line of copy on `--bp-md`+: lockup left, copyright right.
  Stacks vertically on `--bp-sm`.

**Composition.**
- **Lockup** — `BRAND_Lockup_primary-positive.svg`, height 24px.
- **Copyright meta** — `--type-body-sm`, color `--color-ink-mute`:
  "© 2026 Scarcity, LLC — Bitcoin-Minded".

**No additional links.**
- The web copy files show single-line footers with copyright only.
  No sitemap, no social links, no nav repetition. This minimal
  footer matches the editorial register (Stripe Press, The Browser,
  Plain English) far better than the SaaS-default fat footer.

### 2.12 Email Capture Form

The "Try Before You Buy" / "Watch 4 free lessons" form. Appears
once per landing page.

**Layout.**
- Container: `--container-narrow` (680px).
- Vertical padding: `--space-9` (96px desktop / 64px mobile).
- Centered layout — the email capture is a focal moment.

**Composition.**
1. **H3** — "Try Before You Buy" or equivalent. Color
   `--color-ink`. Margin-bottom: `--space-5` (24px).
2. **Body** — One paragraph explaining the offer.
   `--type-body`. Margin-bottom: `--space-6` (32px).
3. **Input + button row.**
4. **Privacy line** — `--type-body-sm`, `--color-ink-mute`. "We
   don't sell, rent, or share your information." Margin-top:
   `--space-3` (12px).

**Input.**
- Type: `--type-body` (DM Sans 400, 17px).
- Padding: `--space-3` (12px) vertical, `--space-4` (16px)
  horizontal.
- Background: `--color-paper`.
- Border: 1px solid `--color-rule-strong`.
- Border radius: `--radius-1` (2px).
- Placeholder color: `--color-ink-mute`.
- On `--bp-md`+: input and button side-by-side, input flexes,
  button fixed intrinsic width.
- On `--bp-sm`: input full width above button, gap `--space-3`.

**Input states.**
- Default: as above.
- Focus: border 1px solid `--color-ink`; default focus ring (2px
  `--color-ink`, 2px offset) — note this produces a 2px gap +
  2px ring, total 4px outside the input.
- Error: border 1px solid `--color-accent`; error message below
  input in `--type-body-sm`, color `--color-accent`.
- Disabled: background `--color-rule`, text `--color-ink-mute`.

---

## 3. Cross-Surface Adaptations

The system is designed for web. Email and ads have constraints that
require specific adaptations.

### 3.1 Email

- **Type sizes.** Email clients render type more conservatively than
  browsers. Display headlines (`--type-display`) are reserved for
  web-only contexts; emails use `--type-h1` (44px) as the largest
  size and shrink in proportion on mobile clients.
- **Spacing.** Outlook on Windows ignores some CSS spacing rules.
  Use table-based layout for email, with cell padding equal to
  the relevant spacing token. The 4px base unit rounds cleanly in
  table-cell pixels.
- **Hover states.** Most email clients do not render hover. Buttons
  use only the default state.
- **Custom fonts.** Many email clients do not load custom fonts.
  Specify Fraunces and DM Sans as primary, then a system serif and
  system sans as fallbacks: `'Fraunces', Georgia, serif` and
  `'DM Sans', 'Helvetica Neue', Arial, sans-serif`. The fallback
  chain is necessary for portability.
- **Colors.** All Brand Kit colors render correctly in email.

### 3.2 Ads (Google, social paid)

- **Aspect ratios.** Standard ad formats — 1:1, 4:5, 9:16, 16:9.
  The single-column hero composition adapts; for narrow vertical
  formats (9:16, 4:5), stack tighter: hero composition steps
  collapse to eyebrow + H1 + button only (subhead dropped) on
  formats smaller than 600px in height.
- **Type sizes.** Ads at small canvas sizes need larger type
  relative to the canvas. Use `--type-display` (56px) at a
  minimum 1280×720 canvas; scale proportionally smaller for
  smaller canvases but never below 28px for any headline in an
  ad context.
- **Trace meta.** JetBrains Mono is too small to read in most ad
  formats. Reserve for web. Replace with DM Sans 400 in trace
  positions for ads.
- **Imprint application.** Per-course ads use the course imprint
  color in the same positions specified on web — eyebrow, italic
  emphasis words, hairline rules. The "imprint never tints
  backgrounds" rule continues to apply.

---

## 4. Flagged Decisions

This document made these choices where the Brand Kit is silent. Each
has a defensible reasoning, but each should be reviewed before
formal adoption. Order: most consequential first.

1. **Specific type-scale values within Brand Kit ranges.** The Brand
   Kit gave H1 40-58px, H2 28-40px, H3 22-28px, body 15-17px,
   eyebrow 12-13px, mono 11-12px. This document picked 56/44/36/24/
   17/13/12 (with 20px H4 added — Brand Kit had no H4) for desktop.
   Different values inside those ranges would produce a tighter or
   looser scale. The picked values sit at the editorial end.

2. **Mobile type scale.** Brand Kit is silent on mobile sizing.
   Picked 40/32/28/22/18/17/13/12 — preserves the editorial register
   without overflowing narrow viewports.

3. **Spacing base unit = 4px.** Brand Kit is silent. Reasoning given
   in 1.2. Common alternative is 8px (Material/Tailwind default);
   reasoning for not using it is explicit.

4. **Three breakpoints (sm/md/lg) at 0/768/1024.** Brand Kit is
   silent. Reasoning for three rather than two given in 1.3.

5. **Border radius 2px default, 4px max for cards.** Brand Kit is
   silent. Reasoning: editorial register prohibits SaaS-style 8-16px
   pill shapes; full square (0px) reads as severe; 2px is the
   minimum perceivable softening.

6. **No shadows on any component.** Brand Kit prohibits shadows on
   logos and states marks are "designed to read flat." This document
   extends that to all components. A reviewer might argue subtle
   shadows are acceptable on pricing panels for separation — this
   document instead uses the warm paper-warm background to carry
   separation.

7. **Focus ring spec — Ink on paper, Paper on dark, Accent on Ink
   buttons.** Brand Kit is silent on focus rings. Selected as the
   minimum-decision set that maintains accessibility without
   introducing colors outside the palette.

8. **Default eyebrow color on shared/master-palette surfaces =
   `--color-ink-mute`.** Brand Kit specifies imprint color on
   per-course surfaces. On shared surfaces it does not. Alternative
   would be `--color-accent`; reasoning for choosing ink-mute given
   in 2.2.

9. **List bullet marker = middle dot (·).** Brand Kit silent.
   Reasoning given in 2.5.

10. **Center-alignment exception only on Closing CTA Band.** Brand
    Kit silent on alignment. Default is left-aligned everywhere
    (editorial); the single exception is the closing CTA where the
    block functions as visual punctuation.

11. **Single line footer.** Brand Kit silent. Reasoning: matches
    editorial register; fat footers are SaaS pattern.

12. **Nav default = paper background even on per-course pages.**
    Brand Kit allows BFA navy nav "where appropriate" but does not
    require it. Defaulted to paper for consistency; a per-page
    override is permitted but not the default.

13. **JetBrains Mono carries section numbers in curriculum rows.**
    Brand Kit names section numbers as an imprint-color position
    but does not pick a typeface. Mono is the natural trace-meta
    choice. Could also be DM Sans 500 at small size.

14. **H4 level added (20px Fraunces 500).** Brand Kit's hierarchy
    table jumped H3 (22-28px) to body. The web copy files have
    block-level headings (curriculum section titles, FAQ questions,
    pricing panel titles) that don't fit H3 (too prominent) or
    body-bold (not enough). H4 fills the gap.

15. **Body lead size = 19px.** Brand Kit body range is 15-17px.
    Hero subheads need a step above body to read as "lead"
    paragraph. 19px is outside the stated range. Could use 17px
    with weight 500 instead. Selected 19px because hero subhead is
    a one-off use, not running text.

---

## Maintaining This Document

Update when:
- A new component is added to production use (add to component
  inventory with full state and spec)
- A color or typography rule in [[STD_Brand-Kit]] changes (revisit
  every component that uses the changed value)
- A breakpoint or container width is changed (cascade through
  every component)
- A flagged decision in section 4 is reviewed and either confirmed
  (move out of flagged list) or revised (update component spec and
  flagged list together)
- A new production surface (e.g., printed material) requires a
  cross-surface adaptation section

Do not change a value here without checking whether the change
needs to propagate to `brand-tokens.css` and `BRAND_Quick-Reference.md`.
These three files must stay in lockstep.

---

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.1 | 2026-05-11 | Wording-only revision. Three instances of "publisher" / "publication" replaced where they could be misread as describing what Bitcoin-Minded is rather than the visual register the design system targets — section 1.1 reference tier ("publishers" → "course creators"), section 1.1 mobile scale ("'this is a publication' feel" → "editorial register"), section 1.3 gutter widths ("'publication' breathing room" → "editorial breathing room"). Three remaining "editorial publications" references retained as design-vocabulary lineage references (sections 1.4, 1.6, 2.5). No substantive changes to any rule. |
| 1.0 | 2026-05-11 | Initial version. Picks numeric values for the type scale, spacing scale, breakpoints, border radius, and focus rings inside the ranges and direction set by STD_Brand-Kit v1.1. Specifies 10 core components (Nav, Hero, Button, Body Section, List Block, Media+Text, Curriculum Row, Pricing Panel, FAQ Item, Closing CTA Band) plus Footer and Email Capture. Flags 15 decisions where the Brand Kit is silent and an explicit choice was made. Companion files: brand-tokens.css and BRAND_Quick-Reference.md. |
