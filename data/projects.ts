import type { Project } from "@/types/content";

export const PROJECTS: Project[] = [
  {
    slug: "auto-boutique-london",
    name: "Auto Boutique London",
    category: "Digital Marketing & Website Executive",
    role: "Digital Marketing & Website Executive",
    period: "2026 — Present",
    featured: true,
    tier: "full",
    summary:
      "Paid media, local SEO and website management for a premium London vehicle storage specialist — plus a full technical SEO audit and a redesigned booking flow.",
    tags: ["Technical SEO", "Google Ads", "Meta Ads", "Local SEO", "WordPress / Elementor"],
    placeholderLabel: "Auto Boutique London — SEO Audit & Booking Flow",
    media: [
      "Auto Boutique London — homepage audit annotations",
      "Auto Boutique London — location page findings",
      "Auto Boutique London — booking flow concept",
    ],
    caseStudy: {
      context:
        "Auto Boutique London offers secure, climate-controlled storage, valeting and paint correction for luxury, classic and electric vehicles in London. The site runs on WordPress, Elementor and Rank Math SEO.",
      objective:
        "Manage day-to-day paid media and local SEO while identifying and resolving the structural SEO issues holding back organic visibility.",
      recommendations: [
        "Consolidate cannibalising pages and redirect duplicate blog posts",
        "Remove or noindex the sample page and utility/operational pages",
        "Expand thin location pages and resolve the duplicate Bayswater page",
        "Settle on one consistent experience claim across the site",
        "Confirm mobile speed against field data before scoping a fix",
        "Add Telephone, Address, PriceRange, FAQ and Service structured data",
      ],
      findings: [
        {
          label: "Keyword cannibalisation",
          detail:
            "The homepage and two location pages — plus roughly 15 near-duplicate blog posts — were competing for the same 'car storage London' term.",
        },
        {
          label: "Indexation debt",
          detail:
            "The default WordPress sample page and internal operational/contract forms were live and indexed by Google.",
        },
        {
          label: "Thin location content",
          detail:
            "Several location pages carried under 200 words, including a duplicated Bayswater page.",
        },
        {
          label: "Conflicting trust claims",
          detail:
            "The homepage stated 'over a decade of expertise' while the location template read '30 years' experience' — flagged for consistency and E-E-A-T.",
        },
        {
          label: "Mobile performance",
          detail:
            "A lab-tested mobile LCP of 17.6s was reported and flagged for confirmation against real-user field data before scoping a fix.",
        },
      ],
      implementation: [
        "Manage and update the WordPress/Elementor website",
        "Full technical, on-page and off-page SEO audit using Screaming Frog, Ahrefs, PageSpeed Insights and Google's Rich Results Test",
        "An independent second-opinion review reconciling findings against a prior audit, using explicit confidence grading (confirmed / strong / possible / not yet verified)",
        "A UX concept for a new multi-step booking flow (site visit, drop-off, collection, consultation)",
      ],
      marketingWork: [
        "Lead Google Ads and Meta Ads campaigns",
        "Local SEO strategy and Google Business Profile management for the London market",
      ],
      implementationStatus: "planning-only",
      implementationNote:
        "Investigation and planning stage — no live site, WordPress, Elementor, Rank Math or redirect changes have been made. The audit and booking-flow concept are agreed deliverables awaiting rollout.",
      lessonsLearned: [
        "Running a second-opinion audit against an existing report was as much about calibrating confidence levels as finding new issues — some findings from the earlier audit didn't hold up without field data, which shaped the confirmed/strong/possible/not-yet-verified grading used throughout.",
        "Small inconsistencies — like two different experience claims on the same site — are easy to miss internally but stand out immediately to an outside auditor; they're now one of the first things checked.",
        "A lab-only 17.6s mobile LCP figure is a starting point, not a verdict — it's been flagged for confirmation against real-user field data before any fix is scoped, rather than acted on directly.",
      ],
      toolsUsed: [
        "Screaming Frog SEO Spider",
        "Ahrefs",
        "Google PageSpeed Insights",
        "Google Rich Results Test",
        "Semrush Site Audit",
        "Google Search Console",
        "WordPress",
        "Elementor",
        "Rank Math SEO",
      ],
      skillsDemonstrated: [
        "Technical SEO auditing",
        "Evidence-graded reporting",
        "Local SEO & Google Business Profile management",
        "Paid media management (Google & Meta Ads)",
        "Booking-flow UX design",
        "Stakeholder-ready reporting",
      ],
    },
  },
  {
    slug: "insurance-claim-help",
    name: "InsuranceClaim Help",
    category: "Digital Marketing Assistant",
    role: "Digital Marketing Assistant",
    period: "2026 — Present",
    featured: true,
    tier: "short",
    summary:
      "SEO strategy and a full technical SEO audit for an AI-powered insurance claims platform, with a 30/60/90-day improvement roadmap.",
    tags: ["Technical SEO", "On-Page SEO", "Security Headers", "E-E-A-T", "Roadmap Planning"],
    placeholderLabel: "InsuranceClaim Help — SEO Audit & Roadmap",
    media: ["InsuranceClaim Help — audit summary", "InsuranceClaim Help — roadmap overview"],
    caseStudy: {
      context:
        "InsuranceClaim Help is an AI-powered platform helping UK homeowners and businesses manage insurance claims — fire, flood, storm, subsidence, theft and commercial property.",
      objective:
        "Provide SEO strategy and campaign support alongside the wider website/product team, anchored by a clear, evidence-based improvement roadmap.",
      recommendations: [
        "Optimise titles, meta descriptions and heading structure",
        "Expand low-content pages and resolve image ALT text / dimension gaps",
        "Implement the missing security headers",
        "Build E-E-A-T signals — author profiles, accreditations, case studies",
        "Pursue relevant backlink opportunities against 20 target keywords",
      ],
      findings: [
        {
          label: "Strong technical baseline",
          detail:
            "100/94/100/100 desktop PageSpeed scores and a clean crawl — 0 errors across 108 URLs — with schema markup validating cleanly.",
        },
        {
          label: "Metadata and heading gaps",
          detail:
            "24 of 30 page titles ran over the recommended length; 9 pages were missing H2s and 12 had duplicate H2s.",
        },
        {
          label: "Security headers missing",
          detail:
            "Grade F on SecurityHeaders.com — HSTS, CSP, X-Frame-Options and four further headers were absent.",
        },
        {
          label: "Thin backlink authority",
          detail: "Ahrefs showed a Domain Rating of 1.5, with only 1% of backlinks dofollow.",
        },
      ],
      implementation: [
        "Website optimisation support for the platform",
        "Full technical, on-page and off-page SEO audit using Screaming Frog, PageSpeed Insights, SecurityHeaders.com, the Schema.org Validator and Ahrefs",
      ],
      marketingWork: ["SEO strategy and campaign support alongside the wider website/product team"],
      implementationStatus: "roadmap-delivered",
      implementationNote:
        "Delivered as a 30/60/90-day recommendations roadmap; rollout is ongoing as part of the role.",
      lessonsLearned: [
        "A technically strong site (100/94/100/100 PageSpeed, clean crawl) can still fail on security and authority signals that don't show up in a speed test — the SecurityHeaders.com F grade was the clearest reminder that a technical audit needs more than one tool.",
        "Duplicate and missing headings were common even on a well-built site, which reinforced treating heading-structure checks as a standard, non-optional part of every audit rather than something to spot-check.",
        "A 1.5 Domain Rating with mostly nofollow backlinks meant prioritising E-E-A-T and authority-building work ahead of on-page tweaks in the roadmap, since on-page fixes alone wouldn't move the needle without it.",
      ],
      toolsUsed: [
        "Screaming Frog SEO Spider",
        "Google PageSpeed Insights",
        "SecurityHeaders.com",
        "Schema.org Validator",
        "Ahrefs",
      ],
      skillsDemonstrated: [
        "Technical SEO auditing",
        "Security-aware SEO",
        "E-E-A-T strategy",
        "Roadmap planning and prioritisation",
      ],
    },
  },
  {
    slug: "zenbari",
    name: "Zenbari",
    category: "Personal Project",
    role: "Founder, Designer & Developer",
    period: "2026 — Ongoing",
    featured: true,
    tier: "full",
    summary:
      "A self-initiated digital marketing agency concept, hand-built from scratch — brand, content and a fast, framework-free front end with on-site technical SEO baked in.",
    tags: ["HTML/CSS/JS", "GSAP", "Technical SEO", "Brand Positioning", "Vercel"],
    placeholderLabel: "Zenbari — Hand-Built Agency Website",
    media: [
      "Zenbari — homepage",
      "Zenbari — service page architecture",
      "Zenbari — Git commit history",
    ],
    caseStudy: {
      context:
        "Zenbari is a self-initiated digital marketing agency concept and website — built to prove out brand positioning, front-end build skill and on-site technical SEO, deliberately without a CMS or framework.",
      objective:
        "Design, build and ship a fast, hand-coded marketing site end-to-end: brand, content, front end and technical SEO foundations.",
      recommendations: [],
      findings: [],
      diagnosisNote:
        "No client audit here by design — Zenbari is a self-directed build, not an engagement with an existing site to diagnose. The nearest equivalent was self-review: a dedicated pass through the homepage copy specifically to remove claims that couldn't be backed up.",
      implementation: [
        "Website planning and information architecture across home, about, service and contact pages",
        "Hand-written HTML, CSS and JavaScript — no framework, by design",
        "Front-end interaction and motion built with GSAP",
        "Iterative build managed through Git — 44 commits over roughly nine weeks, including a dedicated pass to remove unverified claims from the homepage copy",
      ],
      marketingWork: [
        "Brand positioning and content for each service page (SEO, Google Ads, Meta Ads, content marketing, website development, AI search optimisation)",
        "Technical SEO foundations: robots.txt, sitemap.xml, schema markup, favicon",
      ],
      implementationStatus: "self-directed-build",
      implementationNote: "Live, self-directed personal build — not a client engagement.",
      lessonsLearned: [
        "Building without a framework or CMS made every technical SEO decision (sitemap, schema, robots.txt) a deliberate one rather than something a platform handled by default — useful for understanding what those defaults are actually doing elsewhere.",
        "A dedicated pass to remove unverified claims from the homepage copy was its own lesson: it's easy to write confident-sounding marketing copy, harder to only claim what's actually demonstrable.",
        "44 commits over roughly nine weeks made it obvious in hindsight which decisions (information architecture, brand positioning) needed more time upfront, and which (individual page copy) were fine to iterate on live.",
      ],
      toolsUsed: [
        "HTML",
        "CSS",
        "JavaScript",
        "GSAP",
        "Git & GitHub",
        "Visual Studio Code",
        "Vercel",
        "Claude AI / Claude Code",
      ],
      skillsDemonstrated: [
        "Front-end development",
        "On-site technical SEO implementation",
        "Brand positioning and content strategy",
        "Iterative, version-controlled delivery",
        "AI-assisted development workflow",
      ],
    },
  },
  {
    slug: "rankrazz",
    name: "Rankrazz",
    category: "Digital Marketing Internship",
    role: "Digital Marketing Intern",
    period: "Internship",
    featured: false,
    tier: "short",
    summary:
      "Digital Marketing Intern supporting SEO, keyword research and content work for Rankrazz and its external clients, including Balz Unisex Salon and Akestatica.",
    tags: ["SEO", "Keyword Research", "Content Optimisation", "Local SEO"],
    placeholderLabel: "Rankrazz — Digital Marketing Internship",
    media: ["Rankrazz — internship overview"],
    caseStudy: {
      context:
        "Rankrazz is a digital marketing agency where this role was an internship, supporting SEO and content work both for the agency and for external client sites, including Balz Unisex Salon and Akestatica.",
      objective:
        "Support the senior team's SEO and content work across multiple client accounts, building foundational audit and optimisation skills under supervision.",
      recommendations: [],
      findings: [],
      diagnosisNote:
        "Diagnostic work here was research-led rather than a formal, independently-owned technical audit: keyword research and competitor research fed into the agency's broader SEO recommendations for client sites, with findings and final calls sitting with the senior team.",
      implementation: [
        "Assisted with SEO optimisation and keyword research",
        "Supported competitor research",
        "Keyword research, meta titles/descriptions and image ALT text work for client sites including Balz Unisex Salon and Akestatica",
        "Local SEO support for client accounts",
      ],
      marketingWork: [
        "Assisted with digital marketing and social media activity",
        "Supported website content optimisation for external client sites",
      ],
      implementationStatus: "past-role",
      implementationNote:
        "A time-boxed internship — the SEO and content work described here was completed as part of that internship and is not an ongoing engagement.",
      lessonsLearned: [
        "Supporting SEO across multiple external client sites at once — rather than owning one site end-to-end — was a useful early lesson in prioritisation: keyword research for one client couldn't come at the cost of meta and ALT text work owed to another.",
        "Working under a senior team on live client sites was a different discipline to self-directed audit work — findings and recommendations had to be handed off clearly enough for someone else to action, not just documented for personal reference.",
      ],
      toolsUsed: [
        "Keyword research",
        "Competitor research",
        "On-page metadata optimisation",
        "Image ALT text auditing",
        "Local SEO support",
        "Social media content support",
      ],
      skillsDemonstrated: [
        "SEO fundamentals",
        "Keyword & competitor research",
        "On-page optimisation",
        "Client-facing content support",
        "Working within a senior team",
      ],
    },
  },
  {
    slug: "london-electric-centre",
    name: "London Electric Centre",
    category: "SEO Audit — Independent Project",
    role: "SEO Auditor",
    period: "2026",
    featured: false,
    tier: "short",
    summary:
      "An independent, self-initiated technical and competitive SEO audit for an EV charging and hire specialist — 500 crawled resources and a full 30/60/90-day roadmap.",
    tags: ["Technical SEO", "Competitor Analysis", "Site Audit"],
    placeholderLabel: "London Electric Centre — Independent SEO Audit",
    media: ["London Electric Centre — crawl summary", "London Electric Centre — roadmap"],
    caseStudy: {
      context:
        "London Electric Centre offers EV hire, servicing and home/commercial EV charging installation in London. This audit was a self-initiated practice project, independent of any employer.",
      objective:
        "Produce a full technical, on-page and competitive SEO audit to the same standard used in client work.",
      recommendations: [
        "Resolve missing/duplicate titles and meta descriptions at scale",
        "Add missing H1s and fix heading structure",
        "Implement missing security headers",
        "Prioritise content around the highest-opportunity keyword clusters identified via Google Trends",
      ],
      findings: [
        {
          label: "On-page gaps at scale",
          detail:
            "Across 176 crawled HTML pages: 107 missing H1s, 48 duplicate title tags, 119 pages missing meta descriptions.",
        },
        {
          label: "Security headers missing",
          detail: "Grade D on SecurityHeaders.com — six headers absent, including HSTS and CSP.",
        },
        {
          label: "Backlink profile",
          detail: "Ahrefs showed Domain Rating 15, with 19% of backlinks dofollow.",
        },
      ],
      implementation: [
        "Technical SEO crawl and audit using Screaming Frog, PageSpeed Insights, SecurityHeaders.com and Google's Rich Results Test",
      ],
      marketingWork: ["Competitor and keyword-intent analysis using Ahrefs and Google Trends"],
      implementationStatus: "planning-only",
      implementationNote:
        "Independent audit and roadmap — a self-directed practice project, not a paid or implemented engagement.",
      lessonsLearned: [
        "Auditing 176 pages independently, without a client relationship to ask clarifying questions of, meant being conservative about severity — flagging what the data actually showed (107 missing H1s, 48 duplicate titles) rather than assuming intent behind them.",
        "A Domain Rating of 15 with only 19% dofollow backlinks was a reminder that on-page and technical fixes are necessary but not sufficient on their own — the roadmap had to sequence authority-building work rather than treat it as an afterthought.",
      ],
      toolsUsed: [
        "Screaming Frog SEO Spider",
        "Google PageSpeed Insights",
        "SecurityHeaders.com",
        "Google Rich Results Test",
        "Ahrefs",
        "Google Trends",
      ],
      skillsDemonstrated: [
        "Large-scale technical SEO auditing",
        "Competitor and keyword-intent research",
        "Structured, roadmap-driven reporting",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}
