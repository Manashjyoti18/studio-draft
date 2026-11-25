"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#FAF5EB] text-[#0A1F44]/75 py-12 px-6 border-t border-[#0A1F44]/10 font-mono text-xs select-none">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#0A1F44]/10">
          {/* Brand Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="text-[#0A1F44] font-bold tracking-tight font-serif text-sm">
              STUDIO DRAFT
            </span>
            <span className="hidden sm:inline text-[#0A1F44]/25">•</span>
            <span>CREATIVE &amp; TECHNICAL PRODUCT AGENCY</span>
            <span className="hidden sm:inline text-[#0A1F44]/25">•</span>
            <span>ASSAM, INDIA</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-[#0A1F44]">
            <Link
              href="/privacy-policy"
              className="hover:text-[#FF6B4A] transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-[#0A1F44]/30">•</span>
            <Link
              href="/terms"
              className="hover:text-[#FF6B4A] transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-[#0A1F44]/30">•</span>
            <Link
              href="/cookies"
              className="hover:text-[#FF6B4A] transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Navigation & Rights */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 uppercase tracking-mono text-[11px]">
            <button onClick={() => scrollTo("hero")} className="hover:text-[#0A1F44] transition-colors">
              Home
            </button>
            <button onClick={() => scrollTo("work")} className="hover:text-[#0A1F44] transition-colors">
              Work
            </button>
            <button onClick={() => scrollTo("services")} className="hover:text-[#0A1F44] transition-colors">
              Services
            </button>
            <button onClick={() => scrollTo("process")} className="hover:text-[#0A1F44] transition-colors">
              Process
            </button>
            <button onClick={() => scrollTo("compare")} className="hover:text-[#0A1F44] transition-colors">
              Compare
            </button>
            <button onClick={() => scrollTo("team")} className="hover:text-[#0A1F44] transition-colors">
              Team
            </button>
            <button onClick={() => scrollTo("contact")} className="hover:text-[#0A1F44] transition-colors">
              Contact
            </button>
            <button onClick={() => scrollTo("onboarding")} className="text-[#FF6B4A] hover:underline font-bold">
              Start a Project
            </button>
          </div>

          <div className="text-[#0A1F44]/50 tracking-mono text-center md:text-right text-[11px]">
            &copy; 2026 Studio Draft. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
