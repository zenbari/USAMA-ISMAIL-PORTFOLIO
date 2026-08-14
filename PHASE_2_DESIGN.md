# Phase 2 — Design Deliverables

No application code. Everything here is specification. Produced against
`IMPLEMENTATION_BRIEF.md` (the INDEX brief) and the Section 18 answers on
record in `PHASE_1_AUDIT.md`. Stop at the gate at the end of this document.

Facts used throughout, and only these facts (§2 of the brief): Usama Ismail,
Digital Marketing Executive, London. MSc Management with Digital Marketing,
BPP University London. Full UK right to work, available immediately. English,
Urdu, Punjabi, Hindi. usama7612@outlook.com · +44 7586 828944 ·
linkedin.com/in/usama-malik-3b800227b. No ranking, traffic, conversion,
impression or performance metric appears anywhere below for Zenbari, Auto
Boutique London or InsuranceClaim Help, per your explicit instruction.

---

## 1. Narrative treatment, act by act

Copy below is treatment-level (what each act argues and shows), not final
production copy — final strings are a Phase 3 task, reviewed against this
treatment.

### Act 1 — Identity

**Argument:** who, what, where, available — answerable in the first screen,
without scrolling, without waiting for anything to load.

**Field state:** Noise. Fully unstructured, at rest, at its most sparse and
quiet. No morph yet — this is the "as a crawler first encounters it" state.

**On screen, server-rendered, present in the first paint:**
- Name, set large, in real crawlable type — not an image, not canvas text.
- One line of positioning: specialisation named plainly (technical SEO, paid
  media), not a mission statement.
- London. Available immediately. Full UK right to work.
- The four languages, stated once, plainly — not decorative.
- A visible link to `/cv` and a one-action route to contact (see §2).

**Pacing:** the most compressed act. Everything the 60-second visitor needs is
here; nothing is withheld for later.

### Act 2 — Diagnosis

**Argument:** most sites fail for structural reasons, not content reasons —
and that diagnosis is this candidate's actual, demonstrable skill.

**Field state — Morph 1 fires here:** Noise → Lattice. The transformation is
triggered by scroll progress through this act, scrubbed exactly (see §5). The
copy's claim and the visual argument land on the same scroll position, not
sequentially.

**On screen:** a short, specific statement of the diagnostic method — what
"technical SEO" concretely means in practice (crawlability, indexation,
information architecture, internal linking) — stated as a discipline, not a
boast. No client is named here; this act is about method, not evidence.

**Pacing:** brief, declarative, allowed to breathe — this act exists to set up
Act 3, not to prove anything itself yet.

### Act 3 — Evidence

**Argument:** the work. Real, named, bounded strictly to verified facts.

**Field state:** Lattice, held. This act is explicitly the densest in
information and the quietest in motion (brief §5) — no morph fires inside it.
The field sits still in its resolved-lattice state so it never competes with
the reading experience.

**Content, in order of weight:**

1. **Zenbari** — the anchor. Founded, designed and hand-built in HTML, CSS and
   JavaScript with no page builder. Full technical SEO: site architecture,
   indexation, internal linking, ongoing optimisation. Deployed via GitHub.
   Framed entirely as scope of work and method — no ranking or traffic claim.
2. **Auto Boutique London** — Digital Marketing & Website Executive,
   2026–present. Website UX, technical SEO, lead generation, Google and Meta
   campaigns, resolved Google Ads disapprovals, supported a WordPress and
   hand-coded rebuild. Framed as scope of work — no outcome metric.
3. **InsuranceClaim Help** — Digital Marketing Assistant, 2026–present,
   *lighter entry, not a full case study*. SEO audits, keyword research,
   competitor analysis, reporting, paid lead-generation support, across
   multiple UK businesses. No outcome metric.
4. **Rankrazz** — Digital Marketing Intern, *lighter entry*. Technical audits,
   WordPress content, analytics. No outcome metric.

Each of the four links out to its own real, server-rendered route (§2) — this
act is the index of the work, not the full text of it.

**Pacing:** deliberately quiet. Motion here is limited to ordinary
scroll-reveal of text blocks (see the motion spec, §5) — no field
choreography competing for attention while the visitor is reading the actual
evidence.

### Act 4 — Method

**Argument:** how the work is actually done — audit, fix, intent, budget —
stated as a repeatable process, not a one-off.

**Field state — Morph 2 fires here:** Lattice → Rank order. The architecture
that Act 3 sat still and showed is now visibly reorganising into a
prioritised, ranked structure — the visual argument for "this is how I decide
what to fix first."

**On screen:** the working method in four beats (diagnose → prioritise →
build or brief → verify — carried over conceptually from the current site's
"How I Work" section, rewritten for this narrative). Tools named here as
supporting detail in a small, quiet register — never a logo wall, never the
headline.

**Pacing:** measured, procedural. This act can afford a slightly longer
resolution time on the morph since it is explaining a process, not making a
single sharp claim.

### Act 5 — Resolution

**Argument:** availability and contact. The visitor leaves having watched
noise become order.

**Field state — Morph 3 fires here:** Rank order → Indexed grid. Calm, evenly
spaced, fully resolved. This is also the field's resting state on every other
route in the site (see the transition model, §10) — the "indexed" state is
the site's true baseline, not a special effect reserved for the end of the
scroll.

**On screen:** contact details at large scale, the availability statement,
the CV link restated, the live Core Web Vitals element (footer, per your
Section 18 answer) sitting quietly beneath.

**Pacing:** the calmest act. No further morphs, no new claims — only
confirmation and the exit.

---

## 2. Sitemap and URL structure

### Route inventory (default locale, `en`)

| Route | Type | Notes |
|---|---|---|
| `/` | Single continuous 5-act scroll (the entire brief's narrative) | The only "home"; Act 3 is the work index — there is no separate `/work` listing route |
| `/work/zenbari` | Full case study, real SSR route | Anchor case study |
| `/work/auto-boutique-london` | Full case study, real SSR route | |
| `/work/insurance-claim-help` | Light entry, real SSR route | Same route family, template degrades honestly (§9) |
| `/work/rankrazz` | Light entry, real SSR route | |
| `/cv` | Fast, plain, semantic, printable HTML. No WebGL, no motion library, no canvas. Own print stylesheet. HTML page only — no separate downloadable PDF, one source of truth | The brief's mandated escape hatch |
| `/contact` | Real SSR route, own metadata | Also reachable in one action from anywhere (see below) |
| `/404` | Custom not-found | Field renders in its Indexed-grid resting state, low intensity |

No `/about`, no `/privacy` page carried forward automatically — About-style
content is absorbed into Act 1/Act 5 on the single-page narrative, which is
more honest to "one continuous field, one uninterrupted transformation" than
a separate About page competing with it. `/privacy` is only added if a real
data-collecting mechanism exists (e.g. an analytics script); the current
contact form design (`mailto:`-based, no backend) doesn't need one — carried
into Phase 3 as a decision point only if that changes.

### "One action from anywhere" contact requirement

A persistent, non-scroll-jacked header element (visible on every route,
including project detail pages and `/cv`) links directly to `/contact`. This
is the one-action path the brief requires, independent of where the visitor
is in the Act 1–5 narrative.

### Localisation

Per your decisions: locale-prefixed routes for Urdu and Hindi, English
unprefixed as the default. **Punjabi is excluded** — confirmed at the Phase 2
gate, not built.

```
/                          (English, default)
/ur/                       (Urdu)
/hi/                       (Hindi)
```

mirrored for every route in the inventory above (`/ur/work/zenbari`,
`/hi/contact`, etc.), each with:

- A self-referencing canonical (not canonicalised back to English).
- Full `hreflang` alternates across all three locales plus an `x-default`
  pointing at the unprefixed English route.
- `lang` and `dir` set correctly per route (`dir="rtl"` for Urdu; Hindi is
  Devanagari, LTR, unambiguous).

This is real scope: translation (drafted by Claude in Phase 3, reviewed and
approved by you before anything ships live — confirmed at the gate, not
optional), RTL layout support in the design system (§4), and a duplicated
route tree. It is scoped into Phase 3 as its own increment, built and proven
on the English version first, per the brief's own incremental-build order
(§15) — English ships as a complete, correct site before locale routes are
added, rather than shipping unfinished languages simultaneously.

---

## 3. Wireframes at three breakpoints

Structural specification, not visual mockups — precise enough to build from,
described rather than drawn, per the "no application code" constraint. Three
breakpoints used throughout: **mobile** (375–428px, no WebGL — see §11 tier
ladder), **tablet** (768–1024px), **desktop** (1280–2560px).

### 3.1 — `/` (the five-act scroll)

**Mobile (static field per §11):**
Single column throughout. Each act is full-viewport-height minimum, content
vertically centred within it. Type scale steps down one notch from desktop
(see §4). The field is a static pre-rendered image or CSS/canvas-2D
approximation sitting behind the content at low opacity — never fullscreen
WebGL. Act 3's four evidence entries stack as full-width cards, Zenbari and
Auto Boutique London visually weighted larger (more vertical space, fuller
summary) than the two light entries. Footer vitals element collapses to a
single compact line.

**Tablet:**
Same single-column narrative flow (this is a continuous story, not a grid
layout to fill), but type scale steps up, and Act 3's evidence entries move
to a 2-column grid for the four entries. Margins widen. WebGL scene runs at
Tier 2 if the capability probe passes (§11); otherwise Tier 1 static, same as
mobile.

**Desktop:**
Full type scale (§4). Act 3's evidence grid: Zenbari and Auto Boutique London
each take a wider, taller card (full case studies, more visual weight);
InsuranceClaim Help and Rankrazz sit smaller, side by side beneath — the
grid's own proportions are the honest visual signal of "two full case studies,
two lighter entries," not a label. Canvas fullscreen behind all acts, one
mount, camera path advancing with scroll (§8). Footer vitals element sits as
a small persistent strip, unobtrusive, real numbers.

### 3.2 — Project detail route (full case study: Zenbari, Auto Boutique
London)

**Mobile:** Single column. Header (title, role/discipline, period) →
placeholder media block (labelled, reserved aspect ratio — see §9) → context →
audit/diagnosis → strategy → implementation → outcome-as-work-completed →
lessons → tools (tag list) → next-project link → contact CTA. Every section
present in the schema renders; nothing here is a metric.

**Tablet:** Same order, header metadata (role/period) moves to a two-column
strip beside the title instead of stacking beneath it. Media block widens.

**Desktop:** Two-column body for the narrative sections (label column +
content column, matching the current site's `CaseStudyBlock` pattern — kept
because it already reads as an "audit report," which serves this brief's
evidence-based tone well), full-width media block above it, breadcrumb and
next-project nav unchanged in position (top and bottom respectively).

### 3.3 — Project detail route (light entry: InsuranceClaim Help, Rankrazz)

Same route family and template as 3.2, but the schema-driven "degrade
honestly" rule (§9) removes the audit/strategy/implementation granularity
that isn't real for these two: scope of work, tools, and skills demonstrated
render; sections with no content simply don't appear. No empty headings, no
"coming soon." At all three breakpoints this reads as a shorter, complete
page — not a truncated version of the full case-study template.

### 3.4 — `/cv`

**All three breakpoints, deliberately similar:** this route is explicitly
exempt from the field, the canvas, and the motion system. Plain semantic
HTML — header (name, role, contact line), profile, experience, education,
certifications, languages, skills — single column at all sizes except a
light two-column split for certifications/skills on tablet and desktop
(mirroring the existing downloadable CV's layout, which already reads well
in this mode — see the current `public/cv/usama-ismail-cv.pdf` source, which
this route replaces). A `@media print` stylesheet matches the on-screen
layout closely so "save as PDF" from the browser produces a clean result.
**Confirmed at the gate: HTML page only — no separate static PDF file.** One
source of truth; the current `public/cv/usama-ismail-cv.pdf` is retired once
this route ships.

### 3.5 — `/contact`

**Mobile:** Single column — email link, phone (**confirmed at the gate:
published here, as a `tel:` link**), LinkedIn, location, availability
statement, then the form.

**Tablet/Desktop:** Two-column — contact details and links on the left, form
on the right (same structural pattern as the current `/contact` page, which
already works well here).

---

## 4. Design system specification

### Distinct visual signature — the decision required by §6

**Chosen: a monospace data layer annotating the interface like crawler
output.**

Justification, in writing, as the brief requires: the INDEX concept is
literally about a crawler turning noise into order. A monospace annotation
layer — small, quiet, technical labels (coordinate-style position readouts
near the field, status-line strings marking act transitions, a timestamp/build
metadata line in the footer beside the vitals) — is the most direct possible
visual expression of "this is what a crawler's own output looks like,"
reinforcing the concept rather than merely decorating the page. It is also
the signature least likely to be confused with "the reference site" (dark +
bone serif + cursor-reactive dots reads as atmospheric; a monospace
data-annotation layer reads as technical console) — identifiable in a
screenshot with the particles removed, which is the test §6 sets.

Rejected: a visible baseline grid (too close to a generic "brutalist/Swiss"
signature already common in this genre) and a print-rule system (weaker tie
to the specific INDEX/crawler concept than the data layer).

### Palette

Carried forward from the current, already-built and contrast-verified system
(`app/globals.css` in the current codebase) as the base — it already passes
WCAG AA in both modes and fits "black, bone typography, muted gold" from the
brief's own genre description, which is *not itself the problem* the brief
is solving; the generic *particle-field-as-decoration* pattern is the
problem. Reusing a proven, measured palette and solving originality through
concept/structure/signature (§6) rather than reinventing colour is the
correct scope for this rebuild.

| Token | Dark value | Light value | Role |
|---|---|---|---|
| `bg` | `#0a0a0b` | `#faf8f4` | Base canvas background |
| `surface` | `#131316` | `#f1ede4` | Cards, elevated panels |
| `surface-raised` | `#1a1a1e` | `#e8e1d3` | Hover/active surface |
| `fg` | `#f2f0ec` | `#1a170f` | Primary text |
| `fg-muted` | `#a5a19a` | `#57503f` | Secondary text |
| `fg-subtle` | `#8b877f` | `#6f6858` | Tertiary text, measured at 4.5:1+ on `bg` in both modes |
| `accent` | `#c9a961` | `#7c5f18` | Single accent — links, active states, the data-layer annotations |
| `accent-strong` | `#ddc07f` | `#8f701f` | Hover |
| `accent-fg` | `#14120c` | `#fffdf8` | Text on filled accent surfaces |

New addition for this rebuild: a dedicated monospace data-layer colour,
`data-layer` — set to `fg-subtle` at reduced opacity (≈70%) rather than a new
hue, so the annotation layer reads as quiet metadata, never competing with
the accent for attention. Contrast for this layer is verified at 3:1 minimum
(it is non-essential decorative annotation, not body content) but targets
4.5:1 where it carries real information (e.g. the vitals numbers themselves,
which are content and must hit the full text contrast requirement).

**Contrast-against-field rule (§12):** all body and headline text overlaid on
canvas areas sits inside a defined text-safe band with an enforced scrim —
verified against the field's brightest permitted per-pixel value (its peak
particle-glow state), not its average, per the brief's explicit instruction.
This is a hard gate before any type-on-canvas composition ships.

### Type scale

Typography is the primary medium (§6, §14) — the system must work with the
canvas removed entirely. Carrying forward the current pairing (Fraunces
display serif + Geist Sans body/UI) since it already reads as "editorial,
restrained, expensive," with an added monospace face for the data layer
(a single weight of a system-adjacent mono — e.g. JetBrains Mono or the
platform default monospace stack, decided in Phase 3 against the font-payload
finding in `PHASE_1_AUDIT.md` #10 — no third full family added without
checking the budget first).

| Role | Mobile | Tablet | Desktop | Weight | Tracking |
|---|---|---|---|---|---|
| Act headline (H1-equivalent) | 2.75rem / 1.05 | 4rem / 1.03 | 5.5–7rem / 1.0 | 500–600, Fraunces | −0.02em |
| Section headline | 1.75rem | 2.25rem | 3rem | 500, Fraunces | −0.015em |
| Body / narrative | 1.0625rem / 1.6 | 1.125rem / 1.6 | 1.1875rem / 1.6 | 400, Geist | 0 |
| Data layer (monospace) | 0.6875rem | 0.6875rem | 0.75rem | 400, mono | 0.04em |
| Micro-label / eyebrow | 0.6875rem | 0.6875rem | 0.75rem | 500, Geist | 0.18em, uppercase |

### Spacing, radius, borders

Carried forward from the current tokens (`--radius-sm/md/lg`: 6/10/16px;
hairline borders at 10%/20% foreground opacity) — proven, and "generous,
uneven spacing" (§14) is an authorial decision made per-act in Phase 3
layout, not a token-level change.

### Accent usage — the "handful of defined places" rule (§14)

Exactly: primary CTA fills, active/current nav state, the monospace data
layer, link hover, focus rings, and the three morph-transition moments in the
field itself (a barely-there warm tint at the instant a morph completes,
never sustained). Nowhere else. This list is the enforcement mechanism —
anything not on it does not get the accent colour.

---

## 5. Motion specification

Required by §13 before any animation is written.

### Named durations and easings

| Name | Duration | Easing | Intent |
|---|---|---|---|
| `reveal-text` | 500ms | `power2.out` | Text entering on scroll — settle, don't bounce |
| `reveal-stagger` | 60ms per item | — | Sequential emphasis in lists (evidence cards, tool tags) |
| `morph-transition` | 1200–1800ms, scrubbed to scroll | Linear, driven by scroll progress directly (see §7 of the brief: fully scrubbed, not eased-then-fired) | The three field morphs — duration is a *range* the morph occupies in scroll distance, not a fixed clock time |
| `ui-hover` | 150ms | `ease` | Buttons, links, nav — matches the current site's existing hover timing |
| `theme-transition` | 200ms | `ease` | Colour token swap on light/dark toggle |

### Stagger rules

Evidence cards (Act 3) and tool/skill tags reveal with `reveal-stagger`, text
blocks within an act do not stagger word-by-word or letter-by-letter — that
register is too decorative for this brief's restraint requirement.

### What may animate before first interaction vs. on scroll

**Before interaction (on load, once):** Act 1 text reveal only —
`reveal-text`, no stagger beyond the block level. The field is present at
rest (Noise state) but not actively animating its target shape; ambient
drift (curl-noise, near-imperceptible) is permitted so the "noise" state
doesn't read as a frozen image, gated behind reduced-motion (see below).

**On scroll (scrubbed):** all three morphs, all `reveal-text`/`reveal-stagger`
entrances for subsequent acts, the camera path.

**Never:** autoplay of a morph on a timer, motion that starts before the
visitor has scrolled to the act that owns it.

### Reduced motion — the global rule

`prefers-reduced-motion: reduce` produces a **complete, deliberately
redesigned static experience**, not a stripped one, per §8 and §12: field
renders its final Indexed-grid state at rest (or is omitted entirely in
favour of the Tier-0 CSS fallback, decided in Phase 3), morphs are replaced
by instant state changes at the same scroll positions (no tween, no scrub —
the state simply *is* correct for wherever the visitor has scrolled to,
computed the same way, just not interpolated), all `reveal-*` timings drop to
near-zero per the existing project convention (already implemented this way
in the current codebase's `globals.css`).

### Pacing map (which acts breathe, which compress)

| Act | Pacing | Why |
|---|---|---|
| 1 — Identity | Compressed | 60-second contract — no motion delay between arrival and legibility |
| 2 — Diagnosis | Breathes | Sets up the argument; the morph is allowed room |
| 3 — Evidence | Quietest | Motion recedes entirely; this is a reading act |
| 4 — Method | Measured | Procedural explanation can sustain a slightly longer morph |
| 5 — Resolution | Calm, slow settle | The visitor should feel the site finishing, not stopping abruptly |

---

## 6. Interaction map

| Interaction | Trigger | Response | Keyboard equivalent |
|---|---|---|---|
| Scroll through acts | Wheel/touch/keyboard scroll | Camera advances, field morphs, text reveals — all scrubbed | Arrow keys, Page Up/Down, Space, Home, End — all native, never intercepted |
| Pointer force field (desktop, fine pointer only) | Mouse move over canvas | Subtle local perturbation of particle positions, decays quickly | N/A — decorative only, never carries information (no hover-only requirement, §12) |
| Evidence card → project route | Click/tap/Enter on a fully-clickable card | Standard navigation to the real SSR route | Tab to card, Enter activates |
| Theme toggle | Click/tap, or Enter/Space when focused | Instant token swap, persisted, `theme-transition` | Full keyboard operability, carried forward from the current implementation |
| Contact-from-anywhere | Click/tap on persistent header link | Navigates to `/contact` | Tab-reachable in header on every route |
| `/cv` link | Click/tap in header | Navigates to `/cv` | Tab-reachable |
| Locale switch | Click/tap on a locale control (placement decided Phase 3) | Navigates to the equivalent route under the new locale prefix, preserving the current page | Tab-reachable, each option a real link |
| Live vitals (footer) | Passive display, optionally click to expand detail | Read-only, no interaction required to function | N/A |

No interaction on this list is hover-only. Every interactive element has a
visible focus state (carried forward from the current site's existing
`:focus-visible` treatment, which already passed a 0-violation axe-core
audit) and a keyboard path.

---

## 7. Particle target inventory

Exactly three morphs, per §3's non-negotiable. Four named targets — the
fourth (Lattice) is *held*, not morphed into and out of within a single act,
which is what keeps this at three transitions rather than four.

| Target | Description | Point count | Used |
|---|---|---|---|
| **A — Noise** | Unstructured random distribution within a bounded volume; no discernible order | N (fixed across all targets) | Act 1, at rest |
| **B — Lattice** | Points snap to a structured grid/network arrangement, density and alignment implying connection without drawing literal lines | N | Act 2 morph target; held through Act 3 |
| **C — Rank order** | Points reorganise into a tiered, hierarchical arrangement — visually "sorted," implying prioritisation | N | Act 4 morph target |
| **D — Indexed grid** | Evenly spaced, fully resolved, calm | N | Act 5 morph target; also the resting state on every non-home route (§10) |

### Morphs, each justified against the concept in writing

**Morph 1 — Noise → Lattice (Act 1→2 boundary).** Argument being made at this
exact scroll position: "most sites fail for structural reasons" (Act 2's
thesis). The chaos organising into visible architecture *is* that argument,
not an illustration of it — a visitor should be able to say "the dots turned
into a website structure" without being told, satisfying §3's one-sentence
test.

**Morph 2 — Lattice → Rank order (Act 3→4 boundary).** Argument: the method
is fundamentally about prioritisation (audit → fix → intent → budget). The
architecture that sat still through the evidence act now visibly reorders
itself into ranked tiers at the exact moment the copy shifts from "here is
the work" to "here is how work gets decided."

**Morph 3 — Rank order → Indexed grid (Act 4→5 boundary).** Argument:
resolution. The ranked, active-looking structure settles into the calm,
indexed state — the visual equivalent of "the crawl is complete, the site is
indexed." This is also, deliberately, the site's baseline state everywhere
else (§10), so the ending of the home narrative and the "normal" state of
every other route are the same state — order, achieved.

No additional morph is proposed. Any future one requires the same
written-justification test before being built, per §3.

### Baking pipeline (documented so a new shape can be added without touching
a shader)

1. Author or select a source asset per target (e.g. an SVG/vector definition
   of the lattice/rank/grid arrangement, or a procedural rule for generating
   one — Noise and Indexed-grid are procedural; Lattice and Rank-order likely
   benefit from an authored source for visual intent).
2. Sample N points from that source (Poisson-disc or grid-jittered sampling,
   consistent method across targets so density reads intentionally, not
   randomly, per target).
3. Normalise into the shared bounding volume used by every target.
4. Assign each point a stable index (0…N−1) — the *same* index must refer to
   a "corresponding" point across all four targets, so a single particle's
   journey from Noise→Lattice→Rank-order→Indexed-grid is continuous and never
   orphaned.
5. Export as a typed array (`Float32Array`, xyz per point) per target,
   shipped as a static asset, uploaded once as a `BufferGeometry` attribute
   at scene init — never recomputed at runtime.
6. Assign each point a random per-particle `delay` and `easing-seed`
   attribute at build time (stable, not regenerated per session) so the
   morph ripples rather than snapping uniformly.

---

## 8. Scene and component architecture — the React/WebGL state boundary

This is the most consequential architectural decision in this document, so
it's stated as a firm recommendation rather than options.

**Recommendation: raw Three.js, no React Three Fiber, no drei.** The brief's
own description — "one BufferGeometry, one draw call... a fraction of the
complexity" — is a request for minimal abstraction. R3F is a fine library,
but it is still a dependency and an abstraction layer neither required nor
free, against a brief that treats every dependency as something to justify
in writing (§17) and every kilobyte as budget (§9). Raw Three.js, managed
imperatively, gives the smallest possible footprint and the most direct
control over the single-ticker requirement below.

### The boundary, precisely

- **One `<canvas>`, mounted once**, inside a client-only component rendered
  in the root layout, `position: fixed`, `inset: 0`, behind all route
  content (`z-index` below the DOM content stack), `pointer-events: none`
  except where the pointer-force-field interaction is explicitly enabled.
  This component is dynamically imported with SSR disabled (§9's required
  mechanism) and mounts exactly once for the lifetime of the app shell —
  route changes never unmount or remount it.
- **A `SceneController`** — a plain class, not a React component and not a
  React Context provider — owns the Three.js scene, camera, renderer, the
  geometry/material/uniforms, and exposes an imperative API
  (`setProgress(n)`, `setAct(n)`, `setPointerForce(x, y)`,
  `setQualityTier(n)`). It is instantiated once, referenced via a module-level
  singleton or a ref held by the mounting component — never through React
  state.
- **One ticker.** A single `requestAnimationFrame` loop (or GSAP's own
  ticker, adopted as *the* ticker rather than running alongside a second one
  — the brief is explicit that competing rAF loops are the specific cause of
  micro-judder) drives, in order, on every tick: the smooth-scroll instance's
  position, the director store's derived progress values, `SceneController`'s
  per-frame update, and finally `renderer.render()` — called manually,
  render-on-demand, not via `renderer.setAnimationLoop`.
- **A director store** — a small vanilla store (subscribe/publish, no
  `useState`/Context), holding `scrollProgress`, `currentAct`, and pointer
  position as plain mutable fields written directly from the ticker. Section
  components register their scroll range with the store once, on mount, via
  a ref-based effect — they do not read progress through props or state on
  every frame.
- **React's job, precisely bounded:** mount the canvas once; render the real
  DOM content of every act/route (this is the LCP-safe, server-rendered text
  §9 requires); mount/unmount route-level content on navigation (the scene
  itself is untouched by this); handle one-time setup (registering a
  section's scroll range) and genuinely infrequent state (theme, locale,
  mobile menu open/closed) through normal React state, because those are not
  60Hz values. **If a React render is happening at 60Hz anywhere in this
  system, that is a bug against this spec**, not a stylistic preference.

### Camera

One authored path, camera position/rotation expressed as a function of
global scroll progress (0→1 across the whole home route), with each act
declaring keyframes along that single path at store-registration time. No
section owns an independent camera tween.

---

## 9. Content schema

One file per project, one per role, outside the components entirely,
validated at build time (malformed entry fails the build). Below is
descriptive schema notation for this specification — not application code,
not placed in the repository's build path.

```
Project {
  slug: string
  title: string
  organisation: string          // employer or own venture — real name, not anonymised
  period: string                // e.g. "2026 — Present"
  discipline: string[]          // e.g. ["Technical SEO", "Paid Media"]
  depth: "full" | "light"       // controls which narrative fields are expected, not required
  summary: string               // 1–2 sentences, index/card-level

  narrative?: {
    context?: string
    audit?: string
    strategy?: string
    implementation?: string
    outcome?: string            // work completed / status — NEVER a metric unless
                                 //   explicitly supplied and cleared to publish
    lessons?: string
  }

  tools: string[]
  links?: { label: string, href: string }[]
  media?: MediaRef[]            // see below — placeholder-safe by construction

  metrics?: MetricsBlock        // schema exists for the five-year requirement;
                                 //   remains empty for all current entries.
                                 //   Template renders NOTHING when absent —
                                 //   no "Results" heading, no placeholder numbers.
}

MediaRef {
  kind: "placeholder" | "image"
  label: string                 // shown when kind = "placeholder"
  src?: string, alt?: string, width?: number, height?: number   // when kind = "image"
}
```

`depth: "light"` entries (InsuranceClaim Help, Rankrazz) simply omit most
`narrative` fields at the data level — the template's honest-degradation rule
(brief §10) means the layout reflows around whatever is present, never
rendering an empty heading or "coming soon" text. This is the same pattern
already proven in the current codebase's case-study template
(`CaseStudyBlock` renders conditionally per field) — carried forward, not
reinvented.

**Imagery, concretely:** every current entry ships with `media: [{ kind:
"placeholder", label: "…" }]`, exactly as instructed — not blocking Phase 2,
and the schema's `image` variant means swapping in a real screenshot later is
a one-field data change, never a layout change.

**Role entries** (Auto Boutique London, InsuranceClaim Help, Rankrazz, Dnata
UK) use the same `Project` shape — a "role" is not a structurally different
type in this schema, it's a project with `organisation` set to the employer
and `depth` set appropriately. This keeps §10's "one file per project, one
per role" requirement to a single schema rather than two parallel ones.

---

## 10. Transition model

**Route-to-route (client-side navigation):** the canvas is never unmounted.
On navigating away from `/` to any detail route (`/work/*`, `/cv`,
`/contact`), the `SceneController` is told to hold the **Indexed-grid**
state (Target D) at reduced opacity (proposed 4–8%, decided precisely in
Phase 3 against real contrast testing) and the render loop is throttled
(lower frame target, or paused entirely and rendered as a single static
frame) — both for the "when there's something real to say, the visuals get
out of the way" principle extended site-wide, and for the frame/CPU budget
on content-dense pages. Navigating back to `/` restores the live loop and the
scroll-driven state at whatever act the visitor's scroll position implies —
never restarting from Act 1.

**Within `/`:** all three morphs are fully scrubbed to scroll position, in
both directions — scrolling up reverses a morph exactly, per §7's explicit
requirement. No morph fires as a one-shot, threshold-triggered animation.

**Back/forward and deep links:** a deep link into `/#act-3` (or equivalent)
or a browser back/forward navigation must resolve the field to the *correct*
state for that scroll position immediately, computed the same way scrubbing
computes it — not tweened from Act 1, not requiring the visitor to
re-scroll through everything to "catch the field up." This is explicitly
tested in Phase 3 (§16 of the brief).

---

## 11. Performance strategy — tier ladder

| Tier | Who gets it | What renders | Enforcement |
|---|---|---|---|
| **0 — No motion** | `prefers-reduced-motion: reduce`, or WebGL unavailable | Full redesigned static experience per §5's reduced-motion rule; field either omitted or a single static frame of the Indexed-grid state | Media query + capability check, decided before any canvas work begins |
| **1 — Mobile default** | All mobile viewports, by default | Brief-mandated static pre-rendered image or CSS/canvas-2D approximation of the field; full content, full typography, considered non-3D motion | Never ships WebGL to mobile automatically — a design decision, not a fallback (§8 of the brief) |
| **2 — Full scene** | Desktop by default; mobile **only** after an explicit runtime capability probe passes **and** an explicit user action opts in | Full vertex-shader morphing system as specified in §7–8 | Device-pixel-ratio clamped, render-on-demand, loop paused when tab hidden or canvas offscreen |
| **Runtime demotion** | Any Tier 2 session where frame time exceeds budget for N consecutive frames | Drop point count, then disable pointer-force-field, then fall back to Tier 1 static | Dev-only overlay (frame time, draw calls, point count) plus a URL flag to force any tier for inspection on any machine |

### Budgets carried forward as hard CI thresholds (§9 of the brief)

- Initial JS for the landing route, gzipped, excluding the deferred 3D chunk:
  **under 150 kB.** Phase 1 measured the current baseline at **151.1 kB with
  zero 3D content** — this budget is not met today and has zero headroom;
  Phase 3 must claw this back (candidates: font subsetting per
  `PHASE_1_AUDIT.md` #10, re-auditing the current small client components)
  *before* the 3D chunk is added, not after.
- LCP element is server-rendered DOM text, never canvas/image. LCP under 2.0s
  on throttled mobile — Phase 1 measured **2.7s today**, on a site with no 3D
  scene at all, so this is a real, pre-existing gap to close in parallel with
  the rebuild, not a new risk introduced by it.
- CLS exactly zero, INP under 200ms, 16ms desktop / 22ms mobile frame budget,
  Mobile Lighthouse 95/100/100/100 (Performance/Accessibility/Best
  Practices/SEO).
- Bundle-size check and a Lighthouse run wired into CI, budgets as failing
  thresholds on the PR, not advisory.
- Memory verified across repeated client-side navigation specifically because
  a persistent scene plus routing is a genuine leak risk — full disposal of
  geometry/materials/textures required on any real teardown path (there
  shouldn't be one for the canvas itself, but route-level DOM content still
  needs standard cleanup).

---

## 12. SEO strategy

Extends the pattern already proven and measured working in Phase 1 (Person +
WebSite + ProfilePage on home, BreadcrumbList + CreativeWork per project,
generated sitemap/robots, unique per-route metadata within the 60/160
character limits) rather than replacing it:

- Every route above (§2), including all locale variants, is a real
  server-rendered route with its own `generateMetadata`.
- `CreativeWork` structured data per project, keyed off the same schema as
  §9 — `depth: "light"` entries still get valid structured data, just with
  fewer populated fields, never fabricated ones.
- Canonical strategy for localisation: each locale is self-canonical, with
  full `hreflang` alternates (§2) — English is not treated as the canonical
  "true" version of translated content.
- Sitemap generation extended to include every locale route.
- `/cv` and `/contact` both indexable, both with real descriptive metadata —
  neither is a dead end for a crawler.
- Canvas element: `aria-hidden="true"`, empty accessible content, confirmed
  never in the accessibility tree — carried forward from the current Loader
  pattern's own `role="presentation"` precedent.

---

## 13. Accessibility strategy

WCAG 2.2 AA floor, per §12 of the brief.

- **Full keyboard operability of the scroll-driven narrative**: native
  scroll is never intercepted or hijacked (§13/§17 — a broken or hijacked
  scroll is an explicit failure condition). Arrow keys, Page Up/Down, Space,
  Home, End, and deep-link anchors all work exactly as the browser's default
  scroll would provide, because the morphs are driven *by* scroll position
  rather than replacing it.
- **Visible, high-contrast focus indicators** on every interactive element,
  including the persistent contact/CV header links and the theme toggle —
  carried forward from the current implementation, which already passed a
  0-violation axe-core audit in both light and dark mode (`PHASE_1_AUDIT.md`
  process note) and is the baseline to re-verify, not rebuild, once the new
  header ships.
- **Contrast against the field verified at its brightest frame**, not
  average — the enforced text-safe scrim from §4, tested against the peak
  particle-glow state specifically.
- **Reduced motion**: complete redesigned static experience per §5, not
  animation simply paused mid-state.
- **No hover-only interaction** anywhere in the interaction map (§6).
- **No information carried by colour alone** — the accent's "handful of
  defined places" (§4) never doubles as the sole signal for something like
  case-study depth (full vs. light) or morph state; those are always also
  communicated structurally (layout, text) as specified in §3 and §9.
- **Screen reader pass** scheduled as an explicit Phase 3 verification step
  (§16), findings reported honestly, not asserted.

---

## 14. Open questions

Resolved at the Phase 2 gate, recorded for the trail:

- **Punjabi**: excluded. Localisation ships as English (default) + Urdu +
  Hindi only.
- **Translation governance**: Claude drafts Urdu/Hindi copy in Phase 3; none
  of it ships until you (or a trusted native reviewer) sign off.
- **Phone number**: publishes on `/contact` (as a `tel:` link) and `/cv`, not
  CV-only as the current site has it.
- **`/cv` format**: HTML page only, own print stylesheet. The existing static
  `public/cv/usama-ismail-cv.pdf` is retired when this route ships.

Still genuinely open, before or during Phase 3:

1. **Locale switcher placement and default behaviour.** Not specified in the
   brief. Proposed: a small control in the header, switching to the
   equivalent page in the new locale rather than always returning to that
   locale's home. Confirm, or direct otherwise.
2. **Vitals detail level.** Footer placement is confirmed. **Should the
   footer element be LCP/CLS/INP only (as the brief's §6 names), or also
   surface the live JS/font payload figures from `PHASE_1_AUDIT.md`** as a
   further, even more specific flex?

---

## Gate

Phase 2 is complete: narrative treatment, sitemap/IA (including the
localisation decision), wireframes at three breakpoints for every unique
layout, the full design system specification, the motion specification, the
interaction map, the particle target inventory with all three morphs
justified in writing, the scene/component architecture with the React/WebGL
boundary made explicit, the content schema, the transition model,
performance strategy with a tier ladder and CI-enforceable budgets, SEO
strategy, and accessibility strategy.

No application code has been written. Still on `index-rebuild/phase-1-audit`
(carried through Phase 2 for now — happy to rename before Phase 3 if you'd
prefer a phase-specific branch name).

Stopping here, per your instruction, for approval before **Phase 3 —
Incremental build**, which per the brief starts with design system and
motion primitives proven on existing content, then the persistent scene
shell proven against the performance budget *before* any complexity is
added — not with the particle system itself.
