import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { BusinessConfig, ServiceIcon } from "@/data/businesses";
import { Button } from "@/components/ui/button";
import { useMotion } from "./useMotion";
import { MotionFaq } from "./MotionFaq";

const NAV = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "areas", label: "Service Areas" },
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = NAV.map((item) => item.id);

function Icon({ name, className = "size-6" }: { name: ServiceIcon | "phone" | "mail" | "pin" | "check" | "menu" | "close" | "arrow" | "plus"; className?: string }) {
  const p: Record<string, ReactNode> = {
    leak: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
    drain: <><circle cx="12" cy="12" r="8" /><path d="M8 12h8M12 8v8" /></>,
    heater: <><rect x="6" y="3" width="12" height="18" rx="3" /><path d="M10 15c0-2 2-2 2-4 0 2 2 2 2 4a2 2 0 0 1-4 0z" /></>,
    fixture: <><path d="M4 10h10a4 4 0 0 1 4 4v1" /><path d="M8 10V6h4v4" /><path d="M18 18v.01M16 20v.01M20 20v.01" /></>,
    pipe: <><path d="M3 8h8a4 4 0 0 1 4 4v9" /><path d="M3 4v8M11 21h8" /></>,
    urgent: <><path d="M12 3 2 20h20L12 3z" /><path d="M12 10v4M12 17v.01" /></>,
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    pin: <><path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
    check: <path d="m5 12 5 5L20 7" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {p[name]}
    </svg>
  );
}

function SectionHead({ eyebrow, title, light, center }: { eyebrow: string; title: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-plum-foreground" : "text-plum"}`}>
        {title}
      </h2>
    </div>
  );
}

export function PlumbingSite({ b }: { b: BusinessConfig }) {
  const [open, setOpen] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const active = useMotion(b.slug, SECTION_IDS, host);
  const mailto = `mailto:${b.email}?subject=${encodeURIComponent(`Quote request — ${b.name}`)}`;
  const tel = `tel:${b.phoneHref}`;
  const style = { "--plum": b.colors.brandDeep, "--plum-soft": b.colors.brand, "--primary": b.colors.accent, "--ring": b.colors.accent } as CSSProperties;

  useEffect(() => {
    setOpen(false);
  }, [b.slug]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const Wordmark = ({ light }: { light?: boolean }) => (
    <a href="#home" className={`font-display text-xl font-extrabold tracking-tight ${light ? "text-plum-foreground" : "text-plum"}`}>
      {b.wordmark.primary}
      <span className="text-primary">.</span>
      <span className="ml-1 text-sm font-semibold uppercase tracking-[0.2em] opacity-70">{b.wordmark.accent}</span>
    </a>
  );

  return (
    <div ref={host} style={style} className="plumbing-site bg-background font-body text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2">Skip to content</a>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
        <div data-entrance="0" className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
          <Wordmark />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-8 text-[15px] font-semibold text-plum">
              {NAV.map((n) => (
                <li key={n.id}><a className="link-underline" aria-current={active === n.id ? "location" : undefined} href={`#${n.id}`}>{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href={tel} className="flex items-center gap-2 font-semibold text-plum"><Icon name="phone" className="size-4 text-primary" />{b.phone}</a>
            <a href="#contact" data-magnetic className="btn-primary">{b.cta.quote}</a>
          </div>
          <Button ref={menuButton} variant="ghost" size="icon" className="menu-toggle text-plum lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} />
          </Button>
        </div>
          <nav id="mobile-nav" inert={!open} aria-hidden={!open} data-open={open} aria-label="Mobile" className="mobile-nav bg-background lg:hidden">
            <div className="mobile-nav-inner">
            <ul className="container-site flex flex-col py-4">
              {NAV.map((n) => (
                <li key={n.id}><a onClick={() => setOpen(false)} aria-current={active === n.id ? "location" : undefined} className="block py-3 text-lg font-semibold text-plum" href={`#${n.id}`}>{n.label}</a></li>
              ))}
              <li className="mt-3 grid gap-3 sm:grid-cols-2">
                <a href={tel} className="btn-outline-dark"><Icon name="phone" className="size-4" />{b.phone}</a>
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary">{b.cta.quote}</a>
              </li>
            </ul>
            </div>
          </nav>
          <noscript>
            <nav aria-label="Mobile fallback" className="container-site grid grid-cols-2 gap-3 py-4 lg:hidden">
              {NAV.map((n) => <a key={n.id} className="text-plum font-semibold" href={`#${n.id}`}>{n.label}</a>)}
            </nav>
          </noscript>
      </header>

      <main id="main">
        {/* Hero */}
        <section id="home" className="relative overflow-hidden bg-plum text-plum-foreground">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container-site relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-7">
              <p data-entrance="100" className="eyebrow eyebrow-light">{b.hero.eyebrow}</p>
              <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                <span data-entrance="180" className="inline-block">{b.hero.headline}</span>{" "}<span data-entrance="300" className="inline-block text-primary">{b.hero.headlineAccent}</span>
              </h1>
              <p data-entrance="380" className="mt-6 max-w-xl text-lg leading-relaxed text-plum-foreground/80 sm:text-xl">{b.hero.subcopy}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" data-entrance="460" data-magnetic className="btn-primary btn-lg">{b.cta.quote}<Icon name="arrow" className="size-5" /></a>
                <a href={tel} data-entrance="540" data-magnetic className="btn-outline-light btn-lg"><Icon name="phone" className="size-5" />{b.cta.call} · {b.phone}</a>
              </div>
              <ul data-entrance="620" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-plum-foreground/85">
                {b.hero.trustCues.map((c) => (
                  <li key={c} className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"><Icon name="check" className="size-3" /></span>{c}</li>
                ))}
              </ul>
            </div>
            <div className="relative lg:col-span-5">
              <div className="absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-3xl bg-primary" aria-hidden="true" />
              <div data-entrance="220" data-image-reveal className="relative overflow-hidden rounded-3xl shadow-deep">
                <img data-parallax="0.045" src={b.hero.image} alt={b.hero.imageAlt} width={1280} height={1536} className="parallax-image aspect-[4/5] w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section aria-label="Company highlights" className="bg-primary text-primary-foreground">
          <ul className="container-site grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {b.highlights.map((h) => (
              <li key={h} className="reveal flex items-center gap-3 font-semibold"><Icon name="check" className="size-5 shrink-0" />{h}</li>
            ))}
          </ul>
        </section>

        {/* About */}
        <section id="about" className="section bg-background">
          <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="reveal relative order-last lg:order-first">
              <div className="overflow-hidden rounded-3xl shadow-card"><img data-parallax="0.06" src={b.about.image} alt={b.about.imageAlt} loading="lazy" width={1280} height={1280} className="parallax-image aspect-square w-full object-cover" /></div>
              <div className="absolute -right-3 bottom-8 max-w-[15rem] rounded-2xl bg-plum p-5 text-plum-foreground shadow-deep sm:-right-6">
                <p className="font-display text-lg font-bold leading-snug">Residential & commercial plumbing</p>
              </div>
            </div>
            <div>
              <SectionHead eyebrow="About us" title={b.about.heading} />
              <p className="reveal mt-6 text-lg leading-relaxed text-muted-foreground">{b.about.body}</p>
              <ul className="mt-8 grid gap-5">
                {b.about.principles.map((pr, i) => (
                  <li key={pr.title} className="reveal flex gap-4 rounded-2xl border border-border bg-surface p-5">
                    <span className="font-display text-2xl font-extrabold text-primary">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-plum">{pr.title}</h3>
                      <p className="mt-1 text-muted-foreground">{pr.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section bg-surface">
          <div className="container-site">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHead eyebrow="Services" title="Everyday plumbing, handled properly" />
              <a href="#contact" className="btn-outline-dark self-start md:self-auto">{b.cta.quote}</a>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {b.services.map((s) => (
                <li key={s.title} className="reveal service-card group">
                  <span className="grid size-14 place-items-center rounded-2xl bg-plum text-plum-foreground transition-colors group-hover:bg-primary"><Icon name={s.icon} className="size-7" /></span>
                  <div className="mt-6 flex items-start justify-between gap-3"><h3 className="font-display text-xl font-bold text-plum">{s.title}</h3><a href="#contact" aria-label={`Request a quote for ${s.title}`} className="service-arrow shrink-0 rounded-full p-1 text-primary"><Icon name="arrow" className="size-5" /></a></div>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how" className="section bg-plum text-plum-foreground">
          <div className="container-site">
            <div className="reveal max-w-2xl">
              <p className="eyebrow eyebrow-light">How it works</p>
              <h2 id="how" className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">Three simple steps</h2>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {b.steps.map((s, i) => (
                <li key={s.title} className="reveal relative rounded-3xl border border-plum-foreground/15 bg-plum-foreground/5 p-8">
                  <span className="font-display text-6xl font-extrabold text-primary">{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-plum-foreground/75">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Gallery */}
        <section aria-labelledby="gallery" className="section bg-background">
          <div className="container-site">
            <div className="reveal max-w-2xl">
              <p className="eyebrow">Gallery</p>
              <h2 id="gallery" className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-plum sm:text-4xl lg:text-5xl">The kind of work we do</h2>
              <p className="mt-4 text-muted-foreground">Representative images for illustration — replace with your own project photos.</p>
            </div>
            <ul className="mt-12 grid gap-5 md:grid-cols-4 md:grid-rows-2">
              {b.gallery.map((g, i) => (
                <li key={g.caption} className={`reveal gallery-item group relative overflow-hidden rounded-3xl ${i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-2" : ""}`}>
                  <img src={g.image} alt={g.caption} loading="lazy" className="h-full min-h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="gallery-overlay absolute inset-0" aria-hidden="true" />
                  <span className="gallery-caption absolute bottom-4 left-4 rounded-full bg-background/95 px-4 py-2 text-sm font-semibold text-plum">{g.caption}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Areas */}
        <section id="areas" className="section bg-surface">
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead eyebrow="Service areas" title={`Serving ${b.city} and nearby`} />
              <p className="reveal mt-5 text-lg text-muted-foreground">Not sure if you're in range? Get in touch and ask.</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7">
              {b.serviceAreas.map((a) => (
                <li key={a} className="reveal flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-4 font-semibold text-plum"><Icon name="pin" className="size-5 text-primary" />{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq" className="section bg-background">
          <div className="container-site max-w-3xl">
            <div className="reveal text-center">
              <p className="eyebrow">FAQ</p>
              <h2 id="faq" className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum sm:text-4xl lg:text-5xl">Common questions</h2>
            </div>
            <div className="reveal mt-10 divide-y divide-border rounded-3xl border border-border">
              {b.faqs.map((f) => (
                <MotionFaq key={f.q} question={f.q} answer={f.a} icon={<Icon name="plus" className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45" />} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section bg-plum text-plum-foreground">
          <div className="container-site grid gap-12 lg:grid-cols-2">
            <div className="reveal">
              <p className="eyebrow eyebrow-light">Contact</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">Tell us what's happening</h2>
              <p className="mt-5 max-w-md text-lg text-plum-foreground/80">Email a short description (photos help) or call. We'll come back with next steps and a clear estimate.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={mailto} data-magnetic className="btn-primary btn-lg"><Icon name="mail" className="size-5" />{b.cta.quote}</a>
                <a href={tel} data-magnetic className="btn-outline-light btn-lg"><Icon name="phone" className="size-5" />{b.phone}</a>
              </div>
            </div>
            <ul className="grid gap-4 self-start">
              {[
                { icon: "phone" as const, label: "Phone", value: b.phone, href: tel },
                { icon: "mail" as const, label: "Email", value: b.email, href: `mailto:${b.email}` },
                { icon: "pin" as const, label: "Address", value: b.address },
              ].map((c) => (
                <li key={c.label} className="reveal flex items-center gap-4 rounded-2xl bg-plum-foreground/5 p-5 ring-1 ring-plum-foreground/15">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon name={c.icon} className="size-5" /></span>
                  <div>
                    <p className="text-sm text-plum-foreground/65">{c.label}</p>
                    {c.href ? <a href={c.href} className="text-lg font-semibold hover:underline">{c.value}</a> : <p className="text-lg font-semibold">{c.value}</p>}
                  </div>
                </li>
              ))}
              <li className="text-sm text-plum-foreground/65">{b.footer.hours}</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-plum-deep text-plum-foreground">
        <div className="reveal container-site grid gap-10 py-14 md:grid-cols-3">
          <div>
            <Wordmark light />
            <p className="mt-4 max-w-xs text-sm text-plum-foreground/65">{b.footer.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="text-plum-foreground/80 hover:text-plum-foreground">{n.label}</a></li>)}
            </ul>
          </nav>
          <div className="text-sm">
            <a href={tel} className="block font-semibold">{b.phone}</a>
            <a href={`mailto:${b.email}`} className="mt-1 block text-plum-foreground/80">{b.email}</a>
            <p className="mt-1 text-plum-foreground/80">{b.address}</p>
            <ul className="mt-4 flex gap-4">
              {b.footer.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="text-plum-foreground/80 underline-offset-4 hover:underline">{s.label}</a></li>)}
            </ul>
          </div>
        </div>
        <p className="container-site border-t border-plum-foreground/10 py-6 text-xs text-plum-foreground/55">© {new Date().getFullYear()} {b.name}. Sample website template by Bricks & Frame.</p>
      </footer>
    </div>
  );
}
