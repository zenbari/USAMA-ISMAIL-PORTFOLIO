import Container from "@/components/ui/Container";

/**
 * Automatic Suspense fallback for this route segment (Next.js loading.js
 * convention) — shown only while the route is actually resolving, which on
 * this SSG route is rarely long enough to see. Shaped like the real page
 * (breadcrumb, title block, media, a couple of content rows) rather than a
 * generic spinner, so on a slow connection the layout doesn't jump once the
 * real content arrives, and aria-hidden since it's purely decorative — a
 * screen reader has nothing meaningful to read from a shape.
 */
export default function Loading() {
  return (
    <div className="py-16 sm:py-20" aria-hidden="true">
      <Container>
        <div className="skeleton-pulse flex items-center gap-1.5">
          <div className="h-4 w-10 rounded bg-surface" />
          <div className="h-4 w-4 rounded bg-surface" />
          <div className="h-4 w-12 rounded bg-surface" />
        </div>

        <div className="skeleton-pulse mt-6 flex flex-col gap-3">
          <div className="h-3 w-40 rounded-full bg-surface" />
          <div className="h-10 w-2/3 max-w-xl rounded-lg bg-surface" />
          <div className="mt-2 h-4 w-full max-w-2xl rounded bg-surface" />
          <div className="h-4 w-3/4 max-w-xl rounded bg-surface" />
        </div>

        <div className="skeleton-pulse mt-10 aspect-[4/3] w-full max-w-4xl rounded-lg bg-surface" />

        <div className="mt-10 flex flex-col gap-6 border-t border-border pt-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton-pulse grid gap-4 sm:grid-cols-[14rem_1fr]">
              <div className="h-4 w-24 rounded bg-surface" />
              <div className="h-4 w-full max-w-md rounded bg-surface" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
