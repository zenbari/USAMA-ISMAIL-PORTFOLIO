import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealScope from "@/components/motion/RevealScope";
import { SKILLS } from "@/data/skills";

export default function Capabilities() {
  return (
    <section className="py-20">
      <Container>
        <RevealScope>
          <div data-reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="Tools I actually use"
              description="Grouped by where they sit in the work — from diagnosing a site to shipping the fix."
            />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((group) => (
              <div
                key={group.id}
                data-reveal
                className="rounded-lg border border-border bg-surface p-6"
              >
                <h3 className="font-display text-lg text-fg">{group.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealScope>
      </Container>
    </section>
  );
}
