"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface TidewellNavProps {
  isDark?: boolean;
}

export default function TidewellNav({ isDark = false }: TidewellNavProps) {
  const scrollTo = (yPercent: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: docHeight * yPercent,
      behavior: "smooth",
    });
  };

  const scrollToEl = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 pointer-events-none transition-colors duration-300 ${
        isDark ? "dark-nav" : ""
      }`}
      style={{
        height: "calc(86 * var(--n, 1px))",
        padding: "0 calc(40 * var(--n, 1px))",
      }}
    >
      <div className="w-full h-full flex items-center justify-between">
        {/* Left: Studio Draft Wordmark with small Coral Dot */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="pointer-events-auto cursor-pointer flex items-center gap-2 group select-none"
        >
          <span
            className={`font-serif font-bold uppercase tracking-tight transition-colors duration-300 nav-logo-text ${
              isDark ? "text-[#FAF5EB]" : "text-[#0A1F44]"
            }`}
            style={{ fontSize: "calc(20 * var(--n, 1px))" }}
          >
            STUDIO DRAFT
          </span>
          <span
            className="rounded-full bg-[#FF6B4A] inline-block transition-transform group-hover:scale-125"
            style={{
              width: "calc(7 * var(--n, 1px))",
              height: "calc(7 * var(--n, 1px))",
            }}
          />
        </div>

        {/* Centre Links (Hidden below 820px) */}
        <nav
          className="pointer-events-auto hidden min-[820px]:flex items-center"
          style={{
            gap: "calc(28 * var(--n, 1px))",
            fontSize: "calc(15 * var(--n, 1px))",
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`transition-colors font-medium ${
              isDark
                ? "text-[#FAF5EB] hover:text-white"
                : "text-[#0A1F44] hover:text-[#0A1F44]"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToEl("team")}
            className={`transition-colors ${
              isDark
                ? "text-[#8C8F9A] hover:text-[#FAF5EB]"
                : "text-[#6B7280] hover:text-[#0A1F44]"
            }`}
          >
            Our Team
          </button>
          <button
            onClick={() => scrollTo(0.12)}
            className={`transition-colors ${
              isDark
                ? "text-[#8C8F9A] hover:text-[#FAF5EB]"
                : "text-[#6B7280] hover:text-[#0A1F44]"
            }`}
          >
            Work
          </button>
          <button
            onClick={() => scrollTo(0.45)}
            className={`transition-colors ${
              isDark
                ? "text-[#8C8F9A] hover:text-[#FAF5EB]"
                : "text-[#6B7280] hover:text-[#0A1F44]"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => scrollTo(0.65)}
            className={`transition-colors ${
              isDark
                ? "text-[#8C8F9A] hover:text-[#FAF5EB]"
                : "text-[#6B7280] hover:text-[#0A1F44]"
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToEl("manifesto")}
            className={`transition-colors ${
              isDark
                ? "text-[#8C8F9A] hover:text-[#FAF5EB]"
                : "text-[#6B7280] hover:text-[#0A1F44]"
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right: Dark pill button "View Work" + arrow */}
        <div className="pointer-events-auto">
          <button
            onClick={() => scrollTo(0.15)}
            className={`nav-cta-btn flex items-center justify-center font-medium transition-all duration-300 shadow-sm active:scale-95 ${
              isDark
                ? "bg-[#FAF5EB] text-[#0A1F44] hover:bg-white"
                : "bg-[#0A1F44] text-[#FAF5EB] hover:bg-[#0B2340]"
            }`}
            style={{
              height: "calc(42 * var(--n, 1px))",
              padding: "0 calc(16 * var(--n, 1px)) 0 calc(20 * var(--n, 1px))",
              borderRadius: "calc(12 * var(--n, 1px))",
              fontSize: "calc(15 * var(--n, 1px))",
              gap: "calc(6 * var(--n, 1px))",
            }}
          >
            <span>View Work</span>
            <ArrowUpRight
              style={{
                width: "calc(16 * var(--n, 1px))",
                height: "calc(16 * var(--n, 1px))",
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
