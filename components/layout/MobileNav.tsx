"use client";

import { useState, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/data/site";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/layout/ThemeToggle";

// Matches the panel's own transition-duration below — used only to know
// when it's safe to unmount after closing (see closeMenu).
const EXIT_DURATION = 200;

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelId = useId();
  const exitTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function openMenu() {
    clearTimeout(exitTimer.current);
    setMounted(true);
    // Mount in the closed visual state first, then flip to open on the next
    // painted frame — otherwise the panel would appear already in its end
    // state with nothing for the transition to animate from.
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  }

  function closeMenu() {
    setOpen(false);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    exitTimer.current = setTimeout(() => setMounted(false), reduceMotion ? 0 : EXIT_DURATION);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => () => clearTimeout(exitTimer.current), []);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => (open ? closeMenu() : openMenu())}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-fg transition-transform duration-[var(--motion-ui-hover)] active:scale-[0.94]"
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>

      {/*
        Portalled to document.body: the header uses backdrop-filter, which
        (per spec) makes it a containing block for `position: fixed`
        descendants — without the portal this panel gets trapped inside the
        64px header box instead of covering the viewport.
      */}
      {mounted &&
        createPortal(
          <div
            id={panelId}
            className={`fixed inset-x-0 top-16.25 bottom-0 z-40 flex flex-col overflow-y-auto bg-bg px-6 py-8 transition-[opacity,transform] duration-200 ease-out ${
              open ? "transform-[translateY(0)] opacity-100" : "transform-[translateY(-8px)] opacity-0"
            }`}
          >
            <div className="flex justify-end">
              <ThemeToggle />
            </div>

            <nav aria-label="Mobile" className="mt-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) =>
                item.children?.length ? (
                  <div key={item.href}>
                    <div className="flex items-center justify-between rounded-md px-2">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="py-3 font-display text-2xl text-fg transition-colors duration-[var(--motion-ui-hover)] hover:text-accent"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded((current) => (current === item.href ? null : item.href))
                        }
                        aria-expanded={expanded === item.href}
                        aria-controls={`${panelId}-${item.href}`}
                        aria-label={`${expanded === item.href ? "Hide" : "Show"} ${item.label} submenu`}
                        className="flex h-10 w-10 items-center justify-center text-fg-muted transition-transform duration-[var(--motion-ui-hover)] active:scale-[0.9]"
                      >
                        <ChevronDown
                          size={20}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${
                            expanded === item.href ? "rotate-180 text-accent" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {expanded === item.href && (
                      <div
                        id={`${panelId}-${item.href}`}
                        className="flex flex-col gap-1 border-l border-border pb-2 pl-4"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMenu}
                            className="rounded-md px-2 py-2 text-base text-fg-muted transition-colors duration-[var(--motion-ui-hover)] hover:text-accent"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-md px-2 py-3 font-display text-2xl text-fg transition-colors duration-[var(--motion-ui-hover)] hover:text-accent"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Button href="/contact" className="w-full justify-center" showArrow={false}>
                Contact
              </Button>
              <Button
                href="/cv/usama-ismail-cv.pdf"
                variant="secondary"
                external
                className="w-full justify-center"
              >
                Download CV
              </Button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
