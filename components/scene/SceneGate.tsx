"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import SceneErrorBoundary from "./SceneErrorBoundary";

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Per PHASE_2_DESIGN.md §11 (tier ladder): the WebGL scene never ships to
 * phones by default, and this file is the enforcement point — it imports
 * nothing from three.js, so a mobile visitor never downloads that chunk at
 * all, rather than downloading it and then hiding it with CSS.
 */
function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(DESKTOP_QUERY).matches && hasWebGL2();
}

// SSR/first-hydration-pass value — must match on both sides, so it's always
// "not eligible" until the real client-side check runs, exactly like the
// theme-init pattern in ThemeToggle.tsx.
function getServerSnapshot(): boolean {
  return false;
}

const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

/**
 * Mounted once in the root layout, outside of route content, so it never
 * unmounts on navigation (PHASE_2_DESIGN.md §8's persistent-canvas
 * requirement). Always renders the flat, CSS-only background colour as a
 * guaranteed base layer; the WebGL canvas — when eligible — paints on top
 * of it in the same colour, so there is no visible seam either way.
 */
export default function SceneGate() {
  const eligible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // The brief (§9) is explicit: "the 3D chunk loads after first paint and
  // after interactivity, never before." Measured: without this deferral,
  // the dynamic import fires immediately post-hydration and the three.js
  // chunk's parse/execute cost pushed desktop LCP from 0.6s to 2.9s even
  // though the canvas isn't the LCP element — main-thread contention alone
  // was enough to delay the real, server-rendered LCP text.
  //
  // Gating on window `load` rather than requestIdleCallback: idle callbacks
  // fire at an unpredictable point relative to a performance trace (and
  // Safari doesn't implement the API at all), which measured *worse* here.
  // `load` is a single, well-understood signal — the rest of the page,
  // including images, is already down — so this genuinely runs after
  // first paint and after interactivity, not just after "the browser felt
  // like it."
  const [deferredReady, setDeferredReady] = useState(false);
  useEffect(() => {
    if (!eligible) return;

    function markReady() {
      setDeferredReady(true);
    }

    if (document.readyState === "complete") {
      // Already loaded by the time this effect ran — still defer the
      // setState to a fresh task rather than calling it synchronously
      // inside the effect body (see react-hooks/set-state-in-effect).
      const id = window.setTimeout(markReady, 0);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", markReady);
    return () => window.removeEventListener("load", markReady);
  }, [eligible]);

  return (
    <div className="fixed inset-0 z-0 bg-bg" aria-hidden="true">
      {eligible && deferredReady && (
        <SceneErrorBoundary>
          <SceneCanvas />
        </SceneErrorBoundary>
      )}
    </div>
  );
}
