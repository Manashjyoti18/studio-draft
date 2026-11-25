"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTASection() {
  const openOnboarding = () => {
    const el = document.getElementById("onboarding");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0A1F44] text-[#FAF5EB] py-20 sm:py-28 px-6 border-b border-white/10 select-none"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow in Mono */}
        <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-4 font-bold flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
          <span>DIRECT FOUNDER ACCESS // NO ACCOUNT MANAGERS</span>
        </div>

        {/* One Fraunces Headline */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#FAF5EB] leading-[0.95] max-w-3xl">
          Let&rsquo;s build a website that brings customers.
        </h2>

        <p className="mt-6 text-sm sm:text-base text-[#FAF5EB]/75 max-w-xl font-sans leading-relaxed">
          We design, develop and market digital products built to make money. Direct founder to builder access.
        </p>

        {/* One Coral "Start a Project" Button */}
        <div className="mt-8">
          <button
            onClick={openOnboarding}
            className="px-8 sm:px-10 py-4 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#E85635] transition-all shadow-xl active:translate-y-0.5"
          >
            Start a Project
          </button>
        </div>

        {/* Contact Lines in Mono */}
        <div className="mt-14 pt-10 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-mono text-xs text-[#FAF5EB]/80">
          <Link
            href="mailto:work@abhigyansaikia.in"
            className="hover:text-[#FF6B4A] transition-colors underline"
          >
            work@abhigyansaikia.in
          </Link>
          <Link
            href="mailto:studiodraft.space@gmail.com"
            className="hover:text-[#FF6B4A] transition-colors underline"
          >
            studiodraft.space@gmail.com
          </Link>
          <Link
            href="tel:+918822532722"
            className="hover:text-[#FF6B4A] transition-colors"
          >
            +91 88225 32722
          </Link>
          <Link
            href="https://instagram.com/studiodraft.space"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF6B4A] transition-colors inline-flex items-center gap-1"
          >
            <span>@studiodraft.space</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link
            href="https://abhigyansaikia.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF6B4A] transition-colors inline-flex items-center gap-1"
          >
            <span>abhigyansaikia.in</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
