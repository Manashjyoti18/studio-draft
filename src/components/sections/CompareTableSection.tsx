"use client";

import React from "react";

interface CompareRow {
  dimension: string;
  studioDraft: string;
  typicalAgency: string;
}

const COMPARISON_ROWS: CompareRow[] = [
  {
    dimension: "Communication",
    studioDraft: "Direct access to founders and technical builders. No account managers.",
    typicalAgency: "Junior account managers and multi-layered email chains.",
  },
  {
    dimension: "Standard Bundle",
    studioDraft: "Website, local booking chatbot, order form, and SEO are delivered together.",
    typicalAgency: "Website only. Chatbots, forms, and SEO billed as separate contracts.",
  },
  {
    dimension: "Production Codebase",
    studioDraft: "Custom Next.js, React, TypeScript, and clean PostgreSQL with high speed.",
    typicalAgency: "Generic WordPress, Elementor, or heavy drag-and-drop templates.",
  },
  {
    dimension: "Delivery Timeline",
    studioDraft: "14 to 30 days for complete production MVP with rapid deployment.",
    typicalAgency: "3 to 6 months with prolonged scoping and meetings.",
  },
  {
    dimension: "Maintenance & API Fees",
    studioDraft: "Zero recurring chatbot API costs through local data architecture.",
    typicalAgency: "Monthly third-party subscription overheads and API markups.",
  },
];

export default function CompareTableSection() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="compare"
      className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#FAF5EB]/15">
          <div className="max-w-3xl">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0]">
              Studio Draft versus typical agencies.
            </h2>
          </div>
          <p className="font-sans text-[17px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.6] max-w-md">
            Direct comparison in plain words. Honest craftsmanship built for revenue.
          </p>
        </div>

        {/* Table in an open layout with clean hairline borders */}
        <div className="overflow-x-auto border-t border-b border-[#FAF5EB]/15">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#FAF5EB]/15 bg-[#0A1F44]/50">
                <th className="p-5 sm:p-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#FAF5EB]/60 w-1/4">
                  Criterion
                </th>
                <th className="p-5 sm:p-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B4A] font-bold w-3/8 bg-[#FF6B4A]/10 border-x border-[#FAF5EB]/10">
                  Studio Draft (Assam, India)
                </th>
                <th className="p-5 sm:p-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#FAF5EB]/60 w-3/8">
                  Typical Agency
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-[#FAF5EB]/10 last:border-b-0 transition-colors ${i % 2 === 0 ? "bg-transparent" : "bg-[#0A1F44]/30"
                    }`}
                >
                  <td className="p-5 sm:p-6 font-serif text-[17px] font-normal text-[#FAF5EB] align-top">
                    {row.dimension}
                  </td>
                  <td className="p-5 sm:p-6 font-sans text-[15px] sm:text-[16px] text-[#FAF5EB] font-medium leading-[1.6] bg-[#FF6B4A]/10 border-x border-[#FAF5EB]/10 align-top">
                    <span className="text-[#FF6B4A] mr-2">✓</span>
                    {row.studioDraft}
                  </td>
                  <td className="p-5 sm:p-6 font-sans text-[14px] sm:text-[15px] text-[#FAF5EB]/70 leading-[1.6] align-top">
                    <span className="text-[#FAF5EB]/40 mr-2">✕</span>
                    {row.typicalAgency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            onClick={scrollToContact}
            className="h-[52px] px-7 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85A3A] text-[#FAF5EB] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all shadow-sm active:translate-y-0"
          >
            START A PROJECT // DIRECT ACCESS
          </button>
        </div>
      </div>
    </section>
  );
}
