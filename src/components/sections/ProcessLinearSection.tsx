"use client";

import React from "react";
import { Check } from "lucide-react";

interface ProcessStep {
  name: string;
  heading: string;
  description: string;
  deliverables: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    name: "Discovery and Requirements",
    heading: "We define the single workflow that makes your business money.",
    description:
      "We review your target market, clarify technical requirements, and focus purely on features that drive transactions and bookings.",
    deliverables: [
      "Revenue workflow definition",
      "Technical requirements scope",
      "Direct founder communication",
    ],
  },
  {
    name: "Design Prototyping",
    heading: "We design high-fidelity layouts using your authentic brand content.",
    description:
      "We create bespoke interface designs with calibrated contrast, mobile responsiveness, and zero generic design templates.",
    deliverables: [
      "Design tokens and typography scales",
      "Mobile-first responsive screens",
      "Interactive click-through prototype",
    ],
  },
  {
    name: "MVP Engineering",
    heading: "We construct the production codebase directly in Next.js and TypeScript.",
    description:
      "We engineer clean PostgreSQL architectures, sub-second response times, and automated routing for WhatsApp and online payments.",
    deliverables: [
      "Production Next.js codebase",
      "Sub-second load times",
      "Private preview URL staging",
    ],
  },
  {
    name: "Production Launch",
    heading: "We verify end-to-end performance and connect your custom domain.",
    description:
      "Our team completes search indexing, validates security protocols, and hands full repository ownership directly to you.",
    deliverables: [
      "Deployment on custom domain",
      "Full code and IP ownership",
      "Search Console and Maps indexing",
    ],
  },
];

export default function ProcessLinearSection() {
  return (
    <section
      id="process"
      className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto">
        {/* Header: Fraunces headline */}
        <div className="pb-8 mb-12 border-b border-[#FAF5EB]/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0]">
              How we build products.
            </h2>
            <p className="mt-3 text-[17px] sm:text-[18px] text-[#FAF5EB]/80 max-w-xl font-sans leading-[1.6]">
              We provide transparent, repeatable, and fast execution with direct founder-to-builder access across all stages.
            </p>
          </div>

          <div className="font-mono text-[11px] text-[#FAF5EB]/60 tracking-[0.2em] shrink-0 uppercase font-medium">
            DIRECT ACCESS // NO ACCOUNT MANAGERS
          </div>
        </div>

        {/* Process steps in an open layout with hairline dividers, no cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between border-t border-[#FAF5EB]/15 pt-6 group"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B4A] mb-3 block font-semibold">
                  {item.name}
                </span>

                <h3 className="font-serif text-lg sm:text-xl font-light text-[#FAF5EB] leading-snug mb-3">
                  {item.heading}
                </h3>

                <p className="text-[14px] text-[#FAF5EB]/75 leading-[1.65] font-sans">
                  {item.description}
                </p>

                {/* Deliverables */}
                <div className="mt-5 pt-4 border-t border-[#FAF5EB]/10 space-y-2">
                  {item.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] text-[#FAF5EB]/85">
                      <span className="w-3.5 h-3.5 rounded-[2px] bg-[#0A1F44] border border-[#FAF5EB]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#FF6B4A]">
                        <Check className="w-2 h-2 stroke-[3]" />
                      </span>
                      <span className="leading-tight">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
