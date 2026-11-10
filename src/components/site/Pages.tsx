import { Link } from "@tanstack/react-router";
import type { BusinessConfig, Service } from "@/data/businesses";
import { Icon } from "./Icon";
import { MotionFaq } from "./MotionFaq";
import { mailto, tel } from "./SiteShell";

function PageHero({ b, eyebrow, title, intro, crumbs }: { b: BusinessConfig; eyebrow: string; title: string; intro?: string; crumbs: { label: string; service?: boolean }[] }) {
  return (
    <section className="relative overflow-hidden bg-plum text-plum-foreground">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container-site relative py-14 lg:py-20">
        <nav aria-label="Breadcrumb" data-entrance="60">
          <ol className="flex flex-wrap gap-2 text-sm text-plum-foreground/70">
            <li><Link to="/preview/$slug" params={{ slug: b.slug }} className="hover:underline">Home</Link></li>
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex gap-2"><span aria-hidden="true">/</span>
                {c.service ? <Link to="/preview/$slug/services" params={{ slug: b.slug }} className="hover:underline">{c.label}</Link> : <span aria-current={i === crumbs.length - 1 ? "page" : undefined}>{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <p data-entrance="120" className="eyebrow eyebrow-light mt-6">{eyebrow}</p>
        <h1 data-entrance="200" className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p data-entrance="300" className="mt-5 max-w-2xl text-lg text-plum-foreground/80">{intro}</p>}
      </div>
    </section>
  );
}

function CtaBand({ b }: { b: BusinessConfig }) {
  return (
    <section className="section bg-surface">
      <div className="reveal container-site flex flex-col items-start justify-between gap-6 rounded-3xl bg-plum p-8 text-plum-foreground md:flex-row md:items-center lg:p-12">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Tell us what's happening</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/preview/$slug/contact" params={{ slug: b.slug }} data-magnetic className="btn-primary btn-lg">{b.cta.quote}<Icon name="arrow" className="size-5" /></Link>
          {b.phone && <a href={tel(b)} className="btn-outline-light btn-lg"><Icon name="phone" className="size-5" />{b.phone}</a>}
        </div>
      </div>
    </section>
  );
}

function ServiceGrid({ b, items }: { b: BusinessConfig; items: Service[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <li key={s.slug} className="reveal service-card group relative">
          <span className="grid size-14 place-items-center rounded-2xl bg-plum text-plum-foreground transition-colors group-hover:bg-primary"><Icon name={s.icon} className="size-7" /></span>
          <h2 className="mt-6 font-display text-xl font-bold text-plum">
            <Link to="/preview/$slug/services/$serviceSlug" params={{ slug: b.slug, serviceSlug: s.slug }} className="after:absolute after:inset-0">{s.title}</Link>
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
          <span className="service-arrow mt-4 inline-flex items-center gap-2 font-semibold text-primary">Learn more <Icon name="arrow" className="size-4" /></span>
        </li>
      ))}
    </ul>
  );
}

function Faqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="reveal mt-6 divide-y divide-border rounded-3xl border border-border">
      {faqs.map((f) => <MotionFaq key={f.q} question={f.q} answer={f.a} icon={<Icon name="plus" className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45" />} />)}
    </div>
  );
}

export function ServicesPage({ b }: { b: BusinessConfig }) {
  return (
    <>
      <PageHero b={b} eyebrow="Services" title="Everyday plumbing, handled properly" intro={`What ${b.name} can help with around ${b.city}.`} crumbs={[{ label: "Services" }]} />
      <section className="section bg-background"><div className="container-site"><ServiceGrid b={b} items={b.services} /></div></section>
      <CtaBand b={b} />
    </>
  );
}

export function ServiceDetailPage({ b, s }: { b: BusinessConfig; s: Service }) {
  const image = s.image ?? b.hero.image;
  return (
    <>
      <PageHero b={b} eyebrow={`Service · ${b.city}`} title={s.title} intro={s.detail?.intro ?? s.body} crumbs={[{ label: "Services", service: true }, { label: s.title }]} />
      <section className="section bg-background">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div className="reveal overflow-hidden rounded-3xl shadow-card"><img src={image} alt={s.imageAlt ?? b.hero.imageAlt} loading="lazy" className="aspect-[4/3] w-full object-cover" /></div>
          <div>
            {s.detail?.included.length ? <><h2 className="reveal font-display text-2xl font-extrabold text-plum">What this covers</h2>
              <ul className="mt-5 grid gap-3">{s.detail.included.map((i) => <li key={i} className="reveal flex gap-3"><Icon name="check" className="mt-1 size-5 shrink-0 text-primary" />{i}</li>)}</ul></> : <p className="text-lg text-muted-foreground">{s.body}</p>}
            {s.detail?.signs?.length ? <><h2 className="reveal mt-10 font-display text-2xl font-extrabold text-plum">Signs to look out for</h2>
              <ul className="mt-5 grid gap-3">{s.detail.signs.map((i) => <li key={i} className="reveal flex gap-3"><Icon name="pin" className="mt-1 size-5 shrink-0 text-primary" />{i}</li>)}</ul></> : null}
            {s.faqs?.length ? <><h2 className="reveal mt-10 font-display text-2xl font-extrabold text-plum">Questions</h2><Faqs faqs={s.faqs} /></> : null}
          </div>
        </div>
      </section>
      <section className="section bg-surface"><div className="container-site">
        <h2 className="reveal font-display text-3xl font-extrabold text-plum">Other services</h2>
        <div className="mt-8"><ServiceGrid b={b} items={b.services.filter((x) => x.slug !== s.slug).slice(0, 3)} /></div>
      </div></section>
      <CtaBand b={b} />
    </>
  );
}

export function ServiceMissing({ b }: { b: BusinessConfig }) {
  return (
    <section className="section bg-background"><div className="container-site max-w-2xl text-center">
      <h1 className="font-display text-4xl font-extrabold text-plum">Service not found</h1>
      <p className="mt-4 text-muted-foreground">That service isn't listed for {b.name}.</p>
      <Link to="/preview/$slug/services" params={{ slug: b.slug }} className="btn-primary mt-6">See all services</Link>
    </div></section>
  );
}

export function AboutPage({ b }: { b: BusinessConfig }) {
  return (
    <>
      <PageHero b={b} eyebrow="About us" title={b.about.heading} crumbs={[{ label: "About" }]} />
      <section className="section bg-background">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal overflow-hidden rounded-3xl shadow-card"><img data-parallax="0.05" src={b.about.image} alt={b.about.imageAlt} loading="lazy" className="parallax-image aspect-square w-full object-cover" /></div>
          <div>
            <p className="reveal text-lg leading-relaxed text-muted-foreground">{b.about.body}</p>
            <ul className="mt-8 grid gap-5">{b.about.principles.map((p, i) => (
              <li key={p.title} className="reveal flex gap-4 rounded-2xl border border-border bg-surface p-5"><span className="font-display text-2xl font-extrabold text-primary">0{i + 1}</span><div><h2 className="font-display text-lg font-bold text-plum">{p.title}</h2><p className="mt-1 text-muted-foreground">{p.body}</p></div></li>
            ))}</ul>
            {b.facts?.licenseNumber && <p className="reveal mt-6 text-sm text-muted-foreground">License: {b.facts.licenseNumber}</p>}
          </div>
        </div>
      </section>
      <section className="section bg-surface"><div className="container-site">
        <h2 className="reveal font-display text-3xl font-extrabold text-plum">Areas we serve</h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{b.serviceAreas.map((a) => <li key={a} className="reveal flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-4 font-semibold text-plum"><Icon name="pin" className="size-5 text-primary" />{a}</li>)}</ul>
      </div></section>
      <CtaBand b={b} />
    </>
  );
}

export function WorkPage({ b }: { b: BusinessConfig }) {
  return (
    <>
      <PageHero b={b} eyebrow="Our work" title="The kind of work we do" intro="Example photos for illustration — not a record of specific completed projects." crumbs={[{ label: "Our work" }]} />
      <section className="section bg-background"><div className="container-site">
        <ul className="gallery-mosaic">
          {b.gallery.map((g) => (
            <li key={g.caption} className="reveal gallery-item relative overflow-hidden rounded-3xl">
              <img src={g.image} alt={g.alt ?? g.caption} loading="lazy" className="gallery-photo" />
              <span className="gallery-overlay absolute inset-0" aria-hidden="true" />
              <span className="gallery-caption absolute bottom-4 left-4 rounded-full bg-background/95 px-4 py-2 text-sm font-semibold text-plum">{g.caption}</span>
            </li>
          ))}
        </ul>
      </div></section>
      <CtaBand b={b} />
    </>
  );
}

export function ContactPage({ b }: { b: BusinessConfig }) {
  const rows = [
    b.phone && { icon: "phone" as const, label: "Phone", value: b.phone, href: tel(b) },
    b.email && { icon: "mail" as const, label: "Email", value: b.email, href: `mailto:${b.email}` },
    b.address && { icon: "pin" as const, label: "Address", value: b.address },
  ].filter(Boolean) as { icon: "phone" | "mail" | "pin"; label: string; value: string; href?: string }[];
  return (
    <>
      <PageHero b={b} eyebrow="Contact" title="Tell us what's happening" intro="Email a short description (photos help) or call. We'll come back with next steps and a clear estimate." crumbs={[{ label: "Contact" }]} />
      <section className="section bg-background">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div className="reveal rounded-3xl border border-border bg-surface p-8">
            <h2 className="font-display text-2xl font-extrabold text-plum">Request a quote</h2>
            <p className="mt-3 text-muted-foreground">{b.form ? "Use the options below to reach us." : "This website doesn't send forms. Email or call us directly — your email app opens with the subject filled in."}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {b.email && <a href={mailto(b)} data-magnetic className="btn-primary btn-lg"><Icon name="mail" className="size-5" />{b.cta.quote}</a>}
              {b.phone && <a href={tel(b)} className="btn-outline-dark btn-lg"><Icon name="phone" className="size-5" />{b.cta.call}</a>}
            </div>
          </div>
          <ul className="grid gap-4 self-start">
            {rows.map((c) => (
              <li key={c.label} className="reveal flex items-center gap-4 rounded-2xl border border-border p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon name={c.icon} className="size-5" /></span>
                <div><p className="text-sm text-muted-foreground">{c.label}</p>{c.href ? <a href={c.href} className="text-lg font-semibold text-plum hover:underline">{c.value}</a> : <p className="text-lg font-semibold text-plum">{c.value}</p>}</div>
              </li>
            ))}
            <li className="reveal flex items-center gap-4 rounded-2xl border border-border p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-plum text-plum-foreground"><Icon name="clock" className="size-5" /></span>
              <div><p className="text-sm text-muted-foreground">Hours</p>{b.hours?.length ? b.hours.map((h) => <p key={h.days} className="font-semibold text-plum">{h.days} · {h.time}</p>) : <p className="font-semibold text-plum">Contact for hours</p>}</div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
