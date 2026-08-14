"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps routed page content with a short, enter-only fade — the persistent
 * header/scene sit outside this boundary entirely (see app/layout.tsx), so
 * neither is ever part of what's animating; only the actual page content
 * is. Deliberately enter-only, not an exit+enter pair: holding the outgoing
 * page on screen for its own exit animation would mean either scrolling it
 * to a fresh top position mid-fade (jarring) or leaving it at the old
 * scroll offset while the new URL is already live (misleading). An instant
 * swap with the incoming content animating in avoids both, never produces a
 * hard unanimated cut, and never delays the navigation itself — nothing
 * here holds up the route change, only how the result is revealed.
 *
 * `key={pathname}` forces this element to remount on every navigation,
 * which is what makes the CSS animation replay each time (an element that
 * merely receives new children doesn't restart its own `animation`).
 * `prefers-reduced-motion` isn't handled here explicitly — the blanket rule
 * in globals.css already collapses this animation's duration to ~0.
 *
 * This also runs on the very first page load, not just client-side
 * navigations, but that's invisible in practice: Loader.tsx sits on top as
 * an opaque overlay for ~850ms, well past this animation's 220ms, so first
 * load always finishes settling before the loader reveals it.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip on the very first mount — the browser already puts focus at the
    // top of the document for a real page load; this is only to replace
    // what a full page load would otherwise do, for *subsequent*
    // client-side navigations, which App Router otherwise leaves focus
    // untouched for.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // preventScroll: true — a plain .focus() call scrolls its target into
    // view by default, which (with the sticky header treated as an
    // obstruction) left the page a consistent ~72px short of a clean top-
    // of-page scroll on every fresh navigation. Scroll position here is
    // Next's job (scroll-to-top on push, native restoration on back/
    // forward); this call should only ever move focus.
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <main key={pathname} id="main" ref={mainRef} tabIndex={-1} className="page-enter flex-1">
      {children}
    </main>
  );
}
