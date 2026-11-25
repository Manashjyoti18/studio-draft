"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconCalendar, IconClock, IconPaperPlane } from "@/components/ui/StudioIcons";
import { Lock, ChefHat, Check } from "lucide-react";

export default function TidewellProductPanel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const navyStageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tiltContainerRef = useRef<HTMLDivElement>(null);
  const mainMockupRef = useRef<HTMLDivElement>(null);
  const menuCardRef = useRef<HTMLDivElement>(null);
  const bookingCardRef = useRef<HTMLDivElement>(null);
  const navLayerRef = useRef<HTMLDivElement>(null);
  const marker1Ref = useRef<HTMLDivElement>(null);
  const marker2Ref = useRef<HTMLDivElement>(null);
  const blackoutRef = useRef<HTMLDivElement>(null);

  // Typography word refs for Scene C
  const topWordsRef = useRef<HTMLDivElement>(null);
  const bottomWordsRef = useRef<HTMLDivElement>(null);

  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop viewports
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop subtle 3D mouse tilt (Scene B)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: -y * 7, y: x * 7 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // GSAP Desktop Animation Sequence (Apple / Awwwards Cinematic Pinned Scrub)
  useEffect(() => {
    if (isMobile) return; // Mobile uses native scrolling per specification

    const section = sectionRef.current;
    const navyStage = navyStageRef.current;
    const mainMockup = mainMockupRef.current;
    const menuCard = menuCardRef.current;
    const bookingCard = bookingCardRef.current;
    const navLayer = navLayerRef.current;
    const grid = gridRef.current;
    const blackout = blackoutRef.current;
    const marker1 = marker1Ref.current;
    const marker2 = marker2Ref.current;

    if (!section || !navyStage || !mainMockup) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(navyStage, { clipPath: "circle(150% at 50% 50%)" });
      return;
    }

    const ctx = gsap.context(() => {
      const topWords = topWordsRef.current
        ? topWordsRef.current.querySelectorAll(".word-item")
        : [];
      const bottomWords = bottomWordsRef.current
        ? bottomWordsRef.current.querySelectorAll(".word-item")
        : [];

      // Pinned scrub timeline across 300vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // ==========================================
      // SCENE A - ENTRANCE (0.00 -> 0.28)
      // ==========================================
      // 1. Navy circular mask reveals from center
      tl.fromTo(
        navyStage,
        { clipPath: "circle(16% at 50% 50%)", borderRadius: "24px" },
        { clipPath: "circle(125% at 50% 50%)", borderRadius: "0px", ease: "power2.out", duration: 0.28 },
        0
      );

      // 2. Main browser mockup rises from below with rotation transitioning from -12 deg to -2 deg
      tl.fromTo(
        mainMockup,
        { y: 130, rotationY: -12, rotationX: 7, scale: 0.9, opacity: 0.7 },
        { y: 0, rotationY: -2, rotationX: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.28 },
        0
      );

      // 3. Secondary menu card enters from left / behind
      if (menuCard) {
        tl.fromTo(
          menuCard,
          { x: -110, y: 35, rotationY: 20, opacity: 0 },
          { x: 0, y: 0, rotationY: 12, opacity: 1, ease: "power2.out", duration: 0.26 },
          0.02
        );
      }

      // 4. Secondary booking card enters from right / front
      if (bookingCard) {
        tl.fromTo(
          bookingCard,
          { x: 110, y: 45, rotationY: -16, opacity: 0 },
          { x: 0, y: 0, rotationY: -5, opacity: 1, ease: "power2.out", duration: 0.26 },
          0.04
        );
      }

      // 5. Floating browser nav layer drops in from top
      if (navLayer) {
        tl.fromTo(
          navLayer,
          { y: -35, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out", duration: 0.2 },
          0.07
        );
      }

      // 6. Floating markers pop in
      if (marker1) {
        tl.fromTo(marker1, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.16 }, 0.1);
      }
      if (marker2) {
        tl.fromTo(marker2, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.16 }, 0.12);
      }

      // ==========================================
      // SCENE B - DEPTH & PARALLAX (0.28 -> 0.65)
      // ==========================================
      // Background blueprint grid drifts slowly
      if (grid) {
        tl.to(grid, { y: 110, ease: "none", duration: 0.72 }, 0);
      }

      // Main mockup gently rotates through scroll (Apple rhythm)
      tl.to(
        mainMockup,
        {
          rotationY: 7,
          rotationX: -3,
          y: -10,
          ease: "power1.inOut",
          duration: 0.37,
        },
        0.28
      );

      // Menu card drifts with negative depth
      if (menuCard) {
        tl.to(
          menuCard,
          {
            x: -20,
            y: -15,
            rotationY: 16,
            ease: "power1.inOut",
            duration: 0.37,
          },
          0.28
        );
      }

      // Booking card floats forward and slightly left
      if (bookingCard) {
        tl.to(
          bookingCard,
          {
            x: 15,
            y: -25,
            rotationY: -1,
            ease: "power1.inOut",
            duration: 0.37,
          },
          0.28
        );
      }

      // Markers move with differential parallax
      if (marker1) {
        tl.to(marker1, { y: -40, x: 10, ease: "none", duration: 0.37 }, 0.28);
      }
      if (marker2) {
        tl.to(marker2, { y: 30, x: -8, ease: "none", duration: 0.37 }, 0.28);
      }

      // ==========================================
      // SCENE C - TYPOGRAPHY REVEAL (0.20 -> 0.65)
      // ==========================================
      // Reveal words individually: "Not just another website."
      if (topWords.length > 0) {
        tl.fromTo(
          topWords,
          { opacity: 0, y: 16, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            ease: "power2.out",
            duration: 0.18,
          },
          0.18
        );
      }

      // Reveal words individually: "Built to bring customers."
      if (bottomWords.length > 0) {
        tl.fromTo(
          bottomWords,
          { opacity: 0, y: -16, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            ease: "power2.out",
            duration: 0.18,
          },
          0.36
        );
      }

      // ==========================================
      // SCENE D - PRODUCT INTERACTION & ZOOM (0.65 -> 1.0)
      // ==========================================
      // Booking interface slides into focus
      if (bookingCard) {
        tl.to(
          bookingCard,
          {
            scale: 1.06,
            rotationY: 0,
            rotationX: 0,
            ease: "power2.inOut",
            duration: 0.14,
          },
          0.65
        );
      }

      // Menu card moves into the foreground
      if (menuCard) {
        tl.to(
          menuCard,
          {
            scale: 1.04,
            x: -8,
            ease: "power2.inOut",
            duration: 0.14,
          },
          0.67
        );
      }

      // Main browser window expands towards viewer and camera zooms in
      tl.to(
        mainMockup,
        {
          scale: 2.4,
          z: 220,
          rotationY: 0,
          rotationX: 0,
          transformOrigin: "50% 42%",
          ease: "power2.in",
          duration: 0.26,
        },
        0.72
      );

      // Clean navy blackout transition into next section (0.88 -> 1.0)
      if (blackout) {
        tl.fromTo(
          blackout,
          { opacity: 0 },
          { opacity: 1, ease: "power2.inOut", duration: 0.12 },
          0.88
        );
      }
    }, section);

    // Refresh ScrollTrigger when fonts and images are ready
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => ctx.revert();
  }, [isMobile]);

  // =========================================================================
  // RENDER: DESKTOP (CINEMATIC 3D PINNED STAGE) vs MOBILE (NATIVE SCROLLING)
  // =========================================================================
  if (isMobile) {
    return (
      <section
        id="product-panel"
        className="relative w-full bg-[#0A1F44] text-[#FAF5EB] py-18 px-5 border-b border-[#FAF5EB]/10 overflow-hidden select-none"
      >
        {/* Subtle Background Lighting & Blueprint Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(250, 245, 235, 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 blueprint-grid-navy pointer-events-none opacity-20" />

        <div className="max-w-md mx-auto relative z-10 flex flex-col gap-6">
          {/* Top Heading: "Not just another website." */}
          <div>
            <div className="font-mono text-[10px] text-[#FAF5EB]/60 tracking-mono uppercase mb-1.5 flex items-center gap-2 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
              <span>CASE STUDY // THE RETRO CAFE</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#FAF5EB] leading-tight">
              <span>Not </span>
              <span className="text-[#8D8893]">just another </span>
              <span>website.</span>
            </h2>
          </div>

          {/* Floating Navigation Pill */}
          <div className="w-fit mx-auto px-3.5 py-1.5 rounded-full bg-white border border-[#E3DCCB] shadow-md flex items-center gap-2 font-mono text-[10px] text-[#0A1F44]">
            <div className="flex items-center gap-1 text-[#10B981]">
              <Lock className="w-2.5 h-2.5" />
              <span className="text-[8px] uppercase tracking-mono font-bold">SSL</span>
            </div>
            <span className="text-[#E3DCCB]">•</span>
            <span className="font-semibold text-[#0A1F44]">https://theretrocafe.in</span>
          </div>

          {/* Main Retro Cafe Mockup Card (Mobile Optimized) */}
          <div className="bg-[#FAF5EB] rounded-2xl border border-[#FAF5EB]/40 p-4 text-[#0A1F44] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-2.5 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
                <span className="w-2 h-2 rounded-full bg-[#E3DCCB]" />
                <span className="w-2 h-2 rounded-full bg-[#E3DCCB]" />
              </div>
              <div className="text-[10px] font-mono text-[#0A1F44]/70">
                the retro cafe • mon, nagaland
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B4A] text-white font-mono text-[8px] uppercase font-bold tracking-mono">
                Live Site
              </span>
            </div>

            {/* Interior Image */}
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#E3DCCB] mb-3">
              <Image
                src="/images/projects/retro_cafe.png"
                alt="The Retro Cafe - Artisan interior"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 text-white">
                <div className="font-mono text-[8px] uppercase text-[#FF6B4A] font-bold tracking-mono">
                  ARTISANAL DINING
                </div>
                <div className="font-serif text-sm font-bold">
                  Direct Reservations &amp; Menu Orders
                </div>
              </div>
            </div>

            {/* Footer Features */}
            <div className="pt-2 border-t border-[#E3DCCB] flex items-center justify-between font-mono text-[9px] text-[#0A1F44]/70">
              <span className="text-[#FF6B4A] font-bold">0% COMMISSION</span>
              <span>100% IN-HOUSE CODE</span>
            </div>
          </div>

          {/* Booking Engine Card (Mobile Native) */}
          <div className="bg-white rounded-xl border border-[#E3DCCB] p-4 text-[#0A1F44] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-2 mb-2.5 font-mono text-[9px] uppercase font-bold tracking-mono">
              <span className="flex items-center gap-1.5 text-[#FF6B4A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] animate-ping" />
                <span>INSTANT TABLE BOOKING</span>
              </span>
              <span className="text-[8px] text-[#0A1F44]/40">VERIFIED</span>
            </div>

            <div className="space-y-1.5 my-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A1F44]">
                <IconCalendar size={13} color="#FF6B4A" />
                <span>Today, 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#354B70]">
                <IconClock size={13} color="#0A1F44" />
                <span>2 Guests • Window Booth (A-04)</span>
              </div>
            </div>

            <button className="mt-3 w-full py-2.5 rounded-lg bg-[#FF6B4A] text-white font-mono text-[9px] text-center uppercase font-bold tracking-mono shadow-sm">
              Confirm Reservation
            </button>
          </div>

          {/* Bottom Heading: "Built to bring customers." */}
          <div className="pt-2 text-right">
            <h2 className="font-serif text-3xl font-bold tracking-tight leading-tight">
              <span className="text-[#FAF5EB]">Built to </span>
              <span className="text-[#8D8893]">bring </span>
              <span className="text-[#FF6B4A]">customers.</span>
            </h2>
            <div className="font-mono text-[10px] text-[#FAF5EB]/60 tracking-mono uppercase mt-1 font-bold">
              DIRECT BOOKINGS • LIVE MENU • ZERO FLUFF
            </div>
          </div>
        </div>
      </section>
    );
  }

  // DESKTOP: Full Cinematic 3D Composition & Pinned GSAP Scroll Sequence
  return (
    <section
      ref={sectionRef}
      id="product-panel"
      className="relative w-full bg-[#FAF5EB]"
      style={{ height: "300vh" }}
    >
      {/* Sticky 100vh Viewport Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#FAF5EB] flex items-center justify-center select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navy Cinematic Stage with Smooth Circular Mask Entrance */}
        <div
          ref={navyStageRef}
          className="absolute inset-0 bg-[#0A1F44] text-[#FAF5EB] flex items-center justify-center overflow-hidden"
          style={{
            clipPath: "circle(125% at 50% 50%)", // Default fallback if JS is disabled
          }}
        >
          {/* Layered Cinematic Atmosphere */}
          {/* 1. Center soft radial cream light (8% opacity) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(250, 245, 235, 0.08) 0%, transparent 68%)",
            }}
          />

          {/* 2. Top-right subtle cream glow */}
          <div
            className="absolute -top-36 -right-36 w-[420px] h-[420px] rounded-full pointer-events-none blur-3xl"
            style={{ background: "rgba(250, 245, 235, 0.04)" }}
          />

          {/* 3. Bottom-left warm coral glow (12% opacity) */}
          <div
            className="absolute -bottom-28 -left-28 w-[380px] h-[380px] rounded-full pointer-events-none blur-3xl"
            style={{ background: "rgba(255, 107, 74, 0.12)" }}
          />

          {/* 4. Background blueprint grid with slow parallax */}
          <div
            ref={gridRef}
            className="absolute -inset-10 blueprint-grid-navy pointer-events-none opacity-25"
          />

          {/* ==================================================== */}
          {/* SCENE C: TOP TYPOGRAPHY: "Not just another website." */}
          {/* Sits safely in the top zone to PREVENT OVERLAP */}
          {/* ==================================================== */}
          <div
            ref={topWordsRef}
            className="absolute left-6 sm:left-12 md:left-16 top-6 sm:top-8 md:top-10 z-30 pointer-events-none text-left"
          >
            {/* Small Monospace Label */}
            <div className="font-mono text-[10px] sm:text-xs text-[#FAF5EB]/60 tracking-mono uppercase mb-1 flex items-center gap-2 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
              <span>CASE STUDY // THE RETRO CAFE</span>
            </div>

            {/* Oversized Fraunces Typography: "Not just another website." */}
            <h2
              className="font-serif font-black tracking-tight"
              style={{
                fontSize: "clamp(24px, min(4.4vw, 5.8vh), 50px)",
                lineHeight: 1.05,
              }}
            >
              <span className="word-item inline-block mr-2 text-[#FAF5EB]">Not</span>
              <span className="word-item inline-block mr-2 text-[#8D8893]">just</span>
              <span className="word-item inline-block mr-2 text-[#8D8893]">another</span>
              <span className="word-item inline-block text-[#FAF5EB]">website.</span>
            </h2>
          </div>

          {/* ==================================================== */}
          {/* 3D COMPOSITION STAGE (Centered & Perspective-bounded) */}
          {/* ==================================================== */}
          <div
            className="relative z-20 flex items-center justify-center w-full max-w-4xl px-4 my-auto"
            style={{ perspective: "1200px" }}
          >
            {/* Mouse Tilt Spring Container */}
            <div
              ref={tiltContainerRef}
              className="relative flex items-center justify-center w-full transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* ---------------------------------------------------- */}
              {/* LAYER 1: SEPARATE MENU INTERFACE CARD (Behind Left) */}
              {/* ---------------------------------------------------- */}
              <div
                ref={menuCardRef}
                className="absolute -left-4 sm:-left-16 md:-left-28 -top-6 sm:-top-8 w-56 sm:w-64 md:w-72 bg-white rounded-xl border border-[#E3DCCB] p-3.5 sm:p-4 text-[#0A1F44] select-none"
                style={{
                  boxShadow: "0 24px 50px rgba(0, 0, 0, 0.35)",
                  transform: "translateZ(-50px) rotateY(12deg) rotateX(2deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-2 mb-2.5 font-mono text-[9px] uppercase tracking-mono text-[#0A1F44]/60">
                  <span className="flex items-center gap-1.5 font-bold text-[#FF6B4A]">
                    <ChefHat className="w-3 h-3" />
                    <span>DAILY BAKES &amp; ROASTS</span>
                  </span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#FAF5EB] text-[#0A1F44] font-bold">
                    LIVE
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="font-serif font-bold text-[#0A1F44]">Single Origin Pour Over</div>
                      <div className="text-[10px] text-[#354B70] font-mono">Naga Hills washed roast</div>
                    </div>
                    <div className="font-mono text-[11px] font-bold text-[#0A1F44]">₹180</div>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-[#E3DCCB]/60 pt-1.5">
                    <div>
                      <div className="font-serif font-bold text-[#0A1F44]">Wild Yeast Sourdough</div>
                      <div className="text-[10px] text-[#354B70] font-mono">36h cold fermented loaf</div>
                    </div>
                    <div className="font-mono text-[11px] font-bold text-[#0A1F44]">₹240</div>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-[#E3DCCB]/60 pt-1.5">
                    <div>
                      <div className="font-serif font-bold text-[#0A1F44]">Smoked Pork Sando</div>
                      <div className="text-[10px] text-[#354B70] font-mono">Local herbs &amp; butter</div>
                    </div>
                    <div className="font-mono text-[11px] font-bold text-[#0A1F44]">₹320</div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E3DCCB] flex items-center justify-between font-mono text-[8px] text-[#0A1F44]/50 uppercase tracking-mono">
                  <span>KITCHEN TABLET SYNC</span>
                  <span className="text-[#10B981] font-bold">● CONNECTED</span>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* LAYER 2: FLOATING BROWSER NAV LAYER (Above Center) */}
              {/* ---------------------------------------------------- */}
              <div
                ref={navLayerRef}
                className="absolute -top-10 sm:-top-12 z-30 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border border-[#E3DCCB] shadow-xl flex items-center gap-2.5 font-mono text-[9px] sm:text-[10px] text-[#0A1F44] select-none"
                style={{
                  transform: "translateZ(90px)",
                }}
              >
                <div className="flex items-center gap-1.5 text-[#10B981]">
                  <Lock className="w-2.5 h-2.5" />
                  <span className="text-[8px] uppercase tracking-mono font-bold">SSL ACTIVE</span>
                </div>
                <span className="text-[#E3DCCB]">•</span>
                <span className="font-semibold text-[#0A1F44]">https://theretrocafe.in</span>
                <span className="text-[#E3DCCB] hidden sm:inline">•</span>
                <span className="text-[#0A1F44]/50 hidden sm:inline">&lt; 0.7s SPEED</span>
              </div>

              {/* ---------------------------------------------------- */}
              {/* LAYER 3: MAIN RETRO CAFE BROWSER MOCKUP (Center) */}
              {/* ---------------------------------------------------- */}
              <div
                ref={mainMockupRef}
                className="relative z-10 w-full max-w-xl sm:max-w-2xl bg-[#FAF5EB] rounded-xl sm:rounded-2xl border border-[#FAF5EB]/50 p-3 sm:p-5 text-[#0A1F44] select-none transition-shadow"
                style={{
                  boxShadow: "0 30px 70px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Browser Chrome Header */}
                <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-2 sm:pb-3 mb-2.5 sm:mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B4A]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E3DCCB]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E3DCCB]" />
                  </div>
                  <div className="px-2.5 py-0.5 rounded-md bg-white border border-[#E3DCCB] font-mono text-[9px] sm:text-[10px] text-[#0A1F44]/75">
                    the retro cafe • mon, nagaland
                  </div>
                  <button className="px-3 py-1 rounded-full bg-[#FF6B4A] hover:bg-[#E85635] text-white font-mono text-[8px] sm:text-[9px] uppercase font-bold tracking-mono transition-all">
                    Order Online ↗
                  </button>
                </div>

                {/* Hero Showcase with Retro Cafe Interior Photography */}
                <div className="relative w-full h-32 sm:h-44 md:h-48 rounded-lg sm:rounded-xl overflow-hidden border border-[#E3DCCB] shadow-inner mb-3 group">
                  <Image
                    src="/images/projects/retro_cafe.png"
                    alt="The Retro Cafe - Artisan interior and dining in Mon, Nagaland"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/80 via-[#0A1F44]/20 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm border border-[#E3DCCB] font-mono text-[8px] sm:text-[9px] text-[#0A1F44] font-bold uppercase tracking-mono">
                    ✦ LIVE SITE PREVIEW
                  </div>

                  <div className="absolute bottom-2.5 left-3 text-white">
                    <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-mono text-[#FF6B4A] font-bold">
                      MON, NAGALAND // ARTISANAL DINING
                    </div>
                    <div className="font-serif text-sm sm:text-lg font-bold leading-tight">
                      Direct Table Reservations &amp; Menu Orders
                    </div>
                  </div>
                </div>

                {/* Mockup Subtitle & Features */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-[#E3DCCB]">
                  <div className="font-mono text-[9px] sm:text-[10px] text-[#0A1F44]/70">
                    <span className="text-[#FF6B4A] font-bold">0% COMMISSION:</span> Orders route directly to WhatsApp
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[9px] text-[#0A1F44]/50 uppercase tracking-mono">
                    <span>100% IN-HOUSE CODE</span>
                    <span>NEXT.JS ENGINE</span>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* LAYER 4: SEPARATE BOOKING INTERFACE (Front Right) */}
              {/* ---------------------------------------------------- */}
              <div
                ref={bookingCardRef}
                className="absolute -right-3 sm:-right-12 md:-right-20 -bottom-6 sm:-bottom-8 w-56 sm:w-64 md:w-72 bg-white rounded-xl border border-[#E3DCCB] p-3.5 sm:p-4 text-[#0A1F44] shadow-2xl select-none"
                style={{
                  boxShadow: "0 28px 60px rgba(10, 31, 68, 0.28), 0 6px 18px rgba(0, 0, 0, 0.12)",
                  transform: "translateZ(80px) rotateY(-6deg) rotateX(-2deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-2 mb-2 font-mono text-[9px] uppercase font-bold tracking-mono">
                  <span className="flex items-center gap-1.5 text-[#FF6B4A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] animate-ping" />
                    <span>INSTANT TABLE BOOKING</span>
                  </span>
                  <span className="text-[8px] text-[#0A1F44]/40">ENGINE</span>
                </div>

                <div className="space-y-1.5 my-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0A1F44]">
                    <IconCalendar size={13} color="#FF6B4A" />
                    <span>Today, 7:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#354B70]">
                    <IconClock size={13} color="#0A1F44" />
                    <span>2 Guests • Window Booth (A-04)</span>
                  </div>
                </div>

                <button className="mt-2.5 w-full py-2 rounded-lg bg-[#FF6B4A] hover:bg-[#E85635] text-white font-mono text-[9px] text-center uppercase font-bold tracking-mono shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0">
                  Confirm Reservation
                </button>

                <div className="mt-2 text-center font-mono text-[8px] text-[#0A1F44]/50 uppercase tracking-mono">
                  Instant SMS &amp; WhatsApp Confirmation
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* LAYER 5: INTERFACE MARKERS & PARALLAX BADGES */}
              {/* ---------------------------------------------------- */}
              {/* Marker 1: Top-Right Coral Sticker */}
              <div
                ref={marker1Ref}
                className="absolute -top-6 -right-6 md:-right-10 z-40 px-3 py-1 rounded-full bg-[#FF6B4A] text-white font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-mono shadow-xl transform rotate-6"
                style={{ transform: "translateZ(100px) rotate(6deg)" }}
              >
                <span>✦ Zero Commission</span>
              </div>

              {/* Marker 2: Bottom-Left Cream Sticker */}
              <div
                ref={marker2Ref}
                className="absolute -bottom-6 -left-6 md:-left-12 z-40 px-3 py-1 rounded-full bg-[#FAF5EB] text-[#0A1F44] border border-[#E3DCCB] font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-mono shadow-xl transform -rotate-6"
                style={{ transform: "translateZ(70px) rotate(-6deg)" }}
              >
                <span>Direct WhatsApp Route</span>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* SCENE C: BOTTOM TYPOGRAPHY: "Built to bring customers." */}
          {/* Sits safely in the bottom zone to PREVENT OVERLAP */}
          {/* ==================================================== */}
          <div
            ref={bottomWordsRef}
            className="absolute right-6 sm:right-12 md:right-16 bottom-6 sm:bottom-8 md:bottom-10 z-30 pointer-events-none text-right"
          >
            {/* Oversized Fraunces Typography: "Built to bring customers." */}
            <h2
              className="font-serif font-black tracking-tight"
              style={{
                fontSize: "clamp(24px, min(4.4vw, 5.8vh), 50px)",
                lineHeight: 1.05,
              }}
            >
              <span className="word-item inline-block mr-2 text-[#FAF5EB]">Built</span>
              <span className="word-item inline-block mr-2 text-[#8D8893]">to</span>
              <span className="word-item inline-block mr-2 text-[#8D8893]">bring</span>
              <span className="word-item inline-block text-[#FF6B4A]">customers.</span>
            </h2>

            {/* Monospace Sub-label */}
            <div className="font-mono text-[10px] sm:text-xs text-[#FAF5EB]/60 tracking-mono uppercase mt-1 font-bold">
              DIRECT BOOKINGS • LIVE MENU • ZERO AGENT FLUFF
            </div>
          </div>

          {/* ==================================================== */}
          {/* SCENE D: NAVY BLACKOUT OVERLAY FOR CLEAN HANDOFF */}
          {/* ==================================================== */}
          <div
            ref={blackoutRef}
            className="absolute inset-0 bg-[#0A1F44] pointer-events-none z-50 opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
