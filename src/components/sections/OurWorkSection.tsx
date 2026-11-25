"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  stack: string;
  image: string;
  url?: string;
  isBlueprint?: boolean;
  isInProgress?: boolean;
}

const FEATURED_BLUEPRINTS: ProjectItem[] = [
  {
    id: "bp-saas",
    name: "Enterprise SaaS Blueprint No. 0842",
    category: "SYSTEM PERFORMANCE & ANALYTICS PLATFORM",
    desc: "System performance telemetry, query caching engine, and multi-tenant telemetry dashboards.",
    stack: "React, Node.js, TimescaleDB, AWS, Docker",
    image: "/images/projects/blueprint_saas.jpg",
    isBlueprint: true,
  },
  {
    id: "bp-fintech",
    name: "Fintech Settlement Engine Blueprint No. 0048A",
    category: "HIGH-THROUGHPUT FINANCIAL SETTLEMENT ENGINE",
    desc: "ACID-compliant settlement processor, double-entry ledger architecture, and automated reconciliation.",
    stack: "Python, Go, PostgreSQL, Redis, Kubernetes",
    image: "/images/projects/blueprint_fintech.jpg",
    isBlueprint: true,
  },
];

const CLIENT_WORK: ProjectItem[] = [
  {
    id: "retro-cafe",
    name: "The Retro Cafe",
    category: "CAFE WEBSITE",
    desc: "Full-service aesthetic cafe website with food menu, location directions and WhatsApp orders.",
    stack: "Next.js, Tailwind CSS, Vercel",
    image: "/images/projects/retro_cafe.png",
    url: "https://theretrocafe.in",
  },
  {
    id: "nel-cakes",
    name: "Nel Cakes",
    category: "OTTAWA HOME BAKER WEBSITE",
    desc: "Custom artisanal cake portfolio, flavor selection menu, and private order request pipeline.",
    stack: "Next.js, React, Design System",
    image: "/images/projects/cafe_bakery_demo.svg",
    isInProgress: true,
  },
  {
    id: "cafe-bakery-demo",
    name: "Cafe and Bakery Demo",
    category: "COMMERCE BLUEPRINT",
    desc: "Fast digital bakery storefront with categorized menu, cart checkout, and opening schedule.",
    stack: "Next.js, Static Export",
    image: "/images/projects/cafe_bakery_demo.svg",
    url: "https://cafebakerydemo.42web.io",
  },
  {
    id: "beauty-salon-demo",
    name: "Beauty and Salon Demo",
    category: "SERVICE BLUEPRINT",
    desc: "Luxury salon service catalog with treatment pricing, stylist profiles, and booking calendar.",
    stack: "React, CSS Modules",
    image: "/images/projects/beauty_salon_demo.svg",
    url: "https://beautybussiness.freedev.app",
  },
];

const PLATFORM_PRODUCTS: ProjectItem[] = [
  {
    id: "toolkb",
    name: "ToolKB.in",
    category: "BROWSER UTILITY PLATFORM",
    desc: "High-speed browser-based developer utilities, image processors, and client-side conversion tools.",
    stack: "Next.js, WebAssembly",
    image: "/images/projects/toolkb.webp",
    url: "https://toolkb.in",
  },
  {
    id: "brandcey",
    name: "Brandcey",
    category: "CREATIVE SERVICES MARKETPLACE",
    desc: "Curated design services marketplace connecting specialized agencies with product founders.",
    stack: "React, Node.js, Stripe",
    image: "/images/projects/brandcey.webp",
    url: "https://brandcey.in",
  },
  {
    id: "arogya-relief",
    name: "Arogya Relief",
    category: "HEALTHCARE PLATFORM",
    desc: "Emergency medical supply coordination, verified hospital bed telemetry, and doctor queues.",
    stack: "Next.js, PostgreSQL",
    image: "/images/projects/arogyarelief.webp",
    url: "https://www.arogyarelief.in",
  },
  {
    id: "motion-subtitles",
    name: "Motion Subtitle Studio",
    category: "AUTOMATION STUDIO",
    desc: "Automated video transcription and animated kinetic typography rendering engine.",
    stack: "Next.js, FFmpeg, Canvas API",
    image: "/images/projects/motionsubtitles.webp",
  },
  {
    id: "gcmr",
    name: "GCMR.IN",
    category: "COMMERCIAL PLATFORM",
    desc: "Industrial machinery distribution platform, product spec catalogue, and procurement requests.",
    stack: "React, Headless CMS",
    image: "/images/projects/qrivna_demo_pro.webp",
    url: "https://gcmr.in",
  },
  {
    id: "brollwriter",
    name: "BrollWriter",
    category: "CONTENT TOOL",
    desc: "AI-free script sequencing tool for video creators, scene pacing timers, and shot checklists.",
    stack: "React, LocalStorage",
    image: "/images/projects/brollwriter_demo_pro.webp",
  },
  {
    id: "resumeiq",
    name: "ResumeIQ",
    category: "CAREER SYSTEM",
    desc: "ATS-compliant resume generator with structured typography, clean PDF rendering, and zero fluff.",
    stack: "Next.js, React-PDF",
    image: "/images/projects/resumeiq-hero.png",
  },
  {
    id: "dhankathaa",
    name: "Dhankathaa",
    category: "FINTECH TOOL",
    desc: "Personal finance ledger, cash-flow projection charts, and recurring bill reminder engine.",
    stack: "React, Tailwind, IndexedDB",
    image: "/images/projects/dhankathaa_demo_pro.webp",
  },
];

export default function OurWorkSection() {
  return (
    <section id="work" className="relative w-full bg-[#0A1F44] text-[#FAF5EB] py-18 sm:py-20 px-6 border-b border-[#E3DCCB]/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-[#E3DCCB]/20 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-2 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
              <span>PAST WORK // VERIFIED RELEASES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF5EB]">
              Verified Work. Zero Startup Fluff.
            </h2>
          </div>
          <div className="max-w-md text-sm text-[#FAF5EB]/75 font-normal leading-relaxed">
            Every specimen below is production code, bespoke design, and reliable systems built by our 4-lead squad. No fictional showcase items or fake client quotes.
          </div>
        </div>

        {/* 1. Featured Architectural Blueprints */}
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-mono text-[#FAF5EB]/60 mb-6 pb-2 border-b border-[#E3DCCB]/15">
            01 // CORE SYSTEM BLUEPRINTS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_BLUEPRINTS.map((bp) => (
              <div
                key={bp.id}
                className="group border border-[#E3DCCB]/20 bg-[#0B2340] rounded-2xl overflow-hidden hover:border-[#FF6B4A] transition-all duration-300 flex flex-col justify-between shadow-subtle"
              >
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#0A1F44]">
                  <Image
                    src={bp.image}
                    alt={bp.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#0A1F44]/90 border border-[#E3DCCB]/20 rounded font-mono text-[10px] text-[#FAF5EB] uppercase tracking-mono">
                    {bp.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#FAF5EB] mb-2 group-hover:text-[#FF6B4A] transition-colors">
                    {bp.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF5EB]/75 leading-relaxed mb-4">
                    {bp.desc}
                  </p>
                  <div className="font-mono text-[11px] text-[#FAF5EB]/50 pt-3 border-t border-[#E3DCCB]/15 uppercase tracking-mono">
                    STACK: {bp.stack}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Client Work (Local Brands, Cafes, Bakeries) */}
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-mono text-[#FAF5EB]/60 mb-6 pb-2 border-b border-[#E3DCCB]/15">
            02 // CLIENT WEBSITES &amp; COMMERCE
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_WORK.map((item) => (
              <div
                key={item.id}
                className="group border border-[#E3DCCB]/20 bg-[#0B2340] rounded-xl overflow-hidden hover:border-[#FF6B4A] transition-all duration-300 flex flex-col justify-between shadow-subtle"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#0A1F44]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  {item.isInProgress && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#FF6B4A] text-white font-mono text-[9px] uppercase tracking-mono font-bold rounded">
                      IN PROGRESS
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="font-mono text-[10px] text-[#FAF5EB]/60 uppercase tracking-mono mb-1">
                      {item.category}
                    </div>
                    <h4 className="font-serif text-lg font-bold uppercase tracking-tight text-[#FAF5EB] mb-1.5 group-hover:text-[#FF6B4A] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#FAF5EB]/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E3DCCB]/15 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#FAF5EB]/50 uppercase">
                      {item.stack.split(",")[0]}
                    </span>
                    {item.url ? (
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-[#FF6B4A] hover:underline"
                      >
                        <span>Visit</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="font-mono text-[10px] text-[#FAF5EB]/50">
                        PREVIEW ONLY
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Platform Products (from abhigyansaikia.in) */}
        <div>
          <div className="font-mono text-xs uppercase tracking-mono text-[#FAF5EB]/60 mb-6 pb-2 border-b border-[#E3DCCB]/15">
            03 // PLATFORMS, TOOLS &amp; SYSTEMS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORM_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="group border border-[#E3DCCB]/20 bg-[#0B2340] rounded-xl overflow-hidden hover:border-[#FF6B4A] transition-all duration-300 flex flex-col justify-between shadow-subtle"
              >
                <div className="relative h-40 w-full overflow-hidden bg-[#0A1F44]">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="font-mono text-[10px] text-[#FAF5EB]/60 uppercase tracking-mono mb-1">
                      {prod.category}
                    </div>
                    <h4 className="font-serif text-lg font-bold uppercase tracking-tight text-[#FAF5EB] mb-1.5 group-hover:text-[#FF6B4A] transition-colors">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-[#FAF5EB]/75 leading-relaxed">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E3DCCB]/15 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#FAF5EB]/50 uppercase">
                      {prod.stack.split(",")[0]}
                    </span>
                    {prod.url ? (
                      <Link
                        href={prod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-[#FF6B4A] hover:underline"
                      >
                        <span>Live</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="font-mono text-[10px] text-[#FAF5EB]/50">
                        INTERNAL
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
