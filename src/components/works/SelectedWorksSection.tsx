"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Lock, MapPin, User, ExternalLink, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  name: string;
  location?: string;
  category: "CLIENT WORK" | "DEMO PROJECT";
  status: string;
  statusType: "live" | "preview" | "demo";
  builtBy?: string;
  approvalDate?: string;
  description: string;
  website?: string;
  image?: string;
  accent: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "retro-cafe",
    name: "The Retro Cafe",
    location: "Mon, Nagaland",
    category: "CLIENT WORK",
    status: "LIVE",
    statusType: "live",
    builtBy: "Abhigyan Saikia",
    description:
      "A website for The Retro Cafe, presenting its café identity and essential business information.",
    website: "https://theretrocafe.in/",
    image: "/images/projects/retro_cafe.png",
    accent: "#B7E4C7", // Green
  },
  {
    id: "nel-cakes",
    name: "Nel Cakes",
    location: "Ottawa, Canada",
    category: "CLIENT WORK",
    status: "IN PROGRESS • PREVIEW ONLY",
    statusType: "preview",
    approvalDate: "Client approved the preview on 16 November 2026",
    description:
      "A website project for Nel Cakes. Handcrafted identity and showcase for an artisanal home bakery based in Ottawa.",
    accent: "#FF6B35", // Orange
  },
  {
    id: "cafe-bakery-demo",
    name: "Cafe and Bakery Demo",
    category: "DEMO PROJECT",
    status: "DEMO EXAMPLE • NOT A CLIENT PROJECT",
    statusType: "demo",
    description:
      "A demonstration website concept for a café and bakery.",
    website: "https://cafebakerydemo.42web.io/",
    image: "/images/projects/cafe_bakery_demo.svg",
    accent: "#111111", // Ink Black
  },
  {
    id: "beauty-salon-demo",
    name: "Beauty and Salon Demo",
    category: "DEMO PROJECT",
    status: "DEMO EXAMPLE • NOT A CLIENT PROJECT",
    statusType: "demo",
    description:
      "A demonstration website concept for a beauty and salon business.",
    website: "https://beautybussiness.freedev.app/",
    image: "/images/projects/beauty_salon_demo.svg",
    accent: "#111111", // Ink Black
  },
];

export default function SelectedWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      return; // Fluid natural scrolling on mobile/reduced motion
    }

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>(".project-chapter");
      const browserFrame = document.querySelector(".browser-presentation-frame");

      // Master Pinned Scroll Story
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTrackRef.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const index = Math.min(
              PROJECTS.length - 1,
              Math.floor(self.progress * PROJECTS.length)
            );
            setActiveChapter(index);
          },
        },
      });

      // Browser Frame initial entrance & perspective settling
      tl.fromTo(
        browserFrame,
        {
          rotateX: 12,
          scale: 0.94,
          y: 40,
        },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      );

      // Transitions between project chapters
      chapters.forEach((chapter, i) => {
        if (i === 0) {
          gsap.set(chapter, { opacity: 1, y: 0, display: "block" });
        } else {
          gsap.set(chapter, { opacity: 0, y: 60, display: "none" });

          // Cross-fade to next chapter
          tl.to(
            chapters[i - 1],
            {
              opacity: 0,
              y: -50,
              duration: 0.7,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(chapters[i - 1], { display: "none" });
              },
            },
            `step-${i}`
          );

          tl.set(chapter, { display: "block" }, `step-${i}`);

          tl.to(
            chapter,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            `step-${i}+=0.1`
          );

          // Subtle frame tilt scrub during transition
          tl.to(
            browserFrame,
            {
              rotateY: i % 2 === 0 ? 2.5 : -2.5,
              duration: 0.35,
              yoyo: true,
              repeat: 1,
              ease: "sine.inOut",
            },
            `step-${i}`
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="past-works"
      className="relative bg-[#FFFFFF] text-[#111111] overflow-hidden border-b border-[#111111]"
    >
      {/* ======================================================== */}
      {/* SECTION HEADER */}
      {/* ======================================================== */}
      <section className="pt-24 md:pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#111111]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase font-bold tracking-widest text-[#FF6B35]">
              <span className="w-2.5 h-2.5 bg-[#FF6B35]" />
              <span>CHAPTER 01 // SELECTED WORKS</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tightest uppercase text-[#111111] leading-[0.88]">
              SELECTED <br />
              <span className="text-[#111111]">WORKS.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-base md:text-xl text-[#111111]/80 leading-relaxed font-medium">
              A selection of verified projects and website concepts.
            </p>
            <div className="mt-4 font-mono text-xs uppercase tracking-wider text-[#111111]/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B7E4C7]" />
              <span>[ 04 VERIFIED ENTRIES &bull; APPLE-INSPIRED SCROLL STORY ]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* CINEMATIC BROWSER PRESENTATION FRAME (PINNED SCROLL) */}
      {/* ======================================================== */}
      <div
        ref={pinTrackRef}
        className="relative w-full min-h-screen flex flex-col justify-center py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        {/* Chapter Telemetry Bar */}
        <div className="hidden lg:flex items-center justify-between pb-6 border-b border-[#111111] mb-8 font-mono text-xs uppercase font-bold tracking-wider text-[#111111]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span>VISUAL CHAPTER [0{activeChapter + 1} / 04] &bull; {PROJECTS[activeChapter].name}</span>
          </div>

          <div className="flex items-center gap-2">
            {PROJECTS.map((p, idx) => (
              <span
                key={p.id}
                className={`h-1.5 transition-all duration-300 rounded-full ${activeChapter === idx ? "w-12 bg-[#FF6B35]" : "w-6 bg-[#111111]/20"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Master Browser Presentation Frame */}
        <div className="browser-presentation-frame relative w-full bg-[#FFFFFF] border-2 border-[#111111] shadow-[8px_8px_0px_0px_#111111] overflow-hidden">
          {/* Top Browser Chrome Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#111111] text-[#FFFFFF] border-b border-[#111111]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF6B35]" />
              <span className="w-3 h-3 rounded-full bg-[#B7E4C7]" />
              <span className="w-3 h-3 rounded-full bg-[#FFFFFF]/30" />
            </div>

            {/* Address Bar */}
            <div className="flex items-center gap-2 px-4 py-1 bg-[#1a1a1a] border border-[#333333] text-xs font-mono text-[#FFFFFF]/70 max-w-md w-full mx-4 rounded-sm">
              <Lock className="w-3 h-3 text-[#B7E4C7]" />
              <span className="truncate">
                {PROJECTS[activeChapter].website || "studiodraft.space/preview-lock"}
              </span>
            </div>

            <div className="text-[10px] font-mono text-[#FFFFFF]/50 uppercase tracking-widest hidden sm:block">
              FRAME // 4K RENDER
            </div>
          </div>

          {/* Chapters Container */}
          <div className="relative w-full p-6 sm:p-10 md:p-14">
            {PROJECTS.map((project, idx) => {
              const isRealClient = project.category === "CLIENT WORK";

              return (
                <div
                  key={project.id}
                  className={`project-chapter ${idx === 0
                    ? "block"
                    : "block pt-12 lg:pt-0 border-t-2 border-[#111111] lg:border-t-0"
                    }`}
                >
                  {/* Category & Status Ribbon */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#111111] mb-8 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 font-bold uppercase tracking-wider ${isRealClient
                          ? "bg-[#111111] text-[#FFFFFF]"
                          : "bg-[#FFFFFF] text-[#111111] border border-[#111111]"
                          }`}
                      >
                        {project.category}
                      </span>

                      {project.location && (
                        <span className="inline-flex items-center gap-1 text-[#111111] font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                          <span>{project.location}</span>
                        </span>
                      )}
                    </div>

                    {/* Status Pill */}
                    <div>
                      {project.statusType === "live" && (
                        <span className="px-3.5 py-1 bg-[#B7E4C7] text-[#111111] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#111111]">
                          <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse" />
                          <span>LIVE</span>
                        </span>
                      )}

                      {project.statusType === "preview" && (
                        <span className="px-3.5 py-1 bg-[#FF6B35] text-[#FFFFFF] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" />
                          <span>IN PROGRESS • PREVIEW ONLY</span>
                        </span>
                      )}

                      {project.statusType === "demo" && (
                        <span className="px-3.5 py-1 bg-[#111111] text-[#FFFFFF] font-bold uppercase tracking-wider">
                          DEMO EXAMPLE • NOT A CLIENT PROJECT
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Two-Column Presentation Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left: Project Information */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="font-mono text-xs text-[#FF6B35] font-bold uppercase tracking-widest">
                        CHAPTER 0{idx + 1} // SHOWCASE
                      </div>

                      <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] uppercase leading-[0.95]">
                        {project.name}
                      </h3>

                      <p className="font-sans text-base sm:text-lg md:text-xl text-[#111111]/85 leading-relaxed font-normal">
                        {project.description}
                      </p>

                      {/* Special Note for Nel Cakes */}
                      {project.approvalDate && (
                        <div className="p-4 bg-[#FF6B35]/10 border-l-4 border-[#FF6B35] font-mono text-xs text-[#111111]">
                          <span className="font-bold block uppercase tracking-wider text-[#FF6B35] mb-1">
                            // VERIFIED CLIENT MILESTONE
                          </span>
                          <span>{project.approvalDate}</span>
                          <span className="block mt-1 text-[#111111]/70">
                            Strictly in development &bull; No public link available.
                          </span>
                        </div>
                      )}

                      {/* Built by Author for The Retro Cafe */}
                      {project.builtBy && (
                        <div className="flex items-center gap-2 font-mono text-xs text-[#111111]">
                          <User className="w-4 h-4 text-[#FF6B35]" />
                          <span className="font-bold uppercase tracking-wider">
                            {`Built by: ${project.builtBy}`}
                          </span>
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="pt-4">
                        {project.website ? (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-7 py-4 bg-[#111111] hover:bg-[#FF6B35] text-[#FFFFFF] font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 group shadow-[4px_4px_0px_0px_#B7E4C7]"
                            data-cursor
                            data-cursor-text="VISIT"
                          >
                            <span>Open Project Website</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-6 py-4 bg-[#FFFFFF] border-2 border-[#111111] text-[#111111] font-mono text-xs font-bold uppercase tracking-wider select-none">
                            <Lock className="w-4 h-4 text-[#FF6B35]" />
                            <span>Preview Only &bull; In Development</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Project Screenshot / Visual Mockup */}
                    <div className="lg:col-span-6">
                      {project.image ? (
                        <div className="relative aspect-[16/10] w-full border-2 border-[#111111] bg-[#111111] overflow-hidden group">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 600px"
                          />
                          <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#111111] text-[#FFFFFF] font-mono text-[10px] uppercase font-bold border border-[#FFFFFF]/20">
                            VERIFIED CLIENT SCREENSHOT
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-[16/10] w-full border-2 border-[#111111] bg-[#FFFFFF] p-8 flex flex-col justify-between relative overflow-hidden shadow-inner">
                          {/* Editorial Watermark Plate */}
                          <div className="flex justify-between items-start font-mono text-xs text-[#111111] font-bold uppercase">
                            <span className="px-2 py-0.5 bg-[#111111] text-[#FFFFFF]">
                              {project.id === "nel-cakes" ? "PREVIEW RELEASE" : "DEMO SPEC"}
                            </span>
                            <span className="text-[#FF6B35] font-bold">
                              {project.location || "CONCEPT BLUEPRINT"}
                            </span>
                          </div>

                          <div className="my-auto text-center space-y-2">
                            <div className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111]">
                              {project.name}
                            </div>
                            <div className="font-mono text-xs text-[#111111]/70 uppercase tracking-widest">
                              {project.statusType === "preview"
                                ? "HANDCRAFTED ARTISANAL BAKERY"
                                : "COMMERCIAL WEBSITE CONCEPT"}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-[#111111] flex justify-between items-center text-xs font-mono font-bold text-[#111111]">
                            <span>STUDIO DRAFT LABS</span>
                            <span className="text-[#FF6B35]">
                              {project.website ? "LIVE DEMO" : "PREVIEW MILESTONE"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Separate Portfolio Link for Abhigyan Saikia */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 border-2 border-[#111111] bg-[#FFFFFF]">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#FF6B35]" />
            <div>
              <div className="font-display text-base font-bold uppercase text-[#111111]">
                FOUNDER &amp; DESIGN LEAD PORTFOLIO
              </div>
              <div className="font-mono text-xs text-[#111111]/70">
                Explore individual design case studies, design systems &amp; craft.
              </div>
            </div>
          </div>

          <a
            href="https://abhigyansaikia.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#111111] text-[#FFFFFF] font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 group"
            data-cursor
            data-cursor-text="ABHIGYAN"
          >
            <span>MORE ABOUT ABHIGYAN</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
