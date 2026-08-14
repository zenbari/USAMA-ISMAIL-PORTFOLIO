export interface ProjectSceneConfig {
  /** Degrees, applied to the current theme's particle hue — small and restrained, never a hard-coded colour, so it stays theme-coherent in both light and dark. */
  hueShift: number;
  /** -1..1, applied to lightness. */
  lightnessShift: number;
  /** Point size, same units as the homepage's uSize (0.09 baseline). */
  size: number;
  /** Fragment alpha ceiling, same units as the homepage's uOpacity (0.5 baseline). */
  opacity: number;
  /** World-unit offset from BASE_CAMERA_Z, same scale as the homepage's cameraChoreography keyframes. */
  cameraOffset: { x: number; y: number; z: number };
}

/**
 * One entry per project slug — this is the entire "different visual
 * environment per project" mechanism (Phase 6 §4). Deliberately small,
 * restrained deltas on the *existing* engine (palette, camera, density),
 * not new morph targets or effects: the brief is explicit that entering a
 * project should feel like a different environment, not a different demo.
 *
 * All five projects hold the particle field at the Indexed Grid state
 * (morph progress 3 — see sceneController's PROJECT_MORPH_HOLD) rather than
 * varying which of the four homepage states shows: a project page *is* an
 * indexed entry, so every project arrives already "resolved" — the thing
 * that changes between them is the light falling on it (palette), the
 * framing (camera) and how densely it reads (size/opacity), not its shape.
 */
export const PROJECT_SCENES: Record<string, ProjectSceneConfig> = {
  "auto-boutique-london": {
    // Automotive, structural audit, still in planning — a touch cooler and
    // sparser, pulled back slightly: an examined subject, not yet resolved.
    hueShift: -6,
    lightnessShift: -0.02,
    size: 0.085,
    opacity: 0.45,
    cameraOffset: { x: 0.1, y: -0.03, z: 0.2 },
  },
  "insurance-claim-help": {
    // Systematic, roadmap-driven, security-conscious — the coolest, most
    // sparse field of the five: procedural rather than expressive.
    hueShift: -10,
    lightnessShift: 0,
    size: 0.08,
    opacity: 0.4,
    cameraOffset: { x: -0.08, y: 0.04, z: 0.1 },
  },
  zenbari: {
    // Personal, hand-built end-to-end — the warmest and densest: the most
    // "lived in" of the five, and the only camera push-in rather than pull-back.
    hueShift: 8,
    lightnessShift: 0.03,
    size: 0.1,
    opacity: 0.55,
    cameraOffset: { x: 0, y: 0.05, z: -0.3 },
  },
  rankrazz: {
    // Smaller in scope, a past role rather than an active engagement —
    // modest density, camera eased slightly further back.
    hueShift: 4,
    lightnessShift: -0.03,
    size: 0.075,
    opacity: 0.38,
    cameraOffset: { x: 0.05, y: 0, z: 0.25 },
  },
  "london-electric-centre": {
    // EV/electric subject matter — the coolest hue shift of the five, kept
    // subtle deliberately (this is the one place a literal theme-colour
    // association was tempting, and restraint matters more than the joke).
    hueShift: -14,
    lightnessShift: 0.02,
    size: 0.09,
    opacity: 0.42,
    cameraOffset: { x: -0.1, y: -0.05, z: -0.15 },
  },
};
