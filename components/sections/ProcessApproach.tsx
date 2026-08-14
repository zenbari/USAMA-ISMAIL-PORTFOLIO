import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealScope from "@/components/motion/RevealScope";

const STEPS = [
  {
    step: "01",
    title: "Diagnose",
    detail:
      "Crawl and audit first — Screaming Frog, PageSpeed Insights, Ahrefs, Search Console — with every finding graded by how confident I am in it.",
  },
  {
    step: "02",
    title: "Prioritise",
    detail:
      "Turn findings into a 30/60/90-day plan, ordered by impact and effort, not by what's easiest to report.",
  },
  {
    step: "03",
    title: "Build or brief",
    detail:
      "Ship the fix directly when it's mine to build — WordPress, Elementor or hand-coded — or hand over a plan clear enough for someone else to.",
  },
  {
    step: "04",
    title: "Verify",
    detail:
      "Re-check against Search Console and Analytics rather than assuming the fix landed.",
  },
];

export default function ProcessApproach() {
  return (
    <section className="py-20">
      <Container>
        <RevealScope>
          <div data-reveal>
            <SectionHeading eyebrow="Approach" title="How I work" />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.step} data-reveal>
                <p className="font-display text-2xl text-accent">{s.step}</p>
                <h3 className="mt-3 font-display text-lg text-fg">{s.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{s.detail}</p>
              </div>
            ))}
          </div>
        </RevealScope>
      </Container>
    </section>
  );
}
