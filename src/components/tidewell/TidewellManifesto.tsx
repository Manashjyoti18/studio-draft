"use client";

import React, { useEffect, useRef, useState } from "react";

// Sprite sheet URL for stickers (conch, pearl, capsule, paper plane)
const SPRITE_URL =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_061547_979f8673-f904-4102-90a0-6458bce33bc8.png&w=700&q=85";

// Normalized sprite coordinates [ymin, xmin, ymax, xmax]
const SPRITE_CROPS = {
  plane: [0.594, 0.613, 0.891, 0.816],
  conch: [0.109, 0.121, 0.43, 0.422],
  pearl: [0.625, 0.152, 0.863, 0.395],
  capsule: [0.094, 0.656, 0.418, 0.793],
};

function SpriteSticker({
  type,
  sizeEm = 1.0,
  rotation = 0,
  visible = true,
}: {
  type: keyof typeof SPRITE_CROPS;
  sizeEm?: number;
  rotation?: number;
  visible?: boolean;
}) {
  const [ymin, xmin, ymax, xmax] = SPRITE_CROPS[type];
  const widthRatio = xmax - xmin;
  const heightRatio = ymax - ymin;
  const bgSizeX = (1 / widthRatio) * 100;
  const bgSizeY = (1 / heightRatio) * 100;
  const bgPosX = (xmin / (1 - widthRatio)) * 100;
  const bgPosY = (ymin / (1 - heightRatio)) * 100;

  return (
    <span
      className="inline-block align-middle pointer-events-none select-none transition-transform duration-500"
      style={{
        width: `${sizeEm}em`,
        height: `${sizeEm * (heightRatio / widthRatio)}em`,
        transform: visible
          ? `rotate(${rotation}deg) scale(1)`
          : `rotate(${rotation}deg) scale(0)`,
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", // back-out 1.15
        transitionDelay: "120ms",
      }}
    >
      <span
        className="block w-full h-full"
        style={{
          backgroundImage: `url(${SPRITE_URL})`,
          backgroundSize: `${bgSizeX}% ${bgSizeY}%`,
          backgroundPosition: `${bgPosX}% ${bgPosY}%`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </span>
  );
}

// Character drop-in text with 35ms stagger and 14deg rotation
function DropText({
  text,
  active,
  forceVisible,
}: {
  text: string;
  active: boolean;
  forceVisible?: boolean;
}) {
  const isVisible = active || forceVisible;
  const chars = text.split("");

  return (
    <span className="inline-block whitespace-nowrap">
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0) rotate(0deg)"
              : "translateY(0.55em) rotate(14deg)",
            transitionDuration: "500ms",
            transitionDelay: `${i * 35}ms`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function TidewellManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trackWidth, setTrackWidth] = useState(3600);
  const [windowWidth, setWindowWidth] = useState(1440);
  const [forceAllVisible, setForceAllVisible] = useState(false);

  // Safety fallback timer: force visible if animation stalls (1.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceAllVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalDist = section.offsetHeight - window.innerHeight;
      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track translates horizontally from x = W*.06 to -(trackWidth - W*.9)
  const startX = windowWidth * 0.06;
  const endX = -(trackWidth - windowWidth * 0.9);
  const currentTranslateX = startX + (endX - startX) * scrollProgress;

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative w-full bg-[#0A1F44] text-[#FAF5EB]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center bg-[#0A1F44]">
        {/* Thin Navy Blueprint Grid (8% opacity) */}
        <div className="absolute inset-0 blueprint-grid-navy pointer-events-none opacity-20" />

        {/* Section Eyebrow (mono, small) */}
        <div className="absolute top-8 left-8 sm:left-12 font-mono text-[10px] sm:text-xs text-[#FAF5EB]/50 uppercase tracking-mono z-20 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
          <span>02 // THE STUDIO DRAFT MANIFESTO</span>
        </div>

        {/* Huge Horizontal Scrolling Track */}
        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap will-change-transform select-none"
          style={{
            transform: `translate3d(${currentTranslateX}px, 0px, 0px)`,
            fontSize: "clamp(44px, 6vw, 92px)",
            lineHeight: 1.15,
            fontFamily: "var(--font-fraunces), serif",
          }}
        >
          {/* Segment 1: "Designing websites that bring customers." */}
          <span className="inline-block mx-4">
            <DropText
              text="Designing websites that bring customers."
              active={scrollProgress > 0.02}
              forceVisible={forceAllVisible}
            />
          </span>

          {/* Sticker: Conch */}
          <div className="inline-block mx-6">
            <SpriteSticker
              type="conch"
              sizeEm={1.15}
              rotation={-12}
              visible={scrollProgress > 0.12 || forceAllVisible}
            />
          </div>

          {/* Segment 2: "Crafting fast and clear websites that work." */}
          <span className="inline-block mx-4">
            <DropText
              text="Crafting fast and clear websites that work."
              active={scrollProgress > 0.22}
              forceVisible={forceAllVisible}
            />
          </span>

          {/* Sticker: Pearl */}
          <div className="inline-block mx-6">
            <SpriteSticker
              type="pearl"
              sizeEm={0.85}
              rotation={0}
              visible={scrollProgress > 0.35 || forceAllVisible}
            />
          </div>

          {/* Segment 3: "The site is a shop, open 24 by 7," */}
          <span className="inline-block mx-4">
            <DropText
              text="The site is a shop, open 24 by 7,"
              active={scrollProgress > 0.45}
              forceVisible={forceAllVisible}
            />
          </span>

          {/* Sticker: Capsule */}
          <div className="inline-block mx-6">
            <SpriteSticker
              type="capsule"
              sizeEm={1.1}
              rotation={-8}
              visible={scrollProgress > 0.58 || forceAllVisible}
            />
          </div>

          {/* Segment 4: "and a menu that brings bookings, orders, and enquiries to life" */}
          <span className="inline-block mx-4">
            <DropText
              text="and a menu that brings bookings, orders, and enquiries to life"
              active={scrollProgress > 0.65}
              forceVisible={forceAllVisible}
            />
          </span>

          {/* Sticker: Paper Plane */}
          <div className="inline-block mx-6">
            <SpriteSticker
              type="plane"
              sizeEm={1.2}
              rotation={-14}
              visible={scrollProgress > 0.76 || forceAllVisible}
            />
          </div>

          {/* Segment 5: "through design, code, and care." */}
          <span className="inline-block mx-4 text-[#FF6B4A]">
            <DropText
              text="through design, code, and care."
              active={scrollProgress > 0.82}
              forceVisible={forceAllVisible}
            />
          </span>

          {/* Ending Spacer */}
          <div className="inline-block w-[30vw]" />
        </div>
      </div>
    </section>
  );
}
