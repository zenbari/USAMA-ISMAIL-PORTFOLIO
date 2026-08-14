"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/types/content";

/**
 * Renders one top-level desktop nav item: a plain link, or — for an item
 * with children (currently just "Projects") — a dropdown trigger.
 *
 * The dropdown opens on click/Enter/Space (works for touch and keyboard),
 * and additionally on hover — but only on fine-pointer devices that can
 * actually hover, so touch never gets a phantom hover-open. Closes on
 * outside click, Escape, or selecting an item.
 */
export default function NavLink({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const canHover = useRef(false);
  const menuId = useId();

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        wrapperRef.current?.querySelector("button")?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleMouseEnter() {
    if (!canHover.current) return;
    clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    if (!canHover.current) return;
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="link-underline text-sm text-fg-muted transition-colors hover:text-fg"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        className="flex items-center gap-1 text-sm text-fg-muted transition-colors duration-[var(--motion-ui-hover)] hover:text-fg active:scale-[0.97]"
      >
        <span className="link-underline">{item.label}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180 text-accent" : ""}`}
        />
      </button>

      {open && (
        <div
          id={menuId}
          className="dropdown-panel absolute left-1/2 top-full mt-3 w-48 overflow-hidden rounded-lg border border-border-strong header-glass"
        >
          <ul className="flex flex-col py-2">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-fg-muted transition-colors duration-[var(--motion-ui-hover)] hover:bg-surface-raised hover:text-accent focus-visible:bg-surface-raised focus-visible:text-accent"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
