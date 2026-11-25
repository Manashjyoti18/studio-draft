"use client";

import React, { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isRendered, setIsRendered] = useState(true);
  const [isWiping, setIsWiping] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0); // 0: DESIGN, 1: DEVELOP, 2: DEPLOY
  const [subText, setSubText] = useState("DRAFTING YOUR SITE");
  const [progressWidth, setProgressWidth] = useState(0); // 0 to 100%
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setIsRendered(false);
        window.dispatchEvent(new CustomEvent("studio-loader-complete"));
        onLoadingComplete?.();
        return;
      }
    }

    // 1. Drifting particles on Midnight Navy (#071633)
    // Tiny square points, 2 px, cream and coral at 20 percent opacity drifting slowly down
    const canvas = canvasRef.current;
    let animId: number;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");

      const POINT_COUNT = 60;
      const points = Array.from({ length: POINT_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2,
        speed: 0.6 + Math.random() * 0.8,
        color: Math.random() < 0.25 ? "#FF6B4A" : "#FAF5EB",
      }));

      const draw = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const exRadius = 180; // keep strictly away from center text

        for (const p of points) {
          p.y += p.speed;
          if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
          }

          const dx = p.x - cx;
          const dy = p.y - cy;
          if (Math.hypot(dx, dy) > exRadius) {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        }
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    // 2. Timeline: Words crossfade (DESIGN 0-0.6s -> DEVELOP 0.6-1.2s -> DEPLOY 1.2-1.8s)
    const tWord1 = setTimeout(() => setActiveWordIndex(1), 600);
    const tWord2 = setTimeout(() => setActiveWordIndex(2), 1200);

    // Subtext changes from DRAFTING YOUR SITE to DESCENDING
    const tSubText = setTimeout(() => setSubText("DESCENDING"), 1000);

    // Smooth progress line fill from 0% to 100% over 1900ms
    const startTime = performance.now();
    const duration = 1900;
    let pAnimId: number;

    const tickProgress = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgressWidth(eased * 100);

      if (t < 1) {
        pAnimId = requestAnimationFrame(tickProgress);
      }
    };
    pAnimId = requestAnimationFrame(tickProgress);

    // 3. Curtain wipe up at 2.0s, lasting 0.6s
    const tWipe = setTimeout(() => {
      setIsWiping(true);
    }, 2000);

    // Complete at 2.6s (2.0s + 0.6s wipe), unmount completely and notify header
    const tComplete = setTimeout(() => {
      setIsRendered(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("studio-loader-complete"));
      }
      onLoadingComplete?.();
    }, 2600);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (pAnimId) cancelAnimationFrame(pAnimId);
      clearTimeout(tWord1);
      clearTimeout(tWord2);
      clearTimeout(tSubText);
      clearTimeout(tWipe);
      clearTimeout(tComplete);
    };
  }, [onLoadingComplete]);

  if (!isRendered) return null;

  const words = ["DESIGN", "DEVELOP", "DEPLOY"];

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between pointer-events-none select-none bg-[#071633] transition-transform duration-[600ms] ${
        isWiping ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
      }}
      role="progressbar"
      aria-label="Studio Draft Initializing"
    >
      {/* Background: Clean flat Midnight Navy */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Top Centre: IBM Plex Mono, 11px, letter-spacing 0.3em, cream at 60% */}
      <div className="relative z-10 pt-10 sm:pt-12 text-center">
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#FAF5EB]/60">
          STUDIO DRAFT, ASSAM, IN
        </span>
      </div>

      {/* Centre Unit: Rotating Ring + Centered Wordmark + Cross-fading Words */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        {/* Rotating Typographic Ring & Centered Wordmark */}
        <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">
          {/* Rotating SVG Typographic Ring: 1px stroke at 80% opacity, 12s linear infinite */}
          <div className="absolute inset-0 animate-spin-slow">
            <svg
              viewBox="0 0 360 360"
              className="w-full h-full overflow-visible"
            >
              {/* Thin 1px stroke circle in cream at 80% opacity */}
              <circle
                cx="180"
                cy="180"
                r="150"
                fill="none"
                stroke="#FAF5EB"
                strokeOpacity="0.8"
                strokeWidth="1"
              />

              {/* Circular Path for Typographic Repeat */}
              <defs>
                <path
                  id="loader-ring-path"
                  d="M 180, 180 m -135, 0 a 135,135 0 1,1 270,0 a 135,135 0 1,1 -270,0"
                />
              </defs>

              <text
                fill="#FAF5EB"
                fillOpacity="0.8"
                className="font-serif text-[17px] tracking-[0.18em] uppercase select-none"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                <textPath
                  href="#loader-ring-path"
                  startOffset="0%"
                  spacing="auto"
                >
                  STUDIO DRAFT, DESIGN, DEVELOP, DEPLOY,&nbsp;
                </textPath>
              </text>
            </svg>
          </div>

          {/* Centered Wordmark: Fraunces, 32px, weight 600, cream with solid coral dot */}
          <div className="relative z-20 flex items-center justify-center text-center">
            <div className="font-serif text-[30px] sm:text-[34px] font-semibold text-[#FAF5EB] tracking-tight">
              Studio Draft<span className="text-[#FF6B4A]">.</span>
            </div>
          </div>
        </div>

        {/* Below Ring: Three cross-fading words (Fraunces, 20px, weight 300, cream at 80%, letter spaced) */}
        <div className="relative h-8 mt-4 flex items-center justify-center">
          {words.map((word, idx) => (
            <span
              key={word}
              className={`absolute font-serif text-[20px] font-light tracking-[0.25em] text-[#FAF5EB]/80 transition-all duration-500 ease-out ${
                activeWordIndex === idx
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-1 scale-95 pointer-events-none"
              }`}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Progress Line: 1px high, 200px wide, cream at 20% track with coral #FF6B4A fill */}
        <div className="w-[200px] h-[1px] bg-[#FAF5EB]/20 mt-8 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 bg-[#FF6B4A] transition-all duration-100 ease-linear"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        {/* Subtext below progress line: IBM Plex Mono, 11px, letter-spacing 0.25em, cream at 60% */}
        <div className="mt-4 text-center">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#FAF5EB]/60 transition-opacity duration-300">
            {subText}
          </span>
        </div>
      </div>

      {/* Bottom spacer for balanced breathing room */}
      <div className="pb-10 sm:pb-12" />

      {/* Keyframe animation for slow 12s linear spin */}
      <style jsx global>{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
