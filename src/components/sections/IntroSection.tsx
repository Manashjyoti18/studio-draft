"use client";

import { motion } from "framer-motion";
import { Layers, Cpu, TrendingUp, Users } from "lucide-react";

export default function IntroSection() {
  const pillars = [
    {
      icon: Layers,
      number: "01",
      title: "Parallel execution, zero handoffs.",
      desc: "We draft UI wireframes, architect system backends, and write production code concurrently. This parallel iteration shrinks your cycle from months to weeks and eliminates translation loss.",
    },
    {
      icon: Users,
      number: "02",
      title: "Direct access to the builders.",
      desc: "No account managers. No delayed feedback loops. You get direct Slack and repository access to Manash, Abhigyan, Gouri, and Somujjal. Transparent sprint demos and clean documentation.",
    },
    {
      icon: TrendingUp,
      number: "03",
      title: "Every product is a revenue engine.",
      desc: "We do not build hollow design exercises. Every digital experience is constructed with clean checkout funnels, sustainable unit economics, and rock-solid conversion infrastructure.",
    },
    {
      icon: Cpu,
      number: "04",
      title: "Senior hands, without the hiring cycle.",
      desc: "Hiring in-house takes months of job postings, resume filtering, and onboarding. We embed dedicated senior engineering and design capability into your product team immediately.",
    },
  ];

  return (
    <section
      id="studio"
      className="relative py-28 md:py-36 border-b border-[#111111] bg-[#FFFFFF] text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#111111] pb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#FF6B35]" />
              <span>CHAPTER 03 // STUDIO MANIFESTO</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] uppercase leading-[0.95]">
              A STUDIO BUILT <br />
              <span className="text-[#111111]">BY SPECIALISTS.</span>
            </h2>
          </div>

          <div className="max-w-md text-base md:text-lg text-[#111111]/80 font-normal leading-relaxed">
            Studio Draft operates as an independent collective. We bridge the gap between creative visual direction, technical architecture, and tangible business outcomes.
          </div>
        </div>

        {/* Four Operational Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group p-8 border-2 border-[#111111] bg-[#FFFFFF] shadow-[6px_6px_0px_0px_#111111] hover:shadow-[6px_6px_0px_0px_#FF6B35] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#111111] mb-6 font-mono text-xs">
                    <span className="text-[#FF6B35] font-bold">
                      PILLAR // {pillar.number}
                    </span>
                    <div className="p-2 bg-[#111111] text-[#FFFFFF]">
                      <Icon className="w-4 h-4 text-[#B7E4C7]" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111111] leading-snug mb-4">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-sans text-[#111111]/75 leading-relaxed pt-6 border-t border-[#111111]/20">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
