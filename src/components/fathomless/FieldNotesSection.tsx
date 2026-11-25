"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const PlateToolKB = dynamic(() => import("./PlateToolKB"), { ssr: false });
const PlateBrandcey = dynamic(() => import("./PlateBrandcey"), { ssr: false });
const PlateArogya = dynamic(() => import("./PlateArogya"), { ssr: false });
const PlateRetroCafe = dynamic(() => import("./PlateRetroCafe"), { ssr: false });

function LazyPlate({
  PlateComponent,
  url,
}: {
  PlateComponent: React.ComponentType<{ url?: string }>;
  url: string;
}) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[260px] overflow-hidden bg-[#0A1F44]/40 border border-[#FAF5EB]/10 relative flex items-center justify-center"
    >
      {isInView ? (
        <PlateComponent url={url} />
      ) : (
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FAF5EB]/40">
          LOADING SPECIMEN PLATE...
        </div>
      )}
    </div>
  );
}

export default function FieldNotesSection() {
  return (
    <section
      id="field-notes"
      className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0]">
            Documented work from the lower depths.
          </h2>
          <p className="font-sans text-[17px] text-[#FAF5EB]/80 leading-[1.7] mt-2">
            Every specimen here was built for utility, measured against verified conversion and production durability.
          </p>
        </div>

        {/* ROW: ToolKB.in */}
        <div className="pt-10 sm:pt-14 border-t border-[#FAF5EB]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <LazyPlate PlateComponent={PlateToolKB} url="https://toolkb.in" />
            <a
              href="https://toolkb.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#FAF5EB]/60 hover:text-[#FF6B4A] transition-colors"
            >
              <span>VISIT WEBSITE // TOOLKB.IN</span>
            </a>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FAF5EB]/40">
              <span>PRODUCTION PIPELINE</span>
              <span>,</span>
              <span className="text-[#FAF5EB]/70">TOOLKB.IN</span>
            </div>

            <h3 className="font-serif text-[28px] sm:text-[34px] font-light tracking-tight text-[#FAF5EB] leading-[1.2]">
              The tool that works alone.
            </h3>

            <p className="font-sans text-[17px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.6] max-w-xl">
              A free online tool, exact KB image compressor, client side, no
              signup. People find it, use it, and leave with the file.
            </p>

            <div className="font-mono text-xs text-[#FAF5EB]/50 pt-2 flex items-center gap-6">
              <span>ZERO TRACKING</span>
              <span>,</span>
              <span>100% IN BROWSER</span>
            </div>
          </div>
        </div>

        {/* ROW: Brandcey */}
        <div className="pt-10 sm:pt-14 border-t border-[#FAF5EB]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <LazyPlate PlateComponent={PlateBrandcey} url="" />
            <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#FF6B4A] font-semibold py-1">
              IN PROGRESS
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FAF5EB]/40">
              <span>PRODUCTION PIPELINE</span>
              <span>,</span>
              <span className="text-[#FAF5EB]/70">BRANDCEY.IN</span>
            </div>

            <h3 className="font-serif text-[28px] sm:text-[34px] font-light tracking-tight text-[#FAF5EB] leading-[1.2]">
              Design agency with transparent pricing.
            </h3>

            <p className="font-sans text-[17px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.6] max-w-xl">
              Curated design services platform connecting boutique agencies with
              founders who need clear scopes, fixed tiers, and reliable delivery.
            </p>

            <div className="font-mono text-xs text-[#FAF5EB]/50 pt-2 flex items-center gap-6">
              <span>TIERED COMMERCE</span>
              <span>,</span>
              <span>AUTOMATED ONBOARDING</span>
            </div>
          </div>
        </div>

        {/* ROW: Arogya Relief */}
        <div className="pt-10 sm:pt-14 border-t border-[#FAF5EB]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <LazyPlate PlateComponent={PlateArogya} url="https://arogyarelief.in" />
            <a
              href="https://www.arogyarelief.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#FAF5EB]/60 hover:text-[#FF6B4A] transition-colors"
            >
              <span>VISIT WEBSITE // AROGYARELIEF.IN</span>
            </a>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FAF5EB]/40">
              <span>PRODUCTION PIPELINE</span>
              <span>,</span>
              <span className="text-[#FAF5EB]/70">AROGYARELIEF.IN</span>
            </div>

            <h3 className="font-serif text-[28px] sm:text-[34px] font-light tracking-tight text-[#FAF5EB] leading-[1.2]">
              Emergency healthcare coordination.
            </h3>

            <p className="font-sans text-[17px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.6] max-w-xl">
              Verified directory and response network designed for rapid
              triage, medical supply transparency, and regional resource routing.
            </p>

            <div className="font-mono text-xs text-[#FAF5EB]/50 pt-2 flex items-center gap-6">
              <span>SUB-SECOND ROUTING</span>
              <span>,</span>
              <span>ACCESSIBILITY FIRST</span>
            </div>
          </div>
        </div>

        {/* ROW: The Retro Cafe */}
        <div className="pt-10 sm:pt-14 border-t border-[#FAF5EB]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <LazyPlate PlateComponent={PlateRetroCafe} url="https://theretrocafe.in" />
            <a
              href="https://theretrocafe.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#FAF5EB]/60 hover:text-[#FF6B4A] transition-colors"
            >
              <span>VISIT WEBSITE // THERETROCAFE.IN</span>
            </a>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FAF5EB]/40">
              <span>PRODUCTION PIPELINE</span>
              <span>,</span>
              <span className="text-[#FAF5EB]/70">THERETROCAFE.IN</span>
            </div>

            <h3 className="font-serif text-[28px] sm:text-[34px] font-light tracking-tight text-[#FAF5EB] leading-[1.2]">
              Atmospheric dining &amp; reservations.
            </h3>

            <p className="font-sans text-[17px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.6] max-w-xl">
              Craft hospitality landing experience featuring digital menu preview,
              direct reservation flow, and vintage editorial typography.
            </p>

            <div className="font-mono text-xs text-[#FAF5EB]/50 pt-2 flex items-center gap-6">
              <span>DIRECT BOOKING</span>
              <span>,</span>
              <span>LOCAL COMMERCE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
