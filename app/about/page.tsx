import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import RevealScope from "@/components/motion/RevealScope";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Usama Ismail — London-based digital marketer with an MSc in Management with Digital Marketing, working across technical SEO, paid media and website development.",
  alternates: { canonical: `${SITE.url}/about` },
};

const LANGUAGES = ["English", "Urdu", "Hindi", "Punjabi"];

const CURRENTLY_LEARNING = [
  "Technical SEO",
  "Google Ads",
  "Performance Marketing",
  "Marketing Analytics",
  "AI for Marketing",
  "Website Performance Optimisation",
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading as="h1" eyebrow="About" title="Marketing that starts with evidence" />

        <RevealScope className="mt-12 grid gap-16 lg:grid-cols-[1fr_18rem]">
          <div data-reveal className="flex max-w-2xl flex-col gap-6 text-body-lg text-fg-muted">
            <p>
              I&rsquo;m a London-based digital marketer with an MSc in Management with Digital
              Marketing from BPP University. My work sits at the intersection of technical
              SEO, paid media and website development — I&rsquo;m as comfortable running a
              Screaming Frog crawl and reading a PageSpeed report as I am briefing a Google Ads
              campaign or shipping a fix in WordPress.
            </p>
            <p>
              Before moving into digital marketing full-time, I spent two years as a Passenger
              Service Agent at Heathrow Airport, supporting Emirates operations for Dnata UK
              Ltd. It&rsquo;s an unusual route into marketing, but it&rsquo;s where the
              attention to detail, calm under pressure and clear communication that now shows
              up in my audits and client work actually came from.
            </p>
            <p>
              Alongside client work, I build things of my own — Zenbari is a digital marketing
              agency concept I designed and hand-coded from scratch, and I regularly run
              independent SEO audits on real businesses to keep my technical skills sharp
              between paid engagements.
            </p>
          </div>

          <aside data-reveal className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-base text-fg">Languages</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <li
                    key={l}
                    className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-base text-fg">Currently developing</h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                {CURRENTLY_LEARNING.map((item) => (
                  <li key={item} className="text-sm text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button href="/work" variant="secondary" className="justify-center">
                View my work
              </Button>
              <Button href="/cv/usama-ismail-cv.pdf" external className="justify-center">
                Download CV
              </Button>
            </div>
          </aside>
        </RevealScope>
      </Container>
    </div>
  );
}
