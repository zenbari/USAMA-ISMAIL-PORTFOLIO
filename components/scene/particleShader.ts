/**
 * Scene direction pass (Phase 4): the morph math from Phase 3 Part 3 is
 * untouched — same four targets, same uMorphProgress-driven segments, same
 * stagger/easing. Everything added here is purely how the field is *lit and
 * composed*, not what it does.
 *
 * Deliberately NOT using additive/bloom blending — that's the single
 * technique most responsible for particle scenes reading as "gaming" or
 * "crypto." Glow here comes from a soft two-tier core+halo alpha falloff
 * only, rendered with ordinary alpha blending, so density never blows out
 * to white. See sceneController.ts and the phase report for why each
 * uniform is set where it is.
 */
export const vertexShader = /* glsl */ `
  attribute vec3 aTargetB;
  attribute vec3 aTargetC;
  attribute vec3 aTargetD;
  attribute float aSeed;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uDrift;
  uniform float uMorphProgress;
  uniform float uReduceMotion;

  varying float vDepth;
  varying vec2 vScreenPos;

  float easeInOutCubic(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  }

  vec3 morphSegment(vec3 from, vec3 to, float segmentProgress, float seed) {
    float staggerWindow = 0.35 * (1.0 - uReduceMotion);
    float delay = seed * staggerWindow;
    float denom = max(1.0 - staggerWindow, 0.0001);
    float local = clamp((segmentProgress - delay) / denom, 0.0, 1.0);
    float eased = mix(local, easeInOutCubic(local), 1.0 - uReduceMotion);
    return mix(from, to, eased);
  }

  void main() {
    float clamped = clamp(uMorphProgress, 0.0, 3.0);
    vec3 pos;

    if (clamped < 1.0) {
      pos = morphSegment(position, aTargetB, clamped, aSeed);
    } else if (clamped < 2.0) {
      pos = morphSegment(aTargetB, aTargetC, clamped - 1.0, aSeed);
    } else {
      pos = morphSegment(aTargetC, aTargetD, clamped - 2.0, aSeed);
    }

    // Ambient movement: half independent per-particle jitter, half a slow,
    // large-scale "current" shared by nearby particles (phase driven by
    // position, not just seed) — reads as one atmosphere moving gently,
    // not many unrelated specks twitching independently.
    float individualPhase = uTime * 0.15 + aSeed * 6.28318;
    float fieldPhase = uTime * 0.06 + pos.x * 0.15 + pos.y * 0.12;
    float driftX = mix(sin(individualPhase), sin(fieldPhase), 0.5);
    float driftY = mix(cos(individualPhase * 0.9), cos(fieldPhase * 0.8), 0.5);
    pos.x += driftX * 0.05 * uDrift;
    pos.y += driftY * 0.04 * uDrift;
    pos.z += sin(individualPhase * 1.3) * 0.03 * uDrift;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float dist = -mvPosition.z;
    vDepth = dist;
    // Normalised device coordinates (-1..1), for a spatial-composition
    // vignette in the fragment shader — cheaper and simpler than a
    // screen-resolution uniform, and the effect only needs to be
    // approximately centred, not pixel-exact.
    vScreenPos = gl_Position.xy / gl_Position.w;

    // Depth-attenuated point size — nearer particles read larger, which is
    // most of what sells real 3D space rather than a flat wall of dots.
    gl_PointSize = uSize * uPixelRatio * (300.0 / dist);
  }
`;

export const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColorNear;
  uniform vec3 uColorFar;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uOpacity;

  varying float vDepth;
  varying vec2 vScreenPos;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);

    // Soft core + wider, dimmer halo — a gentle glow from shape alone, no
    // additive blending, so overlapping particles never blow out to white.
    float core = smoothstep(0.16, 0.0, d);
    float halo = smoothstep(0.5, 0.1, d) * 0.35;
    float shape = core + halo;
    if (shape <= 0.001) discard;

    // Atmospheric perspective: nearer particles read a touch brighter/
    // warmer (uColorNear), farther ones cooler and dimmer, both fading
    // into the page's own background colour with distance — literally
    // "resolving out of an unclear distance" as they approach.
    float t = clamp((vDepth - uFogNear) / max(uFogFar - uFogNear, 0.001), 0.0, 1.0);
    vec3 color = mix(uColorNear, uColorFar, t);
    color = mix(color, uFogColor, t * 0.55);

    // Spatial composition: a wide, gentle vignette so density eases off
    // toward the edges instead of a uniform wall of dots edge-to-edge —
    // reads as composed rather than tiled, and keeps the strongest
    // presence roughly where page content sits.
    float radial = length(vScreenPos);
    float vignette = 1.0 - smoothstep(0.65, 1.5, radial) * 0.6;

    float alpha = shape * uOpacity * (1.0 - t * 0.45) * vignette;
    gl_FragColor = vec4(color, alpha);
  }
`;
