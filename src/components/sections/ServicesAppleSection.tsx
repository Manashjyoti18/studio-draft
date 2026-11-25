"use client";

import { useRef } from "react";
import { Check } from "lucide-react";

interface ServiceChallenge {
  id: string;
  number: string;
  challenge: string;
  title: string;
  highlight: string;
  desc: string;
  checkpoints: string[];
  blueprintSpec: {
    label: string;
    metrics: string[];
  };
}

const SERVICES: ServiceChallenge[] = [
  {
    id: "capacity",
    number: "01",
    challenge: "CHALLENGE 01 // CAPACITY",
    title: "Staff Augmentation",
    highlight: "Embedded Senior Squads in under 48 hours.",
    desc: "When internal teams are bottlenecked, we plug directly into your repository. Senior engineers and product designers who commit production code from day one.",
    checkpoints: [
      "No onboarding friction: pull requests within 48 hours",
      "Direct code commits into your Git repository",
      "Full stack coverage: React, Next.js, Node.js, Python, Cloud",
      "Weekly velocity reports and transparent branch sync",
    ],
    blueprintSpec: {
      label: "DEPLOYMENT_SPEC // 48H_SQUAD",
      metrics: ["TIME TO FIRST PR: < 48H", "ENG LEVEL: SENIOR ONLY", "STACK: TYPESCRIPT / GO"],
    },
  },
  {
    id: "scale",
    number: "02",
    challenge: "CHALLENGE 02 // SCALE AND UX DEBT",
    title: "Product Redesign",
    highlight: "Design Systems that scale cleanly.",
    desc: "Messy interfaces hurt conversion. We untangle legacy products, build strict token systems in Figma and code, and turn clunky user flows into high-speed experiences.",
    checkpoints: [
      "Complete UX audit of drop-off points and user friction",
      "Strict Figma-to-code design tokens (colors, type, 8px grid)",
      "Accessible WCAG 2.2 AA compliant components",
      "Production-ready component library in React & Tailwind",
    ],
    blueprintSpec: {
      label: "DESIGN_SPEC // TOKEN_ENGINE",
      metrics: ["TOKENS: FIGMA + CSS SYNC", "CONTRAST: WCAG 2.2 AA", "COMPONENTS: ZERO DEBT"],
    },
  },
  {
    id: "speed",
    number: "03",
    challenge: "CHALLENGE 03 // SPEED TO MARKET",
    title: "Rapid MVP",
    highlight: "14 to 30 day guaranteed delivery.",
    desc: "Stop spending six months on an unvalidated idea. We take your core feature, strip away the noise, and ship a revenue-ready digital product in 14 to 30 days.",
    checkpoints: [
      "Lean scope definition: only features that make money",
      "Production database, auth, and Stripe payments wired",
      "Found on Google on launch day with clean semantic markup",
      "Tested on active users with automated performance monitoring",
    ],
    blueprintSpec: {
      label: "CADENCE_SPEC // SPRINT_VELOCITY",
      metrics: ["TIMELINE: 14-30 DAYS", "PAYMENTS: STRIPE LIVE", "STATUS: PRODUCTION READY"],
    },
  },
  {
    id: "revenue",
    number: "04",
    challenge: "CHALLENGE 04 // REVENUE AND REBRANDING",
    title: "Brand Identity",
    highlight: "Custom Webflow and React builds.",
    desc: "We build websites for local businesses, cafes, and modern brands that demand trust. Every pixel is crafted to increase bookings, inquiries, and customer confidence.",
    checkpoints: [
      "Custom typography and distinct visual identity",
      "Under 0.5s page load speeds with 95+ Lighthouse scores",
      "Zero template look: tailored to your business model",
      "Integrated contact, booking, and table reservation flows",
    ],
    blueprintSpec: {
      label: "COMMERCE_SPEC // LOCAL_CONVERSION",
      metrics: ["LIGHTHOUSE: 98/100", "LOAD SPEED: < 0.5S", "CONVERSION: DIRECT BOOKINGS"],
    },
  },
];

export default function ServicesAppleSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full bg-[#0A1F44] text-[#FAF5EB]"
    >
      {/* Marquee Strip with Services in Mono Type (Slow and Smooth) */}
      <div className="w-full border-y border-[#E3DCCB]/15 bg-[#0B2340] py-3.5 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] gap-12 font-mono text-xs uppercase tracking-mono text-[#FAF5EB]/70">
          <span>// STAFF AUGMENTATION</span>
          <span>•</span>
          <span>PRODUCT REDESIGN</span>
          <span>•</span>
          <span>RAPID MVP DEVELOPMENT</span>
          <span>•</span>
          <span>LOCAL BUSINESS WEBSITES</span>
          <span>•</span>
          <span>HIGH-THROUGHPUT ARCHITECTURE</span>
          <span>•</span>
          <span>DIRECT FOUNDER ACCESS</span>
          <span>•</span>
          <span>STAFF AUGMENTATION</span>
          <span>•</span>
          <span>PRODUCT REDESIGN</span>
          <span>•</span>
          <span>RAPID MVP DEVELOPMENT</span>
          <span>•</span>
          <span>LOCAL BUSINESS WEBSITES</span>
        </div>
      </div>

      {/* Services Feature Screens (Controlled padding: 72px each) */}
      <div className="divide-y divide-[#E3DCCB]/15">
        {SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="max-w-6xl mx-auto px-6 py-18 sm:py-20 flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Content Column (7 cols) */}
              <div className="lg:col-span-7">
                <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-3 flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
                  <span>{srv.challenge}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#FAF5EB] leading-[0.96]">
                  {srv.title}.
                </h3>

                <p className="mt-3 text-lg sm:text-xl text-[#FAF5EB] font-medium">
                  {srv.highlight}
                </p>

                <p className="mt-3 text-sm sm:text-base text-[#FAF5EB]/75 max-w-xl font-normal leading-relaxed">
                  {srv.desc}
                </p>

                {/* 4 Check Points */}
                <div className="mt-6 space-y-2.5 pt-6 border-t border-[#E3DCCB]/15">
                  {srv.checkpoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#FF6B4A]/20 border border-[#FF6B4A]/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#FF6B4A]" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#FAF5EB]/85 font-normal">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D Blueprint Visual Callout Box (5 cols) */}
              <div className="lg:col-span-5">
                <div className="relative p-6 sm:p-7 bg-[#0B2340] border border-[#E3DCCB]/25 rounded-2xl blueprint-grid-navy shadow-xl transition-transform duration-300 hover:-translate-y-1 group">
                  <div className="flex items-center justify-between border-b border-[#E3DCCB]/20 pb-3 font-mono text-[10px] text-[#FAF5EB]/60 tracking-mono">
                    <span className="text-[#FF6B4A] font-bold">
                      {srv.blueprintSpec.label}
                    </span>
                    <span>STUDIO DRAFT</span>
                  </div>

                  {/* Wireframe Graphic Canvas */}
                  <div className="my-6 py-8 px-4 bg-[#0A1F44]/90 border border-[#E3DCCB]/15 rounded flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="w-24 h-24 border border-[#FF6B4A] rounded rotate-12 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                      <div className="w-16 h-16 border border-[#FAF5EB]/40 -rotate-12 flex items-center justify-center">
                        <span className="font-mono text-xl font-bold text-[#FAF5EB]">
                          {srv.number}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 font-mono text-[10px] text-[#FAF5EB]/50 uppercase tracking-mono">
                      VECTOR ARCHITECTURE // 60FPS
                    </div>
                  </div>

                  {/* Spec Metrics */}
                  <div className="space-y-1.5 border-t border-[#E3DCCB]/20 pt-3 font-mono text-xs text-[#FAF5EB]/80">
                    {srv.blueprintSpec.metrics.map((m, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px]">
                        <span className="text-[#FAF5EB]/50">{m.split(":")[0]}</span>
                        <span className="text-[#FAF5EB] font-bold">{m.split(":")[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
