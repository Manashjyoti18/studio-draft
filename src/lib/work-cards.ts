import {
  STUDIO_DRAFT_WORK_CARDS,
  makeBrandMesh,
  type WarpCard,
} from "@/components/ui/warp-carousel";

export interface FeaturedWorkItem {
  id: string;
  name: string;
  tag: string;
  domain: string;
  url: string;
  line: string;
}

export const FEATURED_WORKS: FeaturedWorkItem[] = [
  {
    id: "toolkb",
    name: "ToolKB.in",
    tag: "LIVE TOOL",
    domain: "toolkb.in",
    url: "https://toolkb.in",
    line: "Free online tools, exact KB image compressor, client-side, no signup.",
  },
  {
    id: "brandcey",
    name: "Brandcey",
    tag: "COMMERCE",
    domain: "brandcey.in",
    url: "",
    line: "Curated design services connecting agencies with founders.",
  },
  {
    id: "arogya-relief",
    name: "Arogya Relief",
    tag: "HEALTHCARE",
    domain: "arogyarelief.in",
    url: "https://www.arogyarelief.in",
    line: "Emergency relief and healthcare access across India.",
  },
  {
    id: "retro-cafe",
    name: "The Retro Cafe",
    tag: "CAFE",
    domain: "theretrocafe.in",
    url: "https://theretrocafe.in",
    line: "Cafe website for Mon, Nagaland, menu, hours and location in one place.",
  },
];

export const workCards: WarpCard[] = STUDIO_DRAFT_WORK_CARDS;
export { makeBrandMesh };
