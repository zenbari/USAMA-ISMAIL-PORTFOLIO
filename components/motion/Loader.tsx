"use client";

import { useEffect, useState } from "react";

function alreadyShown() {
  return typeof window !== "undefined" && sessionStorage.getItem("loader-shown") === "1";
}

/**
 * Brief branded loading overlay shown once on first page load per session.
 * Purely decorative — page content renders underneath immediately, so it
 * never blocks crawlers, hydration or perceived readiness.
 *
 * `phase` always starts "visible" — the same value on the server and on the
 * client's first render — and never branches on sessionStorage. That used
 * to be a lazy useState initializer reading sessionStorage directly, which
 * is exactly the "branch initial render on client-only state" mistake: the
 * server (no window) always computed "visible", but a client hydrating a
 * *second* page load in the same tab (sessionStorage already set from the
 * first) computed "done", so React hydrated the skip-link onto the DOM node
 * that was actually the server-rendered overlay div. Fixed by keeping the
 * render output identical on both sides and only deciding whether to skip
 * in an effect, after hydration has already committed.
 */
export default function Loader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");
  // Lazy initializer — like sceneController's quality tier decision, this is
  // guaranteed to run exactly once per component instance regardless of
  // Strict Mode's dev-only effect double-invoke, so the effect below can
  // trust it without re-reading sessionStorage (which the effect itself is
  // about to write to — reading it back would race against Strict Mode's
  // mount→cleanup→remount cycle).
  const [wasAlreadyShown] = useState(alreadyShown);

  useEffect(() => {
    if (wasAlreadyShown) {
      // Still deferred to a fresh task rather than called synchronously in
      // the effect body (see react-hooks/set-state-in-effect, and the same
      // pattern already used in SceneGate.tsx).
      const id = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(id);
    }

    sessionStorage.setItem("loader-shown", "1");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const showFor = reduceMotion ? 0 : 550;
    const fadeFor = reduceMotion ? 0 : 300;

    const t1 = setTimeout(() => setPhase("fading"), showFor);
    const t2 = setTimeout(() => setPhase("done"), showFor + fadeFor);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [wasAlreadyShown]);

  if (phase === "done") return null;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`fixed inset-0 z-100 flex items-center justify-center bg-bg transition-opacity duration-300 ${
        phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-lg border border-border-strong font-display text-2xl italic text-accent animate-[loader-reveal_0.6s_ease-out]">
        UI
      </span>
    </div>
  );
}
