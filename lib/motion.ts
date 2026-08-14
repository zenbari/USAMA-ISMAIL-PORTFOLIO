/**
 * Motion primitives — the single source of truth for animation timing.
 * Named and documented per PHASE_2_DESIGN.md §5 (motion specification).
 * Do not hardcode duration/easing numbers elsewhere; import from here so a
 * later change to the spec is a one-file edit, not a hunt through components.
 *
 * GSAP takes plain numbers (seconds) rather than CSS custom properties, so
 * these live in JS. The purely-CSS-driven primitives (ui-hover,
 * theme-transition) are declared as CSS custom properties in globals.css
 * instead — see the `--motion-*` tokens there. Both sets encode the same
 * spec; this file is the GSAP half of it.
 */

export const MOTION = {
  /** Text entering on scroll — settle, don't bounce. */
  revealDuration: 0.5,
  revealEase: "power2.out",
  /** Sequential emphasis in lists (evidence cards, tool tags). */
  staggerStep: 0.06,
  /** How much of an element must be in view before it reveals. */
  revealTriggerStart: "top 88%",
} as const;
