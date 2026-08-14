export type QualityTier = "high" | "medium" | "low";

export interface QualitySettings {
  pointCount: number;
  dprCap: number;
}

const TIERS: Record<QualityTier, QualitySettings> = {
  high: { pointCount: 3000, dprCap: 2 },
  medium: { pointCount: 1500, dprCap: 1.5 },
  low: { pointCount: 800, dprCap: 1 },
};

const ORDER: QualityTier[] = ["high", "medium", "low"];

/**
 * Cheap, one-time heuristic for the *initial* tier — core count and viewport
 * width, no GPU benchmarking. SceneGate has already decided this device
 * supports WebGL2 at all; this only decides how much to ask of it.
 */
export function decideInitialTier(): QualityTier {
  const cores = navigator.hardwareConcurrency ?? 4;
  const narrow = window.innerWidth < 1280;
  return cores <= 4 || narrow ? "medium" : "high";
}

export function settingsFor(tier: QualityTier): QualitySettings {
  return TIERS[tier];
}

/** One step down, or null if already at the engine's lowest tier (falling back further is SceneGate's no-canvas fallback, not this manager's job). */
export function nextLowerTier(tier: QualityTier): QualityTier | null {
  const idx = ORDER.indexOf(tier);
  return idx < ORDER.length - 1 ? ORDER[idx + 1] : null;
}
