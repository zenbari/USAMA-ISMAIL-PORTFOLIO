"use client";

import { useEffect, useRef } from "react";
import { MOTION } from "@/lib/motion";

/**
 * Lightweight, dependency-scoped scroll-reveal: fades + lifts children marked
 * with [data-reveal] as they enter the viewport. GSAP/ScrollTrigger is
 * dynamically imported so it never ships in the initial bundle, and the
 * effect is a no-op under prefers-reduced-motion.
 */
export default function useScrollReveal<T extends HTMLElement>() {
  const scopeRef = useRef<T | null>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
        targets.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.revealDuration,
              delay: (i % 4) * MOTION.staggerStep,
              ease: MOTION.revealEase,
              scrollTrigger: {
                trigger: el,
                start: MOTION.revealTriggerStart,
                once: true,
              },
            }
          );
        });
      }, scope);
    })();

    return () => ctx?.revert();
  }, []);

  return scopeRef;
}
