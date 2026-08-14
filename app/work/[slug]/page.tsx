import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import PlaceholderVisual from "@/components/ui/PlaceholderVisual";
import CaseStudyBlock from "@/components/sections/CaseStudyBlock";
import RevealScope from "@/components/motion/RevealScope";
import ProjectSceneActivator from "@/components/scene/ProjectSceneActivator";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { STATUS_LABELS } from "@/lib/statusLabels";
import { SITE } from "@/data/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `${SITE.url}/work/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { caseStudy } = project;
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const previous = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE.url}/work` },
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: `${SITE.url}/work/${project.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.name,
        description: project.summary,
        creator: { "@type": "Person", name: SITE.name },
      },
    ],
  };

  return (
    <div className="py-16 sm:py-20">
      <JsonLd data={jsonLd} />
      {/*
        Bridges this route to the persistent scene (Phase 6 §3/§10) — the
        canvas itself lives once in the root layout and never remounts;
        this leaf just tells it which project environment to blend toward
        while mounted, and clears that on unmount (back/forward navigation,
        or moving to another project, both run this correctly since it's a
        normal effect cleanup, not anything route-transition-specific).
      */}
      <ProjectSceneActivator slug={project.slug} />

      <Container>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-fg-subtle">
          <Link href="/" className="link-underline transition-colors hover:text-fg">
            Home
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/work" className="link-underline transition-colors hover:text-fg">
            Work
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="text-fg-muted">{project.name}</span>
        </nav>

        <header className="mt-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {project.category}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-display-2 text-fg">{project.name}</h1>
          <p className="mt-4 max-w-2xl text-body-lg text-fg-muted">{project.summary}</p>
        </header>

        <PlaceholderVisual label={project.placeholderLabel} className="mt-10 max-w-4xl" />

        <RevealScope>
          <CaseStudyBlock title="Context">
            <p className="text-sm text-fg-muted">{caseStudy.context}</p>
          </CaseStudyBlock>

          <CaseStudyBlock title="My role">
            <dl className="flex flex-col gap-2 text-sm text-fg-muted">
              <div className="flex gap-2">
                <dt className="text-fg-subtle">Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-fg-subtle">Period</dt>
                <dd>{project.period}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-fg-subtle">Category</dt>
                <dd>{project.category}</dd>
              </div>
            </dl>
          </CaseStudyBlock>

          <CaseStudyBlock title="Audit / diagnosis">
            {caseStudy.findings.length > 0 ? (
              <dl className="flex flex-col gap-4">
                {caseStudy.findings.map((f) => (
                  <div key={f.label}>
                    <dt className="text-sm font-medium text-fg">{f.label}</dt>
                    <dd className="mt-1 text-sm text-fg-muted">{f.detail}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-sm text-fg-muted">{caseStudy.diagnosisNote}</p>
            )}
          </CaseStudyBlock>

          <CaseStudyBlock title="Strategy">
            <p className="text-sm text-fg-muted">{caseStudy.objective}</p>
            {caseStudy.recommendations.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {caseStudy.recommendations.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-fg-muted">
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </CaseStudyBlock>

          <CaseStudyBlock title="Implementation">
            <ul className="flex flex-col gap-2">
              {caseStudy.implementation.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-fg-muted">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="SEO / marketing work">
            <ul className="flex flex-col gap-2">
              {caseStudy.marketingWork.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-fg-muted">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="Tools used">
            <ul className="flex flex-wrap gap-2">
              {caseStudy.toolsUsed.map((tool) => (
                <li key={tool}>
                  <Tag>{tool}</Tag>
                </li>
              ))}
            </ul>
            {caseStudy.skillsDemonstrated.length > 0 && (
              <>
                <p className="mt-5 text-xs uppercase tracking-[0.12em] text-fg-subtle">
                  Skills demonstrated
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {caseStudy.skillsDemonstrated.map((skill) => (
                    <li key={skill}>
                      <Tag>{skill}</Tag>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CaseStudyBlock>

          <CaseStudyBlock title="Media / gallery">
            <div className="grid gap-4 sm:grid-cols-2">
              {project.media.map((label) => (
                <PlaceholderVisual key={label} label={label} />
              ))}
            </div>
          </CaseStudyBlock>

          <CaseStudyBlock title="Outcome / work completed">
            <p className="inline-flex items-center rounded-full border border-accent/40 px-3 py-1 text-xs text-accent">
              {STATUS_LABELS[caseStudy.implementationStatus]}
            </p>
            <p className="mt-3 text-sm text-fg-muted">{caseStudy.implementationNote}</p>
          </CaseStudyBlock>

          <CaseStudyBlock title="Lessons learned">
            <ul className="flex flex-col gap-3">
              {caseStudy.lessonsLearned.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-fg-muted">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </CaseStudyBlock>
        </RevealScope>

        <div className="mt-16 flex flex-col gap-8 border-t border-border pt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/work/${previous.slug}`}
              className="group flex items-center gap-3 text-fg transition-colors duration-[var(--motion-ui-hover)] hover:text-accent focus-visible:text-accent"
            >
              <ChevronLeft
                size={18}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-[var(--motion-ui-hover)] group-hover:transform-[translateX(-4px)] group-focus-visible:transform-[translateX(-4px)]"
              />
              <span className="flex flex-col">
                <span className="text-sm text-fg-subtle">Previous project</span>
                <span className="link-underline font-display text-lg">{previous.name}</span>
              </span>
            </Link>
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-center gap-3 text-fg transition-colors duration-[var(--motion-ui-hover)] hover:text-accent focus-visible:text-accent sm:flex-row-reverse sm:text-right"
            >
              <ChevronRight
                size={18}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-[var(--motion-ui-hover)] group-hover:transform-[translateX(4px)] group-focus-visible:transform-[translateX(4px)]"
              />
              <span className="flex flex-col">
                <span className="text-sm text-fg-subtle">Next project</span>
                <span className="link-underline font-display text-lg">{next.name}</span>
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 border-t border-border pt-8">
            <Button href="/work" variant="secondary">
              All work
            </Button>
            <Button href="/contact">Discuss similar work</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
