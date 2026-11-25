"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import SafeImage from "@/components/common/SafeImage";
import ComponentErrorBoundary from "@/components/common/ComponentErrorBoundary";

const ServicesLinearSection = dynamic(
  () => import("@/components/sections/ServicesLinearSection"),
  { ssr: false }
);
const ProcessLinearSection = dynamic(
  () => import("@/components/sections/ProcessLinearSection"),
  { ssr: false }
);
const CompareTableSection = dynamic(
  () => import("@/components/sections/CompareTableSection"),
  { ssr: false }
);
const TeamSection = dynamic(
  () => import("@/components/sections/TeamSection"),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { ssr: false }
);
const FAQSection = dynamic(
  () => import("@/components/common/FAQSection"),
  { ssr: false }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection"),
  { ssr: false }
);

const WarpCarousel = dynamic(
  () => import("../../../components/ui/warp-carousel"),
  { ssr: false }
);

export type ProjectFilterType = "All" | "Live" | "Client" | "Preview" | "Demo";

export interface ProfessionalWorkItem {
  id: string;
  name: string;
  category: string;
  status: "Live" | "Preview" | "Demo";
  filterCategory: "Live" | "Client" | "Preview" | "Demo";
  url: string;
  domain: string;
  line: string;
  image: string;
  hasRealImage: boolean;
  ctaType: "visit" | "demo" | "preview-only" | "in-progress";
}

const PROJECTS_LIST: ProfessionalWorkItem[] = [
  {
    id: "toolkb",
    name: "ToolKB.in",
    category: "LIVE TOOL",
    status: "Live",
    filterCategory: "Live",
    url: "https://toolkb.in",
    domain: "toolkb.in",
    line: "Free online tools, exact KB image compressor, client-side, no signup.",
    image: "/images/projects/toolkb.webp",
    hasRealImage: true,
    ctaType: "visit",
  },
  {
    id: "brandcey",
    name: "Brandcey",
    category: "COMMERCE",
    status: "Live",
    filterCategory: "Live",
    url: "",
    domain: "brandcey.in",
    line: "Curated design services connecting agencies with founders.",
    image: "/images/projects/brandcey.webp",
    hasRealImage: true,
    ctaType: "in-progress",
  },
  {
    id: "arogyarelief",
    name: "Arogya Relief",
    category: "HEALTHCARE",
    status: "Live",
    filterCategory: "Live",
    url: "https://www.arogyarelief.in",
    domain: "arogyarelief.in",
    line: "Emergency relief and healthcare access across India.",
    image: "/images/projects/arogyarelief.webp",
    hasRealImage: true,
    ctaType: "visit",
  },
  {
    id: "retrocafe",
    name: "The Retro Cafe",
    category: "CLIENT, CAFE",
    status: "Live",
    filterCategory: "Client",
    url: "https://theretrocafe.in",
    domain: "theretrocafe.in",
    line: "Retro themed cafe in Mon, Nagaland. Fresh bakes and roasts, artisanal coffee and sourdough, live music and karaoke nights, home delivery and bookings.",
    image: "/images/projects/retro_cafe.webp",
    hasRealImage: true,
    ctaType: "visit",
  },
  {
    id: "nelcakes",
    name: "Nel Cakes",
    category: "PREVIEW, BAKERY",
    status: "Preview",
    filterCategory: "Preview",
    url: "",
    domain: "@nel.cakes",
    line: "Custom cakes and grazing tables in Ottawa, orders by WhatsApp, client confirms each order. Preview only, not live yet.",
    image: "",
    hasRealImage: false,
    ctaType: "preview-only",
  },
  {
    id: "cafebakerydemo",
    name: "Cafe and Bakery Demo",
    category: "DEMO, NOT A CLIENT SITE",
    status: "Demo",
    filterCategory: "Demo",
    url: "https://cafebakerydemo.42web.io",
    domain: "cafebakerydemo.42web.io",
    line: "Demo example for cafes and bakeries, menu, hours and booking in one place.",
    image: "/images/projects/cafe_bakery_demo.svg",
    hasRealImage: true,
    ctaType: "demo",
  },
  {
    id: "beautysalondemo",
    name: "Beauty and Salon Demo",
    category: "DEMO, NOT A CLIENT SITE",
    status: "Demo",
    filterCategory: "Demo",
    url: "https://beautybussiness.freedev.app",
    domain: "beautybussiness.freedev.app",
    line: "Demo example for beauty and salon businesses.",
    image: "/images/projects/beauty_salon_demo.svg",
    hasRealImage: true,
    ctaType: "demo",
  },
];

const CAROUSEL_ITEMS = [
  {
    name: "ToolKB.in",
    tag: "LIVE TOOL",
    domain: "toolkb.in",
    url: "https://toolkb.in",
    line: "Free online tools, exact KB image compressor, client-side, no signup.",
    isBrandcey: false,
  },
  {
    name: "Brandcey",
    tag: "COMMERCE",
    domain: "brandcey.in",
    url: "",
    line: "Curated design services connecting agencies with founders.",
    isBrandcey: true,
  },
  {
    name: "Arogya Relief",
    tag: "HEALTHCARE",
    domain: "arogyarelief.in",
    url: "https://www.arogyarelief.in",
    line: "Emergency relief and healthcare access across India.",
    isBrandcey: false,
  },
  {
    name: "The Retro Cafe",
    tag: "CLIENT, CAFE",
    domain: "theretrocafe.in",
    url: "https://theretrocafe.in",
    line: "Cafe website for Mon, Nagaland, menu, hours and location in one place.",
    isBrandcey: false,
  },
];

export default function PostDescentWorkSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterType>("Live");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselInView, setIsCarouselInView] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carouselContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCarouselInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = PROJECTS_LIST.filter((proj) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Live") return proj.status === "Live";
    if (activeFilter === "Client") return proj.filterCategory === "Client" || proj.category.includes("CLIENT");
    if (activeFilter === "Preview") return proj.status === "Preview";
    if (activeFilter === "Demo") return proj.status === "Demo";
    return true;
  });

  const filterChips: ProjectFilterType[] = ["All", "Live", "Client", "Preview", "Demo"];
  const currentCarouselItem = CAROUSEL_ITEMS[carouselIndex] || CAROUSEL_ITEMS[0];

  return (
    <div className="relative w-full bg-[#FAF5EB] text-[#0A1F44]">
      {/* WORK SECTION */}
      <section
        id="work"
        className="relative w-full bg-[#FAF5EB] text-[#0A1F44] py-16 md:py-24 px-6 md:px-8 border-b border-[#0A1F44]/10 select-none overflow-hidden"
      >
        <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col gap-10 sm:gap-14">
          {/* Numbered hairline rule: 05 on left, OUR WORK on right */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-[#0A1F44]/12">
            <span className="font-mono text-[11px] font-semibold text-[#FF6B4A] tracking-[0.3em]">
              05
            </span>
            <span className="font-mono text-[11px] font-medium text-[#0A1F44]/60 tracking-[0.24em] uppercase">
              OUR WORK // PRODUCTION CASE STUDIES
            </span>
          </div>

          {/* Top Header Block */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FF6B4A]">
              OUR WORK // 07 PROJECTS
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#0A1F44] leading-[1.0]">
              Work that runs.
            </h2>
            <p className="font-sans text-[17px] sm:text-[18px] text-[#0A1F44]/75 leading-[1.6] mt-2">
              Websites engineered and operating in active production. Select any project below to inspect the deployment.
            </p>
          </div>

          {/* Filter Chips: Rounded pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {filterChips.map((chip) => {
              const isActive = activeFilter === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(chip)}
                  className={`px-5 py-2.5 rounded-full font-mono text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] min-h-[44px] transition-all duration-300 ${
                    isActive
                      ? "bg-[#0A1F44] text-[#FAF5EB] shadow-sm"
                      : "bg-white text-[#0A1F44]/75 border border-[#0A1F44]/15 hover:border-[#0A1F44] hover:text-[#0A1F44]"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* FEATURED CASE STUDY: THE RETRO CAFE */}
          <div className="w-full rounded-[20px] bg-white border border-[#0A1F44]/12 shadow-[0_8px_24px_rgba(10,31,68,0.08)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(10,31,68,0.14)] transition-all duration-300 overflow-hidden flex flex-col lg:grid lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 relative w-full aspect-[16/10] sm:aspect-[16/10] lg:aspect-auto min-h-[260px] sm:min-h-[360px] lg:min-h-full bg-[#0A1F44]/5 border-b lg:border-b-0 lg:border-r border-[#0A1F44]/12">
              <SafeImage
                src="/images/projects/retro_cafe.webp"
                alt="The Retro Cafe Homepage live website screenshot"
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1920px) 55vw, 880px"
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 2xl:p-10 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FF6B4A] text-white font-mono text-[11px] font-semibold tracking-wider uppercase inline-block">
                    CLIENT // LIVE
                  </span>
                </div>

                <h3 className="font-serif text-[28px] sm:text-[34px] 2xl:text-[38px] font-light tracking-tight text-[#0A1F44] leading-[1.1]">
                  The Retro Cafe
                </h3>

                <div className="font-mono text-[12px] sm:text-[13px] text-[#6B7280]">
                  Mon, Nagaland &bull; theretrocafe.in
                </div>

                <p className="font-sans text-[15px] sm:text-[16px] text-[#354B70] leading-[1.6]">
                  Retro themed cafe in Mon. Menu, hours, location, live music nights, delivery and table booking in one place.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-[#0A1F44]/10 font-mono text-[10px] sm:text-[11px] font-medium text-[#0A1F44]/70 uppercase tracking-wider">
                <span>LIVE SITE</span>
                <span>&bull;</span>
                <span>MENU AND BOOKING</span>
                <span>&bull;</span>
                <span>MON, NAGALAND</span>
              </div>

              {/* Two buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2">
                <a
                  href="https://theretrocafe.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap flex-shrink-0 h-[52px] px-7 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85A3A] text-white font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all shadow-sm active:translate-y-0 flex items-center justify-center"
                >
                  <span>VISIT WEBSITE</span>
                </a>

                <a
                  href="https://theretrocafe.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap flex-shrink-0 h-[52px] px-7 rounded-[4px] border border-[#0A1F44]/30 hover:bg-[#0A1F44] hover:text-[#FAF5EB] text-[#0A1F44] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all active:translate-y-0 flex items-center justify-center"
                >
                  <span>SEE MENU</span>
                </a>
              </div>
            </div>
          </div>

          {/* WORKS LIST CARDS (With soft shadows, white card containers, hover lift) */}
          <ComponentErrorBoundary name="WorkGrid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects?.map((project) => (
                <div
                  key={project?.id || Math.random()}
                  className="group rounded-[16px] bg-white border border-[#0A1F44]/12 shadow-[0_4px_16px_rgba(10,31,68,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(10,31,68,0.12)] transition-all duration-300 p-5 flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-[16/10] bg-[#0A1F44]/5 rounded-[10px] overflow-hidden border border-[#0A1F44]/10">
                    {project?.hasRealImage && project?.image ? (
                      <SafeImage
                        src={project.image}
                        alt={`${project.name || "Work"} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0A1F44] text-[#FAF5EB]">
                        <span className="font-serif text-[24px] font-semibold tracking-tight text-[#FAF5EB]">
                          {project?.name || "Project"}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FAF5EB]/60 mt-2">
                          Screenshot unavailable
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-5 flex flex-col justify-between flex-grow gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h4 className="font-serif text-[20px] sm:text-[22px] 2xl:text-[24px] font-normal tracking-tight text-[#0A1F44]">
                          {project.name}
                        </h4>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {project.id === "brandcey" ? (
                            <>
                              <span className="px-2.5 py-0.5 rounded-full bg-[#0A1F44]/10 text-[#0A1F44] font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider">
                                COMMERCE
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B4A] text-white font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider">
                                IN PROGRESS
                              </span>
                            </>
                          ) : (
                            <>
                              {project.status === "Live" && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#0A1F44] text-[#FAF5EB] font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider">
                                  Live
                                </span>
                              )}
                              {project.status === "Preview" && (
                                <>
                                  <span className="px-2.5 py-0.5 rounded-full bg-[#0A1F44]/10 text-[#0A1F44] font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider">
                                    PREVIEW
                                  </span>
                                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B4A] text-white font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider">
                                    IN PROGRESS
                                  </span>
                                </>
                              )}
                              {project.status === "Demo" && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#0A1F44]/5 text-[#0A1F44] border border-[#0A1F44]/20 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider">
                                  Demo
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="font-mono text-[12px] 2xl:text-[13px] text-[#6B7280]">
                        {project.domain}
                      </div>

                      <p className="font-sans text-[14px] sm:text-[15px] 2xl:text-[16px] text-[#354B70] leading-[1.55] pt-1">
                        {project.line}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#0A1F44]/10 flex items-center justify-between gap-2 font-mono text-[11px] 2xl:text-[12px]">
                      <span className="uppercase tracking-wider text-[#6B7280] font-medium">
                        {project.category}
                      </span>

                      {/* Plain text actions only */}
                      {project.ctaType === "visit" && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#FF6B4A] hover:underline transition-colors"
                        >
                          <span>VISIT WEBSITE</span>
                        </a>
                      )}
                      {project.ctaType === "demo" && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#FF6B4A] hover:underline transition-colors"
                        >
                          <span>VIEW DEMO</span>
                        </a>
                      )}
                      {project.ctaType === "in-progress" && (
                        <span className="font-mono text-[11px] font-semibold text-[#FF6B4A] uppercase tracking-wider select-none cursor-default">
                          IN PROGRESS
                        </span>
                      )}
                      {project.ctaType === "preview-only" && (
                        <span className="font-semibold text-[#FF6B4A] tracking-wider select-none">
                          PREVIEW ONLY
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ComponentErrorBoundary>

          <div className="text-center font-mono text-[11px] 2xl:text-[12px] text-[#0A1F44]/60 tracking-wide pt-2">
            All screenshots represent authentic captures of the production deployments and demonstrations listed above. Nel Cakes is a preview and is not live yet.
          </div>

          {/* WARP CAROUSEL STAGE */}
          <div className="w-full pt-10 sm:pt-14 border-t border-[#0A1F44]/15 flex flex-col gap-4">
            <div
              ref={carouselContainerRef}
              className="relative w-full aspect-[5/4] sm:aspect-auto h-[420px] sm:h-[460px] lg:h-[520px] rounded-[16px] overflow-hidden bg-[#071633] border border-[#0A1F44]/15 shadow-[0_8px_24px_rgba(10,31,68,0.08)] flex items-center justify-center"
            >
              <ComponentErrorBoundary name="WarpCarousel">
                {isCarouselInView ? (
                  <WarpCarousel
                    index={carouselIndex}
                    onIndexChange={setCarouselIndex}
                    background="#071633"
                    warp={1}
                    autoplay={true}
                    interval={3.6667}
                    step={2}
                    ariaLabel="Studio Draft work motion preview"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="font-mono text-xs uppercase tracking-widest text-[#FAF5EB]/40">
                    INITIALIZING MOTION STRIP...
                  </div>
                )}
              </ComponentErrorBoundary>
            </div>

            {/* Detail bar below Warp Carousel: rounded card on cream background */}
            <div className="w-full rounded-[14px] bg-white border border-[#0A1F44]/12 shadow-[0_4px_16px_rgba(10,31,68,0.06)] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-serif text-[20px] sm:text-[24px] font-semibold text-[#0A1F44] tracking-tight">
                    {currentCarouselItem.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0A1F44]/10 text-[#0A1F44] font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider">
                    {currentCarouselItem.tag}
                  </span>
                  {currentCarouselItem.isBrandcey && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B4A] text-white font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider">
                      IN PROGRESS
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#6B7280]">
                  <span className="text-[#0A1F44] font-medium">{currentCarouselItem.domain}</span>
                  <span>&bull;</span>
                  <span className="font-sans text-xs sm:text-sm text-[#354B70]">
                    {currentCarouselItem.line}
                  </span>
                </div>
              </div>

              {/* Navigation controls: Plain text PREV and NEXT buttons, no arrows */}
              <div className="flex items-center gap-3 self-end md:self-center flex-wrap sm:flex-nowrap">
                <div className="px-3 py-1.5 rounded-[4px] bg-[#0A1F44] font-mono text-[11px] font-semibold text-[#FAF5EB]">
                  {String(carouselIndex + 1).padStart(2, "0")} / 04
                </div>

                <button
                  onClick={() => setCarouselIndex((prev) => (prev - 1 + 4) % 4)}
                  className="px-3 py-1.5 rounded-[4px] border border-[#0A1F44]/30 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#FAF5EB] transition-colors"
                  aria-label="Previous work item"
                >
                  PREV
                </button>

                <button
                  onClick={() => setCarouselIndex((prev) => (prev + 1) % 4)}
                  className="px-3 py-1.5 rounded-[4px] border border-[#0A1F44]/30 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#FAF5EB] transition-colors"
                  aria-label="Next work item"
                >
                  NEXT
                </button>

                {currentCarouselItem.isBrandcey ? (
                  <span className="px-4 py-2 rounded-[4px] border border-[#FF6B4A]/40 text-[#FF6B4A] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] select-none cursor-default">
                    IN PROGRESS
                  </span>
                ) : (
                  <a
                    href={currentCarouselItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85A3A] text-white font-mono text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] transition-all min-h-[44px]"
                  >
                    <span>VISIT WEBSITE</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* SERVICES SECTION */}
      <ServicesLinearSection />

      {/* PROCESS SECTION */}
      <ProcessLinearSection />

      {/* COMPARE SECTION */}
      <CompareTableSection />

      {/* TEAM SECTION */}
      <TeamSection />

      {/* FAQ SECTION */}
      <FAQSection />

      {/* CONTACT SECTION */}
      <ContactSection />
    </div>
  );
}
