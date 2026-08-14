import type { PerspectiveCamera } from "three";
import { sceneState } from "./sceneStore";
import { scrollProgressToCameraOffset } from "./cameraChoreography";

const PARALLAX_STRENGTH = 0.35;
// Spring, not a simple lerp: gives the camera weight and momentum — it
// keeps drifting slightly after the pointer stops, then settles — rather
// than snapping directly toward the cursor. That reads as "expensive"; a
// twitchy 1:1 follow reads as a UI effect, not a physical camera.
const SPRING_STIFFNESS = 0.02;
const SPRING_DAMPING = 0.88;
// Idle breathing: near-imperceptible, independent of the pointer, so the
// camera is never perfectly dead when the visitor isn't moving the mouse.
const BREATH_AMPLITUDE = 0.05;
const BREATH_SPEED = 0.08;

/**
 * Deliberately just mouse parallax plus idle breathing — not scroll-linked
 * camera choreography. The brief's "one camera on one authored path...
 * sections declaring keyframes along it" is real scope reserved for when
 * acts exist; wiring a camera to scroll progress now, with no acts to
 * choreograph against, would be inventing choreography rather than
 * building its foundation.
 */
export function createCameraController(camera: PerspectiveCamera, baseZ: number) {
  let posX = 0;
  let posY = 0;
  let velX = 0;
  let velY = 0;
  let reducedMotion = false;

  function setReducedMotion(value: boolean) {
    reducedMotion = value;
    if (value) {
      posX = 0;
      posY = 0;
      velX = 0;
      velY = 0;
    }
  }

  /**
   * @param projectBlend 0..1, how far into *some* project environment the
   * scene currently is (see sceneController's PROJECT_BLEND_SPEED) — shared
   * with sceneController's own morph/palette/density blend so the camera
   * repositions in lockstep with everything else.
   * @param projectOffset The current project's camera offset, already eased
   * toward whatever project is active (or toward {0,0,0} when none is) by
   * sceneController — that second easing layer is what lets this value
   * itself change directly from one project's offset to another's on
   * next/previous navigation without cameraController needing to know
   * anything about "which" project it is.
   */
  function update(
    elapsed: number,
    projectBlend: number,
    projectOffset: { x: number; y: number; z: number }
  ) {
    // Authored, scroll-driven story position — a pure function of where the
    // visitor currently is, so it's exact on reverse scroll and correct
    // immediately on a deep link. This is content, not decoration, so it
    // stays active under reduced motion (see below); only the sprung
    // pointer parallax and idle breathing layered on top of it are ambient
    // enough to suppress.
    const home = scrollProgressToCameraOffset(sceneState.scrollProgress);
    const authored = {
      x: home.x + (projectOffset.x - home.x) * projectBlend,
      y: home.y + (projectOffset.y - home.y) * projectBlend,
      z: home.z + (projectOffset.z - home.z) * projectBlend,
    };

    if (reducedMotion) {
      camera.position.set(authored.x, authored.y, baseZ + authored.z);
      camera.lookAt(0, 0, 0);
      return;
    }

    const targetX = sceneState.pointer.x * PARALLAX_STRENGTH;
    const targetY = -sceneState.pointer.y * PARALLAX_STRENGTH * 0.6;

    velX = (velX + (targetX - posX) * SPRING_STIFFNESS) * SPRING_DAMPING;
    velY = (velY + (targetY - posY) * SPRING_STIFFNESS) * SPRING_DAMPING;
    posX += velX;
    posY += velY;

    const breathX = Math.sin(elapsed * BREATH_SPEED) * BREATH_AMPLITUDE;
    const breathY = Math.cos(elapsed * BREATH_SPEED * 0.8) * BREATH_AMPLITUDE * 0.6;

    camera.position.x = authored.x + posX + breathX;
    camera.position.y = authored.y + posY + breathY;
    camera.position.z = baseZ + authored.z;
    camera.lookAt(0, 0, 0);
  }

  return { update, setReducedMotion };
}
