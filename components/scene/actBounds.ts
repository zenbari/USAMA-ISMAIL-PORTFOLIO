export interface ActBounds {
  /** scrollProgress (0..1) at which Act 1 ends / Act 2 begins. */
  act1End: number;
  act2End: number;
  act3End: number;
  act4End: number;
  /** Always 1 — Act 5 runs to the end of the document. */
  act5End: number;
}

/**
 * Proportional fallback, used only until actBoundaryController measures the
 * real Act 1–5 sections (first paint, before layout is known, and the tiny
 * window on very old browsers without ResizeObserver). Same shape as the
 * placeholder constants actChoreography.ts used before real acts existed.
 */
const FALLBACK_BOUNDS: ActBounds = {
  act1End: 0.15,
  act2End: 0.35,
  act3End: 0.55,
  act4End: 0.75,
  act5End: 1,
};

let currentBounds: ActBounds = FALLBACK_BOUNDS;

export function getActBounds(): ActBounds {
  return currentBounds;
}

export function setActBounds(next: ActBounds): void {
  currentBounds = next;
}
