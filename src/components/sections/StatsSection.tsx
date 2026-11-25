"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!stat1Ref.current) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 4,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (stat1Ref.current) {
            stat1Ref.current.textContent = `${Math.floor(obj.val)}`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="stats"
      className="relative w-full bg-[#FAF5EB] border-b border-[#0A1F44]/10 text-[#0A1F44] py-14 sm:py-16 px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {/* Cell 1: 4 People */}
        <div className="border-l-2 border-[#0A1F44] pl-4 sm:pl-6">
          <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0A1F44]">
            <span ref={stat1Ref}>4</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#0A1F44]/75 font-mono uppercase tracking-mono">
            Core team members
          </p>
        </div>

        {/* Cell 2: Staff augmentation in under 48 hours */}
        <div className="border-l-2 border-[#0A1F44] pl-4 sm:pl-6">
          <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0A1F44]">
            &lt;&nbsp;48h
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#0A1F44]/75 font-mono uppercase tracking-mono">
            Staff augmentation
          </p>
        </div>

        {/* Cell 3: MVP in 14 to 30 days */}
        <div className="border-l-2 border-[#0A1F44] pl-4 sm:pl-6">
          <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0A1F44]">
            14–30d
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#0A1F44]/75 font-mono uppercase tracking-mono">
            MVP delivery timeline
          </p>
        </div>

        {/* Cell 4: Direct founder access */}
        <div className="border-l-2 border-[#FF6B4A] pl-4 sm:pl-6">
          <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#FF6B4A]">
            Direct
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#0A1F44]/75 font-mono uppercase tracking-mono">
            Founder access only
          </p>
        </div>
      </div>
    </section>
  );
}
