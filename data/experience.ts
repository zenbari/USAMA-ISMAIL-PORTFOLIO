import type { ExperienceEntry, EducationEntry, Certification } from "@/types/content";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "auto-boutique-london",
    title: "Digital Marketing & Website Executive",
    organisation: "Auto Boutique London",
    period: "2026 — Present",
    current: true,
    summary:
      "Lead Google & Meta campaigns and manage the company website for a premium London vehicle storage specialist, with a focus on local SEO and Google Business Profile.",
    highlights: [
      "Lead Google Ads and Meta Ads campaigns",
      "Manage and update the WordPress/Elementor website",
      "Local SEO strategy and Google Business Profile management for the London market",
      "Produced a full technical SEO audit and an independent second-opinion review",
    ],
  },
  {
    id: "insurance-claim-help",
    title: "Digital Marketing Assistant",
    organisation: "InsuranceClaim Help",
    period: "2026 — Present",
    current: true,
    summary:
      "SEO strategy, website optimisation and campaign support for an AI-powered insurance claims platform.",
    highlights: [
      "SEO strategy and on-site optimisation support",
      "Campaign support alongside the wider website/product team",
      "Produced a full technical, on-page and off-page SEO audit with a 30/60/90-day roadmap",
    ],
  },
  {
    id: "rankrazz",
    title: "Digital Marketing Intern",
    organisation: "Rankrazz",
    period: "Internship",
    current: false,
    summary:
      "Assisted with SEO, keyword research and content and social media activity, including supporting SEO for external client sites.",
    highlights: [
      "Assisted with SEO optimisation and keyword research",
      "Supported website content optimisation and competitor research",
      "Assisted with digital marketing and social media activity",
    ],
    subNotes: [
      "Supported client SEO and website optimisation work, including Balz Unisex Salon and Akestatica — keyword research, meta titles/descriptions, image ALT text, and Local SEO support.",
    ],
  },
  {
    id: "passenger-service-agent",
    title: "Passenger Service Agent",
    organisation: "Dnata UK Ltd (formerly Menzies Aviation) — Emirates Operations, Heathrow Airport",
    period: "Prior role",
    current: false,
    summary:
      "Professional customer service supporting international airline operations at one of the world's busiest airports — the operational foundation behind the communication, adaptability and attention to detail carried into digital marketing work.",
    highlights: [
      "Assisted passengers during check-in, boarding and documentation",
      "Resolved passenger enquiries efficiently under time pressure",
      "Collaborated across multicultural operational teams",
    ],
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    id: "msc-digital-marketing",
    qualification: "MSc Management with Digital Marketing",
    institution: "BPP University",
    period: "2024 — 2025",
    location: "London, United Kingdom",
  },
];

export const CERTIFICATIONS: Certification[] = [
  { id: "google-ads-search", name: "Ads Search Certification", issuer: "Google" },
  { id: "google-ga4", name: "Analytics 4 (GA4) Certification", issuer: "Google" },
  { id: "hubspot-digital-marketing", name: "Digital Marketing Certification", issuer: "HubSpot Academy" },
  { id: "hubspot-seo", name: "SEO Certification", issuer: "HubSpot Academy" },
  { id: "meta-associate", name: "Certified Digital Marketing Associate", issuer: "Meta Blueprint" },
  { id: "meta-media-buying", name: "Media Buying Professional", issuer: "Meta Blueprint" },
];
