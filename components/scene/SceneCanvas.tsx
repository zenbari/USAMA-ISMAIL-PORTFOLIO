"use client";

import { useEffect, useRef } from "react";
import { createSceneController, type SceneController } from "./sceneController";
import { startPointerTracking } from "./pointerController";
import { startScrollProgressTracking } from "./scrollProgressController";
import { startActBoundaryTracking } from "./actBoundaryController";

/**
 * The Three.js-dependent half of the scene shell — only ever reached via
 * SceneGate's dynamic, ssr:false import, so this component and the three.js
 * chunk it pulls in never load on a route/device that doesn't qualify.
 */
export default function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let controller: SceneController | null = createSceneController(canvas);

    const stopPointerTracking = startPointerTracking();
    const stopScrollTracking = startScrollProgressTracking();
    const stopActBoundaryTracking = startActBoundaryTracking();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    function applyMotionPreference() {
      controller?.setReducedMotion(motionQuery.matches);
    }
    applyMotionPreference();
    motionQuery.addEventListener("change", applyMotionPreference);

    function handleResize() {
      controller?.resize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // Keep the canvas in sync with the light/dark toggle (ThemeToggle writes
    // data-theme on <html>) without a continuous loop — one render per
    // actual change.
    const themeObserver = new MutationObserver(() => controller?.syncFromCSS());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    function handleVisibility() {
      if (document.hidden) {
        controller?.pause();
      } else {
        controller?.resume();
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopPointerTracking();
      stopScrollTracking();
      stopActBoundaryTracking();
      motionQuery.removeEventListener("change", applyMotionPreference);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      themeObserver.disconnect();
      controller?.dispose();
      controller = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
