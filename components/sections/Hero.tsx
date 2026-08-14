import { MapPin, CircleCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SITE } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative pb-16 pt-16 sm:pb-20 sm:pt-24">
      {/*
        Safe zone: a soft radial clearing behind the hero text so the
        particle field reads as receding behind the words instead of
        competing with them for attention — spatial integration between the
        DOM and the scene (Phase 5 §4) done entirely in CSS. It costs
        nothing when the scene hasn't loaded (mobile, first paint, reduced
        motion): the gradient runs from the same flat --color-bg to
        transparent, so it's invisible against the SceneGate's identical
        base layer until particles are actually there to clear a path
        through.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(60% 60% at 28% 34%, var(--color-bg) 0%, transparent 72%)",
        }}
      />

      <Container>
        <p className="font-mono text-data-layer text-data-ink">{SITE.name}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          {SITE.role} — London
        </p>

        <h1 className="mt-5 max-w-3xl font-display text-display-1 text-fg">
          I audit websites like a consultant, then fix them like a developer.
        </h1>

        <p className="mt-6 max-w-2xl text-body-lg text-fg-muted">
          Digital Marketing &amp; Website Executive at Auto Boutique London and Digital
          Marketing Assistant at InsuranceClaim Help — working across technical SEO, paid
          media and hands-on website builds, backed by an MSc in Management with Digital
          Marketing.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/work">View selected work</Button>
          <Button href="/cv/usama-ismail-cv.pdf" variant="secondary" external>
            Download CV
          </Button>
        </div>

        <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-fg-muted">
          <div className="flex items-center gap-2">
            <MapPin size={16} aria-hidden="true" className="text-fg-subtle" />
            <dd>{SITE.location}</dd>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheck size={16} aria-hidden="true" className="text-fg-subtle" />
            <dd>{SITE.availability}</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
