"use client";

import React from "react";
import Link from "next/link";

export default function FathomlessFooter() {
  const returnToSurface = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    if (id === "hero" || id === "the-descent") {
      returnToSurface();
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#071633] text-[#FAF5EB] py-20 md:py-24 px-6 md:px-8 border-t border-[#FAF5EB]/10 select-none overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col items-center text-center">
        {/* Large wordmark STUDIO DRAFT in Fraunces, 48px, cream, with a coral dot */}
        <button
          onClick={returnToSurface}
          className="group inline-flex items-center gap-2 font-serif text-[42px] sm:text-[48px] font-light text-[#FAF5EB] tracking-tight hover:opacity-90 transition-opacity"
          aria-label="Studio Draft - Return to surface"
        >
          <span>Studio Draft</span>
          <span className="text-[#FF6B4A] font-semibold">.</span>
        </button>

        {/* Below it, mono links in a row, 12px, cream at 70% opacity */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-[#FAF5EB]/70">
          <button
            onClick={() => scrollTo("the-descent")}
            className="hover:text-[#FF6B4A] transition-colors"
          >
            The Descent
          </button>
          <button
            onClick={() => scrollTo("depth-profile")}
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Process
          </button>
          <button
            onClick={() => scrollTo("field-notes")}
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Field Notes
          </button>
          <button
            onClick={() => scrollTo("work")}
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollTo("compare")}
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Compare
          </button>
          <button
            onClick={() => scrollTo("team")}
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Team
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Legal links in a row, separated by commas or spacing, NO dot separators */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-[#FAF5EB]/70">
          <Link
            href="/privacy-policy"
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-[#FAF5EB]/30">,</span>
          <Link
            href="/terms"
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-[#FAF5EB]/30">,</span>
          <Link
            href="/cookies"
            className="hover:text-[#FF6B4A] transition-colors"
          >
            Cookie Policy
          </Link>
        </div>

        {/* Thin hairline rule */}
        <div className="w-full max-w-4xl h-px bg-[#FAF5EB]/12 my-10" />

        {/* Small mono text: STUDIO DRAFT, ASSAM, INDIA */}
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FAF5EB]/50">
          STUDIO DRAFT, ASSAM, INDIA
        </div>
      </div>
    </footer>
  );
}
