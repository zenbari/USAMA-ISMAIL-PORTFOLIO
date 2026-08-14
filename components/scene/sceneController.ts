import { WebGLRenderer, Scene, PerspectiveCamera, ShaderMaterial, Points, Color } from "three";
import { createParticleTargets } from "./particleTargets";
import { vertexShader, fragmentShader } from "./particleShader";
import { createCameraController } from "./cameraController";
import { decideInitialTier, settingsFor, nextLowerTier, type QualityTier } from "./qualityManager";
import { createPerformanceMonitor } from "./performanceManager";
import { scrollProgressToMorphProgress } from "./actChoreography";
import { PROJECT_SCENES } from "./projectScene";
import { subscribe as tickerSubscribe, wake } from "./ticker";
import { sceneState } from "./sceneStore";

export interface SceneController {
  syncFromCSS: () => void;
  setReducedMotion: (value: boolean) => void;
  resize: (width: number, height: number) => void;
  pause: () => void;
  resume: () => void;
  dispose: () => void;
}

function readCSSColor(varName: string, fallback: string): Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  try {
    return new Color(raw || fallback);
  } catch {
    return new Color(fallback);
  }
}

const BASE_CAMERA_Z = 8;
const HOME_SIZE = 0.09;
const HOME_OPACITY = 0.5;
// Every project holds the field at the fully-resolved Indexed Grid state —
// see projectScene.ts's module comment for why that's a deliberate choice
// rather than picking a different homepage state per project.
const PROJECT_MORPH_HOLD = 3;
// How fast projectBlend eases toward its target each tick — tuned so
// entering/leaving a project reads as a considered transition (roughly
// half a second to mostly settle), not an instant cut or a sluggish fade.
const PROJECT_BLEND_SPEED = 0.06;

/**
 * Wires the engine's pieces together for one canvas. Still plain,
 * imperative JS — not a React component (PHASE_2_DESIGN.md §8) — so the
 * ticker never has to fight React's render cycle. Particle *position* is
 * entirely vertex-shader driven, a pure function of uMorphProgress (itself
 * a pure function of scroll — see actChoreography.ts): nothing here
 * rewrites the position buffer per frame, and nothing here remembers scroll
 * direction or accumulates a tween — nothing to get out of sync on reverse
 * scroll or a deep link.
 */
export function createSceneController(canvas: HTMLCanvasElement): SceneController {
  let tier: QualityTier = decideInitialTier();
  let settings = settingsFor(tier);

  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.dprCap));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new Scene();
  const camera = new PerspectiveCamera(
    50,
    canvas.clientWidth / Math.max(canvas.clientHeight, 1),
    0.1,
    100
  );
  camera.position.z = BASE_CAMERA_Z;
  const cameraController = createCameraController(camera, BASE_CAMERA_Z);

  let { geometry } = createParticleTargets(settings.pointCount);
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uSize: { value: 0.09 },
      uDrift: { value: 1 },
      uMorphProgress: { value: 0 },
      uReduceMotion: { value: 0 },
      // Depth range at this camera distance/bounds is roughly 5–11 world
      // units — fog and colour grading are tuned to that, not arbitrary.
      uColorNear: { value: readCSSColor("--color-fg-muted", "#a5a19a") },
      uColorFar: { value: readCSSColor("--color-data-ink", "#8b877f") },
      uFogColor: { value: readCSSColor("--color-bg", "#0a0a0b") },
      uFogNear: { value: 6.5 },
      uFogFar: { value: 11.5 },
      uOpacity: { value: HOME_OPACITY },
    },
  });
  let points = new Points(geometry, material);
  scene.add(points);

  let paused = false;
  let reducedMotion = false;

  // Theme-derived colours, cached separately from the uniforms themselves
  // (which get overwritten each tick with the blended result) — this is
  // what a project's hue/lightness shift is computed *from*, and what the
  // scene eases back toward when projectBlend returns to 0. Only
  // syncFromCSS() writes these.
  let homeColorNear = readCSSColor("--color-fg-muted", "#a5a19a");
  let homeColorFar = readCSSColor("--color-data-ink", "#8b877f");

  // projectBlend (0..1) drives blends whose *homepage* side is itself
  // scroll-dependent (morph progress, camera position) — it eases toward 1
  // whenever any project is active and 0 otherwise, so it's identical
  // whichever project is current. smoothedProjectOffset/Size/Opacity/Hue/
  // Lightness ease independently toward whichever project is *currently*
  // active: for properties with a scroll-dependent home value (camera) that
  // second layer is combined with projectBlend below; for properties with a
  // fixed home value (size/opacity/colour) it's sufficient on its own.
  // Together this is what makes project-to-project navigation (next/previous)
  // cross-fade smoothly instead of the field snapping straight from one
  // project's palette/framing to another's.
  let projectBlend = 0;
  const smoothedOffset = { x: 0, y: 0, z: 0 };
  let smoothedSize = HOME_SIZE;
  let smoothedOpacity = HOME_OPACITY;
  let smoothedHue = 0;
  let smoothedLightness = 0;

  const perfMonitor = createPerformanceMonitor(() => {
    const lower = nextLowerTier(tier);
    if (!lower) return;
    tier = lower;
    settings = settingsFor(tier);

    scene.remove(points);
    geometry.dispose();
    ({ geometry } = createParticleTargets(settings.pointCount));
    points = new Points(geometry, material);
    scene.add(points);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.dprCap));
    material.uniforms.uPixelRatio.value = renderer.getPixelRatio();

    if (process.env.NODE_ENV === "development") {
      console.info(
        `[scene] demoted to "${tier}" tier (${settings.pointCount} points) after a sustained frame-budget overrun`
      );
    }
  });

  function render() {
    if (paused) return;
    renderer.render(scene, camera);
  }

  function tick(dt: number, elapsed: number) {
    if (paused) return;
    material.uniforms.uTime.value = elapsed;

    // Project transition. activeProject is read fresh from sceneState every
    // tick (set by ProjectSceneActivator; see sceneStore.ts) — no "hold the
    // last one" bookkeeping needed, because every target below (including
    // the neutral/home target used when no project is active) is something
    // this function eases *toward* continuously, whichever way it's changed.
    const activeProject = sceneState.projectSlug ? PROJECT_SCENES[sceneState.projectSlug] : undefined;
    const targetBlend = activeProject ? 1 : 0;
    const smoothing = reducedMotion ? 1 : PROJECT_BLEND_SPEED;

    projectBlend += (targetBlend - projectBlend) * smoothing;
    if (targetBlend === 0 && projectBlend < 0.001) projectBlend = 0;

    const targetOffset = activeProject ? activeProject.cameraOffset : { x: 0, y: 0, z: 0 };
    smoothedOffset.x += (targetOffset.x - smoothedOffset.x) * smoothing;
    smoothedOffset.y += (targetOffset.y - smoothedOffset.y) * smoothing;
    smoothedOffset.z += (targetOffset.z - smoothedOffset.z) * smoothing;

    smoothedSize += ((activeProject ? activeProject.size : HOME_SIZE) - smoothedSize) * smoothing;
    smoothedOpacity += ((activeProject ? activeProject.opacity : HOME_OPACITY) - smoothedOpacity) * smoothing;
    smoothedHue += ((activeProject ? activeProject.hueShift : 0) - smoothedHue) * smoothing;
    smoothedLightness += ((activeProject ? activeProject.lightnessShift : 0) - smoothedLightness) * smoothing;

    // Direct, unlagged function of the current scroll position — no easing
    // or smoothing at this level. Read every tick (cheap: two arithmetic
    // ops), so it's always exactly correct for wherever the visitor
    // currently is, including immediately after a deep link or a jump from
    // the scrollbar, with no catch-up animation required. Only the *blend
    // toward* this value (projectBlend) carries any smoothing — the value
    // itself stays exact, which is what keeps homepage scroll reversal exact
    // even though a project may have been visited in between.
    const homeMorph = scrollProgressToMorphProgress(sceneState.scrollProgress);
    material.uniforms.uMorphProgress.value =
      homeMorph + (PROJECT_MORPH_HOLD - homeMorph) * projectBlend;

    material.uniforms.uSize.value = smoothedSize;
    material.uniforms.uOpacity.value = smoothedOpacity;
    (material.uniforms.uColorNear.value as Color)
      .copy(homeColorNear)
      .offsetHSL(smoothedHue / 360, 0, smoothedLightness);
    (material.uniforms.uColorFar.value as Color)
      .copy(homeColorFar)
      .offsetHSL(smoothedHue / 360, 0, smoothedLightness);

    cameraController.update(elapsed, projectBlend, smoothedOffset);
    render();
    perfMonitor.sample(dt);

    // Keep the ticker alive for continuous ambient drift, and for as long
    // as a project transition is still easing in or out. Under reduced
    // motion (or once paused) this stops self-waking and the ticker idles
    // out on its own — see ticker.ts. Scroll-driven morph updates are
    // unaffected either way: scrollProgressController wakes the ticker
    // independently on scroll, and ProjectSceneActivator wakes it on mount/unmount.
    if (!reducedMotion || projectBlend !== targetBlend) wake();
  }

  const unsubscribeTicker = tickerSubscribe(tick);

  function syncFromCSS() {
    renderer.setClearColor(readCSSColor("--color-bg", "#0a0a0b"), 1);
    homeColorNear = readCSSColor("--color-fg-muted", "#a5a19a");
    homeColorFar = readCSSColor("--color-data-ink", "#8b877f");
    (material.uniforms.uColorNear.value as Color).copy(homeColorNear);
    (material.uniforms.uColorFar.value as Color).copy(homeColorFar);
    material.uniforms.uFogColor.value = readCSSColor("--color-bg", "#0a0a0b");
    render();
  }

  syncFromCSS();
  wake();

  return {
    syncFromCSS,
    setReducedMotion(value: boolean) {
      reducedMotion = value;
      cameraController.setReducedMotion(value);
      material.uniforms.uDrift.value = value ? 0 : 1;
      material.uniforms.uReduceMotion.value = value ? 1 : 0;
      if (value) render();
      else wake();
    },
    resize(width: number, height: number) {
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      render();
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
      wake();
    },
    dispose() {
      unsubscribeTicker();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
