export default function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** "h1" on routes where this is the page's only top-level heading (/work, /about, /contact, /privacy); defaults to "h2" for its more common use as a secondary heading within a homepage act. */
  as?: "h1" | "h2";
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      )}
      <Heading className="font-display text-display-2 text-fg">{title}</Heading>
      {description && <p className="mt-4 text-body-lg text-fg-muted">{description}</p>}
    </div>
  );
}
