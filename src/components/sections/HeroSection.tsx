"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  StudioDraftPixelIcon,
  STUDIO_PIXEL_KEYS,
  type StudioPixelKey,
} from "@/components/ui/StudioDraftPixelIcons";

// Catmull-Rom Spline Helper for paper plane flight
function catmullRom(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): [number, number] {
  const t2 = t * t;
  const t3 = t2 * t;
  const v0 = (p2[0] - p0[0]) * 0.5;
  const v1 = (p3[0] - p1[0]) * 0.5;
  const x =
    (2 * p1[0] - 2 * p2[0] + v0 + v1) * t3 +
    (-3 * p1[0] + 3 * p2[0] - 2 * v0 - v1) * t2 +
    v0 * t +
    p1[0];

  const w0 = (p2[1] - p0[1]) * 0.5;
  const w1 = (p3[1] - p1[1]) * 0.5;
  const y =
    (2 * p1[1] - 2 * p2[1] + w0 + w1) * t3 +
    (-3 * p1[1] + 3 * p2[1] - 2 * w0 - w1) * t2 +
    w0 * t +
    p1[1];

  return [x, y];
}

const PLANE_KEYFRAMES: [number, number, number][] = [
  [0.33, -3, 73],
  [0.45, 4, 71],
  [0.6, 13, 65],
  [0.7, 22, 55],
  [0.8, 31, 44],
  [0.87, 32.5, 47.5],
  [0.93, 26, 48],
  [1.0, 21.5, 45],
  [1.07, 22.5, 51.5],
  [1.15, 27, 52],
  [1.27, 34, 41],
];

const HEADLINE_TEXT = "Design. Develop. Deploy.";

export default function HeroSection() {
  const [elapsed, setElapsed] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setElapsed(6.0); // Jump directly to fully formed headline
        return;
      }
    }

    let animId: number;
    const startTime = performance.now();

    const loop = (now: number) => {
      const cur = (now - startTime) / 1000;
      setElapsed(cur);
      if (cur < 6.5) {
        animId = requestAnimationFrame(loop);
      }
    };
    animId = requestAnimationFrame(loop);

    const safetyTimer = setTimeout(() => {
      setElapsed((prev) => Math.max(prev, 5.5));
    }, 5300);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(safetyTimer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 5, y: x * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Compute paper plane flight transform
  const getPlaneTransform = () => {
    if (elapsed < 0.33 || elapsed > 1.33) return null;
    const tFlight = (elapsed - 0.33) / (1.27 - 0.33);
    const nFrames = PLANE_KEYFRAMES.length - 1;
    const seg = Math.min(nFrames - 1, Math.max(0, Math.floor(tFlight * nFrames)));
    const segT = tFlight * nFrames - seg;

    const p0: [number, number] = [
      PLANE_KEYFRAMES[Math.max(0, seg - 1)][1],
      PLANE_KEYFRAMES[Math.max(0, seg - 1)][2],
    ];
    const p1: [number, number] = [PLANE_KEYFRAMES[seg][1], PLANE_KEYFRAMES[seg][2]];
    const p2: [number, number] = [
      PLANE_KEYFRAMES[Math.min(nFrames, seg + 1)][1],
      PLANE_KEYFRAMES[Math.min(nFrames, seg + 1)][2],
    ];
    const p3: [number, number] = [
      PLANE_KEYFRAMES[Math.min(nFrames, seg + 2)][1],
      PLANE_KEYFRAMES[Math.min(nFrames, seg + 2)][2],
    ];

    const [xPct, yPct] = catmullRom(p0, p1, p2, p3, segT);
    const scale = elapsed >= 1.27 ? 0.6 * (1 - (elapsed - 1.27) / 0.06) : 1;
    const opacity = elapsed >= 1.27 ? 1 - (elapsed - 1.27) / 0.06 : 1;

    return {
      left: `${xPct}vw`,
      top: `${yPct}vh`,
      transform: `scale(${scale}) rotate(18deg)`,
      opacity: Math.max(0, opacity),
    };
  };

  const planeStyle = getPlaneTransform();

  // Morph calculations: 1.9s to 5.2s -> reveals characters
  const morphProgress = Math.max(0, Math.min(1, (elapsed - 1.9) / (5.2 - 1.9)));
  const visibleCharsCount =
    elapsed < 1.9
      ? 0
      : elapsed >= 5.2
      ? HEADLINE_TEXT.length
      : Math.min(HEADLINE_TEXT.length, Math.floor(morphProgress * HEADLINE_TEXT.length) + 1);

  const remainingIconsCount =
    elapsed >= 5.2
      ? 0
      : Math.max(0, Math.ceil((7 * (HEADLINE_TEXT.length - visibleCharsCount)) / 13));

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#FAF5EB] p-3 sm:p-5 pt-16 sm:pt-20 flex flex-col justify-center select-none"
    >
      {/* Paper Plane during intro flight */}
      {planeStyle && (
        <div
          className="fixed z-50 pointer-events-none w-8 h-8 sm:w-10 sm:h-10 text-[#FAF5EB]"
          style={planeStyle}
        >
          <StudioDraftPixelIcon name="plane" className="w-full h-full drop-shadow-md" />
        </div>
      )}

      {/* S1: Navy Card, radius 28px, filling height below nav */}
      <div
        id="hero-card"
        className="relative w-full flex-1 min-h-[calc(100vh-84px)] bg-[#0A1F44] text-[#FAF5EB] rounded-[28px] p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between shadow-xl border border-[#0A1F44]/20 overflow-hidden"
      >
        {/* Subtle 1px dot background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(#FAF5EB 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top Bar: Eyebrow inside the navy card */}
        <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6 sm:mb-8">
          <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B4A] animate-pulse" />
            <span>STUDIO DRAFT // CREATIVE &amp; TECHNICAL AGENCY</span>
          </div>
          <div className="font-mono text-xs text-[#FAF5EB]/60 tracking-mono uppercase">
            EST. 2026 // DIRECT FOUNDER ACCESS
          </div>
        </div>

        {/* Middle Content: Split Grid with Headline + Subhead + Buttons on Left, Portrait Panel on Right */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (7 cols): Headline, Subhead, Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Headline clamp(3.5rem, 8vw, 7rem), line-height 0.95, tracking -0.04em, max 3 lines */}
            <div className="relative">
              <h1
                className="font-serif font-black uppercase leading-[0.95] tracking-[-0.04em] select-none"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 6.8rem)" }}
                aria-label="Design. Develop. Deploy."
              >
                {/* Fallback & Accessibility: Final headline text exists in DOM at opacity 1 */}
                <span className="flex flex-wrap gap-x-4 gap-y-1">
                  {[
                    { word: "Design.", isDimmed: false, startIdx: 0 },
                    { word: "Develop.", isDimmed: false, startIdx: 8 },
                    { word: "Deploy.", isDimmed: true, startIdx: 17 },
                  ].map(({ word, isDimmed, startIdx }) => (
                    <span key={word} className="inline-block whitespace-nowrap">
                      {word.split("").map((ch, i) => {
                        const globalIdx = startIdx + i;
                        const isVisible = elapsed >= 5.2 || globalIdx < visibleCharsCount;
                        return (
                          <span
                            key={i}
                            className={`inline-block transition-all duration-200 ${
                              isDimmed ? "text-[#FAF5EB]/40" : "text-[#FAF5EB]"
                            }`}
                            style={{
                              opacity: isVisible ? (isDimmed ? 0.4 : 1) : 0,
                              transform: isVisible ? "none" : "translateY(0.2em)",
                            }}
                          >
                            {ch}
                          </span>
                        );
                      })}
                    </span>
                  ))}
                </span>
              </h1>

              {/* 7 Pixel Icons during morph */}
              {remainingIconsCount > 0 && elapsed >= 1.27 && (
                <div className="flex items-center gap-2 sm:gap-3 mt-4">
                  {STUDIO_PIXEL_KEYS.slice(0, remainingIconsCount).map((k) => (
                    <span key={k} className="inline-block w-6 h-6 sm:w-8 sm:h-8 transition-transform">
                      <StudioDraftPixelIcon name={k as StudioPixelKey} className="w-full h-full" />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Subhead (Archivo 20px, max-width 640px) */}
            <p className="mt-6 text-[#FAF5EB]/85 text-base sm:text-lg md:text-[20px] max-w-[640px] font-sans leading-relaxed">
              We design, develop and market digital products built to make money.
            </p>

            {/* Buttons 32px below subhead: Coral Start a Project, Cream outline See Our Work */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo("onboarding")}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#E85635] transition-all shadow-md active:translate-y-0.5"
              >
                Start a Project
              </button>
              <button
                onClick={() => scrollTo("work")}
                className="px-6 sm:px-8 py-3.5 rounded-full border border-[#FAF5EB] text-[#FAF5EB] font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#FAF5EB] hover:text-[#0A1F44] transition-all active:translate-y-0.5"
              >
                See Our Work
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Tall portrait panel with authentic Retro Cafe screenshot */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={mockupRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/5] rounded-[18px] overflow-hidden border border-[#FAF5EB]/20 shadow-2xl bg-[#0B2340] group cursor-pointer"
              onClick={() => scrollTo("work")}
            >
              {/* Screenshot of The Retro Cafe */}
              <Image
                src="/work/retro-cafe.png"
                alt="The Retro Cafe screenshot"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-top filter brightness-[0.95] contrast-[1.05] group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Gradient Vignette overlay for color grading */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Overlaid Label Bar */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#0A1F44]/80 backdrop-blur-md border border-[#FAF5EB]/15 flex items-center justify-between">
                <div>
                  <div className="font-serif text-sm font-bold text-[#FAF5EB]">The Retro Cafe</div>
                  <div className="font-mono text-[10px] text-[#FF6B4A] uppercase tracking-mono">Client Work · Live Product</div>
                </div>
                <div className="font-mono text-[10px] text-[#FAF5EB]/60">theretrocafe.in ↗</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Thin rule, mono labels "Assam, India" and work email. No avatars, no counts. */}
        <div className="relative z-10 w-full pt-4 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-[#FAF5EB]/65">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
            <span>Assam, India</span>
          </div>
          <a
            href="mailto:work@abhigyansaikia.in"
            className="hover:text-[#FF6B4A] transition-colors underline"
          >
            work@abhigyansaikia.in
          </a>
        </div>
      </div>
    </section>
  );
}
