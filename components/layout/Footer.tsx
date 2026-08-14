import Link from "next/link";
import { SITE, NAV_ITEMS } from "@/data/site";
import Container from "@/components/ui/Container";
import Wordmark from "@/components/ui/Wordmark";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="group flex items-center gap-3">
            <Wordmark size={30} />
            <span className="font-display text-base text-fg transition-colors duration-[var(--motion-ui-hover)] group-hover:text-accent">
              {SITE.name}
            </span>
          </Link>
          <p className="mt-4 text-sm text-fg-muted">{SITE.description}</p>
        </div>

        <nav aria-label="Footer" className="flex gap-8">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-sm text-fg-muted hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2">
            <li>
              <a href={`mailto:${SITE.email}`} className="link-underline text-sm text-fg-muted hover:text-fg">
                {SITE.email}
              </a>
            </li>
            {SITE.social.map((s) =>
              s.href ? (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-fg-muted hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ) : null
            )}
            <li>
              <Link href="/privacy" className="link-underline text-sm text-fg-muted hover:text-fg">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 font-mono text-data-layer text-data-ink sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {SITE.name}. All rights reserved.</p>
        <p>Built with Next.js, TypeScript &amp; Tailwind — developed with Claude Code.</p>
      </Container>
    </footer>
  );
}
