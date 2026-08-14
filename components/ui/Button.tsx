"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import useMagneticHover from "@/hooks/useMagneticHover";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium " +
  "transition-[color,background-color,border-color,transform] duration-[var(--motion-ui-hover)] " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent-strong",
  secondary:
    "border border-border-strong text-fg hover:border-accent hover:text-accent",
  ghost: "text-fg-muted hover:text-fg",
};

// Arrow shift uses an explicit `transform-[...]` value rather than Tailwind's
// translate-x-*/translate-y-* utilities — see ProjectCard.tsx's hover-lift
// fix for why: this browser's rendering of the standalone CSS `translate`
// property (what those utilities compile to in Tailwind v4) silently drops
// the declaration when its value comes from `var()`, even though the
// underlying custom properties resolve correctly. Explicit `transform-[...]`
// compiles to the legacy `transform` property instead, which is unaffected.
const arrowClasses =
  "transition-transform duration-[var(--motion-ui-hover)] " +
  "group-hover:transform-[translate(2px,-2px)] " +
  "group-focus-visible:transform-[translate(2px,-2px)]";

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  showArrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  showArrow?: boolean;
  className?: string;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;
  // A small magnetic pull is reserved for primary CTAs only — see
  // useMagneticHover's own docblock for why that restraint matters.
  const magneticRef = useMagneticHover<HTMLAnchorElement>();
  const ref = variant === "primary" ? magneticRef : undefined;

  if (external) {
    return (
      <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {showArrow && <ArrowUpRight size={16} aria-hidden="true" className={arrowClasses} />}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={classes}>
      {children}
      {showArrow && <ArrowUpRight size={16} aria-hidden="true" className={arrowClasses} />}
    </Link>
  );
}
