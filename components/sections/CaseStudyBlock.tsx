import { ReactNode } from "react";

export default function CaseStudyBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section data-reveal className="grid gap-4 border-t border-border py-10 sm:grid-cols-[14rem_1fr]">
      <h2 className="font-display text-lg text-fg">{title}</h2>
      <div className="max-w-2xl">{children}</div>
    </section>
  );
}
