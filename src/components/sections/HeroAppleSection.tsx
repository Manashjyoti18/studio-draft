"use client";

import dynamic from "next/dynamic";

const Hero3DProduct = dynamic(
  () => import("@/components/canvas/Hero3DProduct"),
  { ssr: false }
);

export default function HeroAppleSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full bg-[#FAF5EB] text-[#0A1F44] pt-6 pb-16 px-6 border-b border-[#E3DCCB]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-start">
        {/* Row 2: Small mono label (Left: Coral, Right: Navy mono) */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E3DCCB] pb-3 mb-6">
          <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
            <span>CREATIVE AND TECHNICAL AGENCY - SYS_STATUS: OPERATIONAL</span>
          </div>

          <div className="font-mono text-xs text-[#0A1F44]/70 tracking-mono uppercase">
            ASSAM, INDIA // DIRECT FOUNDER ACCESS
          </div>
        </div>

        {/* Row 3: Huge Headline in Navy (max 3 lines, clamp(3.5rem, 8vw, 7rem), lh 0.95, ls -0.04em) */}
        <h1
          className="font-serif font-bold text-[#0A1F44] uppercase"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        >
          Design. <br />
          Develop. <br />
          Deploy.
        </h1>

        {/* Row 4: Subhead in navy grey (max-width 640px, font-size 20px, line-height 1.5) */}
        <p className="mt-5 text-[#354B70] max-w-[640px] text-lg sm:text-[20px] leading-[1.5] font-normal">
          We design, develop and market digital products built to make money.
        </p>

        {/* Row 5: Buttons in normal flow (side by side, gap 16px, 32px space above) */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo("contact")}
            className="px-7 py-3.5 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#E85635] transition-all shadow-sm active:translate-y-0.5"
          >
            Start a Project
          </button>
          <button
            onClick={() => scrollTo("work")}
            className="px-7 py-3.5 rounded-full border-2 border-[#0A1F44] text-[#0A1F44] font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#0A1F44] hover:text-[#FAF5EB] transition-all active:translate-y-0.5"
          >
            See Our Work
          </button>
        </div>

        {/* Row 6: Website mockup card in its own full-width row below buttons (at least 48px space above) */}
        <div className="mt-12 w-full">
          <Hero3DProduct />
        </div>
      </div>
    </section>
  );
}
