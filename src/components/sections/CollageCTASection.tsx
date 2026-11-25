"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLLAGE_PROJECTS = [
  {
    name: "The Retro Cafe",
    src: "/work/retro-cafe.png",
    speed: 0.8,
    initX: -35,
    initY: -25,
    w: 220,
    h: 280,
  },
  {
    name: "Brandcey",
    src: "/work/brandcey.webp",
    speed: 1.4,
    initX: 35,
    initY: -30,
    w: 240,
    h: 180,
  },
  {
    name: "ToolKB.in",
    src: "/work/toolkb.webp",
    speed: 1.1,
    initX: -40,
    initY: 20,
    w: 260,
    h: 190,
  },
  {
    name: "Arogya Relief",
    src: "/work/arogya-relief.webp",
    speed: 0.7,
    initX: 38,
    initY: 22,
    w: 250,
    h: 180,
  },
  {
    name: "Qrivna",
    src: "/work/qrivna.webp",
    speed: 1.6,
    initX: -18,
    initY: -38,
    w: 200,
    h: 150,
  },
  {
    name: "BrollWriter",
    src: "/work/brollwriter.webp",
    speed: 0.9,
    initX: 20,
    initY: -36,
    w: 210,
    h: 160,
  },
  {
    name: "Dhankathaa",
    src: "/work/dhankathaa.webp",
    speed: 1.2,
    initX: -15,
    initY: 34,
    w: 200,
    h: 150,
  },
  {
    name: "Motion Subtitle Studio",
    src: "/work/motion-subtitles.webp",
    speed: 0.6,
    initX: 18,
    initY: 32,
    w: 220,
    h: 160,
  },
];

export default function CollageCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaCardRef = useRef<HTMLDivElement>(null);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  useEffect(() => {
    const checkMotion = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.innerWidth < 768;
      setIsMobileOrReduced(reduced || mobile);
    };
    checkMotion();
    window.addEventListener("resize", checkMotion);
    return () => window.removeEventListener("resize", checkMotion);
  }, []);

  const openOnboarding = () => {
    const el = document.getElementById("onboarding");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isMobileOrReduced) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // 1. Projects float toward center, shrink, and stack into one card (0.0 -> 0.6)
      cardElementsRef.current.forEach((el, idx) => {
        if (!el) return;
        const p = COLLAGE_PROJECTS[idx];
        tl.fromTo(
          el,
          {
            xPercent: p.initX * 2,
            yPercent: p.initY * 2,
            scale: 1,
            opacity: 0.85,
          },
          {
            xPercent: 0,
            yPercent: 0,
            scale: 0.4,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.55 * p.speed,
          },
          0
        );
      });

      // 2. CTA card grows out from the stacked center (0.45 -> 1.0)
      tl.fromTo(
        ctaCardRef.current,
        {
          scale: 0.5,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.45,
        },
        0.45
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobileOrReduced]);

  // Mobile / Reduced Motion Fallback
  if (isMobileOrReduced) {
    return (
      <section
        id="s6-cta"
        className="w-full bg-[#0A1F44] text-[#FAF5EB] py-16 px-6 border-b border-white/10 select-none"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* 2-Column Grid of Project Screenshots above CTA */}
          <div className="w-full grid grid-cols-2 gap-3 mb-12">
            {COLLAGE_PROJECTS.slice(0, 6).map((proj) => (
              <div
                key={proj.name}
                className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/15 bg-[#0B2340]"
              >
                <Image
                  src={proj.src}
                  alt={proj.name}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Final CTA Card */}
          <div className="w-full rounded-[24px] bg-[#0A1F44] border border-[#FAF5EB]/20 p-8 sm:p-12 text-center shadow-2xl flex flex-col items-center">
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] font-bold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
              <span>DIRECT FOUNDER ACCESS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#FAF5EB] mb-4 leading-tight">
              Build your website with us.
            </h2>
            <p className="text-sm sm:text-base text-[#FAF5EB]/80 max-w-md mb-8">
              We design, develop and market digital products built to make money. No startup fluff.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={openOnboarding}
                className="px-8 py-3.5 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#E85635] transition-all shadow-md"
              >
                Start a Project
              </button>
              <a
                href="https://wa.me/918822532722"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-[#FAF5EB] text-[#FAF5EB] font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#FAF5EB] hover:text-[#0A1F44] transition-all"
              >
                WhatsApp us
              </a>
            </div>

            {/* Direct Contacts */}
            <div className="mt-8 pt-6 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#FAF5EB]/70">
              <a href="mailto:work@abhigyansaikia.in" className="hover:text-[#FF6B4A] underline">
                work@abhigyansaikia.in
              </a>
              <span>•</span>
              <a href="tel:+918822532722" className="hover:text-[#FF6B4A]">
                +91 88225 32722
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full Desktop Pinned Collage into CTA Card (~250vh)
  return (
    <div
      ref={containerRef}
      id="s6-cta"
      className="relative w-full bg-[#0A1F44] text-[#FAF5EB] select-none"
      style={{ height: "250vh" }}
    >
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center p-6">
        {/* Parallax Floating Screenshots */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {COLLAGE_PROJECTS.map((proj, idx) => (
            <div
              key={proj.name}
              ref={(el) => {
                cardElementsRef.current[idx] = el;
              }}
              className="absolute rounded-[14px] overflow-hidden border border-white/20 shadow-2xl bg-[#0B2340]"
              style={{
                width: `${proj.w}px`,
                height: `${proj.h}px`,
              }}
            >
              <Image
                src={proj.src}
                alt={proj.name}
                fill
                sizes="300px"
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>

        {/* Final CTA Card that grows out */}
        <div
          ref={ctaCardRef}
          className="relative z-20 w-full max-w-2xl rounded-[28px] bg-[#0A1F44] border border-[#FAF5EB]/20 p-8 sm:p-14 text-center shadow-2xl flex flex-col items-center"
        >
          {/* Eyebrow in Mono */}
          <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] font-bold mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
            <span>DIRECT FOUNDER ACCESS // NO ACCOUNT MANAGERS</span>
          </div>

          {/* Fraunces Headline: "Build your website with us." */}
          <h2 className="font-serif text-4xl sm:text-6xl font-black text-[#FAF5EB] tracking-tight leading-[0.95] mb-4">
            Build your website with us.
          </h2>

          <p className="text-base text-[#FAF5EB]/80 max-w-lg mb-8 font-sans">
            We design, develop and market digital products built to make money. Direct founder to builder access.
          </p>

          {/* Coral "Start a Project" + Cream Outline "WhatsApp us" */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openOnboarding}
              className="px-8 sm:px-10 py-4 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#E85635] transition-all shadow-xl active:translate-y-0.5"
            >
              Start a Project
            </button>
            <a
              href="https://wa.me/918822532722"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 sm:px-10 py-4 rounded-full border border-[#FAF5EB] text-[#FAF5EB] font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#FAF5EB] hover:text-[#0A1F44] transition-all active:translate-y-0.5"
            >
              WhatsApp us
            </a>
          </div>

          {/* Contact Details */}
          <div className="mt-10 pt-6 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-[#FAF5EB]/70">
            <a href="mailto:work@abhigyansaikia.in" className="hover:text-[#FF6B4A] underline">
              work@abhigyansaikia.in
            </a>
            <span className="text-white/20">•</span>
            <a href="mailto:studiodraft.space@gmail.com" className="hover:text-[#FF6B4A] underline">
              studiodraft.space@gmail.com
            </a>
            <span className="text-white/20">•</span>
            <a href="tel:+918822532722" className="hover:text-[#FF6B4A]">
              +91 88225 32722
            </a>
            <span className="text-white/20">•</span>
            <Link
              href="https://instagram.com/studiodraft.space"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF6B4A] inline-flex items-center gap-1"
            >
              <span>@studiodraft.space</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
