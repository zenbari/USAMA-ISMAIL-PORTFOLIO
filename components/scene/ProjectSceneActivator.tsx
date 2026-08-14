"use client";

import { useEffect } from "react";
import { sceneState } from "./sceneStore";
import { wake } from "./ticker";

/**
 * The entire bridge between a project route (a Server Component) and the
 * persistent, client-side scene. Renders nothing — it's a side-effect leaf
 * mounted once per project page (see app/work/[slug]/page.tsx) that writes
 * the current slug into the shared scene store on mount and clears it on
 * unmount/navigation, so cameraController and sceneController know to blend
 * toward (or away from) that project's environment (see projectScene.ts).
 *
 * Deliberately not a prop drilled into SceneCanvas: the canvas is mounted
 * once in the root layout, outside route content (Phase 2 §8's persistent-
 * canvas requirement), so it has no way to know which route is current
 * except by reading the same plain store every other scene input already
 * uses. This keeps that invariant intact — no remount, no new canvas, no
 * prop path from route to scene.
 */
export default function ProjectSceneActivator({ slug }: { slug: string }) {
  useEffect(() => {
    sceneState.projectSlug = slug;
    wake();
    return () => {
      sceneState.projectSlug = null;
      wake();
    };
  }, [slug]);

  return null;
}
