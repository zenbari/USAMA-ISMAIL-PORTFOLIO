import { GraduationCap, BadgeCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealScope from "@/components/motion/RevealScope";
import { EDUCATION, CERTIFICATIONS } from "@/data/experience";

export default function EducationCertifications() {
  return (
    <section className="py-20">
      <Container>
        <RevealScope>
          <div data-reveal>
            <SectionHeading eyebrow="Education & certifications" title="Grounded in formal study" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div data-reveal>
            <h3 className="flex items-center gap-2 font-display text-lg text-fg">
              <GraduationCap size={18} aria-hidden="true" className="text-accent" />
              Education
            </h3>
            <ul className="mt-4 flex flex-col gap-4">
              {EDUCATION.map((e) => (
                <li key={e.id} className="rounded-lg border border-border bg-surface p-5">
                  <p className="font-display text-base text-fg">{e.qualification}</p>
                  <p className="mt-1 text-sm text-fg-muted">
                    {e.institution} · {e.location}
                  </p>
                  <p className="mt-1 text-sm text-fg-subtle">{e.period}</p>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="flex items-center gap-2 font-display text-lg text-fg">
              <BadgeCheck size={18} aria-hidden="true" className="text-accent" />
              Certifications
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {CERTIFICATIONS.map((c) => (
                <li key={c.id} className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-sm text-fg">{c.name}</p>
                  <p className="mt-1 text-xs text-fg-subtle">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </RevealScope>
      </Container>
    </section>
  );
}
