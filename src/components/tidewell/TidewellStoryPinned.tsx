"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export interface WorkCardData {
  id: number;
  slug: string;
  title: string;
  category: string;
  tag: string;
  desc: string;
  url?: string;
  image?: string;
}

export const WORK_CARDS: WorkCardData[] = [
  {
    id: 0,
    slug: "toolkb",
    title: "ToolKB.in",
    category: "BROWSER UTILITY",
    tag: "LIVE TOOL",
    desc: "High-speed developer utilities & client-side converters.",
    url: "https://toolkb.in",
    image: "/work/toolkb.webp",
  },
  {
    id: 1,
    slug: "brandcey",
    title: "Brandcey",
    category: "CREATIVE MARKETPLACE",
    tag: "COMMERCE",
    desc: "Curated design services connecting agencies with founders.",
    url: "https://brandcey.in",
    image: "/work/brandcey.webp",
  },
  {
    id: 2,
    slug: "arogya-relief",
    title: "Arogya Relief",
    category: "HEALTHCARE PLATFORM",
    tag: "HEALTHCARE",
    desc: "Hospital bed telemetry & verified emergency supply lines.",
    url: "https://www.arogyarelief.in",
    image: "/work/arogya-relief.webp",
  },
  {
    id: 3,
    slug: "motion-subtitles",
    title: "Motion Subtitle Studio",
    category: "CREATOR AUTOMATION",
    tag: "VIDEO APP",
    desc: "Automated transcription & kinetic typography rendering.",
    image: "/work/motion-subtitles.webp",
  },
  {
    id: 4,
    slug: "retro-cafe",
    title: "The Retro Cafe",
    category: "CAFE WEBSITE",
    tag: "CLIENT WORK",
    desc: "Full-service cafe website, digital menu & WhatsApp orders.",
    url: "https://theretrocafe.in",
    image: "/work/retro-cafe.png",
  },
  {
    id: 5,
    slug: "nel-cakes",
    title: "Nel Cakes",
    category: "BAKERY PLATFORM",
    tag: "IN PROGRESS",
    desc: "Artisanal cake catalog & custom private order pipeline.",
  },
  {
    id: 6,
    slug: "qrivna",
    title: "Qrivna",
    category: "FINANCIAL LEDGER",
    tag: "FINTECH",
    desc: "Ledger tracking & multi-currency invoice workflows.",
    image: "/work/qrivna.webp",
  },
  {
    id: 7,
    slug: "brollwriter",
    title: "BrollWriter",
    category: "CONTENT TOOL",
    tag: "CREATOR TOOL",
    desc: "Script sequencing & scene pacing timer for video directors.",
    image: "/work/brollwriter.webp",
  },
  {
    id: 8,
    slug: "dhankathaa",
    title: "Dhankathaa",
    category: "PERSONAL FINANCE",
    tag: "FINTECH",
    desc: "Personal cash-flow projections & recurring bill reminders.",
    image: "/work/dhankathaa.webp",
  },
  {
    id: 9,
    slug: "gcmr",
    title: "GCMR.IN",
    category: "COMMERCIAL PLATFORM",
    tag: "INDUSTRIAL",
    desc: "Industrial machinery distribution platform & catalogue.",
    url: "https://gcmr.in",
  },
  {
    id: 10,
    slug: "resumeiq",
    title: "ResumeIQ",
    category: "CAREER SYSTEM",
    tag: "UTILITY",
    desc: "ATS-compliant resume generator with clean typography.",
    image: "/work/resumeiq.png",
  },
  {
    id: 11,
    slug: "cafe-bakery-demo",
    title: "Cafe & Bakery Demo",
    category: "COMMERCE BLUEPRINT",
    tag: "DEMO BLUEPRINT",
    desc: "Fast digital bakery storefront with categorized menu.",
    url: "https://cafebakerydemo.42web.io",
    image: "/work/cafe-bakery-demo.svg",
  },
  {
    id: 12,
    slug: "beauty-demo",
    title: "Beauty Demo",
    category: "SALON BOOKING",
    tag: "SERVICE APP",
    desc: "Appointment scheduling and service booking interface.",
    url: "https://beautybussiness.freedev.app",
    image: "/work/beauty-demo.svg",
  },
];

const PROCESS_WORDS = [
  "From",
  "sketch",
  "to",
  "site,",
  "built",
  "through",
  "deliberate",
  "process.",
];

export default function TidewellStoryPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });
  const [forceVisible, setForceVisible] = useState(false);

  // Card poses tracked in continuous animation
  const currentPosesRef = useRef(
    WORK_CARDS.map(() => ({ x: 720, y: 750, rot: 0, opacity: 1 }))
  );
  const targetPosesRef = useRef(
    WORK_CARDS.map(() => ({ x: 720, y: 750, rot: 0, opacity: 1 }))
  );
  const [renderedPoses, setRenderedPoses] = useState(currentPosesRef.current);

  // Measure viewport on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setViewport({ w: window.innerWidth, h: window.innerHeight });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Force visibility safety timer (1.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener tracking 0 to 1 over ~380vh
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute Card Targets based on scrollProgress across 380vh
  // Phases:
  // hero away: 0 to .10
  // fan to scatter: .01 to .25
  // process words: .15 to .30
  // pile: .45 to .65
  // wheel fan and turn: .65 to .90
  // hold: .90 to 1.0
  const computeTargets = useCallback(
    (p: number, W: number, H: number) => {
      const isMobile = W < 820;
      const cardW = isMobile ? Math.min(W * 0.45, 175) : Math.min(W * 0.16, 220);
      const step = (R: number) => 2 * Math.asin((1.05 * cardW) / (2 * R));

      const scatterTable: [number, number, number][] = [
        [0.12, 0.46, -18],
        [0.26, 0.80, -10],
        [0.82, 0.76, 14],
        [0.45, 0.88, -6],
        [0.88, 0.44, 16],
        [0.64, 0.82, 10],
        [0.16, 0.64, -12],
        [0.34, 0.54, 6],
        [0.72, 0.56, -8],
        [0.52, 0.74, 4],
        [0.22, 0.84, 12],
        [0.78, 0.86, -14],
        [0.50, 0.90, -4],
      ];

      return WORK_CARDS.map((_, i) => {
        const [sx, sy, sRot] = scatterTable[i % scatterTable.length];
        const scatterX = sx * W;
        const scatterY = sy * H;

        // Phase 1: Fan & Scatter (.01 to .25)
        if (p <= 0.25) {
          const t = Math.min(1, Math.max(0, (p - 0.01) / 0.24));
          const R = isMobile ? W * 1.3 : (1200 * W) / 1440;
          const theta = (i - 2.5) * step(R);
          const cx = W * 0.5;
          const cy = (isMobile ? H * 0.76 : H * 0.82) + R;
          const fanX = cx + R * Math.sin(theta);
          const fanY = cy - R * Math.cos(theta);
          const fanRot = (theta * 180) / Math.PI;

          return {
            x: fanX + (scatterX - fanX) * t,
            y: fanY + (scatterY - fanY) * t,
            rot: fanRot + (sRot - fanRot) * t,
            opacity: 1,
          };
        }

        // Phase 2: Hold Scattered (p: 0.25 to 0.45)
        if (p <= 0.45) {
          return {
            x: scatterX,
            y: scatterY,
            rot: sRot,
            opacity: 1,
          };
        }

        // Pile Target
        const pileX = W * 0.5 + ((i % 3) - 1) * cardW * 0.12;
        const pileY = H * 0.64 + (((i * 5) % 4) - 1.5) * cardW * 0.08;
        const pileRot = (i % 2 === 0 ? 1 : -1) * (3 + i * 1.5);

        // Phase 3: Pile (.45 to .65)
        if (p <= 0.65) {
          const t = (p - 0.45) / 0.20;
          return {
            x: scatterX + (pileX - scatterX) * t,
            y: scatterY + (pileY - scatterY) * t,
            rot: sRot + (pileRot - sRot) * t,
            opacity: 1,
          };
        }

        // Wheel calculation
        const R = isMobile ? W * 1.1 : (860 * W) / 1440;
        const cx = W * 0.5;
        const cy = (isMobile ? H * 0.72 : H * 0.8) + R;

        // Phase 4: Wheel Fan and Turn (.65 to .90)
        if (p <= 0.90) {
          const t = (p - 0.65) / 0.25;
          const rotDelta = -3.0 * t;
          const slot = ((i + rotDelta) % 12) - 5.5;
          const angle = slot * step(R);
          const wheelX = cx + R * Math.sin(angle);
          const wheelY = cy - R * Math.cos(angle);
          const wheelRot = (angle * 180) / Math.PI;

          return {
            x: pileX + (wheelX - pileX) * Math.min(1, t * 1.25),
            y: pileY + (wheelY - pileY) * Math.min(1, t * 1.25),
            rot: pileRot + (wheelRot - pileRot) * Math.min(1, t * 1.25),
            opacity: Math.abs(wheelRot) < 65 ? 1 : 0.45,
          };
        }

        // Phase 5: Hold (.90 to 1.0)
        const rotDelta = -3.0;
        const slot = ((i + rotDelta) % 12) - 5.5;
        const angle = slot * step(R);
        const wheelX = cx + R * Math.sin(angle);
        const wheelY = cy - R * Math.cos(angle);
        const wheelRot = (angle * 180) / Math.PI;

        return {
          x: wheelX,
          y: wheelY,
          rot: wheelRot,
          opacity: Math.abs(wheelRot) < 65 ? 1 : 0.45,
        };
      });
    },
    []
  );

  // Update target poses when scrollProgress or viewport changes
  useEffect(() => {
    targetPosesRef.current = computeTargets(scrollProgress, viewport.w, viewport.h);
  }, [scrollProgress, viewport, computeTargets]);

  // Continuous RAF loop for per-card inertia
  useEffect(() => {
    let animId: number;

    const lerpLoop = () => {
      let changed = false;
      const updated = currentPosesRef.current.map((cur, i) => {
        const tgt = targetPosesRef.current[i];
        if (!tgt) return cur;

        const w = 0.055 + (i % 4) * 0.008;
        const k = Math.min(1, w * 3);

        const newX = cur.x + (tgt.x - cur.x) * k;
        const newY = cur.y + (tgt.y - cur.y) * k;
        const newRot = cur.rot + (tgt.rot - cur.rot) * k;
        const newOpacity = tgt.opacity;

        if (
          Math.abs(newX - cur.x) > 0.1 ||
          Math.abs(newY - cur.y) > 0.1 ||
          Math.abs(newRot - cur.rot) > 0.1 ||
          Math.abs(newOpacity - cur.opacity) > 0.01
        ) {
          changed = true;
        }

        return {
          x: newX,
          y: newY,
          rot: newRot,
          opacity: newOpacity,
        };
      });

      if (changed) {
        currentPosesRef.current = updated;
        setRenderedPoses(updated);
      }
      animId = requestAnimationFrame(lerpLoop);
    };

    animId = requestAnimationFrame(lerpLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Process words: .15 to .30 active
  const isProcessActive = (scrollProgress >= 0.12 && scrollProgress <= 0.65) || forceVisible;
  const isMobile = viewport.w < 820;

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full bg-[#FAF5EB] text-[#0A1F44]"
      style={{ height: "380vh" }}
    >
      {/* Sticky 100vh stage, overflow hidden */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#FAF5EB]">
        {/* Background Blueprint Grid (Cream phase) */}
        <div className="absolute inset-0 blueprint-grid-cream pointer-events-none opacity-40" />

        {/* ========================================================================= */}
        {/* 1. PROCESS HEADLINE WORDS (.15 to .30)                                    */}
        {/* ========================================================================= */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto w-full max-w-3xl px-4 z-10 transition-opacity duration-500"
          style={{
            top: "14%",
            opacity: isProcessActive ? 1 : 0,
            pointerEvents: isProcessActive ? "auto" : "none",
          }}
        >
          <div className="font-mono text-[11px] sm:text-xs uppercase tracking-mono text-[#FF6B4A] font-bold mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
            <span>OUR PORTFOLIO &amp; EXECUTION BLUEPRINTS</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A1F44] leading-tight">
            {PROCESS_WORDS.map((word, i) => (
              <span
                key={i}
                className="inline-block transition-all"
                style={{
                  opacity: isProcessActive ? 1 : 0,
                  transform: isProcessActive ? "translateY(0)" : "translateY(0.35em)",
                  filter: isProcessActive ? "blur(0px)" : "blur(6px)",
                  transitionDuration: "550ms",
                  transitionDelay: `${i * 110}ms`,
                  transitionTimingFunction: "cubic-bezier(0.25, 0.75, 0.2, 1)",
                }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#0A1F44]/75 font-mono uppercase tracking-mono">
            13 PRODUCTION SYSTEMS // VERIFIED PRODUCTS THAT MAKE MONEY
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO CARDS (13 Verified Projects: Fan, Scatter, Pile, Wheel)                */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none">
          {WORK_CARDS.map((card, i) => {
            const pose = renderedPoses[i] || { x: 720, y: 750, rot: 0, opacity: 1 };
            const cardW = isMobile
              ? Math.min(viewport.w * 0.45, 175)
              : Math.min(viewport.w * 0.16, 220);
            const cardH = cardW * 1.38;

            return (
              <div
                key={card.id}
                className="absolute origin-center will-change-transform pointer-events-auto cursor-pointer"
                style={{
                  width: `${cardW}px`,
                  height: `${cardH}px`,
                  left: 0,
                  top: 0,
                  transform: `translate3d(${pose.x - cardW * 0.5}px, ${
                    pose.y - cardH * 0.5
                  }px, 0) rotate(${pose.rot}deg)`,
                  opacity: pose.opacity,
                  transition: "opacity 150ms ease-out",
                }}
              >
                <div className="w-full h-full rounded-xl sm:rounded-2xl bg-white border border-[#0A1F44]/15 shadow-lg overflow-hidden flex flex-col justify-between p-3 sm:p-4 group hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-[#0A1F44]/10 pb-2">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#FF6B4A] font-bold tracking-mono">
                      {card.tag}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] text-[#0A1F44]/60">
                      0{card.id + 1}
                    </span>
                  </div>

                  {/* Card Thumbnail or Plain Cream Card Fallback */}
                  <div className="relative w-full flex-1 my-2 bg-[#FAF5EB] rounded-lg border border-[#0A1F44]/10 overflow-hidden flex flex-col items-center justify-center p-2 text-center">
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="240px"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-serif font-bold text-sm sm:text-base text-[#0A1F44]">
                          {card.title}
                        </span>
                        <span className="font-mono text-[8px] sm:text-[9px] text-[#0A1F44]/60 uppercase tracking-mono mt-1">
                          ACTIVE SYSTEM
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#0A1F44] truncate">
                      {card.title}
                    </h3>
                    <p className="font-mono text-[8px] sm:text-[9px] text-[#0A1F44]/70 uppercase tracking-mono truncate">
                      {card.category}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
