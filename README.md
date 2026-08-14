# Usama Ismail — Portfolio

Personal portfolio for **usamaismail.co.uk** — Next.js 16 (App Router), React, TypeScript,
Tailwind CSS, GSAP. Content is truthful and evidence-based: every project shown is real work,
with findings and implementation status clearly labelled (see `data/projects.ts`).

## Stack

- Next.js 16 (App Router, Turbopack, Server Components by default)
- TypeScript + Tailwind CSS 4 (theme tokens in `app/globals.css`, not scattered arbitrary values)
- GSAP + ScrollTrigger (dynamically imported, only for scroll-reveal — respects `prefers-reduced-motion`)
- lucide-react for icons

No CMS, no database, no analytics installed by default — content lives in typed files under `data/`.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build      # production build
npm run start       # serve the production build locally
npx eslint .        # lint
npx tsc --noEmit    # typecheck
```

## Project structure

```
app/                 routes: home, work, work/[slug], about, contact, privacy, not-found
  sitemap.ts          generates /sitemap.xml
  robots.ts           generates /robots.txt
  icon.tsx            generated favicon (brand monogram)
  opengraph-image.tsx generated social share image
components/
  layout/             Header, Footer, MobileNav
  sections/           Homepage/page sections (Hero, SelectedWork, ExperienceTimeline, ...)
  ui/                 Small reusable primitives (Button, Tag, Container, PlaceholderVisual, ...)
  motion/             Loader, RevealScope (GSAP scroll-reveal wrapper)
data/                 All editable content — see below
lib/                  Small helpers (status label mapping)
types/content.ts       Shared TypeScript types for all content data
public/cv/             Downloadable CV PDF
```

## Editing content

Everything a recruiter sees is driven by typed data files in `data/` — you should never need to
touch component code just to update text.

| To change... | Edit this file |
|---|---|
| Name, email, location, availability, nav links | `data/site.ts` |
| Job history, education, certifications | `data/experience.ts` |
| Skills/tools grid | `data/skills.ts` |
| Projects and case studies | `data/projects.ts` |

### Adding a new project / case study

Add a new object to the `PROJECTS` array in `data/projects.ts` following the existing shape:

```ts
{
  slug: "your-project-slug",       // becomes /work/your-project-slug
  name: "Project Name",
  category: "Your role or category",
  role: "Your role",
  period: "2026 — Present",
  featured: true,                  // true = shows in the homepage "Selected work" grid
  summary: "One or two sentences for the card.",
  tags: ["Tag one", "Tag two"],
  placeholderLabel: "Text shown on the placeholder visual",
  caseStudy: {
    context: "...",                // omit/empty string to hide the section
    objective: "...",
    scopeOfWork: ["..."],          // empty array hides the section
    findings: [{ label: "...", detail: "..." }],
    recommendations: ["..."],
    implementationStatus: "planning-only", // see lib/statusLabels.ts for options
    implementationNote: "...",
    toolsUsed: ["..."],
    skillsDemonstrated: ["..."],
  },
}
```

Case-study sections render **only when there's data** — leave arrays empty or omit optional
fields rather than writing filler text. Keep every claim truthful: only include findings, tools
and results that actually happened, and use `implementationStatus` to be explicit about whether
work was implemented, delivered as a roadmap, or is planning-only.

## Replacing images / the logo

- **Logo**: no personal logo file existed at build time, so `components/ui/Wordmark.tsx` renders
  an original "UI" text monogram (used in the header, footer and the loading screen). To replace
  it with a real logo, either edit that component to render an `<Image>` pointing at a file you
  add under `public/`, or swap the SVG markup directly.
- **Project imagery**: no client screenshots were available, so `components/ui/PlaceholderVisual.tsx`
  renders a tasteful "spec sheet" placeholder instead of a stock photo. To add a real screenshot,
  replace the `<PlaceholderVisual>` usage in `components/sections/ProjectCard.tsx` and
  `app/work/[slug]/page.tsx` with `next/image`, pointing at a file in `public/images/work/...`.
  Always set explicit `width`/`height` (or use `fill` inside a sized container) to avoid layout shift.

## Updating the CV

The downloadable CV lives at `public/cv/usama-ismail-cv.pdf`. It's a plain PDF file — replace it
with an updated export from your CV source whenever your experience changes. Keep it consistent
with `data/experience.ts` so the site and the CV never contradict each other.

## Environment variables

None are required for the site to run. If you add a contact-form provider or analytics (see
below), document the required variables in a `.env.local.example` file and read them via
`process.env.YOUR_VAR` — never commit real secrets.

## Configure the contact form

The contact form (`components/sections/ContactForm.tsx`) currently has **no backend** — on
submit it opens the visitor's email client with a pre-filled `mailto:` link. This works with zero
setup and zero secrets, but doesn't capture submissions if the visitor has no mail client
configured.

To wire up real submissions later (e.g. with [Formspree](https://formspree.io) or
[Resend](https://resend.com)):

1. Add the provider's endpoint/API key as an environment variable (e.g. `RESEND_API_KEY` in
   `.env.local`, and in Vercel's Project → Settings → Environment Variables).
2. Replace the `handleSubmit` function in `ContactForm.tsx` with a `fetch()`/Server Action call
   to that provider.
3. Add loading/success/error UI states around the existing form fields.
4. Update `app/privacy/page.tsx` to describe what's now collected and stored.

## Analytics (optional, not installed)

No analytics run by default. To add Google Analytics 4 later:

1. Create a GA4 property and get your Measurement ID.
2. Add it as `NEXT_PUBLIC_GA_ID` in `.env.local` and in Vercel's environment variables.
3. Load the GA script in `app/layout.tsx` using `next/script` with `strategy="afterInteractive"`
   so it never blocks rendering.
4. Update `app/privacy/page.tsx` to accurately describe the tracking.
5. If you need consent gating for UK/EU visitors, add a simple consent banner before the script loads.

Google Search Console: verify the domain via a DNS TXT record (see IONOS instructions below) —
no code change needed.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), "Add New Project" → import the repository → framework preset
   `Next.js` is auto-detected → Deploy. No environment variables are required for the base site.
3. Every push to `main` redeploys automatically; pull requests get preview URLs.

## Connecting the IONOS domain (usamaismail.co.uk)

Canonical URL for this site is `https://www.usamaismail.co.uk` (the `www` version — the apex
domain should redirect to it).

**In Vercel:** Project → Settings → Domains → add `www.usamaismail.co.uk` as the primary domain,
then add `usamaismail.co.uk` (apex) and set it to redirect to the `www` version. Vercel will show
you the exact DNS records it needs.

**In IONOS DNS management for usamaismail.co.uk**, add the records Vercel gives you — typically:

| Type | Host | Points to |
|---|---|---|
| CNAME | `www` | `cname.vercel-dns.com.` |
| A | `@` (apex) | `76.76.21.21` (Vercel's current apex IP — confirm the exact value shown in your Vercel dashboard, it can change) |

Remove any existing conflicting A/CNAME records for `@` and `www` first. DNS propagation can take
up to 24–48 hours, though it's usually much faster. Vercel automatically provisions and renews
the HTTPS certificate once DNS is verified — no manual certificate setup needed.

After DNS is live, confirm:

- `https://www.usamaismail.co.uk` loads with a valid padlock (HTTPS)
- `https://usamaismail.co.uk` (no www) redirects to the `www` version
- `http://` versions of both redirect to `https://`

## Validating SEO after launch

- Submit `https://www.usamaismail.co.uk/sitemap.xml` in Google Search Console (verify domain
  ownership via the IONOS DNS TXT record method).
- Spot-check `robots.txt` at `/robots.txt` — should allow all crawling and reference the sitemap.
- Run a few key pages through [Google's Rich Results Test](https://search.google.com/test/rich-results)
  to confirm the Person/WebSite/ProfilePage and BreadcrumbList structured data validate.
- Run Lighthouse (Chrome DevTools → Lighthouse, or `npx unlighthouse`) against the production URL
  and confirm Performance/Accessibility/Best Practices/SEO are all in the mid-90s or above.
- Check social sharing previews (e.g. paste the URL into a Slack message or use a tool like
  [opengraph.xyz](https://www.opengraph.xyz)) to confirm the generated OG image and metadata look right.

## What's deliberately left as a placeholder

- **LinkedIn / GitHub links** — shown as "coming soon" on the Contact page and omitted from the
  footer until real profile URLs are supplied. Add them in `data/site.ts` (`SITE.social`).
- **Project screenshots** — see "Replacing images" above.
- **Personal logo** — see "Replacing images" above.

These are intentional, clearly-labelled gaps rather than fabricated content — fill them in as the
real assets become available.
