import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import PlaceholderVisual from "@/components/ui/PlaceholderVisual";
import Tag from "@/components/ui/Tag";

export default function ProjectCard({
  project,
  headingLevel: Heading = "h3",
}: {
  project: Project;
  /** "h2" when this card is the first substantive heading after the page's own H1 (the /work index); defaults to "h3" for its more common use nested under a "Selected work" H2 on the homepage. */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-reveal
      className="group block rounded-lg border border-border bg-surface p-5 shadow-[0_0_0_rgba(0,0,0,0)] transition-[border-color,transform,box-shadow] duration-[var(--motion-ui-hover)] hover:border-accent hover:shadow-[0_12px_24px_-16px_rgba(0,0,0,0.35)] hover:transform-[translateY(-4px)] focus-visible:border-accent focus-visible:shadow-[0_12px_24px_-16px_rgba(0,0,0,0.35)] focus-visible:transform-[translateY(-4px)]"
    >
      <PlaceholderVisual
        label={project.placeholderLabel}
        className="transition-transform duration-300 group-hover:scale-[1.01] group-focus-visible:scale-[1.01]"
      />

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-accent">{project.category}</p>
          <Heading className="link-underline mt-1 font-display text-xl text-fg">{project.name}</Heading>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          size={20}
          className="mt-1 shrink-0 text-fg-subtle transition-all duration-[var(--motion-ui-hover)] group-hover:text-accent group-hover:transform-[translate(2px,-2px)] group-focus-visible:text-accent group-focus-visible:transform-[translate(2px,-2px)]"
        />
      </div>

      <p className="mt-3 text-sm text-fg-muted">{project.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </Link>
  );
}
