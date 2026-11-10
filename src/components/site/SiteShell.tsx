import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import type { BusinessConfig } from "@/data/businesses";
import { Button } from "@/components/ui/button";
import { useMotion } from "./useMotion";
import { Icon } from "./Icon";

export const NAV = [
  { to: "/preview/$slug", label: "Home", exact: true },
  { to: "/preview/$slug/services", label: "Services", exact: false },
  { to: "/preview/$slug/about", label: "About", exact: true },
  { to: "/preview/$slug/work", label: "Our work", exact: true },
  { to: "/preview/$slug/contact", label: "Contact", exact: true },
] as const;

const NO_SECTIONS: string[] = [];

export const tel = (b: BusinessConfig) => `tel:${b.phoneHref}`;
export const mailto = (b: BusinessConfig) => `mailto:${b.email}?subject=${encodeURIComponent(`Quote request — ${b.name}`)}`;

function Wordmark({ b, light }: { b: BusinessConfig; light?: boolean }) {
  return (
    <Link to="/preview/$slug" params={{ slug: b.slug }} className={`font-display text-xl font-extrabold tracking-tight ${light ? "text-plum-foreground" : "text-plum"}`}>
      {b.wordmark.primary}
      <span className="text-primary">.</span>
      <span className="ml-1 text-sm font-semibold uppercase tracking-[0.2em] opacity-70">{b.wordmark.accent}</span>
    </Link>
  );
}

/** Shared tenant chrome: header, mobile menu, footer and motion host for every page. */
export function SiteShell({ b, children }: { b: BusinessConfig; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = useLocation({ select: (l) => l.pathname });
  useMotion(`${b.slug}:${pathname}`, NO_SECTIONS, host);
  const params = { slug: b.slug };
  const style = { "--plum": b.colors.brandDeep, "--plum-soft": b.colors.brand, "--primary": b.colors.accent, "--ring": b.colors.accent } as CSSProperties;

  useEffect(() => { setOpen(false); }, [pathname, b.slug]);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => { document.removeEventListener("keydown", escape); desktop.removeEventListener("change", closeOnDesktop); };
  }, [open]);

  return (
    <div ref={host} style={style} className="plumbing-site bg-background font-body text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2">Skip to content</a>
      {b.isSample && <p className="bg-plum-deep py-1.5 text-center text-xs font-medium text-plum-foreground/80">Sample website preview — business details are placeholders.</p>}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
          <Wordmark b={b} />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-8 text-[15px] font-semibold text-plum">
              {NAV.map((n) => (
                <li key={n.to}><Link to={n.to} params={params} activeOptions={{ exact: n.exact }} className="link-underline" activeProps={{ "aria-current": "page" }}>{n.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href={tel(b)} className="flex items-center gap-2 font-semibold text-plum"><Icon name="phone" className="size-4 text-primary" />{b.phone}</a>
            <Link to="/preview/$slug/contact" params={params} data-magnetic className="btn-primary">{b.cta.quote}</Link>
          </div>
          <Button ref={menuButton} variant="ghost" size="icon" className="menu-toggle text-plum lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} />
          </Button>
        </div>
        <nav id="mobile-nav" inert={!open} aria-hidden={!open} data-open={open} aria-label="Mobile" className="mobile-nav bg-background lg:hidden">
          <div className="mobile-nav-inner">
            <ul className="container-site flex flex-col py-4">
              {NAV.map((n) => (
                <li key={n.to}><Link to={n.to} params={params} activeOptions={{ exact: n.exact }} activeProps={{ "aria-current": "page", className: "text-primary" }} onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold text-plum">{n.label}</Link></li>
              ))}
              <li className="mt-3 grid gap-3 sm:grid-cols-2">
                <a href={tel(b)} className="btn-outline-dark"><Icon name="phone" className="size-4" />{b.phone}</a>
                <Link to="/preview/$slug/contact" params={params} onClick={() => setOpen(false)} className="btn-primary">{b.cta.quote}</Link>
              </li>
            </ul>
          </div>
        </nav>
        <noscript>
          <nav aria-label="Mobile fallback" className="container-site grid grid-cols-2 gap-3 py-4 lg:hidden">
            {NAV.map((n) => <a key={n.to} className="font-semibold text-plum" href={n.to.replace("$slug", b.slug)}>{n.label}</a>)}
          </nav>
        </noscript>
      </header>

      <main id="main">{children}</main>

      <footer className="bg-plum-deep text-plum-foreground">
        <div className="reveal container-site grid gap-10 py-14 md:grid-cols-3">
          <div>
            <Wordmark b={b} light />
            <p className="mt-4 max-w-xs text-sm text-plum-foreground/65">{b.footer.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {NAV.map((n) => <li key={n.to}><Link to={n.to} params={params} className="text-plum-foreground/80 hover:text-plum-foreground">{n.label}</Link></li>)}
            </ul>
          </nav>
          <div className="text-sm">
            {b.phone && <a href={tel(b)} className="block font-semibold">{b.phone}</a>}
            {b.email && <a href={`mailto:${b.email}`} className="mt-1 block text-plum-foreground/80">{b.email}</a>}
            {b.address && <p className="mt-1 text-plum-foreground/80">{b.address}</p>}
            <ul className="mt-4 flex gap-4">
              {b.footer.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="text-plum-foreground/80 underline-offset-4 hover:underline">{s.label}</a></li>)}
            </ul>
          </div>
        </div>
        <p className="container-site border-t border-plum-foreground/10 py-6 text-xs text-plum-foreground/55">© {new Date().getFullYear()} {b.name}.{b.isSample ? " Sample website template by Bricks & Frame." : ""}</p>
      </footer>
    </div>
  );
}
