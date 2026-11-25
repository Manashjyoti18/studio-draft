export interface LanyardLink {
  label: string;
  href: string;
}

export interface LanyardMember {
  id: string;
  name: string;
  role: string;
  team: string;
  tone: 1 | 2 | 3 | 4 | 5;
  image: string;
  bio: string;
  tags: string[];
  links: LanyardLink[];
}

export const STUDIO_DRAFT_TEAM: LanyardMember[] = [
  {
    id: "manash",
    name: "Manash Jyoti Baruah",
    role: "Co-Founder and Tech Architect",
    team: "Studio Draft - Tech",
    tone: 1,
    image: "/images/team/manash.webp",
    bio: "Builds high-throughput systems, cloud infrastructure and core backends. MCA student at Dibrugarh University, full stack developer with 4 plus projects.",
    tags: ["Full Stack", "Cloud", "Backend"],
    links: [
      { label: "Portfolio", href: "https://manash.studiodraft.space" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/manash-jyoti-baruah-931608394" },
      { label: "GitHub", href: "https://github.com/Manashjyoti18" },
      { label: "Email", href: "mailto:manash.work.info@gmail.com" },
    ],
  },
  {
    id: "abhigyan",
    name: "Abhigyan Saikia",
    role: "Co-Founder and Design Lead",
    team: "Studio Draft - Design",
    tone: 2,
    image: "/images/team/abhigyan.webp",
    bio: "Crafts conversion UI and UX, micro-interactions and visual design systems. Full stack developer and product architect from Assam, India.",
    tags: ["UI UX", "Product", "Frontend"],
    links: [
      { label: "Portfolio", href: "https://abhigyansaikia.in" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/abhigyan-saikia-26641227b" },
      { label: "GitHub", href: "https://github.com/abhigyansaikiaa" },
      { label: "Email", href: "mailto:work.abhigyansaikia@gmail.com" },
    ],
  },
  {
    id: "gouri",
    name: "Gouri Gayan",
    role: "Product and Growth Strategist",
    team: "Studio Draft - Growth",
    tone: 1,
    image: "/images/team/gouri.webp",
    bio: "Drives product strategy, market positioning and growth acceleration. Turns a good product into a product people find and buy.",
    tags: ["Strategy", "Growth", "Positioning"],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/gouri-gayan-9b9aa5352" },
      { label: "GitHub", href: "https://github.com/Panda1811" },
      { label: "Email", href: "mailto:gouri.work.info@gmail.com" },
    ],
  },
  {
    id: "somujjal",
    name: "Somujjal Hazarika",
    role: "UI and UX Designer",
    team: "Studio Draft - Design",
    tone: 2,
    image: "/images/team/somujjal.webp",
    bio: "Crafting bespoke user interfaces, digital experiences, and visual design systems.",
    tags: ["UI Design", "UX", "Design Systems"],
    links: [],
  },
];
