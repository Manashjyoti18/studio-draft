"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ComponentErrorBoundary from "@/components/common/ComponentErrorBoundary";

const DescentScene = dynamic(() => import("./DescentScene"), {
  ssr: false,
});

export default function DescentContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [depthProgress, setDepthProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);

  useEffect(() => {
    const onLoaderDone = () => setIsHeroRevealed(true);
    window.addEventListener("studio-loader-complete", onLoaderDone);
    const fallbackTimer = setTimeout(() => setIsHeroRevealed(true), 2600);

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
      setDepthProgress(progress);

      const isPast = rect.bottom < -50 || rect.top > window.innerHeight + 50;
      setIsPaused(isPast);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("studio-loader-complete", onLoaderDone);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(fallbackTimer);
    };
  }, []);

  let currentZone = "SURFACE ZONE";
  if (depthProgress >= 0.95) {
    currentZone = "LAUNCH ZONE";
  } else if (depthProgress >= 0.70) {
    currentZone = "BUILD ZONE";
  } else if (depthProgress >= 0.22) {
    currentZone = "DESIGN ZONE";
  }

  const midnightOpacity =
    depthProgress < 0.88
      ? 0
      : Math.min(1, (depthProgress - 0.88) / (1.0 - 0.88));

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-[#071633] text-[#FAF5EB]">
      {/* 1. THE DESCENT STICKY SCROLL SECTION */}
      <section
        id="the-descent"
        ref={containerRef}
        className="relative w-full h-[450vh] bg-[#071633]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Fullscreen procedural Three.js point cloud canvas guarded with Error Boundary */}
          <ComponentErrorBoundary name="DescentCanvas">
            <DescentScene depthProgress={depthProgress} isPaused={isPaused} />
          </ComponentErrorBoundary>

          {/* SURFACE HERO: Flat navy with sharp text, no eyebrow, upright Fraunces only */}
          <div
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 pointer-events-none z-20 transition-opacity duration-300"
            style={{
              opacity: Math.max(0, 1 - depthProgress * 4.2),
              pointerEvents: depthProgress > 0.18 ? "none" : "auto",
            }}
          >
            <div className="max-w-4xl mx-auto flex flex-col items-center pt-8 sm:pt-12">
              {/* Top: 40px coral hairline rule + Eyebrow */}
              <div
                className={`flex flex-col items-center transition-all duration-700 ease-out ${
                  isHeroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-[40px] h-[1px] bg-[#FF6B4A] mb-2" />
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-[#FF6B4A] text-center">
                  STUDIO DRAFT, ASSAM, INDIA, EST. 2024
                </div>
              </div>

              {/* Main Headline on three lines: Design. Develop (italic coral). Deploy. */}
              <h1 className="font-serif font-light text-[#FAF5EB] tracking-[-0.02em] leading-[0.95] text-[clamp(3.5rem,8vw,7rem)] mt-3 sm:mt-5 select-none text-center">
                <span
                  className={`block transition-all duration-700 ease-out ${
                    isHeroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  Design.
                </span>
                <span
                  className={`block italic text-[#FF6B4A] transition-all duration-700 ease-out ${
                    isHeroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: "250ms" }}
                >
                  Develop.
                </span>
                <span
                  className={`block transition-all duration-700 ease-out ${
                    isHeroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  Deploy.
                </span>
              </h1>

              {/* Hairline rule below headline: 120px wide with 6px coral dot */}
              <div
                className={`relative w-[120px] h-px bg-[#FAF5EB]/20 my-5 sm:my-6 flex items-center justify-center transition-all duration-700 ease-out ${
                  isHeroRevealed ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
              </div>

              {/* Clear answer paragraph under H1 for GEO and Speakable schema */}
              <p
                id="studio-answer"
                className={`font-sans text-[16px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.6] max-w-[580px] transition-all duration-700 ease-out ${
                  isHeroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                Studio Draft is a digital studio based in Assam, India, for businesses and founders. We design, develop, and market digital products and websites built to make money.
              </p>

              {/* Two buttons, rectangular with 4px radius, plain text only */}
              <div
                className={`flex flex-row items-center justify-center gap-4 mt-7 pointer-events-auto transition-all duration-700 ease-out ${
                  isHeroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "750ms" }}
              >
                <button
                  onClick={() => scrollTo("contact")}
                  className="whitespace-nowrap flex-shrink-0 h-[52px] px-7 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85A3A] text-[#FAF5EB] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all shadow-sm active:translate-y-0"
                >
                  START A PROJECT
                </button>
                <button
                  onClick={() => scrollTo("work")}
                  className="whitespace-nowrap flex-shrink-0 h-[52px] px-7 rounded-[4px] border border-[#FAF5EB]/40 text-[#FAF5EB] hover:bg-[#FAF5EB] hover:text-[#071633] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all active:translate-y-0"
                >
                  SEE OUR WORK
                </button>
              </div>
            </div>
          </div>

          {/* BUILD ZONE CONTENT: Premium Build Zone Card */}
          <div
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 pointer-events-none z-20 transition-opacity duration-300"
            style={{
              opacity:
                depthProgress >= 0.68 && depthProgress < 0.96
                  ? Math.min(1, Math.min((depthProgress - 0.68) / 0.05, (0.96 - depthProgress) / 0.05))
                  : 0,
              pointerEvents:
                depthProgress >= 0.70 && depthProgress < 0.94 ? "auto" : "none",
            }}
          >
            <div className="relative max-w-[780px] w-full mx-auto p-8 sm:p-[56px_64px] rounded-[20px] bg-[#071633]/92 backdrop-blur-[16px] border border-[#FAF5EB]/14 shadow-2xl overflow-hidden flex flex-col items-center">
              {/* 2px Coral Top Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF6B4A]" />

              {/* Eyebrow */}
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FF6B4A] mb-3">
                BUILD ZONE // THE FULL SYSTEM
              </div>

              {/* Headline */}
              <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.2rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0] text-center">
                From sketch to site.
              </h2>

              <div className="w-20 h-px bg-[#FAF5EB]/20 my-4 sm:my-5 mx-auto" />

              <p className="font-sans text-[15px] sm:text-[17px] text-[#FAF5EB]/80 leading-[1.7] max-w-[560px] text-center">
                We construct the website, the booking chatbot, and the order form in one unified codebase.
              </p>

              {/* Detail row with dot separators */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-6 font-mono text-[11px] text-[#FAF5EB]/70 tracking-[0.16em] uppercase">
                <span>MENU</span>
                <span>&bull;</span>
                <span>HOURS</span>
                <span>&bull;</span>
                <span>LOCATION</span>
                <span>&bull;</span>
                <span>BOOKING</span>
                <span>&bull;</span>
                <span>CHATBOT</span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-row items-center justify-center gap-4 pointer-events-auto mt-2">
                <button
                  onClick={() => scrollTo("contact")}
                  className="whitespace-nowrap flex-shrink-0 h-[52px] px-7 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85A3A] text-[#FAF5EB] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all shadow-sm active:translate-y-0"
                >
                  START A PROJECT
                </button>
                <button
                  onClick={() => scrollTo("work")}
                  className="whitespace-nowrap flex-shrink-0 h-[52px] px-7 rounded-[4px] border border-[#FAF5EB]/40 hover:bg-[#FAF5EB] hover:text-[#071633] text-[#FAF5EB] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all active:translate-y-0"
                >
                  SEE OUR WORK
                </button>
              </div>
            </div>
          </div>

          {/* HUD: LEFT EDGE - SOLID ZONE CHIP (rectangular 4px) */}
          <div
            className={`flex absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 flex-col items-start gap-2 sm:gap-3 pointer-events-none select-none z-20 transition-opacity duration-500 ${
              isHeroRevealed ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-[4px] border bg-[#071633]/90 text-[#FAF5EB] border-[#FAF5EB]/20">
              <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] select-none whitespace-nowrap">
                {currentZone}
              </span>
            </div>
            <div className="w-px h-6 sm:h-10 ml-3 sm:ml-4 bg-[#FAF5EB]/30" />
          </div>

          {/* HUD: RIGHT EDGE - DEPTH SCALE */}
          <div
            className={`absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-end pointer-events-none select-none z-20 transition-opacity duration-500 ${
              isHeroRevealed ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative flex flex-row items-center gap-1.5 sm:gap-2">
              <div className="flex flex-col justify-between items-end h-[160px] sm:h-[180px] py-0.5">
                {[0, 1, 2, 3, 4].map((tick) => (
                  <div
                    key={tick}
                    className={`h-[1px] ${tick % 2 === 0 ? "w-2.5 sm:w-3" : "w-1.5 sm:w-2"} bg-[#FAF5EB]/40`}
                  />
                ))}
              </div>

              <div className="relative w-[2px] h-[160px] sm:h-[180px] rounded-[1px] bg-[#FAF5EB]/30">
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-[2px] bg-[#FF6B4A]"
                  style={{
                    top: `calc(${depthProgress * 100}% - 4px)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* HUD: BOTTOM CENTER - DESCEND */}
          {depthProgress < 0.65 && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none flex flex-col items-center gap-2 z-20 transition-opacity duration-300"
              style={{ opacity: Math.max(0, 1 - depthProgress * 2.8) }}
            >
              <div className="px-3 py-1 rounded-[4px] border border-[#FAF5EB]/20 bg-[#071633]/90 text-[#FAF5EB]">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] block">
                  DESCEND
                </span>
              </div>
              <div className="w-px h-5 bg-[#FAF5EB]/30" />
            </div>
          )}

          {/* MIDNIGHT ARRIVAL */}
          <div
            className="absolute bottom-12 sm:bottom-16 left-6 sm:left-14 max-w-xl z-20 pointer-events-none select-none transition-opacity duration-200"
            style={{ opacity: midnightOpacity }}
          >
            <div className="w-16 h-px bg-[#FAF5EB]/35 mb-6" />

            <h2 className="font-serif text-[72px] sm:text-[104px] font-extralight tracking-tight text-[#FAF5EB] leading-[0.95] mb-6">
              Launch.
            </h2>

            <p className="font-sans text-[17px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.6] max-w-[540px]">
              We eliminate unnecessary layers and construct production systems engineered to generate revenue from initial architecture to final deployment.
            </p>
          </div>
        </div>
      </section>

      {/* 2. HERO CONTENT BELOW THE DESCENT: Flat navy background, open layout, no card containers */}
      <section className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden">
        <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full flex flex-col">
          <div className="flex flex-col gap-6 max-w-4xl">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0]">
              We engineer digital products designed to run in production.
            </h2>

            <p className="font-sans text-[17px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.6] max-w-2xl">
              We design, develop and market digital products built to generate revenue. Our builds provide verified utility, high speed, and clean codebases.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button
                onClick={() => scrollTo("contact")}
                className="whitespace-nowrap flex-shrink-0 h-[52px] px-7 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85A3A] text-[#FAF5EB] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all shadow-sm active:translate-y-0"
              >
                START A PROJECT
              </button>
              <button
                onClick={() => scrollTo("work")}
                className="whitespace-nowrap flex-shrink-0 h-[52px] px-7 rounded-[4px] border border-[#FAF5EB]/40 text-[#FAF5EB] hover:bg-[#FAF5EB] hover:text-[#071633] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all active:translate-y-0"
              >
                SEE OUR WORK
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
