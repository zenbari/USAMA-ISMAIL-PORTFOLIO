import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/sections/ProjectCard";
import RevealScope from "@/components/motion/RevealScope";
import { getFeaturedProjects } from "@/data/projects";

export default function SelectedWork() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-20">
      <Container>
        <RevealScope>
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected work"
              title="Audits and builds, not adjectives"
              description="Three pieces of real, ongoing work — each with the findings, tools and decisions behind it."
            />
            <Button href="/work" variant="secondary">
              All work
            </Button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </RevealScope>
      </Container>
    </section>
  );
}
