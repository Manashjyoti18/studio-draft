export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  discipline: string;
  year: string;
  client?: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  image: string;
  link?: string;
  github?: string;
  tags: string[];
  featured: boolean;
  accentColor?: string;
  metrics?: { label: string; value: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  bio: string;
  expertise: string[];
  image: string;
  portfolio: string;
  github: string;
  linkedin: string;
  email: string;
}

export interface ServiceCategory {
  number: string;
  title: string;
  tagline: string;
  services: string[];
  deliverables: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  phase: string;
  description: string;
  outputs: string[];
}

export const STUDIO_DATA = {
  name: "STUDIO DRAFT",
  legalName: "Studio Draft Creative & Technical Studio",
  tagline: "We make digital things work.",
  subtext:
    "We design, develop and shape digital products, websites, software platforms and brands. We combine design, engineering and business thinking under one roof.",
  status: "Available for Q2/Q3 2026 Projects",
  location: "Guwahati & Dibrugarh, Assam, India, Global Remote",
  timeZone: "Asia/Kolkata (UTC+5:30)",
  coordinates: "26.1445° N, 91.7362° E",
  contactEmail: "studiodraft.space@gmail.com",
  phone: "+91 88225 32722",
  whatsapp: "https://wa.me/918822532722",
  instagram: "https://www.instagram.com/studiodraft.space/",
  linkedin: "https://www.linkedin.com/in/manash-jyoti-baruah-931608394/",
  established: "2024",

  manifesto: [
    {
      title: "Parallel execution, zero handoffs.",
      text: "We design UI, architect systems, and write production code concurrently. No designer-to-developer friction, no lost fidelity, no 3-month translation lag.",
    },
    {
      title: "Direct access to the builders.",
      text: "No account managers, no layers of middlemen. You communicate directly with the founders and engineers who have their hands in your codebase and Figma files.",
    },
    {
      title: "Every digital product is a revenue engine.",
      text: "We do not build aesthetic trophies that don't convert. Every interaction, onboarding funnel, checkout pipeline, and micro-copy element is engineered to drive retention and transactions.",
    },
  ],

  services: [
    {
      number: "01",
      title: "DIGITAL DESIGN",
      tagline: "Art-directed interfaces and precision design systems that captivate and convert.",
      services: [
        "UI/UX Design",
        "Product Design",
        "Website Design",
        "Design Systems",
        "Product Redesign",
        "Brand Identity",
      ],
      deliverables: [
        "Comprehensive Figma token libraries",
        "Interactive prototypes & motion specs",
        "Complete design system documentation",
        "Micro-interaction physics guidelines",
      ],
    },
    {
      number: "02",
      title: "DEVELOPMENT",
      tagline: "Resilient full-stack systems, high-speed frontends, and rock-solid cloud backends.",
      services: [
        "Website Development",
        "Full-Stack Development",
        "Web Applications",
        "SaaS Development",
        "Mobile Applications",
        "Backend & API Development",
        "System Architecture",
      ],
      deliverables: [
        "Production Next.js & React architectures",
        "Scalable REST & GraphQL microservices",
        "PostgreSQL & Redis database schema design",
        "CI/CD pipelines & cloud deployment scripts",
      ],
    },
    {
      number: "03",
      title: "PRODUCT & STRATEGY",
      tagline: "Pragmatic product discovery and architectural planning that eliminates wasted dev cycles.",
      services: [
        "Product Discovery",
        "MVP Planning",
        "Technical Consulting",
        "Product Architecture",
        "Digital Transformation",
      ],
      deliverables: [
        "Technical feasibility matrices",
        "Pragmatic MVP scoping roadmaps",
        "System architecture blueprints",
        "Vendor & technology selection audits",
      ],
    },
    {
      number: "04",
      title: "GROWTH & MARKETING",
      tagline: "Technical SEO, conversion rate optimization, and high-velocity acquisition funnels.",
      services: [
        "Technical SEO",
        "Digital Marketing",
        "Conversion Optimization",
        "Growth Strategy",
        "Landing Page Optimization",
      ],
      deliverables: [
        "Lighthouse 95+ performance optimization",
        "Structured schema & semantic indexation",
        "A/B testable high-conversion landing pages",
        "Analytics, event tracking & attribution setups",
      ],
    },
  ] as ServiceCategory[],

  projects: [
    {
      id: "toolkb",
      slug: "toolkb",
      title: "ToolKB.in",
      category: "Developer Utility Platform",
      discipline: "Full-Stack Web Application",
      year: "2026",
      summary:
        "Fast, client-side developer and productivity utilities with zero tracking and instant local browser execution.",
      problem:
        "Modern developer utilities (JSON formatters, regex testers, SVG optimizers, converters) are bloated with tracking scripts, slow server roundtrips, and paywalled tools that leak sensitive code snippets to third-party backends.",
      solution:
        "Engineered a zero-telemetry suite of web utilities executing entirely inside client-side Web Workers. Files, tokens, and payloads never leave the user's browser, achieving sub-10ms response times and total data privacy.",
      impact:
        "Over 30+ browser tools running at zero server latency. Trusted by developers looking for fast, zero-tracking, offline-capable productivity utilities.",
      image: "/images/projects/toolkb.webp",
      link: "https://toolkb.in/",
      tags: ["Next.js", "TypeScript", "Web Workers", "Tailwind CSS", "Privacy-First"],
      featured: true,
      accentColor: "#F07868",
      metrics: [
        { label: "Execution Latency", value: "<12ms" },
        { label: "Server Data Leakage", value: "0 bytes" },
        { label: "Browser Tools", value: "30+" },
      ],
    },
    {
      id: "arogya-relief",
      slug: "arogya-relief",
      title: "Arogya Relief",
      category: "Healthcare & Emergency Platform",
      discipline: "Mission-Critical System",
      year: "2025",
      summary:
        "Healthcare relief platform engineered for immediate emergency response, hospital bed inventory, and medical access in Assam.",
      problem:
        "During emergency situations and regional health crises, patients and families suffer from fragmented telephone hotlines, outdated bed availability data, and chaotic coordination between disparate clinics.",
      solution:
        "Architected a resilient emergency coordination portal with verified hospital bed inventories, interactive geolocation mapping, verified medical oxygen supplies, and rapid distress dispatching.",
      impact:
        "Connected regional medical centers with live inventory synchronization, significantly reducing critical dispatch delays during health emergencies in Northeast India.",
      image: "/images/projects/arogyarelief.webp",
      link: "https://www.arogyarelief.in/",
      tags: ["React", "Node.js", "PostgreSQL", "Mapbox GL", "WebSockets"],
      featured: true,
      accentColor: "#F07868",
      metrics: [
        { label: "Inventory Sync", value: "Realtime" },
        { label: "Hospitals Connected", value: "Verified" },
        { label: "Emergency Response", value: "Instant" },
      ],
    },
    {
      id: "brandcey",
      slug: "brandcey",
      title: "Brandcey",
      category: "Services Marketplace Platform",
      discipline: "Creative SaaS & Marketplace",
      year: "2026",
      summary:
        "Modern freelance marketplace connecting creators, brands, and digital builders with verified milestones and automated escrow.",
      problem:
        "Creative service marketplaces suffer from high platform rake fees, arbitrary account suspensions, and perpetual trust disputes between brands and independent specialists.",
      solution:
        "Designed and built a streamlined services marketplace with clear milestone checkpoints, escrowed payout releases, dedicated collaboration channels, and frictionless onboarding.",
      impact:
        "Empowers regional designers, creators, and developers to close enterprise-grade contracts with transparent milestone verification and guaranteed compensation.",
      image: "/images/projects/brandcey.webp",
      tags: ["Next.js", "Tailwind CSS", "Stripe Connect", "Node.js", "PostgreSQL"],
      featured: true,
      accentColor: "#F07868",
      metrics: [
        { label: "Milestone Payouts", value: "Escrowed" },
        { label: "Dispute Rate", value: "<0.5%" },
        { label: "Onboarding Flow", value: "3-step" },
      ],
    },
    {
      id: "motion-subtitles",
      slug: "motion-subtitles",
      title: "Motion Subtitle Studio",
      category: "Creator Productivity SaaS",
      discipline: "Audio-Visual Engine",
      year: "2025",
      summary:
        "Automated video captioning and kinetic subtitle generation engine with custom typography animation presets for creators.",
      problem:
        "Short-form video creators spend hours manually keyframing word-by-word kinetic subtitles in complex video editors, slowing down their daily publishing cadence.",
      solution:
        "Built a browser-based timeline editor that synchronizes speech-to-text waveforms with hardware-accelerated kinetic canvas renderers, exporting directly to MP4 with burned-in subtitles.",
      impact:
        "Reduces subtitle keyframing from 45 minutes per short to under 90 seconds, with studio-grade typography and animated emphasis markers.",
      image: "/images/projects/motionsubtitles.webp",
      link: "https://github.com/abhigyansaikiaa/Motion-Subtitle-Studio",
      github: "https://github.com/abhigyansaikiaa/Motion-Subtitle-Studio",
      tags: ["React", "Web Audio API", "Canvas 2D", "FFmpeg WASM", "Tailwind CSS"],
      featured: true,
      accentColor: "#F07868",
      metrics: [
        { label: "Render Pipeline", value: "Hardware WASM" },
        { label: "Time Saved/Clip", value: "95%" },
        { label: "Subtitle Presets", value: "18 Styles" },
      ],
    },
    {
      id: "dhankathaa",
      slug: "dhankathaa",
      title: "Dhankathaa",
      category: "Wealth & Asset Analytics",
      discipline: "Fintech Interface",
      year: "2025",
      summary:
        "Personal financial dashboard, investment intelligence, and portfolio tracking with localized fiscal analytics.",
      problem:
        "Existing wealth trackers in India are cluttered with cross-selling loans, insurance spam, and confusing UI that obscures net worth trajectory and asset allocation.",
      solution:
        "Constructed an uncluttered financial dashboard focusing on true net asset value, tax liability projections, compounding horizons, and multi-broker portfolio consolidation.",
      impact:
        "Clean, distraction-free fiscal visualization giving users an instant, honest view of their multi-asset holdings across equity, debt, and bullion.",
      image: "/images/projects/dhankathaa_demo_pro.webp",
      link: "https://github.com/abhigyansaikiaa",
      github: "https://github.com/abhigyansaikiaa",
      tags: ["React", "TypeScript", "D3.js", "Tailwind CSS", "Financial APIs"],
      featured: false,
      accentColor: "#F07868",
      metrics: [
        { label: "Asset Classes", value: "Multi-Broker" },
        { label: "Net Worth Model", value: "Automated" },
      ],
    },
    {
      id: "resumeiq",
      slug: "resumeiq",
      title: "ResumeIQ",
      category: "Career Tech & ATS Intelligence",
      discipline: "AI Parsing Workbench",
      year: "2025",
      summary:
        "Deep resume parser, ATS benchmark analyzer, and structured career feedback engine with semantic keyword matching.",
      problem:
        "Job seekers submit hundreds of applications into black-box corporate Applicant Tracking Systems without knowing why their qualifications are filtered out.",
      solution:
        "Developed a semantic parsing pipeline that compares resume vectors against job description requirements, highlighting missing domain competencies and keyword density.",
      impact:
        "Helps technical candidates optimize their resumes for both ATS automated algorithms and human engineering hiring managers.",
      image: "/images/projects/resumeiq-hero.png",
      link: "https://github.com/abhigyansaikiaa",
      github: "https://github.com/abhigyansaikiaa",
      tags: ["Python", "FastAPI", "React", "Vector Embeddings", "NLP"],
      featured: false,
      accentColor: "#F07868",
      metrics: [
        { label: "Parse Accuracy", value: "98.4%" },
        { label: "ATS Benchmark", value: "Realtime" },
      ],
    },
    {
      id: "blueprint-saas",
      slug: "blueprint-saas",
      title: "Enterprise SaaS Core",
      category: "Architecture Blueprint No. 0048",
      discipline: "Full-Stack SaaS Platform",
      year: "2025",
      summary:
        "High-throughput enterprise dashboard architecture with role-based access control, live analytics, and automated multi-tenant billing.",
      problem:
        "Founders waste 4 to 6 months building boilerplate auth, subscription billing, multi-tenancy, and audit logging before writing a single line of domain code.",
      solution:
        "Studio Draft's proprietary production architecture blueprint providing enterprise-grade multi-tenancy, Stripe webhook reconciliation, and responsive analytics out of the box.",
      impact:
        "Accelerates time-to-market for early-stage B2B SaaS ventures from 6 months down to 4 weeks.",
      image: "/images/projects/blueprint_saas.jpg",
      tags: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe Billing"],
      featured: false,
      accentColor: "#F07868",
      metrics: [
        { label: "Time to Market", value: "4 Weeks" },
        { label: "Architecture", value: "Multi-Tenant" },
      ],
    },
  ] as Project[],

  team: [
    {
      id: "manash",
      name: "Manash Jyoti Baruah",
      role: "CO-FOUNDER & TECH ARCHITECT",
      badge: "SYSTEMS ARCHITECT",
      bio: "Pursuing MCA at Dibrugarh University. Architecting high-throughput distributed systems, secure cloud backends, resilient database schemas, and end-to-end full-stack architectures.",
      expertise: [
        "Full-Stack Engineering",
        "Cloud Infrastructure",
        "System Architecture",
        "Backend & APIs",
        "Database Optimization",
      ],
      image: "/images/team/manash.webp",
      portfolio: "https://manash.studiodraft.space/",
      github: "https://github.com/Manashjyoti18",
      linkedin: "https://www.linkedin.com/in/manash-jyoti-baruah-931608394/",
      email: "manash.work.info@gmail.com",
    },
    {
      id: "abhigyan",
      name: "Abhigyan Saikia",
      role: "CO-FOUNDER & DESIGN LEAD",
      badge: "DESIGN LEAD",
      bio: "Product architect and design engineer. Creator of ToolKB.in and Brandcey. Specializing in high-conversion UI/UX, micro-interaction physics, design systems, and frontend engineering.",
      expertise: [
        "UI/UX Design",
        "Product Architecture",
        "Design Systems",
        "Frontend Engineering",
        "Micro-Interactions",
      ],
      image: "/images/team/abhigyan.webp",
      portfolio: "https://abhigyansaikia.in/",
      github: "https://github.com/abhigyansaikiaa",
      linkedin: "https://www.linkedin.com/in/abhigyan-saikia-26641227b/",
      email: "work.abhigyansaikia@gmail.com",
    },
    {
      id: "gouri",
      name: "Gouri Gayan",
      role: "PRODUCT & GROWTH STRATEGIST",
      badge: "GROWTH STRATEGIST",
      bio: "Leading product validation, business development, market positioning, and revenue funnel engineering. Ensuring products solve authentic market pain points with sustainable unit economics.",
      expertise: [
        "Product Strategy",
        "Market Positioning",
        "Revenue Optimization",
        "Growth Engineering",
        "User Acquisition",
      ],
      image: "/images/team/gouri.webp",
      portfolio: "https://gouri.studiodraft.space/",
      github: "https://github.com/Panda1811/",
      linkedin: "https://www.linkedin.com/in/gouri-gayan-9b9aa5352/",
      email: "gouri.work.info@gmail.com",
    },
    {
      id: "somujjal",
      name: "Somujjal Hazarika",
      role: "UI / UX DESIGNER",
      badge: "UI/UX DESIGNER",
      bio: "Crafting bespoke digital interfaces, design tokens, responsive layouts, and intuitive user experiences with high aesthetic discipline and meticulous typographic hierarchy.",
      expertise: [
        "Interface Design",
        "User Experience Research",
        "Visual Design Systems",
        "Digital Prototyping",
        "Design Tokens",
      ],
      image: "/images/team/somujjal.webp",
      portfolio: "",
      github: "",
      linkedin: "",
      email: "",
    },
  ] as TeamMember[],

  process: [
    {
      number: "01",
      title: "DISCOVER",
      phase: "01 // DISCOVER",
      description:
        "We dissect your business model, target audience, competitive dynamics, and technical constraints. No boilerplate workshops. We identify the exact bottleneck preventing growth.",
      outputs: ["Core problem definition", "Audience persona synthesis", "Technical scope envelope"],
    },
    {
      number: "02",
      title: "DEFINE",
      phase: "02 // DEFINE",
      description:
        "Establish precise technical scope, system architecture, database entities, creative direction, and milestone deliverables. We kill unnecessary features before writing a single line.",
      outputs: ["Pragmatic MVP specification", "System architecture diagram", "Design direction board"],
    },
    {
      number: "03",
      title: "DESIGN",
      phase: "03 // DESIGN",
      description:
        "Create responsive interfaces, high-fidelity wireframes, interactive motion prototypes, and comprehensive component tokens. Every state (loading, empty, error, active) is crafted.",
      outputs: ["Figma design system", "Interactive user flows", "Micro-interaction prototypes"],
    },
    {
      number: "04",
      title: "BUILD",
      phase: "04 // BUILD",
      description:
        "Production engineering with clean, typed code. We build with Next.js, TypeScript, PostgreSQL, and scalable backend services. Automated tests and daily staging preview links.",
      outputs: ["Production code repository", "Clean API schemas", "Staging environment previews"],
    },
    {
      number: "05",
      title: "LAUNCH",
      phase: "05 // LAUNCH",
      description:
        "Comprehensive QA, automated Lighthouse audits, SEO indexing verification, security checks, and zero-downtime production deployment.",
      outputs: ["Live production deployment", "Analytics & event logging", "Domain & SSL configuration"],
    },
    {
      number: "06",
      title: "IMPROVE",
      phase: "06 // IMPROVE",
      description:
        "Analyze active user behavior, track conversion funnel metrics, fix friction points, and iterate based on tangible business results rather than subjective opinions.",
      outputs: ["Conversion rate optimization", "Feature enhancement roadmap", "Ongoing performance tuning"],
    },
  ] as ProcessStep[],
};
