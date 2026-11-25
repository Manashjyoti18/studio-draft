export interface Project {
  slug: string;
  name: string;
  type: string;
  domain: string;
  url?: string;
  tags: string[];
  screenshot: string;
  isDemo: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "toolkb",
    name: "ToolKB.in",
    type: "Tools",
    domain: "toolkb.in",
    url: "https://toolkb.in",
    tags: ["Tools"], // CONFIRM
    screenshot: "/work/toolkb.webp",
    isDemo: false,
  },
  {
    slug: "brandcey",
    name: "Brandcey",
    type: "SaaS",
    domain: "brandcey.in",
    url: "https://brandcey.in",
    tags: ["SaaS"], // CONFIRM
    screenshot: "/work/brandcey.webp",
    isDemo: false,
  },
  {
    slug: "arogya-relief",
    name: "Arogya Relief",
    type: "SaaS",
    domain: "arogyarelief.in",
    url: "https://www.arogyarelief.in",
    tags: ["SaaS"], // CONFIRM
    screenshot: "/work/arogya-relief.webp",
    isDemo: false,
  },
  {
    slug: "motion-subtitle-studio",
    name: "Motion Subtitle Studio",
    type: "Tools",
    domain: "offline",
    tags: ["Tools"], // CONFIRM
    screenshot: "/work/motion-subtitles.webp",
    isDemo: false,
  },
  {
    slug: "the-retro-cafe",
    name: "The Retro Cafe",
    type: "Cafe and Bakery",
    domain: "theretrocafe.in",
    url: "https://theretrocafe.in",
    tags: ["Cafe and Bakery", "Websites", "Client Work"], // CONFIRM
    screenshot: "/work/retro-cafe.png",
    isDemo: false,
  },
  {
    slug: "nel-cakes",
    name: "Nel Cakes",
    type: "Cafe and Bakery",
    domain: "offline",
    tags: ["Cafe and Bakery", "Websites"], // CONFIRM
    screenshot: "/work/nel-cakes.webp",
    isDemo: false,
  },
  {
    slug: "qrivna",
    name: "Qrivna",
    type: "SaaS",
    domain: "offline",
    tags: ["SaaS", "Tools"], // CONFIRM
    screenshot: "/work/qrivna.webp",
    isDemo: false,
  },
  {
    slug: "brollwriter",
    name: "BrollWriter",
    type: "Tools",
    domain: "offline",
    tags: ["Tools"], // CONFIRM
    screenshot: "/work/brollwriter.webp",
    isDemo: false,
  },
  {
    slug: "dhankathaa",
    name: "Dhankathaa",
    type: "Websites",
    domain: "offline",
    tags: ["Websites"], // CONFIRM
    screenshot: "/work/dhankathaa.webp",
    isDemo: false,
  },
  {
    slug: "gcmr",
    name: "GCMR.IN",
    type: "Websites",
    domain: "gcmr.in",
    url: "https://gcmr.in",
    tags: ["Websites"], // CONFIRM
    screenshot: "/work/gcmr.webp",
    isDemo: false,
  },
  {
    slug: "resumeiq",
    name: "ResumeIQ",
    type: "Tools",
    domain: "offline",
    tags: ["Tools"], // CONFIRM
    screenshot: "/work/resumeiq.png",
    isDemo: false,
  },
  {
    slug: "cafe-bakery-demo",
    name: "Cafe and Bakery Demo",
    type: "Cafe and Bakery",
    domain: "cafebakerydemo.42web.io",
    url: "https://cafebakerydemo.42web.io",
    tags: ["Cafe and Bakery"], // CONFIRM
    screenshot: "/work/cafe-bakery-demo.svg",
    isDemo: true,
  },
  {
    slug: "beauty-demo",
    name: "Beauty Demo",
    type: "Websites",
    domain: "beautybussiness.freedev.app",
    url: "https://beautybussiness.freedev.app",
    tags: ["Websites"], // CONFIRM
    screenshot: "/work/beauty-demo.svg",
    isDemo: true,
  },
];
