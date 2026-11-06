import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PlumbingSite } from "@/components/site/PlumbingSite";
import { getBusiness, businesses } from "@/data/businesses";

export const Route = createFileRoute("/preview/$slug")({
  loader: ({ params }) => {
    const b = getBusiness(params.slug);
    if (!b) throw notFound();
    return { slug: b.slug };
  },
  head: ({ loaderData }) => {
    const b = loaderData ? getBusiness(loaderData.slug) : undefined;
    if (!b) return { meta: [{ title: "Preview unavailable" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: b.seo.title },
        { name: "description", content: b.seo.description },
        { property: "og:title", content: b.seo.title },
        { property: "og:description", content: b.seo.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: Preview,
  notFoundComponent: Missing,
  errorComponent: Missing,
});

function Preview() {
  const { slug } = Route.useLoaderData();
  return <PlumbingSite b={getBusiness(slug)!} />;
}

function Missing() {
  return (
    <main className="grid min-h-screen place-items-center bg-plum font-body px-6 text-plum-foreground">
      <div className="max-w-md text-center">
        <p className="eyebrow eyebrow-light justify-center">Preview not found</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold">We couldn't find that preview</h1>
        <p className="mt-4 text-plum-foreground/75">Check the link, or open one of the available previews:</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {businesses.map((b) => (
            <li key={b.slug}><Link to="/preview/$slug" params={{ slug: b.slug }} className="btn-outline-light">{b.name}</Link></li>
          ))}
        </ul>
        <Link to="/" className="btn-primary mt-6">Go to sample site</Link>
      </div>
    </main>
  );
}
