import { createFileRoute } from "@tanstack/react-router";
import { PlumbingSite } from "@/components/site/PlumbingSite";
import { defaultBusiness as b } from "@/data/businesses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: b.seo.title },
      { name: "description", content: b.seo.description },
      { property: "og:title", content: b.seo.title },
      { property: "og:description", content: b.seo.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PlumbingSite b={b} />,
});
