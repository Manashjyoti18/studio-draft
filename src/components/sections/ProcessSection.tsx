"use client";

import { useRef } from "react";

interface ProcessStep {
  step: string;
  name: string;
  phase: string;
  duration: string;
  deliverables: string[];
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    step: "01",
    name: "Product Discovery",
    phase: "ANALYSIS & FEASIBILITY",
    duration: "DAYS 01 - 03",
    description:
      "We strip away feature bloat. We define the single core workflow that makes money, draft database entities, and specify API contracts.",
    deliverables: [
      "Target customer workflow map",
      "Core money-making feature set",
      "System architecture blueprint",
      "Technical stack specification",
    ],
  },
  {
    step: "02",
    name: "Design Prototype",
    phase: "WIREFRAMES TO HIGH-FIDELITY",
    duration: "DAYS 04 - 07",
    description:
      "No lorem ipsum. We design with your actual products, authentic menu items, and verified prices in high-fidelity Figma with interactive micro-states.",
    deliverables: [
      "100% authentic content wireframes",
      "Design token architecture (colors, typography, grid)",
      "Mobile-first responsive screens",
      "Interactive click-through prototype",
    ],
  },
  {
    step: "03",
    name: "Rapid MVP Development",
    phase: "CORE SPRINT IN CODE",
    duration: "DAYS 08 - 20",
    description:
      "Parallel design and engineering. Senior engineers build the Next.js frontend, configure Postgres and Redis backends, and connect Stripe billing.",
    deliverables: [
      "Production Next.js + React codebase",
      "Database schema and authenticated API routes",
      "Stripe checkout / booking integration",
      "Daily staging deployment link",
    ],
  },
  {
    step: "04",
    name: "Custom MVP Development",
    phase: "POLISH, LAUNCH & GO-LIVE",
    duration: "DAYS 21 - 30",
    description:
      "Lighthouse 95+ optimization, semantic SEO tags, automated backup schedules, domain DNS handover, and founder review before public launch.",
    deliverables: [
      "95+ Lighthouse performance audit",
      "Google Search Console & Google Maps indexing",
      "Automated CI/CD deployment pipeline",
      "Direct code & asset handover to client",
    ],
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full bg-[#FAF5EB] text-[#0A1F44] py-18 sm:py-20 px-6 border-b border-[#E3DCCB] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E3DCCB] mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-2 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
              <span>CADENCE // HOW WE BUILD</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1F44]">
              The Process.
            </h2>
          </div>
          <div className="max-w-md text-sm text-[#0A1F44]/75 font-normal leading-relaxed">
            Wireframe to code to launch. Verified steps with daily staging builds. No fake timelines or endless status calls.
          </div>
        </div>

        {/* Steps Grid: Horizontal scroll on large desktop / Stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-[#FFFDF9] border border-[#E3DCCB] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-subtle hover:border-[#0A1F44] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3 mb-5">
                  <span className="font-mono text-xs text-[#FF6B4A] font-bold">
                    STEP {step.step}
                  </span>
                  <span className="font-mono text-[10px] text-[#0A1F44]/60 uppercase tracking-mono">
                    {step.duration}
                  </span>
                </div>

                <div className="font-mono text-[10px] text-[#0A1F44]/60 uppercase tracking-mono mb-1.5">
                  {step.phase}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0A1F44] mb-2.5">
                  {step.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#0A1F44]/75 leading-relaxed mb-5 font-normal">
                  {step.description}
                </p>
              </div>

              <div className="border-t border-[#E3DCCB] pt-4">
                <div className="font-mono text-[10px] uppercase tracking-mono text-[#0A1F44]/60 mb-2 font-bold">
                  KEY DELIVERABLES:
                </div>
                <ul className="space-y-1.5 text-xs text-[#0A1F44]/85">
                  {step.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
