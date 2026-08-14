import type { SiteConfig, NavItem } from "@/types/content";

export const SITE: SiteConfig = {
  name: "Usama Ismail",
  shortName: "Usama",
  role: "Digital Marketing & Technical SEO",
  url: "https://www.usamaismail.co.uk",
  defaultTitle: "Usama Ismail — Digital Marketing & Technical SEO, London",
  description:
    "London-based digital marketer combining technical SEO audits, on-page optimisation, paid media and hands-on website development. MSc Management with Digital Marketing.",
  location: "London, United Kingdom",
  email: "usama7612@outlook.com",
  availability: "Open to Digital Marketing, SEO and Growth Marketing roles",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/usama-malik-3b800227b" },
    { label: "GitHub", href: null, placeholder: true },
  ],
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/work" },
  { label: "Contact", href: "/contact" },
];
