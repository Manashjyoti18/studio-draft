"use client";

interface AdvantageItem {
  number: string;
  pillar: string;
  headline: string;
  desc: string;
  metric: string;
}

const ADVANTAGES: AdvantageItem[] = [
  {
    number: "01",
    pillar: "CAPACITY",
    headline: "We do not juggle 50 clients.",
    desc: "We cap active builds to three concurrent projects. That means your sprint gets our undivided attention, fast commits, and zero backlogged delays.",
    metric: "MAX 3 BUILDS AT ONCE",
  },
  {
    number: "02",
    pillar: "VELOCITY",
    headline: "Parallel design, code and marketing.",
    desc: "While design systems are being finalized, backend architectures and database models are already being deployed. Zero waiting around between phases.",
    metric: "3X FASTER CYCLES",
  },
  {
    number: "03",
    pillar: "ARCHITECTURE",
    headline: "Every product is a money platform.",
    desc: "We do not build digital art projects or vanity portfolios. Every button, menu, booking slot, and schema tag is engineered to generate customer revenue.",
    metric: "BUILT TO MAKE MONEY",
  },
  {
    number: "04",
    pillar: "ACCESS",
    headline: "Direct founder and dev access.",
    desc: "No account executives or junior intermediaries translating your feedback. You talk directly with Abhigyan, Manash, Gouri, and Somujjal.",
    metric: "ZERO PROXY MANAGERS",
  },
];

export default function WhyStudioSection() {
  return (
    <section className="relative w-full bg-[#FAF5EB] text-[#0A1F44] py-18 sm:py-20 px-6 border-b border-[#E3DCCB]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="border-b border-[#E3DCCB] pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-2 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
              <span>THE STUDIO ADVANTAGE // 4 CORE PILLARS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1F44]">
              Why Studio Draft.
            </h2>
          </div>
          <div className="max-w-md text-sm text-[#0A1F44]/75 font-normal leading-relaxed">
            A small, senior, high-speed creative and technical agency from Assam, India. Plain terms, honest work, and direct execution.
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ADVANTAGES.map((adv) => (
            <div
              key={adv.number}
              className="bg-[#FFFDF9] border border-[#E3DCCB] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-subtle hover:border-[#0A1F44] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#E3DCCB]">
                  <span className="font-mono text-xs text-[#FF6B4A] font-bold">
                    PILLAR {adv.number} // {adv.pillar}
                  </span>
                  <span className="font-mono text-[10px] bg-[#0A1F44]/5 text-[#0A1F44]/80 px-2.5 py-1 rounded font-bold uppercase tracking-mono">
                    {adv.metric}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0A1F44] mb-2.5 leading-snug">
                  {adv.headline}
                </h3>

                <p className="text-xs sm:text-sm text-[#0A1F44]/75 leading-relaxed font-normal">
                  {adv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
