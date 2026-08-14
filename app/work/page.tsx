import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import RevealScope from "@/components/motion/RevealScope";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Audits, roadmaps and hand-built websites — the real digital marketing and SEO work behind the case studies.",
  alternates: { canonical: `${SITE.url}/work` },
};

export default function WorkIndexPage() {
  const featured = PROJECTS.filter((p) => p.featured);
  const supporting = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Work"
          title="Every project here is real"
          description="Client roles, self-initiated audits and a hand-built personal site — each page shows the scope, the findings and what's actually been implemented."
        />

        <RevealScope className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h2" />
          ))}
        </RevealScope>

        {supporting.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-headline text-fg">More work</h2>
            <RevealScope className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {supporting.map((project) => (
                <ProjectCard key={project.slug} project={project} headingLevel="h2" />
              ))}
            </RevealScope>
          </div>
        )}
      </Container>
    </div>
  );
}
