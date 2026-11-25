"use client";

import { useRef } from "react";

export default function TheNameSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FAF5EB] text-[#0A1F44] py-18 sm:py-20 px-6 border-b border-[#E3DCCB]"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="border-b border-[#E3DCCB] pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-2 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
              <span>ETYMOLOGY // BRAND PHILOSOPHY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1F44]">
              The Meaning Behind The Name.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#0A1F44]/60 tracking-mono uppercase">
            TWO WORDS. ONE COHESIVE SYSTEM.
          </div>
        </div>

        {/* Two Blocks: STUDIO and DRAFT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Block 1: STUDIO */}
          <div className="p-8 sm:p-10 bg-[#FFFDF9] border border-[#E3DCCB] rounded-2xl shadow-subtle hover:-translate-y-1 transition-transform duration-300">
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-2 font-bold">
              PART 01 // DISCIPLINE
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0A1F44]">
              STUDIO
            </h3>
            <p className="mt-2 text-base font-medium text-[#0A1F44]/80">
              Our fortress of focused work.
            </p>

            <div className="mt-6 space-y-4 pt-6 border-t border-[#E3DCCB]">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#FF6B4A] font-bold mt-0.5">01</span>
                <div>
                  <div className="text-sm font-bold text-[#0A1F44]">
                    Dedicated Build Sprints
                  </div>
                  <div className="text-xs text-[#0A1F44]/70 mt-0.5">
                    No context switching. We commit full focus to one sprint at a time.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#FF6B4A] font-bold mt-0.5">02</span>
                <div>
                  <div className="text-sm font-bold text-[#0A1F44]">
                    Zero Distraction Environment
                  </div>
                  <div className="text-xs text-[#0A1F44]/70 mt-0.5">
                    No client bureaucracy or endless meetings. Clean focus on high execution.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#FF6B4A] font-bold mt-0.5">03</span>
                <div>
                  <div className="text-sm font-bold text-[#0A1F44]">
                    Isolated Development Clusters
                  </div>
                  <div className="text-xs text-[#0A1F44]/70 mt-0.5">
                    Every project is architected in an isolated environment with production CI/CD.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#FF6B4A] font-bold mt-0.5">04</span>
                <div>
                  <div className="text-sm font-bold text-[#0A1F44]">
                    Architect-Level Code Audits
                  </div>
                  <div className="text-xs text-[#0A1F44]/70 mt-0.5">
                    Founder review on every database query, API contract, and component render.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: DRAFT */}
          <div className="p-8 sm:p-10 bg-[#FFFDF9] border border-[#E3DCCB] rounded-2xl shadow-subtle hover:-translate-y-1 transition-transform duration-300">
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-2 font-bold">
              PART 02 // ITERATION
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0A1F44]">
              DRAFT
            </h3>
            <p className="mt-2 text-base font-medium text-[#0A1F44]/80">
              The daily act of building.
            </p>

            <div className="mt-6 space-y-4 pt-6 border-t border-[#E3DCCB]">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#FF6B4A] font-bold mt-0.5">01</span>
                <div>
                  <div className="text-sm font-bold text-[#0A1F44]">
                    Continuous Deployment
                  </div>
                  <div className="text-xs text-[#0A1F44]/70 mt-0.5">
                    Live staging builds pushed daily. You see the product evolve line by line.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#FF6B4A] font-bold mt-0.5">02</span>
                <div>
                  <div className="text-sm font-bold text-[#0A1F44]">
                    Rapid Feedback Loops
                  </div>
                  <div className="text-xs text-[#0A1F44]/70 mt-0.5">
                    Changes tested and pushed in hours, not multi-week review cycles.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#FF6B4A] font-bold mt-0.5">03</span>
                <div>
                  <div className="text-sm font-bold text-[#0A1F44]">
                    Transparent Sprint Cadence
                  </div>
                  <div className="text-xs text-[#0A1F44]/70 mt-0.5">
                    Shared roadmap, public commits, and clear weekly milestones.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#FF6B4A] font-bold mt-0.5">04</span>
                <div>
                  <div className="text-sm font-bold text-[#0A1F44]">
                    Direct Client Validation
                  </div>
                  <div className="text-xs text-[#0A1F44]/70 mt-0.5">
                    You test actual software in your browser on day four, not slide decks.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
