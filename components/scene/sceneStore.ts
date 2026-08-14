/**
 * Particle state manager — plain mutable object, not React state
 * (PHASE_2_DESIGN.md §8: "React never re-renders per frame... scroll
 * progress and pointer position live in refs and uniforms, not in
 * component state"). Controllers write into this each frame; sceneController
 * reads it imperatively. Nothing here is wired to a visible effect yet
 * except pointer → camera parallax — scrollProgress is tracked and correct,
 * but deliberately not driving anything visible in this phase (that would
 * be scroll-linked camera choreography, out of scope until acts exist).
 */
export interface SceneState {
  /** 0 at the top of the document, 1 at the bottom. */
  scrollProgress: number;
  /** -1..1, normalised to viewport centre. Raw input — smoothing happens where it's consumed (cameraController). */
  pointer: { x: number; y: number };
  /**
   * Set by ProjectSceneActivator while a project detail route is mounted,
   * null otherwise. sceneController/cameraController read this each tick
   * and ease *toward* or *away from* it (see PROJECT_BLEND_SPEED) rather
   * than switching on it — that's what makes entering/leaving a project a
   * transition instead of a cut, with no dependency on which route we came
   * from or how we got here.
   */
  projectSlug: string | null;
}

export const sceneState: SceneState = {
  scrollProgress: 0,
  pointer: { x: 0, y: 0 },
  projectSlug: null,
};
