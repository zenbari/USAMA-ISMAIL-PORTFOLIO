# Phase 1 — Audit

Branch: `index-rebuild/phase-1-audit` (off `main`, never `main` directly). No
application code was changed to produce this report — every figure below is
measured from a fresh production build (`next build && next start`), not
estimated.

## Stack

- Next.js 16.3.0 — App Router, Turbopack, Server Components by default
- React / React DOM 19.2.8
- TypeScript ^5, Tailwind CSS ^4
- Node v24.18.0, npm 11.16.0

## Dependencies — keep / replace / remove

| Package | Verdict | Why |
|---|---|---|
| `next`, `react`, `react-dom` | Keep | Required |
| `gsap` ^3.15.0 | Keep, scope narrows | Fine for text/UI stagger under the new motion spec; the particle scene itself must be vertex-shader/WebGL per the brief §7, not GSAP-driven DOM |
| `lucide-react` ^1.28.0 | Keep | Tree-shakeable, already in light use |
| `tailwindcss` ^4, `eslint`, `eslint-config-next`, `typescript`, `@types/*` | Keep | Dev tooling only |
| *(not yet present)* | Will be required | A WebGL library (raw Three.js recommended — see `PHASE_2_DESIGN.md` §8) for the vertex-shader morphing system. Justified in writing before it's added, per the brief's "no dependency without a stated reason" rule |

No current dependency needs removing. The existing set is minimal and clean —
a genuine positive going into a rebuild of this scope.

## Full file tree (at audit time)

```
app/
  about/page.tsx  contact/page.tsx  work/page.tsx  work/[slug]/page.tsx  privacy/page.tsx
  layout.tsx  page.tsx  globals.css  not-found.tsx
  icon.tsx  opengraph-image.tsx  robots.ts  sitemap.ts
components/
  layout/   Footer.tsx  Header.tsx  MobileNav.tsx  NavLink.tsx  ThemeToggle.tsx
  motion/   Loader.tsx  RevealScope.tsx
  sections/ Capabilities.tsx  CaseStudyBlock.tsx  ContactCTA.tsx  ContactForm.tsx
            EducationCertifications.tsx  ExperienceTimeline.tsx  Hero.tsx
            ProcessApproach.tsx  ProjectCard.tsx  SelectedWork.tsx
  ui/       Button.tsx  Container.tsx  PlaceholderVisual.tsx  SectionHeading.tsx
            Tag.tsx  Wordmark.tsx
data/       experience.ts  projects.ts  site.ts  skills.ts
hooks/      useScrollReveal.ts
lib/        statusLabels.ts
types/      content.ts
public/cv/  usama-ismail-cv.pdf
```

Current architecture is a conventional multi-page marketing site (Home / Work
index / 4 project pages / About / Contact / Privacy), server-rendered, minimal
client JS, dark charcoal + warm-white + muted-gold design system with a working
light/dark toggle. This is architecturally distinct from the brief — no
persistent canvas, no continuous scroll narrative, no five-act structure. See
Finding #2 below.

## Git state

All existing work — every file above — was, at audit time, uncommitted
working-tree changes on top of a single `c32d608 Initial commit from Create
Next App`. `main` itself was never otherwise touched. Now branched to
`index-rebuild/phase-1-audit`.

## Real measured bundle sizes

Production build, transferred (gzipped) bytes via Chrome DevTools Protocol
network capture — Next.js 16 no longer prints route sizes in build output, so
this was measured directly rather than estimated.

| Route | Total | JS | Fonts |
|---|---|---|---|
| `/` | 298.8 KB | 151.1 KB | 109.7 KB |
| `/work` | 306.4 KB | 151.1 KB | 109.7 KB |
| `/work/auto-boutique-london` | 291.8 KB | 151.1 KB | 109.7 KB |
| `/about` | 291.8 KB | 151.1 KB | 109.7 KB |

## Real Lighthouse (production build, headless Chromium)

| Route | Device | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 95 | 96 | 100 | 100 | 2.7s | 0 | 110ms |
| `/` | Desktop | 100 | 100 | 100 | 100 | 0.6s | 0 | 10ms |
| `/work` | Mobile | 97 | 96 | 100 | 100 | 2.6s | 0 | 0ms |
| `/work/auto-boutique-london` | Mobile | 97 | 96 | 100 | 100 | 2.6s | 0 | 10ms |

## Current SEO state

Verified with `curl` (no JS execution) — all substantive content, including
the full Hero H1, is present in the initial HTML response on every route
checked. Unique per-route titles and descriptions within the brief's 60/160
character limits. Canonical URLs present. Structured data present and valid:
`Person` + `WebSite` + `ProfilePage` on home, `BreadcrumbList` + `CreativeWork`
on case studies. `sitemap.xml` (9 URLs) and `robots.txt` both correct.

## Top 10 weaknesses, ranked by commercial impact

1. **No live, self-measuring Core Web Vitals display.** The brief's single
   most distinctive, hardest-to-fake proof of technical-SEO competence — absent.
2. **No WebGL/particle "INDEX" concept, no five-act continuous scroll
   narrative.** Current site is conventional multi-page. This is the core of
   the new brief and the largest single gap.
3. **Real, currently-shipping accessibility bug.** Lighthouse mobile
   Accessibility is 96/100 — `link-name` fails because the header logo `<a>`
   has no discernible accessible name at mobile widths (visible name text is
   `hidden` below `sm`; the logo mark itself is `aria-hidden`).
4. **Mobile LCP measured at 2.7s** against the brief's 2.0s budget — real,
   shipping shortfall before any new complexity is added.
5. **No `/cv` route.** Brief mandates a fast, plain, semantic, printable HTML
   escape hatch with a print stylesheet; currently only a static PDF link.
6. **No distinct visual signature beyond typography + dark/gold.** Tasteful,
   but exactly the "genre" the brief wants to escape.
7. **JS payload already 151.1 KB gzipped with zero 3D content** — at the
   brief's <150KB landing-route budget before the biggest new dependency is
   even added. Zero headroom currently exists.
8. **Content model is a single flat array** (`data/projects.ts`), not the "one
   file per project + schema-validated at build time" architecture the
   five-year requirement (§10) demands.
9. **Everything uncommitted on `main`, one initial commit** — no history, no
   rollback point for a rebuild of this scope.
10. **Font payload is 109.7 KB — roughly 37% of total page weight** — two
    families (Fraunces + Geist), not yet audited against actual weight/style
    usage.

## Section 18 answers on record

- **LinkedIn**: `linkedin.com/in/usama-malik-3b800227b` confirmed current —
  usable in Phase 2 content.
- **Localisation**: build it properly — English, Urdu, Punjabi, Hindi, with
  correct hreflang. Script/direction decision for Punjabi is an open question
  (see `PHASE_2_DESIGN.md` §14).
- **Live vitals placement**: footer.
- **Production domain**: `usamaismail.co.uk`, confirmed.
- **Client-side metrics**: no rankings, traffic, conversion rates, impressions
  or performance metrics for Zenbari, Auto Boutique London or InsuranceClaim
  Help are to be published unless explicitly supplied later. All three are
  described by process and scope of work only.
- **Case study depth**: Zenbari and Auto Boutique London carry full case
  studies (context, audit, strategy, implementation, outcome*, lessons —
  *outcome framed as work completed / implementation status, never a metric).
  InsuranceClaim Help and Rankrazz are lighter, role-based entries.
- **Imagery**: real imagery exists but must not block Phase 2. Design
  deliverables use clearly labelled placeholders; the content architecture and
  layouts are built to accept real screenshots/media later without redesign.
