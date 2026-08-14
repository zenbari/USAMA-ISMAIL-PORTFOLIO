export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  label: string;
  href: string | null;
  placeholder?: boolean;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  url: string;
  defaultTitle: string;
  description: string;
  location: string;
  email: string;
  availability: string;
  social: SocialLink[];
}

export interface ExperienceEntry {
  id: string;
  title: string;
  organisation: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
  subNotes?: string[];
}

export interface EducationEntry {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  location: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export type ImplementationStatus =
  | "ongoing-role"
  | "roadmap-delivered"
  | "planning-only"
  | "self-directed-build"
  | "past-role";

export interface Finding {
  label: string;
  detail: string;
}

export interface CaseStudy {
  context: string;
  /** Strategic aim — paired with `recommendations` in the "Strategy" section. */
  objective: string;
  /** "Strategy" section bullets. Can be empty for roles where recommendations sat with a senior team. */
  recommendations: string[];
  /** "Audit / diagnosis" section. */
  findings: Finding[];
  /**
   * Fallback prose for "Audit / diagnosis" when `findings` is empty (no
   * formal audit was owned by this role) — required whenever findings is
   * empty, so the section always has real content, never an empty heading.
   */
  diagnosisNote?: string;
  /** "Implementation" section — the mechanics/process of the work. */
  implementation: string[];
  /** "SEO / marketing work" section — the marketing-specific deliverables, distinct from implementation process. */
  marketingWork: string[];
  implementationStatus: ImplementationStatus;
  /** Used in "Outcome / work completed". */
  implementationNote: string;
  /** "Lessons learned" section — genuine reflections, never invented results. */
  lessonsLearned: string[];
  toolsUsed: string[];
  skillsDemonstrated: string[];
}

export type ProjectTier = "full" | "short";

export interface Project {
  slug: string;
  name: string;
  category: string;
  role: string;
  period: string;
  featured: boolean;
  /** Drives which template depth renders — both use the same component and section order. */
  tier: ProjectTier;
  summary: string;
  tags: string[];
  /** Single image used on project cards (work index, homepage). */
  placeholderLabel: string;
  /** One or more labelled placeholder tiles for the detail page's "Media/gallery" section. */
  media: string[];
  caseStudy: CaseStudy;
}
