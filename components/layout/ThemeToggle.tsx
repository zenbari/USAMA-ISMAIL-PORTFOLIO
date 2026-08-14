"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import useMagneticHover from "@/hooks/useMagneticHover";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// Matches the default the inline theme-init script in app/layout.tsx falls
// back to, so the server-rendered markup and the client's first hydration
// pass agree exactly — React reconciles the real (possibly different)
// client value itself right after, with no manual effect and no flash.
function getServerSnapshot(): Theme {
  return "dark";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const magneticRef = useMagneticHover<HTMLButtonElement>();

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode, quota, etc.) — theme still
      // applies for the current page view via the data-theme attribute.
    }
  }

  return (
    <button
      ref={magneticRef}
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border text-fg-muted transition-[color,border-color] duration-[var(--motion-ui-hover)] hover:border-accent hover:text-accent active:scale-[0.94] ${className}`}
    >
      {/*
        Both icons stay mounted and cross-fade/rotate via CSS rather than
        swapping which one renders — a mount/unmount swap has no transition
        to animate between, just a hard cut. The reduced-motion media query
        in globals.css already collapses this to an instant swap; nothing
        extra needed here for that.
      */}
      <Sun
        size={17}
        aria-hidden="true"
        className={`absolute transition-all duration-300 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
        }`}
      />
      <Moon
        size={17}
        aria-hidden="true"
        className={`absolute transition-all duration-300 ${
          isDark ? "-rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
