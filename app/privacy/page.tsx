import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE.name}'s website handles data and analytics.`,
  alternates: { canonical: `${SITE.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading as="h1" eyebrow="Privacy" title="Privacy notice" />

        <div className="mt-10 flex flex-col gap-6 text-sm text-fg-muted">
          <p>
            This site does not run any analytics or tracking scripts by default. If analytics
            (such as Google Analytics 4) is added in future, this notice will be updated to
            describe what is collected and why, and any tracking will only run after you&rsquo;ve
            been given the chance to consent where required.
          </p>
          <p>
            The contact form on this site does not submit data to a server. It opens your own
            email client with a pre-filled message, addressed to{" "}
            <a href={`mailto:${SITE.email}`} className="text-accent underline underline-offset-2">
              {SITE.email}
            </a>
            . Nothing you type is stored or transmitted by this website.
          </p>
          <p>
            If you have questions about this notice, contact{" "}
            <a href={`mailto:${SITE.email}`} className="text-accent underline underline-offset-2">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
