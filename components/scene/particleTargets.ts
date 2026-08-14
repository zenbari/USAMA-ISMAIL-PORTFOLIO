import { BufferGeometry, BufferAttribute } from "three";

/**
 * Bakes all four particle targets from the inventory (PHASE_2_DESIGN.md §7)
 * at build/mount time — not computed per-frame, per brief §7's "morph
 * targets are baked, not computed at runtime." Every target has exactly
 * `count` points, and — critically — index `i` in every target array is
 * the *same* particle throughout its whole journey: nothing here shuffles
 * or resorts between targets, so a particle's Noise→Lattice→Rank
 * Order→Indexed Grid path is continuous and no particle is ever orphaned.
 *
 * Bounding volume is kept consistent across all four targets (roughly
 * X ±6, Y ±3.5, Z ±3) specifically so morphing between them never requires
 * a camera move — camera choreography is out of scope for this phase.
 */

const BOUNDS = { x: 6, y: 3.5, z: 3 };

function targetA_Noise(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 2 * BOUNDS.x;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * BOUNDS.y;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2 * BOUNDS.z;
  }
  return positions;
}

/**
 * Target B — "Lattice": a structured 3D grid. The visual argument is
 * "architecture becoming visible" — deliberately the most orthogonal,
 * rule-following shape in the set, in direct contrast to Noise's disorder.
 */
function targetB_Lattice(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const n = Math.ceil(Math.cbrt(count));
  const spacingX = (2 * BOUNDS.x) / Math.max(n - 1, 1);
  const spacingY = (2 * BOUNDS.y) / Math.max(n - 1, 1);
  const spacingZ = (2 * BOUNDS.z) / Math.max(n - 1, 1);

  let i = 0;
  outer: for (let ix = 0; ix < n; ix++) {
    for (let iy = 0; iy < n; iy++) {
      for (let iz = 0; iz < n; iz++) {
        if (i >= count) break outer;
        positions[i * 3 + 0] = -BOUNDS.x + ix * spacingX;
        positions[i * 3 + 1] = -BOUNDS.y + iy * spacingY;
        positions[i * 3 + 2] = -BOUNDS.z + iz * spacingZ;
        i++;
      }
    }
  }
  return positions;
}

/**
 * Target C — "Rank order": particles reorganise into a tiered pyramid —
 * wide, dense base narrowing to a sparse peak. This reads as prioritisation
 * (broad triage narrowing to what matters most) using volume and hierarchy
 * rather than a literal chart — explicitly not a bar/line chart of dots,
 * which the brief rules out (§3).
 */
function targetC_RankOrder(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const tierCount = 6;
  // Base tier gets the most particles, each tier up gets proportionally
  // fewer — the particle *density* itself is the hierarchy signal.
  const weights = Array.from({ length: tierCount }, (_, k) => tierCount - k);
  const weightSum = weights.reduce((a, b) => a + b, 0);

  let idx = 0;
  for (let tier = 0; tier < tierCount; tier++) {
    const tierShare = weights[tier] / weightSum;
    const tierCountPoints = tier === tierCount - 1 ? count - idx : Math.round(count * tierShare);
    const tierT = tier / (tierCount - 1); // 0 at base, 1 at peak
    const y = -BOUNDS.y + tierT * (2 * BOUNDS.y);
    const radius = BOUNDS.x * (1 - tierT) + 0.4 * tierT; // wide base, narrow peak
    const bandHeight = (2 * BOUNDS.y) / tierCount / 2;

    for (let j = 0; j < tierCountPoints && idx < count; j++, idx++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius; // uniform disc distribution
      positions[idx * 3 + 0] = Math.cos(angle) * r;
      positions[idx * 3 + 1] = y + (Math.random() - 0.5) * bandHeight;
      positions[idx * 3 + 2] = Math.sin(angle) * r * (BOUNDS.z / BOUNDS.x);
    }
  }
  return positions;
}

/**
 * Target D — "Indexed grid": calm, flat, evenly spaced — the resolved
 * resting state. Deliberately flatter and more symmetric than the Lattice
 * (minimal depth variation) so it reads as *more* settled than Target B,
 * not merely "another grid."
 */
function targetD_IndexedGrid(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const nx = Math.ceil(Math.sqrt(count));
  const ny = Math.ceil(count / nx);
  const spacingX = (2 * BOUNDS.x) / Math.max(nx - 1, 1);
  const spacingY = (2 * BOUNDS.y) / Math.max(ny - 1, 1);

  let i = 0;
  for (let ix = 0; ix < nx && i < count; ix++) {
    for (let iy = 0; iy < ny && i < count; iy++) {
      positions[i * 3 + 0] = -BOUNDS.x + ix * spacingX;
      positions[i * 3 + 1] = -BOUNDS.y + iy * spacingY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3; // near-flat, minimal depth
      i++;
    }
  }
  return positions;
}

export interface ParticleTargets {
  geometry: BufferGeometry;
}

export function createParticleTargets(count: number): ParticleTargets {
  const positionsA = targetA_Noise(count);
  const positionsB = targetB_Lattice(count);
  const positionsC = targetC_RankOrder(count);
  const positionsD = targetD_IndexedGrid(count);

  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) seeds[i] = Math.random();

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positionsA, 3));
  geometry.setAttribute("aTargetB", new BufferAttribute(positionsB, 3));
  geometry.setAttribute("aTargetC", new BufferAttribute(positionsC, 3));
  geometry.setAttribute("aTargetD", new BufferAttribute(positionsD, 3));
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
  return { geometry };
}
