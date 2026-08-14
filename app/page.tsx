import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import Capabilities from "@/components/sections/Capabilities";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ProcessApproach from "@/components/sections/ProcessApproach";
import EducationCertifications from "@/components/sections/EducationCertifications";
import ContactCTA from "@/components/sections/ContactCTA";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: SITE.defaultTitle,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: SITE.name,
        url: SITE.url,
        jobTitle: SITE.role,
        email: `mailto:${SITE.email}`,
        address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
      },
      {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
      },
      {
        "@type": "ProfilePage",
        name: SITE.defaultTitle,
        url: SITE.url,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {/*
        Five narrative acts (Phase 5 — Storytelling Integration), each
        marked with a bare, unstyled data-act boundary that
        actBoundaryController measures to drive morph + camera choreography
        from real content layout rather than a guessed proportional split.
        No className on these wrappers deliberately — the boundaries stay
        structural/measurement-only, never a visual seam between acts.
          Act 1 Identity   — who this is, immediately legible
          Act 2 Diagnosis  — the toolkit used to find what's wrong
          Act 3 Evidence   — case studies, track record, credentials: the
                             densest act, held at rest (Lattice) rather than
                             mid-morph, so it reads as the quietest, not the
                             busiest
          Act 4 Method     — the four-step process, paired with the
                             Lattice→Rank Order morph ("Prioritise" made literal)
          Act 5 Resolution — a single calm contact card, camera and particle
                             field both settling by the end of the document
      */}
      <div data-act="1">
        <Hero />
      </div>
      <div data-act="2">
        <Capabilities />
      </div>
      <div data-act="3">
        <SelectedWork />
        <ExperienceTimeline />
        <EducationCertifications />
      </div>
      <div data-act="4">
        <ProcessApproach />
      </div>
      <div data-act="5">
        <ContactCTA />
      </div>
    </>
  );
}
