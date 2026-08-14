import { sceneState } from "./sceneStore";
import { wake } from "./ticker";

/**
 * Fine-pointer only (mirrors the pattern already used for the desktop nav
 * dropdown's hover behaviour in NavLink.tsx) — a touchscreen laptop that
 * happens to pass the ≥1024px/WebGL2 gate in SceneGate still shouldn't get
 * phantom parallax from touch scrolling.
 */
export function startPointerTracking(): () => void {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return () => {};
  }

  function handleMove(e: PointerEvent) {
    sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    sceneState.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    wake();
  }

  function handleLeave() {
    sceneState.pointer.x = 0;
    sceneState.pointer.y = 0;
    wake();
  }

  window.addEventListener("pointermove", handleMove, { passive: true });
  window.addEventListener("pointerleave", handleLeave);

  return () => {
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerleave", handleLeave);
  };
}
