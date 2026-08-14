/**
 * Placeholder personal mark — an original typographic "UI" monogram.
 * Swap for a real logo file by replacing this component; see README "Replace the logo".
 */
export default function Wordmark({ size = 36 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-md border border-border-strong font-display italic text-accent transition-colors duration-[var(--motion-ui-hover)] group-hover:border-accent"
      style={{ width: size, height: size, fontSize: size * 0.46 }}
    >
      UI
    </span>
  );
}
