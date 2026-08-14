import Link from "next/link";
import { SITE, NAV_ITEMS } from "@/data/site";
import Wordmark from "@/components/ui/Wordmark";
import ThemeToggle from "@/components/layout/ThemeToggle";
import NavLink from "@/components/layout/NavLink";
import MobileNav from "@/components/layout/MobileNav";

export default function Header() {
  return (
    <header className="header-glass sticky top-0 z-30">
      <div className="mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <Wordmark size={34} />
          {/*
            sr-only rather than a separate aria-label: the Wordmark's "UI"
            glyph is decorative (aria-hidden) but still visually visible, so
            an aria-label on the link that doesn't contain "UI" fails
            axe-core's label-content-name-mismatch (WCAG 2.5.3) — a sighted
            voice-control user sees "UI" and expects it in the name. Making
            the real name always-present-but-visually-hidden below `sm`
            avoids the mismatch entirely: there's no separate label to
            disagree with the visible glyph, just one name, always in the
            accessibility tree.
          */}
          <span className="sr-only font-display text-base text-fg transition-colors duration-[var(--motion-ui-hover)] group-hover:text-accent sm:not-sr-only sm:inline">
            {SITE.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.slice(1).map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden md:flex" />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
