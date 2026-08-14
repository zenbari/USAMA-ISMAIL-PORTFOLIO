"use client";

import { useEffect, useRef } from "react";

/**
 * A 2px accent line tracking document scroll — the one place in Phase 7
 * where "where am I" gets a literal answer, echoing the site's own thesis
 * (turning scroll position into a visible, ordered signal) without touching
 * the WebGL scene at all. Entirely self-contained: its own rAF-batched
 * scroll listener, no dependency on sceneStore/sceneController and no
 * import from components/scene — Phase 7 explicitly rules out touching the
 * scene architecture, and this doesn't need to.
 *
 * Left active under reduced motion deliberately: it's a direct, 1:1
 * reflection of current scroll position, the same class of "not decorative"
 * motion as the scene's own scroll-driven state — nothing here animates on
 * its own, it just tracks.
 */
export default function ScrollProgressIndicator() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const doc = document.documentElement;
    // scrollHeight/clientHeight are layout-dependent — reading them forces
    // a synchronous reflow, and window.scrollTo() invalidates that layout,
    // so re-reading them on every single scroll-driven rAF (as this
    // originally did) forced a fresh reflow every frame during active
    // scrolling — measured doubling the scene's frame time under a
    // continuous-scroll stress test. The document's total scrollable height
    // essentially never changes *during* a scroll gesture on this site (no
    // infinite loading, no dynamic content), so it only needs recomputing
    // on mount and on resize, never per scroll event.
    let max = doc.scrollHeight - doc.clientHeight;
    let ticking = false;

    function paint() {
      ticking = false;
      const bar = barRef.current;
      if (!bar) return;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    }

    function onResize() {
      max = doc.scrollHeight - doc.clientHeight;
      onScroll();
    }

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
