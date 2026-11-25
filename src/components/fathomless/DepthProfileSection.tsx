"use client";

import React from "react";
import dynamic from "next/dynamic";
import ComponentErrorBoundary from "@/components/common/ComponentErrorBoundary";

const PlateDepthProfile = dynamic(() => import("./PlateDepthProfile"), {
  ssr: false,
});

export default function DepthProfileSection() {
  return (
    <section
      id="depth-profile"
      className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Open Header Block: Heading & Copy left, Zone Table right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          {/* Left Column: Heading and Archivo Copy */}
          <div className="max-w-3xl">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] leading-[1.0] text-[#FAF5EB] mb-6">
              From sketch to site, built through deliberate process.
            </h2>

            <p className="font-sans text-[17px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.7] max-w-[620px] mb-6">
              Code settles in deliberate layers so the architecture holds for
              years at a time. It flexes, stabilizes, then delivers. Complexity
              clears through a disciplined progression.
            </p>

            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FAF5EB]/60 pt-2 border-t border-[#FAF5EB]/15 inline-block font-medium">
              ONE DESCENT, 14 TO 30 DAYS
            </div>
          </div>

          {/* Right Column: Zone Table in open layout with hairline dividers */}
          <div className="lg:w-80 flex-shrink-0 self-start lg:mt-4 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#FAF5EB]/60 pb-3 border-b border-[#FAF5EB]/15 mb-4 font-semibold">
              DEPTH REGIME
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#FAF5EB]/10">
                <span className="text-[#FAF5EB] tracking-wider font-medium">SURFACE</span>
                <span className="text-[#FAF5EB]/70 tabular-nums">0 TO 200 M</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#FAF5EB]/10">
                <span className="text-[#FAF5EB] tracking-wider font-medium">DESIGN</span>
                <span className="text-[#FAF5EB]/70 tabular-nums">200 TO 1000 M</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#FF6B4A] tracking-wider font-semibold">LAUNCH</span>
                <span className="text-[#FAF5EB]/85 tabular-nums">1000 M ONWARDS</span>
              </div>
            </div>
          </div>
        </div>

        {/* WebGL Plate in open container with clean hairline border */}
        <div className="w-full flex flex-col gap-3">
          <div className="w-full overflow-hidden border border-[#FAF5EB]/15 min-h-[360px] bg-[#071633]">
            <ComponentErrorBoundary name="PlateDepthProfile">
              <PlateDepthProfile />
            </ComponentErrorBoundary>
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#FAF5EB]/60 px-1">
            <span>TRAJECTORY S-CURVE AND REGIME BOUNDARIES</span>
            <span>INTERACTIVE PARTICLES, HOVER OR DRAG TO DISPLACE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
