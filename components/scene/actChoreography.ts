import { getActBounds } from "./actBounds";

/**
 * Maps global scroll progress (0..1) to a continuous morph-sequence
 * progress (0..3): 0–1 is morph 1 (Noise→Lattice), 1–2 is morph 2
 * (Lattice→Rank Order), 2–3 is morph 3 (Rank Order→Indexed Grid).
 *
 * A pure function of scrollProgress (and the current act bounds) — no
 * accumulated state, no timers, no memory of "which direction we were last
 * moving." That's what makes reverse-scrolling exact and deep links correct
 * immediately: the same scroll position always produces the same morph
 * progress, computed fresh, regardless of how it was reached.
 *
 * Bounds come from actBoundaryController's DOM measurement of the real Act
 * 1–5 sections (Phase 5) — Act 1 is pure Noise, Act 2 morphs Noise→Lattice,
 * Act 3 holds at Lattice (the calmest state, for the densest/quietest act —
 * Evidence), Act 4 morphs Lattice→Rank Order (literally "prioritise", the
 * act named Method), Act 5 morphs Rank Order→Indexed Grid and settles
 * (Resolution). See actBounds.ts for the fallback used before first measure.
 */
function remap01(value: number, inMin: number, inMax: number): number {
  if (inMax <= inMin) return value < inMin ? 0 : 1;
  return Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
}

export function scrollProgressToMorphProgress(scrollProgress: number): number {
  const p = Math.min(1, Math.max(0, scrollProgress));
  const { act1End, act2End, act3End, act4End, act5End } = getActBounds();

  if (p <= act1End) return 0;
  if (p <= act2End) return remap01(p, act1End, act2End);
  if (p <= act3End) return 1;
  if (p <= act4End) return 1 + remap01(p, act3End, act4End);
  return 2 + remap01(p, act4End, act5End);
}
