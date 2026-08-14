import { sceneState } from "./sceneStore";
import { wake } from "./ticker";

/**
 * Tracks normalised document scroll into sceneState. Functional and
 * verified, but not yet driving any visible camera/particle effect — that's
 * scroll-linked choreography, reserved for when real narrative acts exist
 * to declare their own scroll ranges against it (PHASE_2_DESIGN.md §8).
 */
export function startScrollProgressTracking(): () => void {
  function update() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    sceneState.scrollProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    wake();
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}
