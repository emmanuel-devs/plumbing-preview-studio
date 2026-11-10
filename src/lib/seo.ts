import type { BusinessConfig, PageKey, Service } from "@/data/businesses";

export const SITE_URL = "https://pipe-and-palette.lovable.app";

const PAGE_PATH: Record<PageKey, string> = { home: "", services: "/services", about: "/about", work: "/work", contact: "/contact" };
const PAGE_LABEL: Record<PageKey, string> = { home: "Home", services: "Services", about: "About", work: "Our work", contact: "Contact" };

export function pagePath(b: BusinessConfig, page: PageKey, service?: Service) {
  return `/preview/${b.slug}${service ? `/services/${service.slug}` : PAGE_PATH[page]}`;
}

export function pageText(b: BusinessConfig, page: PageKey, service?: Service) {
  if (service) {
    return {
      title: `${service.title} in ${b.city} — ${b.name}`,
      description: (service.detail?.intro ?? service.body).slice(0, 160),
    };
  }
  const o = b.seo.pages?.[page];
  if (page === "home") return { title: o?.title ?? b.seo.title, description: o?.description ?? b.seo.description };
  const defaults: Record<Exclude<PageKey, "home">, string> = {
    services: `Plumbing services from ${b.name} in ${b.city}: ${b.services.map((s) => s.title.toLowerCase()).slice(0, 4).join(", ")} and more.`,
    about: `About ${b.name} — how we work and the areas we serve around ${b.city}.`,
    work: `Examples of the kind of plumbing work ${b.name} takes on in ${b.city}.`,
    contact: `Contact ${b.name} in ${b.city} for a plumbing estimate by phone or email.`,
  };
  return { title: o?.title ?? `${PAGE_LABEL[page]} — ${b.name}`, description: o?.description ?? defaults[page] };
}

/** LocalBusiness data built only from supplied facts; never for sample brands, never ratings or reviews. */
export function localBusinessJsonLd(b: BusinessConfig): Record<string, unknown> | null {
  if (b.isSample) return null;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: b.name,
    url: `${SITE_URL}/preview/${b.slug}`,
  };
  if (b.phone) data["telephone"] = b.phone;
  if (b.email) data["email"] = b.email;
  if (b.address) data["address"] = b.address;
  if (b.serviceAreas.length) data["areaServed"] = b.serviceAreas;
  if (b.hours?.length) data["openingHours"] = b.hours.map((h) => `${h.days} ${h.time}`);
  if (b.facts?.foundedYear) data["foundingDate"] = String(b.facts.foundedYear);
  return data;
}

export function pageHead(b: BusinessConfig, page: PageKey, service?: Service) {
  const { title, description } = pageText(b, page, service);
  const url = `${SITE_URL}${pagePath(b, page, service)}`;
  const ld = page === "home" || page === "contact" ? localBusinessJsonLd(b) : null;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: service ? "article" : "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      ...(b.isSample ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: ld ? [{ type: "application/ld+json", children: JSON.stringify(ld) }] : [],
  };
}

export const unavailableHead = { meta: [{ title: "Page unavailable" }, { name: "robots", content: "noindex" }] };
