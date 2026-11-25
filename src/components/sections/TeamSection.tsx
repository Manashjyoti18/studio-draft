"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ComponentErrorBoundary from "@/components/common/ComponentErrorBoundary";
import { STUDIO_DRAFT_TEAM } from "@/components/team/studio-draft-team";

const TeamLanyardRail = dynamic(
  () => import("@/components/ui/team-lanyard-rail"),
  { ssr: false }
);

export default function TeamSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById("onboarding") || document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden min-h-[480px]"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full flex flex-col mb-10">
        <div className="sr-only">
          <h3>Manash Jyoti Baruah - Co-Founder and Tech Architect</h3>
          <h3>Abhigyan Saikia - Co-Founder and Design Lead</h3>
          <h3>Gouri Gayan - Product and Growth Strategist</h3>
          <h3>Somujjal Hazarika - UI and UX Designer</h3>
        </div>
      </div>

      <ComponentErrorBoundary name="TeamLanyardRail">
        {isInView ? (
          <TeamLanyardRail
            members={STUDIO_DRAFT_TEAM}
            heading="Direct access to the builders. No account managers."
            caption="Brush along the rail to meet someone, pull a badge down, click to flip it."
            autoplay={true}
            interval={2800}
            action={
              <button
                onClick={scrollToContact}
                className="h-[52px] px-7 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85A3A] text-[#FAF5EB] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all shadow-sm active:translate-y-0 whitespace-nowrap"
              >
                Start a Project
              </button>
            }
          />
        ) : (
          <div className="max-w-6xl mx-auto px-8 py-24 flex flex-col items-center justify-center font-mono text-xs uppercase tracking-widest text-[#FAF5EB]/40">
            INITIALIZING BUILDER BADGES...
          </div>
        )}
      </ComponentErrorBoundary>
    </section>
  );
}
