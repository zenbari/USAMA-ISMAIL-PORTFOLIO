import { getActBounds } from "./actBounds";

export interface CameraOffset {
  x: number;
  y: number;
  z: number;
}

/**
 * Authored resting offsets at each act boundary, added to the base camera
 * position — small deliberate values (a fraction of a world unit against
 * BASE_CAMERA_Z = 8 in sceneController.ts) so the path reads as considered
 * repositioning, not a swoop. Mirrors the act/morph pairing in
 * actChoreography.ts: each beat lands where its narrative act does.
 */
const KEYFRAMES: CameraOffset[] = [
  { x: 0, y: 0, z: 0 }, // Act 1 start — Identity: establishing, centred
  { x: 0.15, y: -0.05, z: -0.4 }, // Act 2 start — Diagnosis: leaning in
  { x: -0.05, y: 0.05, z: 0.3 }, // Act 3 start — Evidence: pulled back, room for the densest act
  { x: 0.1, y: -0.08, z: -0.3 }, // Act 4 start — Method: tightening as priority order forms
  { x: -0.05, y: 0.03, z: 0.15 }, // Act 5 start — Resolution: easing back toward centre
  { x: 0, y: 0, z: 0 }, // End of document — full return, bookends Act 1
];

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Pure function of scrollProgress (and the current act bounds) — same
 * discipline as scrollProgressToMorphProgress: no accumulated state, so
 * reverse-scrolling retraces this path exactly and a deep link lands in the
 * right position immediately. Deliberately not sprung/lagged here — that
 * would make the position a function of *history*, not just of where the
 * visitor currently is; the spring in cameraController is reserved for
 * pointer parallax, which is genuinely ambient rather than part of the story.
 */
export function scrollProgressToCameraOffset(scrollProgress: number): CameraOffset {
  const p = Math.min(1, Math.max(0, scrollProgress));
  const { act1End, act2End, act3End, act4End } = getActBounds();
  const stops = [0, act1End, act2End, act3End, act4End, 1];

  let segment = stops.length - 2;
  for (let i = 0; i < stops.length - 1; i++) {
    if (p <= stops[i + 1]) {
      segment = i;
      break;
    }
  }

  const segStart = stops[segment];
  const segEnd = stops[segment + 1];
  const localT = segEnd > segStart ? (p - segStart) / (segEnd - segStart) : 0;
  const eased = easeInOutCubic(Math.min(1, Math.max(0, localT)));

  const from = KEYFRAMES[segment];
  const to = KEYFRAMES[segment + 1];

  return {
    x: lerp(from.x, to.x, eased),
    y: lerp(from.y, to.y, eased),
    z: lerp(from.z, to.z, eased),
  };
}
