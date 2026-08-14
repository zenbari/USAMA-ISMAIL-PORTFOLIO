import { FileSearch2 } from "lucide-react";

/**
 * Tasteful labelled placeholder for project imagery that doesn't exist yet
 * (no client screenshots supplied). Deliberately not a stock photo —
 * reads as a "spec sheet" panel consistent with the audit-report visual language.
 */
export default function PlaceholderVisual({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex aspect-[4/3] w-full items-end overflow-hidden rounded-lg border border-border bg-surface ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(242,240,236,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,236,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <FileSearch2
        aria-hidden="true"
        className="absolute right-5 top-5 text-fg-subtle"
        size={22}
      />
      <div className="w-full border-t border-border bg-bg/70 p-4 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.12em] text-fg-subtle">Visual placeholder</p>
        <p className="mt-1 text-sm text-fg-muted">{label}</p>
      </div>
    </div>
  );
}
