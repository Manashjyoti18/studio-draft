"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TidewellPixelIcon, PIXEL_ICON_KEYS, type PixelIconKey } from "./TidewellPixelIcon";

export interface WorkCardData {
  id: number;
  title: string;
  category: string;
  tag: string;
  desc: string;
  url?: string;
  image?: string;
}

export const WORK_CARDS: WorkCardData[] = [
  {
    id: 0,
    title: "ToolKB.in",
    category: "BROWSER UTILITY",
    tag: "LIVE TOOL",
    desc: "High-speed developer utilities & client-side converters.",
    url: "https://toolkb.in",
    image: "/images/projects/toolkb.webp",
  },
  {
    id: 1,
    title: "Brandcey",
    category: "CREATIVE MARKETPLACE",
    tag: "COMMERCE",
    desc: "Curated design services connecting agencies with founders.",
    url: "https://brandcey.in",
    image: "/images/projects/brandcey.webp",
  },
  {
    id: 2,
    title: "Arogya Relief",
    category: "HEALTHCARE PLATFORM",
    tag: "HEALTHCARE",
    desc: "Hospital bed telemetry & verified emergency supply lines.",
    url: "https://www.arogyarelief.in",
    image: "/images/projects/arogyarelief.webp",
  },
  {
    id: 3,
    title: "Motion Subtitles",
    category: "CREATOR AUTOMATION",
    tag: "VIDEO APP",
    desc: "Automated transcription & kinetic typography rendering.",
    image: "/images/projects/motionsubtitles.webp",
  },
  {
    id: 4,
    title: "The Retro Cafe",
    category: "CAFE WEBSITE",
    tag: "CLIENT WORK",
    desc: "Full-service cafe website, digital menu & WhatsApp orders.",
    url: "https://theretrocafe.in",
    image: "/images/projects/retro_cafe.png",
  },
  {
    id: 5,
    title: "Nel Cakes",
    category: "BAKERY PLATFORM",
    tag: "IN PROGRESS",
    desc: "Artisanal cake catalog & custom private order pipeline.",
    image: "/images/projects/cafe_bakery_demo.svg",
  },
  {
    id: 6,
    title: "Qrivna",
    category: "FINANCIAL LEDGER",
    tag: "FINTECH",
    desc: "Ledger tracking & multi-currency invoice workflows.",
    image: "/images/projects/qrivna_demo_pro.webp",
  },
  {
    id: 7,
    title: "BrollWriter",
    category: "CONTENT TOOL",
    tag: "CREATOR TOOL",
    desc: "Script sequencing & scene pacing timer for video directors.",
    image: "/images/projects/brollwriter_demo_pro.webp",
  },
  {
    id: 8,
    title: "Dhankathaa",
    category: "PERSONAL FINANCE",
    tag: "FINTECH",
    desc: "Personal cash-flow projections & recurring bill reminders.",
    image: "/images/projects/dhankathaa_demo_pro.webp",
  },
  {
    id: 9,
    title: "GCMR.IN",
    category: "COMMERCIAL PLATFORM",
    tag: "INDUSTRIAL",
    desc: "Industrial machinery distribution platform & catalogue.",
    url: "https://gcmr.in",
    image: "/images/projects/qrivna_demo_pro.webp",
  },
  {
    id: 10,
    title: "ResumeIQ",
    category: "CAREER SYSTEM",
    tag: "UTILITY",
    desc: "ATS-compliant resume generator with clean typography.",
    image: "/images/projects/resumeiq-hero.png",
  },
  {
    id: 11,
    title: "Cafe & Bakery Demo",
    category: "COMMERCE BLUEPRINT",
    tag: "DEMO BLUEPRINT",
    desc: "Fast digital bakery storefront with categorized menu.",
    url: "https://cafebakerydemo.42web.io",
    image: "/images/projects/cafe_bakery_demo.svg",
  },
];

// Catmull-Rom Spline Helper
function catmullRom(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): [number, number] {
  const t2 = t * t;
  const t3 = t2 * t;
  const v0 = (p2[0] - p0[0]) * 0.5;
  const v1 = (p3[0] - p1[0]) * 0.5;
  const x =
    (2 * p1[0] - 2 * p2[0] + v0 + v1) * t3 +
    (-3 * p1[0] + 3 * p2[0] - 2 * v0 - v1) * t2 +
    v0 * t +
    p1[0];

  const w0 = (p2[1] - p0[1]) * 0.5;
  const w1 = (p3[1] - p1[1]) * 0.5;
  const y =
    (2 * p1[1] - 2 * p2[1] + w0 + w1) * t3 +
    (-3 * p1[1] + 3 * p2[1] - 2 * w0 - w1) * t2 +
    w0 * t +
    p1[1];

  return [x, y];
}

const PLANE_KEYFRAMES: [number, number, number][] = [
  [0.33, -3, 73],
  [0.45, 4, 71],
  [0.6, 13, 65],
  [0.7, 22, 55],
  [0.8, 31, 44],
  [0.87, 32.5, 47.5],
  [0.93, 26, 48],
  [1.0, 21.5, 45],
  [1.07, 22.5, 51.5],
  [1.15, 27, 52],
  [1.27, 34, 41], // Lands on headline first icon
];

const HEADLINE_TEXT = "Design. Develop. Deploy.";

export default function TidewellStory({
  onScrollProgress,
}: {
  onScrollProgress?: (progress: number) => void;
}) {
  const storyRef = useRef<HTMLElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const [scrollP, setScrollP] = useState(0);
  const [cardPoses, setCardPoses] = useState<
    { x: number; y: number; rot: number; opacity: number }[]
  >(() =>
    Array(12)
      .fill(0)
      .map(() => ({ x: 0, y: 1200, rot: 8, opacity: 0 }))
  );

  // Resize listener: compute CSS custom properties on :root
  useEffect(() => {
    const computeSizes = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const isMobile = W < 820 && W < H * 1.1;

      const u = Math.min(W / 1440, H / 800);
      const n = isMobile ? Math.min(1, W / 560) : Math.min(Math.max(W / 1440, 0.62), 1.25);
      const hfs = isMobile ? Math.min(W * 0.075, H * 0.06, 36) : Math.min(W * 0.045, H * 0.08, 64);
      const ic = hfs * 0.65;
      const pfs = isMobile ? Math.min(W * 0.085, 40) : Math.min(W * 0.0335, H * 0.062);
      const sfs = isMobile ? Math.min(W * 0.09, 44) : Math.min(W * 0.042, H * 0.078);
      const mfs = isMobile ? Math.min(W * 0.11, H * 0.075) : Math.min(W * 0.05, H * 0.1);
      const camw = isMobile ? Math.min(W * 0.62, H * 0.34) : Math.min(W * 0.19, H * 0.36);
      const cw = isMobile ? Math.min(W * 0.3, H * 0.2) : Math.min(W / 1440, H / 780) * 218;
      const ch = cw * 1.32;

      const root = document.documentElement;
      root.style.setProperty("--u", `${u}px`);
      root.style.setProperty("--n", `${n}px`);
      root.style.setProperty("--hfs", `${hfs}px`);
      root.style.setProperty("--ic", `${ic}px`);
      root.style.setProperty("--pfs", `${pfs}px`);
      root.style.setProperty("--sfs", `${sfs}px`);
      root.style.setProperty("--mfs", `${mfs}px`);
      root.style.setProperty("--camw", `${camw}px`);
      root.style.setProperty("--cw", `${cw}px`);
      root.style.setProperty("--ch", `${ch}px`);
    };

    computeSizes();
    window.addEventListener("resize", computeSizes);
    return () => window.removeEventListener("resize", computeSizes);
  }, []);

  // Animation Frame Loop for Load Sequence (0 to 6s) & Inertia Cards
  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    let lastTime = startTime;

    const loop = (now: number) => {
      const dt = Math.min(40, now - lastTime);
      lastTime = now;
      const curElapsed = (now - startTime) / 1000;
      setElapsed(curElapsed);

      // Smooth scroll progress
      if (storyRef.current) {
        const rect = storyRef.current.getBoundingClientRect();
        const totalScrollable = storyRef.current.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / totalScrollable));
        setScrollP(p);
        onScrollProgress?.(p);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [onScrollProgress]);

  // Compute Card Poses based on scrollP and elapsed time
  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const isMobile = W < 820 && W < H * 1.1;
    const cw = isMobile ? Math.min(W * 0.3, H * 0.2) : Math.min(W / 1440, H / 780) * 218;

    const step = (R: number) => 2 * Math.asin((1.05 * cw) / (2 * R));

    // Target poses for all 12 cards
    const targets = WORK_CARDS.map((card, i) => {
      // PHASE 0: Initial load animation (0s - 1.5s)
      if (scrollP <= 0.004) {
        // Hero cards 0 to 5 rise in sequence: 5, 2, 0, 1, 3, 4
        const order = [5, 2, 0, 1, 3, 4];
        const cardOrderIdx = order.indexOf(i);
        const delays = [0.53, 0.6, 0.63, 0.7, 0.8, 0.86];

        if (cardOrderIdx !== -1) {
          const d = delays[cardOrderIdx];
          const progress = Math.max(0, Math.min(1, (elapsed - d) / 0.7));

          // Fan position
          const R = isMobile ? W * 1.35 : (1250 * W) / 1440;
          const theta = (i - 2.5) * step(R);
          const cx = isMobile ? W * 0.5 : W * 0.55;
          const cy = H * 0.86 + R;
          const finalX = cx + R * Math.sin(theta) - (isMobile ? 0 : W * 0.02);
          const finalY = cy - R * Math.cos(theta) + (isMobile ? cw * 0.2 : 0);
          const finalRot = (theta * 180) / Math.PI;

          const startY = H + cw * 1.2;
          const curY = startY + (finalY - startY) * Math.min(1, progress * 1.15);

          return {
            x: finalX,
            y: curY,
            rot: 8 + (finalRot - 8) * progress,
            opacity: progress > 0 ? 1 : 0,
          };
        }
        return { x: W * 0.5, y: H * 1.4, rot: 0, opacity: 0 };
      }

      // PHASE 1: Fan to Scatter (0.004 - 0.21)
      if (scrollP < 0.21) {
        const t = Math.max(0, Math.min(1, (scrollP - 0.004) / 0.081));
        // Fan base
        const R = isMobile ? W * 1.35 : (1250 * W) / 1440;
        const theta = (i - 2.5) * step(R);
        const cx = isMobile ? W * 0.5 : W * 0.55;
        const cy = H * 0.86 + R;
        const fanX = cx + R * Math.sin(theta) - (isMobile ? 0 : W * 0.02);
        const fanY = cy - R * Math.cos(theta) + (isMobile ? cw * 0.2 : 0);
        const fanRot = (theta * 180) / Math.PI;

        // Scatter target
        const scatterDesktop: [number, number, number][] = [
          [0.08, 0.46, -20],
          [0.2, 0.86, -12],
          [0.8, 0.84, 14],
          [0.38, 1.04, -8],
          [0.92, 0.42, 16],
          [0.62, 1.04, 9],
        ];
        const scatterMobile: [number, number, number][] = [
          [0.06, 0.6, -20],
          [0.45, 0.66, 12],
          [0.94, 0.6, 16],
          [0.22, 0.93, -14],
          [0.72, 0.96, 9],
          [0.5, 1.3, 0],
        ];

        const scList = isMobile ? scatterMobile : scatterDesktop;
        if (i < 6) {
          const [sx, sy, sRot] = scList[i];
          const targetX = sx * W;
          const targetY = sy * H;
          return {
            x: fanX + (targetX - fanX) * t,
            y: fanY + (targetY - fanY) * t,
            rot: fanRot + (sRot - fanRot) * t,
            opacity: 1,
          };
        }
        return { x: W * 0.5, y: H * 1.4, rot: 0, opacity: 0 };
      }

      // PHASE 2: Gather into Center Pile (0.21 - 0.31)
      if (scrollP < 0.31) {
        const t = (scrollP - 0.21) / 0.1;
        const pileX = W * 0.5 + ((i % 3) - 1) * cw * 0.08;
        const pileY = H * 0.62 + (((i * 7) % 5) - 2) * cw * 0.04;
        const pileRot = (i % 2 === 0 ? 1 : -1) * (4 + i * 1.3);

        const scatterList = isMobile
          ? [
            [0.06, 0.6, -20],
            [0.45, 0.66, 12],
            [0.94, 0.6, 16],
            [0.22, 0.93, -14],
            [0.72, 0.96, 9],
            [0.5, 1.3, 0],
          ]
          : [
            [0.08, 0.46, -20],
            [0.2, 0.86, -12],
            [0.8, 0.84, 14],
            [0.38, 1.04, -8],
            [0.92, 0.42, 16],
            [0.62, 1.04, 9],
          ];

        if (i < 6) {
          const [sx, sy, sRot] = scatterList[i];
          return {
            x: sx * W + (pileX - sx * W) * t,
            y: sy * H + (pileY - sy * H) * t,
            rot: sRot + (pileRot - sRot) * t,
            opacity: 1,
          };
        } else {
          return {
            x: pileX,
            y: pileY,
            rot: pileRot,
            opacity: t, // Cards 6 to 11 fade in during this
          };
        }
      }

      // PHASE 3 & 4: Wheel and Arc (0.31 - 0.62)
      const wheelProgress = Math.max(0, Math.min(1, (scrollP - 0.31) / 0.26));
      const rotDelta = scrollP >= 0.41 ? -3 * Math.min(1, (scrollP - 0.41) / 0.16) : 0;
      const R = isMobile ? W * 1.2 : (900 * W) / 1440;
      const cx = W * 0.5;
      const cy = (isMobile ? H * 0.76 : H * 0.82) + R;

      const slot = ((i + rotDelta) % 12) - 5.5;
      const angle = slot * step(R);
      const wx = cx + R * Math.sin(angle);
      const wy = cy - R * Math.cos(angle);
      const wRot = (angle * 180) / Math.PI;
      const isVisible = Math.abs((angle * 180) / Math.PI) < 62;

      // Pile to Wheel transition (0.31 - 0.41)
      if (scrollP < 0.41) {
        const t = (scrollP - 0.31) / 0.1;
        const pileX = W * 0.5 + ((i % 3) - 1) * cw * 0.08;
        const pileY = H * 0.62 + (((i * 7) % 5) - 2) * cw * 0.04;
        const pileRot = (i % 2 === 0 ? 1 : -1) * (4 + i * 1.3);

        return {
          x: pileX + (wx - pileX) * t,
          y: pileY + (wy - pileY) * t,
          rot: pileRot + (wRot - pileRot) * t,
          opacity: 1,
        };
      }

      return {
        x: wx,
        y: wy,
        rot: wRot,
        opacity: isVisible ? 1 : 0,
      };
    });

    // Inertia chase: move cardPoses toward targets softly
    setCardPoses((prev) =>
      prev.map((cur, i) => {
        const tgt = targets[i];
        if (scrollP <= 0.004) return tgt; // Direct apply during intro
        const w = 0.055 + (i % 4) * 0.008;
        const k = 1 - Math.pow(1 - w, 1);
        return {
          x: cur.x + (tgt.x - cur.x) * k,
          y: cur.y + (tgt.y - cur.y) * k,
          rot: cur.rot + (tgt.rot - cur.rot) * k,
          opacity: tgt.opacity,
        };
      })
    );
  }, [scrollP, elapsed]);

  // Compute Paper Plane position during load flight (0.33s - 1.27s)
  const getPlaneTransform = () => {
    if (elapsed < 0.33 || elapsed > 1.33) return null;

    // Normalize t between keyframes
    const tFlight = (elapsed - 0.33) / (1.27 - 0.33);
    const nFrames = PLANE_KEYFRAMES.length - 1;
    const seg = Math.min(nFrames - 1, Math.max(0, Math.floor(tFlight * nFrames)));
    const segT = tFlight * nFrames - seg;

    const p0: [number, number] = [
      PLANE_KEYFRAMES[Math.max(0, seg - 1)][1],
      PLANE_KEYFRAMES[Math.max(0, seg - 1)][2],
    ];
    const p1: [number, number] = [PLANE_KEYFRAMES[seg][1], PLANE_KEYFRAMES[seg][2]];
    const p2: [number, number] = [
      PLANE_KEYFRAMES[Math.min(nFrames, seg + 1)][1],
      PLANE_KEYFRAMES[Math.min(nFrames, seg + 1)][2],
    ];
    const p3: [number, number] = [
      PLANE_KEYFRAMES[Math.min(nFrames, seg + 2)][1],
      PLANE_KEYFRAMES[Math.min(nFrames, seg + 2)][2],
    ];

    const [xPct, yPct] = catmullRom(p0, p1, p2, p3, segT);
    const scale = elapsed >= 1.27 ? 0.6 * (1 - (elapsed - 1.27) / 0.06) : 1;
    const opacity = elapsed >= 1.27 ? 1 - (elapsed - 1.27) / 0.06 : 1;

    return {
      left: `${xPct}vw`,
      top: `${yPct}vh`,
      transform: `scale(${scale}) rotate(18deg)`,
      opacity: Math.max(0, opacity),
    };
  };

  const planeStyle = getPlaneTransform();

  // Morph count: 1.9s to 5.2s -> 24 characters
  const morphProgress = Math.max(0, Math.min(1, (elapsed - 1.9) / (5.2 - 1.9)));
  const visibleCharsCount =
    elapsed < 1.9
      ? 0
      : Math.min(HEADLINE_TEXT.length, Math.floor(morphProgress * HEADLINE_TEXT.length) + 1);
  const remainingIconsCount = Math.max(
    0,
    Math.ceil((7 * (HEADLINE_TEXT.length - visibleCharsCount)) / 13)
  );

  // Hero Headline Scroll Opacity (0 to 0.06)
  const heroFadeProgress = Math.min(1, scrollP / 0.06);
  const heroOpacity = Math.max(0, 1 - heroFadeProgress);

  // Product Panel Gate & Zoom (0.62 to 0.97)
  const panelProgress = Math.max(0, Math.min(1, (scrollP - 0.62) / 0.12));
  const zoomQ =
    scrollP >= 0.88 ? Math.pow(Math.max(0, (scrollP - 0.88) / 0.09), 1.6) * panelProgress : 0;
  const zoomScale = 1 + Math.pow(zoomQ, 2) * 28;
  const blackoutOpacity = zoomQ > 0.45 ? Math.min(1, (zoomQ - 0.45) / 0.4) : 0;

  // Process Block Reveal (above 0.078)
  const showProcess = scrollP >= 0.05;
  const processFade = Math.min(1, Math.max(0, (scrollP - 0.05) / 0.025));

  return (
    <section
      ref={storyRef}
      id="story"
      className="relative w-full bg-[#FAF5EB] text-[#0A1F44]"
      style={{ height: "1600vh" }}
    >
      {/* 1. HERO HEADER (Absolute top 0, 100vh, z 9, pointer-events-none, scrolls away 1:1) */}
      <div
        className="absolute top-0 left-0 w-full h-screen z-9 pointer-events-none flex flex-col items-center justify-center transition-opacity"
        style={{
          opacity: heroOpacity,
          zIndex: 9,
        }}
      >
        {/* Floating Paper Plane (Load sequence flight 0.33s - 1.27s) */}
        {planeStyle && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              width: "calc(62 * var(--u, 1px))",
              height: "calc(62 * var(--u, 1px))",
              ...planeStyle,
              backgroundImage: `url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_061547_979f8673-f904-4102-90a0-6458bce33bc8.png&w=700&q=85')`,
              backgroundSize: "336.7% 492.6%",
              backgroundPosition: "146.3% 147.2%",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {/* Hero Headline Holder at top 41% */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none"
          style={{
            top: "41%",
            height: 0,
            fontSize: "var(--hfs, 64px)",
            fontWeight: 560,
            letterSpacing: "-0.035em",
            lineHeight: 1,
            color: "#0A1F44",
          }}
          aria-label="Design. Develop. Deploy."
        >
          {/* Letters Revealing One-by-One */}
          <div className="flex items-center justify-center whitespace-nowrap">
            {HEADLINE_TEXT.split("").map((ch, idx) => {
              const isVisible = idx < visibleCharsCount;
              return (
                <span
                  key={idx}
                  className="font-serif inline-block transition-all duration-300"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                    transform: isVisible ? "none" : "translateY(0.2em)",
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}

            {/* Pixel Icons Row (7 icons, vanishing as letters consume them) */}
            {elapsed >= 1.27 && (
              <div
                className="inline-flex items-center"
                style={{
                  gap: "calc(var(--ic, 40px) * 0.2)",
                  marginLeft:
                    visibleCharsCount > 0
                      ? "calc(var(--ic, 40px) * 0.32)"
                      : 0,
                }}
              >
                {PIXEL_ICON_KEYS.slice(0, remainingIconsCount).map((name, idx) => (
                  <span
                    key={name}
                    className="inline-block transition-transform duration-300"
                    style={{
                      width: "var(--ic, 40px)",
                      height: "var(--ic, 40px)",
                      opacity: elapsed >= 1.27 + idx * 0.07 ? 1 : 0,
                      transform:
                        elapsed >= 1.27 + idx * 0.07
                          ? "scale(1)"
                          : "scale(0.2)",
                    }}
                  >
                    <TidewellPixelIcon name={name as PixelIconKey} className="w-full h-full" />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Subhead & Buttons in normal flow below headline */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-auto"
          style={{ top: "48%" }}
        >
          <p className="text-base sm:text-xl text-[#0A1F44]/80 max-w-xl font-normal leading-relaxed mt-4">
            We design, develop and market digital products built to make money.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#E85635] transition-all shadow-sm active:translate-y-0.5"
            >
              Start a Project
            </button>
            <button
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight * 2,
                  behavior: "smooth",
                });
              }}
              className="px-6 py-3 rounded-full border-2 border-[#0A1F44] text-[#0A1F44] font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#0A1F44] hover:text-[#FAF5EB] transition-all"
            >
              See Our Work
            </button>
          </div>
        </div>
      </div>

      {/* 2. PINNED STAGE (Sticky top 0, height 100vh, overflow hidden, cream background) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#FAF5EB] z-0">
        {/* A. PROCESS BLOCK (z 4) */}
        {showProcess && (
          <div
            className="absolute left-1/2 -translate-x-1/2 text-center z-4 pointer-events-auto transition-opacity duration-300 w-full max-w-3xl px-4"
            style={{
              top: "18%",
              zIndex: 4,
              opacity: processFade,
            }}
          >
            <h2
              className="font-serif font-medium leading-[1.12] tracking-[-0.03em] text-[#0A1F44]"
              style={{ fontSize: "var(--pfs, 36px)" }}
            >
              <span>From sketch to site, </span>
              <br />
              <span className="font-bold text-[#6B7280]">built through deliberate process.</span>
            </h2>

            <p
              className="font-normal text-[#5B5A62] mt-3"
              style={{ fontSize: "calc(var(--pfs, 36px) * 0.27)" }}
            >
              Turning concepts into working digital products.
            </p>

            <button
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight * 5,
                  behavior: "smooth",
                });
              }}
              className="inline-flex items-center justify-center bg-[#0A1F44] text-[#FAF5EB] rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-sm mt-4"
              style={{
                height: "calc(var(--pfs, 36px) * 0.64)",
                fontSize: "calc(var(--pfs, 36px) * 0.25)",
                padding: "0 calc(var(--pfs, 36px) * 0.32)",
                gap: "6px",
              }}
            >
              <span>View All Work</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* B. CARDS LAYER (z 2, 12 Studio Draft Work Cards) */}
        <div className="absolute inset-0 z-2 pointer-events-none" style={{ zIndex: 2 }}>
          {WORK_CARDS.map((card, i) => {
            const pose = cardPoses[i] || { x: 0, y: 1200, rot: 0, opacity: 0 };
            return (
              <div
                key={card.id}
                className="absolute pointer-events-auto transition-shadow"
                style={{
                  width: "var(--cw, 218px)",
                  height: "var(--ch, 288px)",
                  left: 0,
                  top: 0,
                  transform: `translate3d(${pose.x}px, ${pose.y}px, 0) rotate(${pose.rot}deg)`,
                  transformOrigin: "50% 50%",
                  marginLeft: "calc(var(--cw, 218px) * -0.5)",
                  marginTop: "calc(var(--ch, 288px) * -0.5)",
                  borderRadius: "calc(var(--cw, 218px) * 0.075)",
                  boxShadow:
                    "0 calc(var(--cw, 218px) * 0.03) calc(var(--cw, 218px) * 0.09) rgba(10,31,68,.16), inset 0 0 0 1px rgba(255,255,255,.35)",
                  opacity: pose.opacity,
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E3DCCB",
                  overflow: "hidden",
                }}
              >
                {/* CSS Website Mockup Header */}
                <div className="h-6 w-full bg-[#FAF5EB] border-b border-[#E3DCCB] px-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3DCCB]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3DCCB]" />
                  </div>
                  <span className="font-mono text-[8px] text-[#0A1F44]/50 uppercase tracking-mono">
                    {card.category}
                  </span>
                </div>

                {/* Card Visual / Screenshot Preview */}
                <div className="relative h-32 w-full bg-[#0A1F44]/5 overflow-hidden">
                  {card.image && (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-300"
                      sizes="220px"
                    />
                  )}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#FF6B4A] text-white font-mono text-[8px] uppercase tracking-mono font-bold">
                    {card.tag}
                  </div>
                </div>

                {/* Card Metadata */}
                <div className="p-3 flex flex-col justify-between h-[calc(100%-152px)]">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#0A1F44] tracking-tight truncate">
                      {card.title}
                    </h4>
                    <p className="text-[10px] text-[#0A1F44]/70 leading-snug line-clamp-2 mt-1">
                      {card.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E3DCCB] pt-2">
                    <span className="font-mono text-[8px] text-[#0A1F44]/50">
                      REF 0{i + 1}
                    </span>
                    {card.url ? (
                      <span className="font-mono text-[9px] text-[#FF6B4A] font-bold">
                        VISIT ↗
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] text-[#0A1F44]/40">
                        INTERNAL
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* C. PRODUCT PANEL (z 6, Navy #0A1F44, grows from rounded center window) */}
        <div
          className="absolute inset-0 pointer-events-auto flex items-center justify-center transition-all"
          style={{
            zIndex: 6,
            opacity: panelProgress > 0 ? 1 : 0,
            clipPath: `inset(${Math.max(0, (1 - panelProgress) * 35)}% ${Math.max(
              0,
              (1 - panelProgress) * 35
            )}% ${Math.max(0, (1 - panelProgress) * 35)}% ${Math.max(
              0,
              (1 - panelProgress) * 35
            )}% round ${Math.max(0, (1 - panelProgress) * 24)}px)`,
            backgroundColor: "#0A1F44",
          }}
        >
          {/* Top-left Words: "Not just visuals" */}
          <div
            className="absolute left-10 top-20 sm:left-14 sm:top-24 font-serif text-[#FAF5EB] tracking-[-0.03em]"
            style={{ fontSize: "var(--sfs, 44px)" }}
          >
            <span>Not </span>
            <span className="text-[#8D8893]">just </span>
            <span>visuals.</span>
          </div>

          {/* Floating Cream Website Mockup Card */}
          <div
            className="relative bg-[#FAF5EB] rounded-2xl border border-[#E3DCCB] shadow-2xl p-6 sm:p-8 flex flex-col justify-between select-none"
            style={{
              width: "calc(var(--camw, 320px) * 2.2)",
              maxWidth: "88vw",
              aspectRatio: "16 / 10",
              transform: `scale(${zoomScale}) rotateY(${panelProgress >= 0.74 ? 8 * Math.sin(elapsed * 1.6) : 0
                }deg)`,
              transformOrigin: "54% 31%",
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Mockup Header */}
            <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B4A]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3DCCB]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3DCCB]" />
              </div>
              <span className="font-mono text-[10px] text-[#0A1F44]/60">
                https://theretrocafe.in
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FF6B4A] text-white font-mono text-[9px] uppercase font-bold">
                Order Online
              </span>
            </div>

            {/* Mockup Body Content */}
            <div className="grid grid-cols-12 gap-4 items-center my-auto">
              <div className="col-span-7">
                <div className="font-mono text-[10px] text-[#FF6B4A] uppercase font-bold mb-1">
                  FRESH BAKES &amp; ROASTS
                </div>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#0A1F44] leading-tight">
                  Artisanal Coffee &amp; Sourdough.
                </h3>
                <p className="text-[11px] text-[#0A1F44]/70 mt-1">
                  Mon, Nagaland • Direct table reservations &amp; live menu.
                </p>
              </div>

              <div className="col-span-5 p-3 rounded-lg bg-white border border-[#E3DCCB]">
                <div className="font-mono text-[9px] text-[#FF6B4A] uppercase font-bold">
                  INSTANT TABLE BOOKING
                </div>
                <div className="text-xs font-bold text-[#0A1F44] mt-1">
                  Today, 7:00 PM • 2 Guests
                </div>
                <div className="mt-2 w-full py-1 rounded bg-[#FF6B4A] text-white font-mono text-[9px] text-center uppercase font-bold">
                  Confirm Slot
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[9px] text-[#0A1F44]/50 border-t border-[#E3DCCB] pt-2">
              <span>ZERO COMMISSIONS</span>
              <span>100% IN-HOUSE CODE</span>
            </div>
          </div>

          {/* Bottom-right Words: "Products that run" */}
          <div
            className="absolute right-10 bottom-12 sm:right-14 sm:bottom-16 font-serif text-[#FAF5EB] tracking-[-0.03em] text-right"
            style={{ fontSize: "var(--sfs, 44px)" }}
          >
            <span>Verified </span>
            <span className="text-[#8D8893]">products </span>
            <span>that </span>
            <span className="text-[#FF6B4A]">run.</span>
          </div>
        </div>

        {/* D. BLACKOUT LAYER (z 8, Navy #0A1F44, zooms into screen to black/navy out) */}
        <div
          className="absolute inset-0 bg-[#0A1F44] pointer-events-none transition-opacity duration-300"
          style={{
            zIndex: 8,
            opacity: blackoutOpacity,
          }}
        />
      </div>
    </section>
  );
}
