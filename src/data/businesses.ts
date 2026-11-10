import heroPlumber from "@/assets/hero-plumber.jpg";
import aboutPlumber from "@/assets/about-plumber.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryPipes from "@/assets/gallery-pipes.jpg";
import galleryBasin from "@/assets/gallery-basin.jpg";
import galleryRadiator from "@/assets/gallery-radiator.jpg";

export type ServiceIcon = "leak" | "drain" | "heater" | "fixture" | "pipe" | "urgent";

export type PageKey = "home" | "services" | "about" | "work" | "contact";

export interface Service {
  /** URL segment, unique within one business. */
  slug: string;
  icon: ServiceIcon;
  title: string;
  /** Short card summary. */
  body: string;
  detail?: { intro: string; included: string[]; signs?: string[] };
  image?: string;
  imageAlt?: string;
  faqs?: { q: string; a: string }[];
}

export interface BusinessConfig {
  slug: string;
  name: string;
  /** Wordmark split: first part plain, second part accented. */
  wordmark: { primary: string; accent: string };
  phone: string; // display format
  phoneHref: string; // tel: value, digits only with country code
  email: string;
  address: string;
  city: string; // used in location-aware headline
  /** Brand colors as any valid CSS color (oklch/hex). */
  colors: { brand: string; brandDeep: string; accent: string };
  /** True for demo/fictional brands: shows a sample notice, keeps noindex and skips structured data. */
  isSample: boolean;
  seo: { title: string; description: string; pages?: Partial<Record<PageKey, { title?: string; description?: string }>> };
  /** Verified facts only. Leave undefined when unknown — nothing is shown or claimed. */
  facts?: { licenseNumber?: string; insured?: boolean; foundedYear?: number };
  /** Opening hours. Omit when unknown; pages then say "Contact for hours". */
  hours?: { days: string; time: string }[];
  /** Real form endpoint. Without one, contact uses email/phone only. */
  form?: { endpoint: string };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subcopy: string;
    image: string;
    imageAlt: string;
    trustCues: string[];
  };
  cta: { quote: string; call: string };
  highlights: string[];
  about: {
    heading: string;
    body: string;
    image: string;
    imageAlt: string;
    principles: { title: string; body: string }[];
  };
  services: Service[];
  steps: { title: string; body: string }[];
  gallery: { image: string; caption: string; alt?: string }[];
  serviceAreas: string[];
  faqs: { q: string; a: string }[];
  footer: {
    tagline: string;
    socials: { label: "Facebook" | "Instagram" | "LinkedIn"; href: string }[];
  };
}

const northline: BusinessConfig = {
  slug: "northline",
  name: "Northline Plumbing Co.",
  wordmark: { primary: "Northline", accent: "Plumbing" },
  phone: "(555) 010-4821",
  phoneHref: "+15550104821",
  email: "hello@northline-sample.com",
  address: "100 Sample Street, Riverton",
  city: "Riverton",
  colors: { brand: "#2d0a5e", brandDeep: "#210047", accent: "#F01426" },
  isSample: true,
  hours: [{ days: "Mon–Fri", time: "8:00–17:00 (sample hours)" }],
  seo: {
    title: "Northline Plumbing Co. — Sample plumbing website template",
    description:
      "A sample plumbing website for the fictional Northline Plumbing Co. Residential and commercial plumbing, clear estimates and straightforward scheduling.",
  },
  hero: {
    eyebrow: "Sample brand · Plumbing in Riverton",
    headline: "Plumbing done right in",
    headlineAccent: "Riverton",
    subcopy:
      "Leaks, clogs, water heaters and new fixtures — handled by a team that explains the work before it starts.",
    image: heroPlumber,
    imageAlt: "Plumber tightening a drain fitting under a kitchen sink",
    trustCues: ["Residential & commercial plumbing", "Clear estimates", "Tidy, respectful work"],
  },
  cta: { quote: "Request a quote", call: "Call us" },
  highlights: [
    "Upfront conversations about scope",
    "Homes, rentals and small businesses",
    "Repairs, replacements and installs",
    "Clean-up included with every visit",
  ],
  about: {
    heading: "A plumbing team that keeps you in the loop",
    body: "Northline is a sample company used to demonstrate this template. Replace this paragraph with a short, honest description of who you are, the kind of work you take on and how you like to treat customers.",
    image: aboutPlumber,
    imageAlt: "Plumber inspecting a water heater and copper pipework",
    principles: [
      { title: "Explain first", body: "We walk you through what we found and your options before any work begins." },
      { title: "Respect the space", body: "Floor protection, careful work and a clean finish are part of the job." },
      { title: "Fix it properly", body: "We aim for repairs that solve the cause, not just the symptom." },
    ],
  },
  services: [
    {
      slug: "leak-detection-repair", icon: "leak", title: "Leak detection & repair",
      body: "Track down hidden leaks and repair them before they cause bigger damage.",
      detail: {
        intro: "Small leaks can quietly damage floors, walls and cabinets. We locate the source, explain what we found and repair it properly.",
        included: ["Inspection of visible pipework, fixtures and connections", "Locating the source of the leak", "Repair or replacement of the affected section", "A clear explanation of the work before it starts"],
        signs: ["Unexplained rise in water use", "Damp patches or staining", "Sound of running water when taps are off"],
      },
      image: galleryPipes, imageAlt: "Close-up of supply pipes and shut-off valves",
      faqs: [{ q: "Can you find a leak I can't see?", a: "Often, yes. Describe the symptoms when you get in touch and we'll explain how we'd approach finding it." }],
    },
    {
      slug: "drain-cleaning", icon: "drain", title: "Drain cleaning",
      body: "Clear slow or blocked sinks, showers, toilets and main lines.",
      detail: {
        intro: "Slow drains usually get worse over time. We clear the blockage and tell you what likely caused it so it's less likely to return.",
        included: ["Sinks, showers, baths and toilets", "Main line blockages", "Advice on preventing repeat clogs"],
        signs: ["Water draining slowly", "Gurgling sounds", "Unpleasant smells from drains"],
      },
      image: heroPlumber, imageAlt: "Plumber working on a drain fitting under a sink",
    },
    {
      slug: "water-heater-service", icon: "heater", title: "Water heater service",
      body: "Repair, maintenance and replacement for tank and tankless units.",
      detail: {
        intro: "No hot water, strange noises or leaks around the tank? We'll assess the unit and explain whether repair or replacement makes more sense.",
        included: ["Diagnosis of tank and tankless units", "Repairs and part replacement", "Replacement and installation", "Routine maintenance"],
      },
      image: aboutPlumber, imageAlt: "Plumber inspecting a water heater",
    },
    {
      slug: "fixture-installation", icon: "fixture", title: "Fixture installation",
      body: "Faucets, toilets, showers, disposals and more — fitted neatly.",
      detail: {
        intro: "Whether you've chosen new fixtures or need advice, we fit them neatly and check everything works before we leave.",
        included: ["Faucets and basins", "Toilets and showers", "Garbage disposals", "Fitting fixtures you've already bought"],
      },
      image: galleryBasin, imageAlt: "Newly fitted basin and tap",
    },
    {
      slug: "pipe-repair", icon: "pipe", title: "Pipe repair",
      body: "Fix damaged, corroded or noisy pipes and replace sections as needed.",
      detail: {
        intro: "From a single corroded joint to a run of old pipe, we repair or replace what's needed and explain the options.",
        included: ["Repair of damaged or corroded sections", "Noisy pipe investigation", "Section replacement"],
      },
      image: galleryRadiator, imageAlt: "Radiator valve and pipe fitting",
    },
    {
      slug: "emergency-plumbing", icon: "urgent", title: "Emergency plumbing",
      body: "Burst pipe or major leak? Call us and we'll tell you how soon we can help.",
      detail: {
        intro: "If water is escaping, shut off the main valve first. Then call — we'll tell you honestly how soon we can get to you.",
        included: ["Burst and leaking pipes", "Major fixture failures", "Making the situation safe, then planning the repair"],
      },
      faqs: [{ q: "What should I do while I wait?", a: "Shut off the main water valve, switch off the water heater if nearby, and move valuables away from the water." }],
    },
  ],
  steps: [
    { title: "Tell us what's happening", body: "Call or send a message with a short description and, if you can, a photo." },
    { title: "Get a clear estimate", body: "We review the issue and explain the work and cost before anything starts." },
    { title: "Schedule the work", body: "Pick a time that suits you. We arrive prepared and leave the area clean." },
  ],
  gallery: [
    { image: galleryBathroom, caption: "Shower & fixture installation" },
    { image: galleryPipes, caption: "Supply line & valve work" },
    { image: aboutPlumber, caption: "Water heater service" },
    { image: heroPlumber, caption: "Under-sink drain repair" },
    { image: galleryBasin, caption: "Basin & tap installation" },
    { image: galleryRadiator, caption: "Radiator valve fitting" },
  ],
  serviceAreas: ["Riverton", "Oak Hollow", "Millbrook", "East Harbor", "Cedar Park", "Westfield", "Lakeview", "Stonebridge"],
  faqs: [
    { q: "How do I get an estimate?", a: "Call or use the quote button to email us. Describe the problem and include photos if possible — we'll follow up to discuss next steps." },
    { q: "Do you work on commercial properties?", a: "Yes. We handle both residential and commercial plumbing. Let us know the property type when you get in touch." },
    { q: "What should I do if a pipe bursts?", a: "Shut off your main water valve, switch off the water heater if nearby, move valuables away from water, then call us." },
    { q: "Do you install fixtures I've already bought?", a: "Usually, yes. Share the make and model so we can confirm compatibility before the visit." },
    { q: "Which areas do you serve?", a: "See the service areas list on this page. If you're nearby but not listed, ask — we may still be able to help." },
  ],
  footer: {
    tagline: "Sample plumbing brand for template demonstration only.",
    socials: [
      { label: "Facebook", href: "https://facebook.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
};

/** Example second prospect showing per-slug overrides. */
const harborview: BusinessConfig = {
  ...northline,
  slug: "harborview",
  name: "Harborview Plumbing (sample)",
  wordmark: { primary: "Harborview", accent: "Plumbing" },
  phone: "(555) 010-7733",
  phoneHref: "+15550107733",
  email: "office@harborview-sample.com",
  address: "22 Example Quay, Port Ellis",
  city: "Port Ellis",
  colors: { brand: "#0b3a4a", brandDeep: "#06242f", accent: "#F01426" },
  seo: {
    title: "Harborview Plumbing — Sample preview",
    description: "Sample preview of the plumbing template for a fictional Port Ellis company.",
  },
  hero: { ...northline.hero, eyebrow: "Sample brand · Plumbing in Port Ellis", headlineAccent: "Port Ellis" },
  about: { ...northline.about, body: "Harborview is a sample company used to demonstrate per-prospect previews. Replace this paragraph with an honest description of the business." },
  serviceAreas: ["Port Ellis", "Bayside", "North Pier", "Gull Point", "Fairhaven"],
};

export const businesses: BusinessConfig[] = [northline, harborview];

export const defaultBusiness = northline;

export function getBusiness(slug: string): BusinessConfig | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getService(b: BusinessConfig, serviceSlug: string): Service | undefined {
  return b.services.find((s) => s.slug === serviceSlug);
}
