import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import RevealScope from "@/components/motion/RevealScope";
import { SITE } from "@/data/site";

export default function ContactCTA() {
  return (
    <section className="py-20">
      <Container>
        {/*
          Act 5 — Resolution: one calm, unstaggered fade for the whole card
          rather than the per-item stagger used earlier in the page. Nothing
          left to prioritise or diagnose here; the motion itself should read
          as settled, matching the camera easing back to centre and the
          particle field settling into the final Indexed Grid.
        */}
        <RevealScope>
          <div
            data-reveal
            className="flex flex-col items-start gap-6 rounded-lg border border-border bg-surface p-10 sm:p-14"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Let&rsquo;s talk
            </p>
            <h2 className="max-w-xl font-display text-display-2 text-fg">
              {SITE.availability}.
            </h2>
            <p className="max-w-xl text-body-lg text-fg-muted">
              Based in {SITE.location}. The fastest way to reach me is email — I reply within a
              couple of days.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">Get in touch</Button>
              <Button href="/cv/usama-ismail-cv.pdf" variant="secondary" external>
                Download CV
              </Button>
            </div>
          </div>
        </RevealScope>
      </Container>
    </section>
  );
}
