import type { SkillGroup } from "@/types/content";

export const SKILLS: SkillGroup[] = [
  {
    id: "seo",
    label: "SEO",
    items: [
      "Technical SEO",
      "On-Page SEO",
      "Local SEO",
      "Keyword Research",
      "Competitor Analysis",
      "Site Audits",
      "Structured Data / Schema",
    ],
  },
  {
    id: "analytics-ads",
    label: "Analytics & Paid Media",
    items: [
      "Google Analytics 4",
      "Google Search Console",
      "Google Business Profile",
      "Google Ads",
      "Meta Ads",
      "Screaming Frog SEO Spider",
      "Semrush",
      "Ahrefs",
    ],
  },
  {
    id: "web-dev",
    label: "Website & Development",
    items: [
      "WordPress",
      "Elementor",
      "Rank Math SEO",
      "HTML",
      "CSS",
      "JavaScript",
      "Git & GitHub",
      "Visual Studio Code",
      "Vercel",
    ],
  },
  {
    id: "ai-workflow",
    label: "AI-Assisted Workflow",
    items: ["ChatGPT", "Claude AI", "Claude Code"],
  },
  {
    id: "creative-ops",
    label: "Creative & Ops",
    items: ["Canva", "Microsoft Excel", "Microsoft Office"],
  },
];
