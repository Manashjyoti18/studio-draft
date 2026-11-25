"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 3 Featured projects for S5 horizontal slide
const FEATURED_MANIFESTO_PROJECTS = [
  {
    name: "ToolKB.in",
    type: "Tools",
    domain: "toolkb.in",
    url: "https://toolkb.in",
    screenshot: "/work/toolkb.webp",
  },
  {
    name: "Brandcey",
    type: "SaaS",
    domain: "brandcey.in",
    url: "https://brandcey.in",
    screenshot: "/work/brandcey.webp",
  },
  {
    name: "Arogya Relief",
    type: "SaaS",
    domain: "arogyarelief.in",
    url: "https://www.arogyarelief.in",
    screenshot: "/work/arogya-relief.webp",
  },
];

export default function ScrollStoryStage() {
  const masterContainerRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);

  // S2 Elements
  const flyCardRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // S3 Elements
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const coralDotRef = useRef<HTMLDivElement>(null);

  // S4 + S5 Navy Manifesto Stage
  const navyStageRef = useRef<HTMLDivElement>(null);
  const headlineLeftRef = useRef<HTMLDivElement>(null);
  const headlineRightRef = useRef<HTMLDivElement>(null);
  const manifestoCopyRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);

  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check mobile or reduced motion
    const checkMotion = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.innerWidth < 768;
      setIsMobileOrReduced(reduced || mobile);
    };
    checkMotion();
    window.addEventListener("resize", checkMotion);
    return () => window.removeEventListener("resize", checkMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobileOrReduced) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    setMouseOffset({ x, y });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isMobileOrReduced) return;

    const ctx = gsap.context(() => {
      const container = masterContainerRef.current;
      if (!container) return;

      // Master Timeline for S2, S3, S4, S5
      // Total scroll height 620vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // -------------------------------------------------------------
      // S2: Hero card flies away + Marquee reveals (0.00 -> 0.22)
      // Card rotates up to 38deg, scales to 0.55, drifts up & aside
      // Shadow grows then fades. Marquee unblurs from 12px to 0.
      // -------------------------------------------------------------
      tl.fromTo(
        flyCardRef.current,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          boxShadow: "0 4px 20px rgba(10,31,68,.1)",
        },
        {
          x: "45vw",
          y: "-30vh",
          rotation: 38,
          scale: 0.55,
          opacity: 0,
          boxShadow: "0 24px 60px rgba(10,31,68,.25)",
          ease: "power2.inOut",
          duration: 0.22,
        },
        0
      );

      tl.fromTo(
        marqueeRef.current,
        { x: "10vw", filter: "blur(12px)", opacity: 0.4 },
        { x: "-25vw", filter: "blur(0px)", opacity: 1, ease: "none", duration: 0.22 },
        0
      );

      // Marquee fades out as stack takes focus (0.22 -> 0.28)
      tl.to(marqueeRef.current, { opacity: 0, duration: 0.06 }, 0.22);

      // -------------------------------------------------------------
      // S3: Three-Card Stack (0.24 -> 0.48)
      // Perspective 1600px. Left: rotateY(28deg), Right: rotateY(-28deg)
      // Center card with STUDIO DRAFT wordmark & coral dot
      // -------------------------------------------------------------
      tl.fromTo(
        stackContainerRef.current,
        { opacity: 0, y: 100, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.08, ease: "power2.out" },
        0.24
      );

      tl.fromTo(
        leftCardRef.current,
        { y: 180, opacity: 0, rotateY: 10 },
        { y: 0, opacity: 1, rotateY: 28, duration: 0.16, ease: "back.out(1.15)" },
        0.25
      );

      tl.fromTo(
        rightCardRef.current,
        { y: 180, opacity: 0, rotateY: -10 },
        { y: 0, opacity: 1, rotateY: -28, duration: 0.16, ease: "back.out(1.15)" },
        0.27
      );

      tl.fromTo(
        centerCardRef.current,
        { y: 220, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.16, ease: "back.out(1.15)" },
        0.26
      );

      // -------------------------------------------------------------
      // S4: Dot Reveal (0.46 -> 0.58)
      // Coral dot scales up, clip-path circle expands to cover viewport
      // Side cards slide off left and right
      // -------------------------------------------------------------
      tl.to(leftCardRef.current, { x: "-60vw", opacity: 0, duration: 0.1 }, 0.46);
      tl.to(rightCardRef.current, { x: "60vw", opacity: 0, duration: 0.1 }, 0.46);

      tl.fromTo(
        navyStageRef.current,
        {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 1,
        },
        {
          clipPath: "circle(150% at 50% 50%)",
          opacity: 1,
          duration: 0.14,
          ease: "power2.inOut",
        },
        0.48
      );

      // -------------------------------------------------------------
      // S5: Manifesto & Featured Work (0.58 -> 1.00)
      // Giant Fraunces words: "Built to" from left, "make money." from right
      // Copy fades in, 3 cards slide horizontally
      // -------------------------------------------------------------
      tl.fromTo(
        headlineLeftRef.current,
        { x: "-40vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.14, ease: "power2.out" },
        0.58
      );

      tl.fromTo(
        headlineRightRef.current,
        { x: "40vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.14, ease: "power2.out" },
        0.58
      );

      tl.fromTo(
        manifestoCopyRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.12, ease: "power2.out" },
        0.66
      );

      // Horizontal slide of the 3 featured cards across bottom of navy stage
      tl.fromTo(
        cardsTrackRef.current,
        { x: "35vw" },
        { x: "-35vw", ease: "none", duration: 0.32 },
        0.68
      );
    }, masterContainerRef);

    return () => ctx.revert();
  }, [isMobileOrReduced]);

  // Reduced motion / Mobile Fallback View
  if (isMobileOrReduced) {
    return (
      <div id="scroll-story-navy" className="w-full bg-[#FAF5EB] text-[#0A1F44]">
        {/* S2 Fallback: Static Marquee line on cream */}
        <div className="py-12 px-6 border-b border-[#0A1F44]/10 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#0A1F44] tracking-tight">
            Websites that bring customers • Fast and clear • Built to make money
          </h2>
        </div>

        {/* S3 Fallback: Horizontal snap row */}
        <div className="py-12 px-6 border-b border-[#0A1F44]/10">
          <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-3 font-bold">
            01 // SHOWCASE
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {/* Retro Cafe Card */}
            <div className="snap-center shrink-0 w-[280px] rounded-2xl bg-[#0A1F44] text-[#FAF5EB] p-4 border border-[#0A1F44]/20 flex flex-col justify-between">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
                <Image
                  src="/work/retro-cafe.png"
                  alt="The Retro Cafe"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="font-serif font-bold text-lg">The Retro Cafe</div>
              <div className="font-mono text-[11px] text-[#FF6B4A] uppercase tracking-mono">
                Cafe and Bakery · Client Work
              </div>
            </div>

            {/* Studio Draft Center Brand Card */}
            <div className="snap-center shrink-0 w-[280px] rounded-2xl bg-[#0A1F44] text-[#FAF5EB] p-6 border border-[#FF6B4A]/30 flex flex-col items-center justify-center text-center">
              <div className="font-serif text-2xl font-black mb-2 flex items-center gap-2">
                <span>STUDIO DRAFT</span>
                <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
              </div>
              <p className="font-mono text-xs text-[#FAF5EB]/70">
                Design. Develop. Deploy.
              </p>
            </div>

            {/* Brandcey Card */}
            <div className="snap-center shrink-0 w-[280px] rounded-2xl bg-[#0A1F44] text-[#FAF5EB] p-4 border border-[#0A1F44]/20 flex flex-col justify-between">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
                <Image
                  src="/work/brandcey.webp"
                  alt="Brandcey"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="font-serif font-bold text-lg">Brandcey</div>
              <div className="font-mono text-[11px] text-[#FF6B4A] uppercase tracking-mono">
                SaaS · Brand System
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => scrollTo("work")}
              className="px-6 py-2.5 rounded-full bg-[#0A1F44] text-[#FAF5EB] font-mono text-xs uppercase tracking-mono font-bold"
            >
              Explore the work
            </button>
          </div>
        </div>

        {/* S5 Fallback: Navy Manifesto */}
        <div id="manifesto" className="bg-[#0A1F44] text-[#FAF5EB] py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-5xl font-black mb-6 leading-tight">
              <span>Built to </span>
              <span className="text-[#FAF5EB]/60">make money.</span>
            </h2>
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#FAF5EB]/85 leading-relaxed mb-10">
              <p>
                Designing websites that bring customers. Crafting fast and clear
                websites that work.
              </p>
              <p>
                The site is a shop, open 24 by 7, and a menu that brings bookings,
                orders, and enquiries to life through design, code, and care.
              </p>
            </div>

            {/* Featured projects snap row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {FEATURED_MANIFESTO_PROJECTS.map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-white/15 bg-[#0B2340] p-4"
                >
                  <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-3">
                    <Image
                      src={p.screenshot}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-serif font-bold text-base text-[#FAF5EB]">
                    {p.name}
                  </div>
                  <div className="font-mono text-[11px] text-[#FAF5EB]/60">
                    {p.type} · {p.domain}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full Desktop Pinned Scroll Story Stage (S2, S3, S4, S5)
  return (
    <div
      ref={masterContainerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#FAF5EB] select-none"
      style={{ height: "620vh" }}
    >
      {/* Sticky Viewport Stage (100vh) */}
      <div
        ref={stickyStageRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* ========================================================= */}
        {/* S2 BACKGROUND: Giant Navy Marquee Line on Cream           */}
        {/* ========================================================= */}
        <div
          ref={marqueeRef}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0"
        >
          <span className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black text-[#0A1F44] tracking-tight">
            Websites that bring customers • Fast and clear • Built to make money •
          </span>
        </div>

        {/* ========================================================= */}
        {/* S2 FLYING HERO CARD (Hand-off representation)             */}
        {/* ========================================================= */}
        <div
          ref={flyCardRef}
          className="absolute z-10 w-[85vw] max-w-[1100px] h-[75vh] rounded-[28px] bg-[#0A1F44] text-[#FAF5EB] p-8 border border-[#0A1F44]/20 pointer-events-none flex flex-col justify-between"
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="font-serif text-lg font-bold">STUDIO DRAFT</span>
            <span className="font-mono text-xs text-[#FF6B4A]">EST. 2026</span>
          </div>
          <div>
            <h2 className="font-serif text-5xl font-black leading-tight">
              Design. Develop. Deploy.
            </h2>
            <p className="mt-4 text-[#FAF5EB]/80 font-sans text-lg">
              We design, develop and market digital products built to make money.
            </p>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between font-mono text-xs text-[#FAF5EB]/60">
            <span>Assam, India</span>
            <span>work@abhigyansaikia.in</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* S3: THREE-CARD 3D PERSPECTIVE STACK                      */}
        {/* Perspective: 1600px. Left: rotateY(28), Right: rotateY(-28)*/}
        {/* Centre card: navy brand card with wordmark & coral dot    */}
        {/* ========================================================= */}
        <div
          ref={stackContainerRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto"
          style={{ perspective: "1600px" }}
        >
          <div
            className="relative flex items-center justify-center gap-4 lg:gap-8"
            style={{
              transform: `rotateX(${-mouseOffset.y * 0.4}deg) rotateY(${mouseOffset.x * 0.4}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Left Card: The Retro Cafe (settles at rotateY(28deg)) */}
            <div
              ref={leftCardRef}
              className="w-[260px] sm:w-[320px] lg:w-[360px] aspect-[3/4] rounded-[20px] bg-[#0B2340] border border-[#0A1F44]/20 p-4 shadow-2xl flex flex-col justify-between"
              style={{
                transform: "rotateY(28deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative w-full flex-1 rounded-[12px] overflow-hidden mb-3 border border-white/10">
                <Image
                  src="/work/retro-cafe.png"
                  alt="The Retro Cafe"
                  fill
                  sizes="360px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex items-center justify-between font-mono text-xs text-[#FAF5EB]">
                <span className="font-serif font-bold text-sm">The Retro Cafe</span>
                <span className="text-[#FAF5EB]/60">Cafe · Client Work</span>
              </div>
            </div>

            {/* Centre Card: Navy Brand Card with Fraunces STUDIO DRAFT & Coral Dot */}
            <div
              ref={centerCardRef}
              className="relative z-10 w-[290px] sm:w-[350px] lg:w-[400px] aspect-[3/4] rounded-[22px] bg-[#0A1F44] border-2 border-white/15 p-8 shadow-2xl flex flex-col justify-between items-center text-center"
              style={{
                transform: "translateZ(40px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="font-mono text-xs text-[#FAF5EB]/60 uppercase tracking-mono">
                STUDIO DRAFT // 01 RECON
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAF5EB] tracking-tight flex items-center justify-center gap-2">
                  <span>STUDIO DRAFT</span>
                  <div
                    ref={coralDotRef}
                    className="w-3.5 h-3.5 rounded-full bg-[#FF6B4A] shadow-sm"
                  />
                </div>
                <p className="font-mono text-xs text-[#FF6B4A] uppercase tracking-mono font-bold">
                  Design. Develop. Deploy.
                </p>
              </div>

              <div className="font-mono text-[11px] text-[#FAF5EB]/50">
                Direct founder to builder access.
              </div>
            </div>

            {/* Right Card: Brandcey (settles at rotateY(-28deg)) */}
            <div
              ref={rightCardRef}
              className="w-[260px] sm:w-[320px] lg:w-[360px] aspect-[3/4] rounded-[20px] bg-[#0B2340] border border-[#0A1F44]/20 p-4 shadow-2xl flex flex-col justify-between"
              style={{
                transform: "rotateY(-28deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative w-full flex-1 rounded-[12px] overflow-hidden mb-3 border border-white/10">
                <Image
                  src="/work/brandcey.webp"
                  alt="Brandcey"
                  fill
                  sizes="360px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex items-center justify-between font-mono text-xs text-[#FAF5EB]">
                <span className="font-serif font-bold text-sm">Brandcey</span>
                <span className="text-[#FAF5EB]/60">SaaS · Creative</span>
              </div>
            </div>
          </div>

          {/* Under Stack: Navy pill button "Explore the work" */}
          <button
            onClick={() => scrollTo("work")}
            className="mt-8 px-8 py-3.5 rounded-full bg-[#0A1F44] text-[#FAF5EB] font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#15346d] transition-all shadow-md active:translate-y-0.5 cursor-pointer"
          >
            Explore the work
          </button>
        </div>

        {/* ========================================================= */}
        {/* S4 + S5: DOT REVEAL INTO NAVY MANIFESTO STAGE            */}
        {/* Animated via clip-path: circle() covering viewport        */}
        {/* ========================================================= */}
        <div
          id="scroll-story-navy"
          ref={navyStageRef}
          className="absolute inset-0 z-30 bg-[#0A1F44] text-[#FAF5EB] p-8 sm:p-12 lg:p-16 flex flex-col justify-between pointer-events-auto"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        >
          {/* Thin Blueprint Dot Grid (shifts toward cursor) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(#FAF5EB 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />

          {/* S5 Top: Split Fraunces Headline */}
          <div className="relative z-10 max-w-6xl mx-auto w-full pt-6">
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
              <span>02 // THE MANIFESTO</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
              <span ref={headlineLeftRef} className="inline-block mr-4 text-[#FAF5EB]">
                Built to
              </span>
              <span
                ref={headlineRightRef}
                className="inline-block text-[#FAF5EB]/60"
              >
                make money.
              </span>
            </h2>

            {/* Left Column Archivo Copy */}
            <div
              ref={manifestoCopyRef}
              className="mt-6 sm:mt-8 max-w-2xl font-sans text-base sm:text-lg text-[#FAF5EB]/85 leading-relaxed space-y-3"
            >
              <p>
                Designing websites that bring customers. Crafting fast and clear
                websites that work.
              </p>
              <p className="text-[#FAF5EB]/75 text-sm sm:text-base">
                The site is a shop, open 24 by 7, and a menu that brings
                bookings, orders, and enquiries to life through design, code,
                and care.
              </p>
            </div>
          </div>

          {/* S5 Bottom: Horizontal Row of 3 Project Cards Sliding Sideways */}
          <div className="relative z-10 w-full overflow-hidden pb-4">
            <div className="font-mono text-[11px] text-[#FAF5EB]/50 uppercase tracking-mono mb-3 px-2">
              FEATURED ENGINE RELEASES // SLIDE TO REVEAL
            </div>
            <div
              ref={cardsTrackRef}
              className="flex items-center gap-6 w-max cursor-pointer"
              onClick={() => scrollTo("work")}
            >
              {FEATURED_MANIFESTO_PROJECTS.map((proj) => (
                <div
                  key={proj.name}
                  className="w-[320px] sm:w-[380px] rounded-[16px] bg-[#0B2340] border border-white/15 p-4 shadow-xl hover:border-[#FF6B4A] transition-colors"
                >
                  <div className="relative w-full aspect-[16/10] rounded-[10px] overflow-hidden mb-3 border border-white/10">
                    <Image
                      src={proj.screenshot}
                      alt={proj.name}
                      fill
                      sizes="380px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-serif font-bold text-sm text-[#FAF5EB]">
                      {proj.name}
                    </span>
                    <span className="text-[#FAF5EB]/60">
                      {proj.type} · {proj.domain}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
