import { Link } from "@tanstack/react-router";
import type { BusinessConfig } from "@/data/businesses";
import { MotionFaq } from "./MotionFaq";
import { Icon } from "./Icon";
import { mailto, tel } from "./SiteShell";

export function SectionHead({ eyebrow, title, light, center }: { eyebrow: string; title: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-plum-foreground" : "text-plum"}`}>
        {title}
      </h2>
    </div>
  );
}

/** Homepage sections, unchanged design, rendered inside SiteShell. */
export function HomePage({ b }: { b: BusinessConfig }) {
  return (
    <>
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
                <a href={tel(b)} data-entrance="540" data-magnetic className="btn-outline-light btn-lg"><Icon name="phone" className="size-5" />{b.cta.call} · {b.phone}</a>
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
                  <div className="mt-6 flex items-start justify-between gap-3"><h3 className="font-display text-xl font-bold text-plum">{s.title}</h3><Link to="/preview/$slug/services/$serviceSlug" params={{ slug: b.slug, serviceSlug: s.slug }} aria-label={`Learn about ${s.title}`} className="service-arrow shrink-0 rounded-full p-1 text-primary"><Icon name="arrow" className="size-5" /></Link></div>
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
            <ul className="gallery-mosaic mt-12">
              {b.gallery.map((g) => (
                <li key={g.caption} className="reveal gallery-item relative overflow-hidden rounded-3xl">
                  <img src={g.image} alt={g.caption} loading="lazy" className="gallery-photo" />
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
                <a href={mailto(b)} data-magnetic className="btn-primary btn-lg"><Icon name="mail" className="size-5" />{b.cta.quote}</a>
                <a href={tel(b)} data-magnetic className="btn-outline-light btn-lg"><Icon name="phone" className="size-5" />{b.phone}</a>
              </div>
            </div>
            <ul className="grid gap-4 self-start">
              {[
                { icon: "phone" as const, label: "Phone", value: b.phone, href: tel(b) },
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
              {b.hours?.map((h) => <li key={h.days} className="text-sm text-plum-foreground/65">{h.days} · {h.time}</li>)}
            </ul>
          </div>
        </section>
          </>
  );
}
