import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealScope from "@/components/motion/RevealScope";
import { EXPERIENCE } from "@/data/experience";

export default function ExperienceTimeline() {
  return (
    <section className="py-20">
      <Container>
        <RevealScope>
          <div data-reveal>
            <SectionHeading eyebrow="Experience" title="Where the work has happened" />
          </div>

          <div className="mt-12 flex flex-col divide-y divide-border border-t border-border">
          {EXPERIENCE.map((entry) => (
            <article key={entry.id} data-reveal className="grid gap-3 py-8 sm:grid-cols-[12rem_1fr]">
              <div>
                <p className="text-sm text-fg-subtle">{entry.period}</p>
                {entry.current && (
                  <span className="mt-2 inline-block rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent">
                    Current
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-display text-xl text-fg">{entry.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">{entry.organisation}</p>
                <p className="mt-3 max-w-2xl text-sm text-fg-muted">{entry.summary}</p>
                <ul className="mt-4 flex flex-col gap-1.5">
                  {entry.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-fg-muted">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                {entry.subNotes?.map((note) => (
                  <p key={note} className="mt-3 text-sm text-fg-subtle">
                    {note}
                  </p>
                ))}
              </div>
            </article>
          ))}
          </div>
        </RevealScope>
      </Container>
    </section>
  );
}
