import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Fraunces } from "next/font/google";
import { SITE } from "@/data/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/motion/Loader";
import PageTransition from "@/components/motion/PageTransition";
import ScrollProgressIndicator from "@/components/motion/ScrollProgressIndicator";
import SceneGate from "@/components/scene/SceneGate";
import "./globals.css";

// Sets data-theme on <html> before first paint so there's no flash of the
// wrong theme. Kept tiny and inline (next/script beforeInteractive injects
// it into <head>, ahead of hydration) — see components/layout/ThemeToggle.tsx
// for the interactive counterpart, which reads/writes the same key.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme;
    if (stored === "light" || stored === "dark") {
      theme = stored;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      theme = "light";
    } else {
      theme = "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="text-fg font-sans">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>

        {/*
          Persistent scene shell (PHASE_2_DESIGN.md §8): mounted once, here,
          outside route content, so App Router navigation never remounts it.
          Fixed, z-0, behind everything below. See SceneGate.tsx for why the
          background colour and canvas are the same layer either way.
        */}
        <SceneGate />

        <div className="relative z-10 flex min-h-full flex-col">
          <Loader />
          <ScrollProgressIndicator />
          <a
            href="#main"
            className="skip-link rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
          >
            Skip to content
          </a>
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
