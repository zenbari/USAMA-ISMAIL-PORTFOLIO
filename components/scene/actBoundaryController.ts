import { setActBounds, type ActBounds } from "./actBounds";
import { wake } from "./ticker";

/**
 * Measures the real Act 1–5 sections (marked `data-act="1..5"` in
 * app/page.tsx) and converts each act's start position into a scrollProgress
 * fraction, so morph and camera choreography line up with actual content
 * layout instead of a guessed proportional split. Acts vary hugely in
 * height (Act 3 alone folds together three sections), so this isn't
 * cosmetic — without it the "hold" and "morph" bands would land on the
 * wrong content entirely.
 *
 * A plain DOM controller, not a React effect tied to render: matches every
 * other scene input (scroll, pointer) in being outside the render cycle, and
 * means a layout shift from font/content loading just re-measures rather
 * than needing a component to re-render.
 */
export function startActBoundaryTracking(): () => void {
  function measure() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    if (max <= 0) return;

    const sections = new Map<number, HTMLElement>();
    document.querySelectorAll<HTMLElement>("[data-act]").forEach((el) => {
      const act = Number(el.dataset.act);
      if (act >= 1 && act <= 5) sections.set(act, el);
    });

    // Need at least acts 2-5 to know where 1-4 end; act 1 always starts at 0.
    if (sections.size < 4) return;

    const fracFor = (act: number, fallback: number) => {
      const el = sections.get(act);
      if (!el) return fallback;
      return Math.min(1, Math.max(0, el.offsetTop / max));
    };

    const bounds: ActBounds = {
      act1End: fracFor(2, 0.15),
      act2End: fracFor(3, 0.35),
      act3End: fracFor(4, 0.55),
      act4End: fracFor(5, 0.75),
      act5End: 1,
    };

    setActBounds(bounds);
    wake();
  }

  measure();
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);

  // Catches layout shifts from RevealScope/font settling that don't fire a
  // resize event — cheap since it only reacts to actual size changes.
  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(document.body);

  return () => {
    window.removeEventListener("resize", measure);
    window.removeEventListener("load", measure);
    resizeObserver.disconnect();
  };
}
