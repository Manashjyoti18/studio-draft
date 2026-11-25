"use client";

import React from "react";

interface TestimonialItem {
  quote: string;
  attribution: string;
}

const VERIFIED_TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Completely satisfied with your work and the outcome.",
    attribution: "Client, via Instagram",
  },
  {
    quote: "I would surely recommend to all my friends who owns business in my place.",
    attribution: "Client, via Instagram",
  },
  {
    quote: "The website is perfect!",
    attribution: "Client, via Instagram",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-3xl pb-6 border-b border-[#FAF5EB]/15">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0]">
            What clients say.
          </h2>
          <p className="font-sans text-[17px] text-[#FAF5EB]/80 leading-[1.7] mt-2">
            Verified feedback from founders and business operators across Assam and India.
          </p>
        </div>

        {/* Testimonials in an open layout with hairline dividers, no cards, no star bursts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VERIFIED_TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between gap-6 py-6 border-b md:border-b-0 md:border-r border-[#FAF5EB]/15 pr-0 md:pr-8 last:border-r-0"
            >
              <blockquote className="font-serif text-[22px] sm:text-[24px] font-light text-[#FAF5EB] leading-[1.4] tracking-tight">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-[#FAF5EB]/10 font-mono text-[11px] text-[#FAF5EB]/60 tracking-wider">
                {item.attribution}
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Highlight Link: Plain text, no arrows */}
        <div className="pt-2">
          <a
            href="https://www.instagram.com/studiodraft.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center font-mono text-[12px] uppercase tracking-[0.14em] text-[#FAF5EB]/80 hover:text-[#FF6B4A] transition-colors"
          >
            <span>See the highlight on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
