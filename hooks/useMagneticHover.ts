"use client";

import { useEffect, useRef } from "react";

const STRENGTH = 0.25;
const MAX_OFFSET = 6;
const RETURN_TRANSITION = "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * A restrained "magnetic" pull toward the cursor — the one place cursor
 * *position*, not just hover boolean, drives motion (Phase 7 §"Cursor
 * behaviour"). Deliberately applied narrowly (primary CTAs, theme toggle),
 * not globally: everywhere-magnetic reads as a demo gimmick, one or two
 * considered uses reads as confidence. Capped at 6px so it's felt rather
 * than seen — nothing about it should draw the eye on its own.
 *
 * Fine-pointer and motion-safe gated, matching the same pattern already
 * used for NavLink's hover-open dropdown and the scene's ambient motion:
 * touch never gets a phantom pull, and reduced-motion gets none of this by
 * design (it's decoration, unlike the scene's authored camera path, which
 * stays active under reduced motion because it's part of the content).
 */
export default function useMagneticHover<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const eligible =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!eligible) return;

    function handleMouseEnter() {
      el!.style.transition = "none";
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const offsetX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, x * STRENGTH));
      const offsetY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, y * STRENGTH));
      el!.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    function handleMouseLeave() {
      el!.style.transition = RETURN_TRANSITION;
      el!.style.transform = "";
    }

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
}
