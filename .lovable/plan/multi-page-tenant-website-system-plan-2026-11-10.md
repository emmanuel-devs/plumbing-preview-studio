# Multi-page tenant website system — plan

## 1. Current architecture (verified)
- `src/data/businesses.ts`: one `BusinessConfig` type, two samples (`northline`, `harborview`), `getBusiness()`. Services have no slug or detail content. Hours are a single string. No SEO fields beyond title/description.
- `src/components/site/PlumbingSite.tsx` (~340 lines): one big component that renders header, mobile menu, hero, highlights, about, services, steps, bento gallery, areas, FAQ, contact and footer. Every link is an in-page `#anchor`.
- `useMotion.ts` (entrance, reveals, parallax, magnetic, section highlight) and `MotionFaq.tsx` work on a host element, so they can be reused per page.
- Routes: `/` renders the default business; `/preview/$slug` checks the slug, shows a fallback for unknown ones, and sets per-business head tags with `noindex`.
- Hosting: the template builds for Cloudflare-style edge by default (`vite.config.ts`). A Vercel target needs an explicit adapter setting (see risks).

## 2. Route structure
```text
src/routes/
  index.tsx                         /            sample homepage (unchanged look)
  preview.$slug.tsx                 layout: loads business, header + footer + <Outlet/>
  preview.$slug.index.tsx           /preview/:slug           homepage
  preview.$slug.services.tsx        layout <Outlet/> only
  preview.$slug.services.index.tsx  /preview/:slug/services
  preview.$slug.services.$serviceSlug.tsx  service detail
  preview.$slug.about.tsx
  preview.$slug.work.tsx
  preview.$slug.contact.tsx
```
- The `$slug` layout loader throws `notFound()` for unknown businesses (existing fallback page reused). The service detail loader throws `notFound()` for unknown service slugs, showing a tenant-branded "Service not found" panel with links to that business's services.
- `/` keeps rendering the default business homepage. Its nav links point to `/preview/northline/...` subpages, so the root stays a single safe showcase without duplicating routes.

## 3. Data model (typed, config-only)
Extend `BusinessConfig` without breaking existing entries:
- `services[]`: add `slug`, `summary`, optional `detail` (intro, whatIsIncluded[], signs[]), optional `image`, optional `faqs[]`.
- `hours?: { days: string; time: string }[]` — omitted when unknown; UI shows "Contact for hours".
- `contact`: phone, email, address are optional individually; components hide what is missing.
- `facts?: { licensed?, insured?, foundedYear?, ... }` — only rendered or put in structured data when provided. Samples leave them empty.
- `nav?`: optional override of page order/labels; default shared nav.
- `seo`: per-page overrides (`home`, `services`, `about`, `work`, `contact`) with fallbacks generated from name + city.
- `isSample: boolean` — shows a small "Sample website" note and keeps `noindex`.
- `gallery[]`: add optional `alt`; tiles assigned to bento slots by position, so any count 4–7 maps to defined compositions.
- `form?: { endpoint?: string }` — none today, so contact uses mailto/tel.
- Helpers: `getBusiness`, `getService(b, slug)`, `pageMeta(b, page, service?)`, `localBusinessJsonLd(b)`.
- A small test checks unique business slugs, unique service slugs per business, and required fields.

## 4. Shared components (`src/components/site/`)
Split `PlumbingSite.tsx` into: `SiteShell` (motion host, skip link), `SiteHeader` + `MobileMenu`, `SiteFooter`, `PageHero` (smaller inner-page hero), `Breadcrumbs`, `ServiceCard` / `ServicesGrid`, `BentoGallery`, `FaqSection` (uses `MotionFaq`), `ContactPanel`, `CtaBand`, `HowItWorks`, `ServiceAreas`, `About`, `HomeHero`.
- `HomePage` composes the same sections in the same order, so the homepage looks and behaves the same.
- All internal links use typed `<Link to="/preview/$slug/..." params>`; active states via `activeProps`, `aria-current="page"`. In-page anchors stay only for homepage scroll targets.
- Theme: existing plum/red tokens stay the default; optional `colors` applied as CSS variables on the shell (already in config).

## 5. Page content
- Services index: page hero, grid of the business's services linking to detail pages, how-it-works, CTA.
- Service detail: hero with service image (falls back to hero image), description, included items, service FAQs if any, related services, quote/call CTA, breadcrumbs.
- About: about copy, principles, areas, facts only if supplied.
- Work: full bento gallery with a clear note "Example photos" (no project claims), CTA.
- Contact: phone/email/address/hours where present, mailto/tel actions, labelled "This preview does not send forms — use email or phone." No fake submit.

## 6. SEO
- Each leaf `head()`: unique title, description, og:title/description/type, twitter:card, canonical and og:url built as `https://pipe-and-palette.lovable.app/preview/:slug/...`.
- One `h1` per page; sections use `h2`/`h3`.
- LocalBusiness JSON-LD (Plumber type) on home/contact only with supplied fields; skipped entirely for `isSample` businesses so demos make no claims. No rating/review fields ever.
- Samples stay `noindex`; real prospects may set `isSample: false`.

## 7. Migration sequence
1. Extend types + add slugs/details to both samples; add data test.
2. Split `PlumbingSite` into shared components; keep `/` and `/preview/$slug` rendering identically (visual check before continuing).
3. Convert `preview.$slug.tsx` into layout + `index` leaf.
4. Add services index and detail routes, then about, work, contact.
5. Switch nav/footer/CTAs to tenant-aware links; homepage section CTAs link to `/contact` or anchors as appropriate.
6. Head metadata, JSON-LD helpers, breadcrumbs.
7. Update README "Adding a prospect" and AGENTS.md rules.
8. Verification (below).

## 8. Risks specific to TanStack Start
- Route filename must match `createFileRoute` id exactly; `services.tsx` becomes a layout needing `<Outlet/>`.
- Loader data can be undefined in `notFoundComponent`/`head()`; use params, and `noindex` fallback.
- Motion hook relies on a host element: re-run on route change (key by pathname) so reveals fire on client navigation, and scroll to top on page change; keep hash scrolling for homepage anchors.
- Mobile menu must close on navigation.
- Images imported from `src/assets` are relative URLs, so no og:image tags unless an absolute URL is supplied.
- Vercel: the current build targets edge/Cloudflare by default. Deploying to Vercel needs the Nitro preset set to Vercel; I'll confirm the exact setting before changing build config, and won't change it unless you confirm Vercel is the real target. Direct-load/refresh works because every route is SSR'd.

## 9. Verification checklist
- Unit tests: data integrity, `getService`, meta builder, JSON-LD omits missing facts and skips samples, existing motion tests still pass.
- Playwright at 1280, 768, 390 for both businesses: every page loads directly and after refresh; nav active state; mobile menu opens, closes on link click and Escape; breadcrumbs correct; no horizontal overflow; bento gallery intact on home and work.
- Leak check: on each Harborview page, no Northline name/phone/email appears (and vice versa).
- Unknown business and unknown service show the right fallback with 404 behaviour.
- Reduced motion: no running animations; no-JS: content visible, links work.
- Head tags: unique title/canonical per page inspected in SSR HTML.
- Build log clean; production build on Vercel preset smoke-tested if adopted.

## Adding a prospect (after this work)
Add one typed entry to `src/data/businesses.ts` with a unique slug, services (each with a slug), images and any verified facts. All six page types appear automatically at `/preview/<slug>/...` — no new pages or projects.
