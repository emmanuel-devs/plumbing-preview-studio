import heroPlumber from "@/assets/hero-plumber.jpg";
import aboutPlumber from "@/assets/about-plumber.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryPipes from "@/assets/gallery-pipes.jpg";

export type ServiceIcon = "leak" | "drain" | "heater" | "fixture" | "pipe" | "urgent";

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
  seo: { title: string; description: string };
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
  services: { icon: ServiceIcon; title: string; body: string }[];
  steps: { title: string; body: string }[];
  gallery: { image: string; caption: string }[];
  serviceAreas: string[];
  faqs: { q: string; a: string }[];
  footer: {
    tagline: string;
    hours: string;
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
    { icon: "leak", title: "Leak detection & repair", body: "Track down hidden leaks and repair them before they cause bigger damage." },
    { icon: "drain", title: "Drain cleaning", body: "Clear slow or blocked sinks, showers, toilets and main lines." },
    { icon: "heater", title: "Water heater service", body: "Repair, maintenance and replacement for tank and tankless units." },
    { icon: "fixture", title: "Fixture installation", body: "Faucets, toilets, showers, disposals and more — fitted neatly." },
    { icon: "pipe", title: "Pipe repair", body: "Fix damaged, corroded or noisy pipes and replace sections as needed." },
    { icon: "urgent", title: "Emergency plumbing", body: "Burst pipe or major leak? Call us and we'll tell you how soon we can help." },
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
    hours: "Mon–Fri · 8:00–17:00 (sample hours)",
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
