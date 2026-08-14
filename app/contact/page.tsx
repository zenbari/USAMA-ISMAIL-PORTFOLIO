import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/sections/ContactForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name} — ${SITE.availability.toLowerCase()}.`,
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Get in touch"
          description={`${SITE.availability}. The fastest way to reach me is email.`}
        />

        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface p-5 text-fg transition-colors hover:border-accent"
            >
              <Mail size={18} aria-hidden="true" className="text-accent" />
              {SITE.email}
            </a>

            <div className="flex items-center gap-3 text-sm text-fg-muted">
              <MapPin size={18} aria-hidden="true" className="text-fg-subtle" />
              {SITE.location}
            </div>

            <div className="flex flex-wrap gap-3">
              {SITE.social.map((s) =>
                s.href ? (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline rounded-full border border-border px-3 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
                  >
                    {s.label}
                  </a>
                ) : (
                  <span
                    key={s.label}
                    className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-fg-subtle"
                    title="Link to be added"
                  >
                    {s.label} — coming soon
                  </span>
                )
              )}
            </div>

            <Button href="/cv/usama-ismail-cv.pdf" variant="secondary" external className="w-fit">
              Download CV
            </Button>
          </div>

          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
