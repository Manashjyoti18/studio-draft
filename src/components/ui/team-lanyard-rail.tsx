"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  STUDIO_DRAFT_TEAM,
  type LanyardMember,
  type LanyardLink,
} from "@/components/team/studio-draft-team";

export type { LanyardMember, LanyardLink };

export interface TeamLanyardRailLabels {
  eyebrow?: string;
  heading?: string;
  caption?: string;
}

export interface TeamLanyardRailProps {
  members?: LanyardMember[];
  heading?: string;
  caption?: string;
  autoplay?: boolean;
  interval?: number;
  action?: React.ReactNode;
  className?: string;
}

// Architectural & Physics Constants
export const RATIO = 1.48;
export const PERSPECTIVE = 1200;
export const REST_Y = 0;
export const REST_Z = 0;
export const DROPS = [24, 18, 26, 20];

// Ribbon Tone Colors (Mapped strictly to 60-30-10 Navy & Coral)
export const TONE_COLORS: Record<number, { bg: string; stitch: string; border: string }> = {
  1: { bg: "#0A1F44", stitch: "#FAF5EB", border: "rgba(250, 245, 235, 0.2)" }, // Navy
  2: { bg: "#FF6B4A", stitch: "#FAF5EB", border: "rgba(255, 255, 255, 0.3)" }, // Coral
  3: { bg: "#0A1F44", stitch: "#FAF5EB", border: "rgba(250, 245, 235, 0.2)" }, // Navy
  4: { bg: "#FF6B4A", stitch: "#FAF5EB", border: "rgba(255, 255, 255, 0.3)" }, // Coral
  5: { bg: "#0A1F44", stitch: "#FAF5EB", border: "rgba(250, 245, 235, 0.2)" }, // Navy
};

export default function TeamLanyardRail({
  members = STUDIO_DRAFT_TEAM,
  heading = "Direct access to the builders. No account managers.",
  caption = "Brush along the rail to meet someone, pull a badge down, click to flip it.",
  autoplay = true,
  interval = 2800,
  action,
  className = "",
}: TeamLanyardRailProps) {
  const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(autoplay);
  const [pullOffsets, setPullOffsets] = useState<Record<string, number>>({});
  const [tilts, setTilts] = useState<Record<string, { x: number; y: number }>>({});
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLElement>(null);
  const dragStartYRef = useRef<number | null>(null);
  const activeDragIdRef = useRef<string | null>(null);

  // Stop autoplay on any user interaction
  const stopAutoplay = useCallback(() => {
    if (autoplayActive) {
      setAutoplayActive(false);
    }
  }, [autoplayActive]);

  // Flip toggle handler
  const handleFlip = useCallback(
    (id: string) => {
      stopAutoplay();
      setFlippedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    },
    [stopAutoplay]
  );

  // Keyboard navigation: Enter flips, Escape flips back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFlippedMap({});
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autoplay loop: rotates focus through badges
  useEffect(() => {
    if (!autoplayActive || !members || members.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % members.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplayActive, interval, members]);

  // Pull-down Drag handlers
  const handleMouseDown = (id: string, clientY: number) => {
    stopAutoplay();
    dragStartYRef.current = clientY;
    activeDragIdRef.current = id;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilts((prev) => ({
      ...prev,
      [id]: { x: -y * 12, y: x * 14 },
    }));

    if (activeDragIdRef.current === id && dragStartYRef.current !== null) {
      const deltaY = Math.max(0, Math.min(65, e.clientY - dragStartYRef.current));
      setPullOffsets((prev) => ({ ...prev, [id]: deltaY }));
    }
  };

  const handleMouseLeave = (id: string) => {
    setTilts((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
    if (activeDragIdRef.current === id) {
      activeDragIdRef.current = null;
      dragStartYRef.current = null;
      setPullOffsets((prev) => ({ ...prev, [id]: REST_Y }));
    }
  };

  const handleMouseUp = (id: string) => {
    if (activeDragIdRef.current === id) {
      activeDragIdRef.current = null;
      dragStartYRef.current = null;
      setPullOffsets((prev) => ({ ...prev, [id]: REST_Y }));
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    stopAutoplay();
    dragStartYRef.current = e.touches[0].clientY;
    activeDragIdRef.current = id;
  };

  const handleTouchMove = (id: string, e: React.TouchEvent) => {
    if (activeDragIdRef.current === id && dragStartYRef.current !== null) {
      const deltaY = Math.max(0, Math.min(50, e.touches[0].clientY - dragStartYRef.current));
      setPullOffsets((prev) => ({ ...prev, [id]: deltaY }));
    }
  };

  const handleTouchEnd = (id: string) => {
    if (activeDragIdRef.current === id) {
      activeDragIdRef.current = null;
      dragStartYRef.current = null;
      setPullOffsets((prev) => ({ ...prev, [id]: REST_Y }));
    }
  };

  return (
    <section
      ref={containerRef}
      id="team"
      className={`relative w-full bg-[#071633] text-[#FAF5EB] py-16 px-6 border-b border-[#FAF5EB]/15 overflow-hidden ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-[#FAF5EB]/15 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#FAF5EB] leading-tight">
              {heading}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#FAF5EB]/70 font-mono tracking-mono">
              {caption}
            </p>
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* 1. Heavy Metal Hanging Rail System */}
        <div className="relative w-full mb-12">
          {/* Main Metal Rod */}
          <div className="h-2.5 w-full bg-gradient-to-r from-[#888888] via-[#DDDDDD] to-[#777777] rounded-full shadow-md border-t border-white/60 relative">
            {/* End Caps */}
            <div className="absolute -left-2 -top-1 w-4 h-4.5 rounded-full bg-[#555555] border border-[#333333] shadow" />
            <div className="absolute -right-2 -top-1 w-4 h-4.5 rounded-full bg-[#555555] border border-[#333333] shadow" />
          </div>

          {/* DESKTOP RAIL ROW (All 4 badges side-by-side) */}
          <div className="hidden md:grid grid-cols-4 gap-6 pt-0">
            {(members || []).map((member, index) => {
              const tone = TONE_COLORS[member.tone] || TONE_COLORS[1];
              const isFlipped = !!flippedMap[member.id];
              const currentTilt = tilts[member.id] || { x: 0, y: 0 };
              const pullY = pullOffsets[member.id] || 0;
              const dropOffset = DROPS[index % DROPS.length];

              return (
                <div
                  key={member.id}
                  className="flex flex-col items-center select-none"
                  style={{ perspective: PERSPECTIVE }}
                >
                  {/* Metal Eyelet / Ring sliding on the rail */}
                  <div className="w-5 h-5 rounded-full border-2 border-[#555555] bg-gradient-to-b from-[#EEEEEE] to-[#999999] shadow-sm -mt-1 z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#333333]" />
                  </div>

                  {/* Lanyard Fabric Ribbon Strap (Navy or Coral per tone) */}
                  <div
                    className="w-4 shadow-inner flex flex-col justify-between items-center py-1 transition-transform duration-150"
                    style={{
                      height: `${60 + dropOffset}px`,
                      backgroundColor: tone.bg,
                      borderLeft: `1px solid ${tone.border}`,
                      borderRight: `1px solid ${tone.border}`,
                      transform: `translateY(${pullY * 0.4}px)`,
                    }}
                  >
                    <div className="w-full h-full opacity-25 bg-[repeating-linear-gradient(45deg,#FFFFFF,#FFFFFF_1px,transparent_1px,transparent_3px)]" />
                    <div
                      className="w-[1.5px] h-full absolute"
                      style={{ backgroundColor: tone.stitch }}
                    />
                  </div>

                  {/* Metal Swivel Carabiner Clip */}
                  <div
                    className="flex flex-col items-center -mt-1 z-20 transition-transform duration-150"
                    style={{ transform: `translateY(${pullY * 0.4}px)` }}
                  >
                    <div className="w-3.5 h-3.5 rounded-sm bg-[#999999] border border-[#555555] shadow-xs" />
                    <div className="w-4 h-2 bg-[#777777] border border-[#444444] rounded-b-sm" />
                    <div className="w-6 h-1.5 bg-[#555555] rounded-full mt-0.5" />
                  </div>

                  {/* 3D Hanging Badge Body */}
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`${member.name} Pass Card. Click or press Enter to flip.`}
                    onClick={() => handleFlip(member.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleFlip(member.id);
                      }
                    }}
                    onMouseDown={(e) => handleMouseDown(member.id, e.clientY)}
                    onMouseMove={(e) => handleMouseMove(e, member.id)}
                    onMouseLeave={() => handleMouseLeave(member.id)}
                    onMouseUp={() => handleMouseUp(member.id)}
                    style={{
                      transform: `translateY(${pullY}px) rotateX(${currentTilt.x}deg) rotateY(${isFlipped ? 180 + currentTilt.y : currentTilt.y
                        }deg)`,
                      transformStyle: "preserve-3d",
                      transition:
                        activeDragIdRef.current === member.id
                          ? "transform 0.05s ease-out"
                          : "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    className="relative w-full max-w-[275px] h-[400px] cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:ring-offset-2 mt-1 rounded-2xl shadow-card"
                  >
                    {/* FRONT FACE OF BADGE */}
                    <div
                      className="absolute inset-0 w-full h-full bg-[#FFFFFF] border border-[#E3DCCB] rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-subtle"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      {/* Top Pass Header */}
                      <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                        <div className="font-serif text-xs font-bold tracking-tight text-[#0A1F44]">
                          STUDIO / DRAFT
                        </div>
                        <span
                          className="px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-mono text-white"
                          style={{ backgroundColor: tone.bg }}
                        >
                          {member.team}
                        </span>
                      </div>

                      {/* Team Member Photo */}
                      <div className="my-auto py-2 flex flex-col items-center">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#E3DCCB] shadow-inner bg-[#FAF5EB] mb-3">
                          {!imageErrorMap[member.id] ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover object-top"
                              sizes="112px"
                              onError={() =>
                                setImageErrorMap((prev) => ({ ...prev, [member.id]: true }))
                              }
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-serif text-3xl font-bold text-[#0A1F44] bg-[#FAF5EB]">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        <h3 className="font-serif text-lg font-bold text-[#0A1F44] text-center leading-snug">
                          {member.name}
                        </h3>
                        <p className="font-mono text-[11px] text-[#0A1F44]/65 uppercase tracking-mono text-center mt-0.5">
                          {member.role}
                        </p>
                      </div>

                      {/* Bottom Barcode Detail & Flip Cue */}
                      <div className="border-t border-[#E3DCCB] pt-3 flex items-center justify-between font-mono text-[9px] text-[#0A1F44]/50">
                        <span>SD-ID // 0{index + 1}</span>
                        <span className="text-[#FF6B4A] font-bold">CLICK TO FLIP ↻</span>
                      </div>
                    </div>

                    {/* BACK FACE OF BADGE */}
                    <div
                      className="absolute inset-0 w-full h-full bg-[#FFFFFF] border border-[#E3DCCB] rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-subtle"
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                        <span className="font-mono text-[10px] text-[#FF6B4A] uppercase font-bold tracking-mono">
                          {member.links && member.links.length > 0 ? "CREDENTIALS & LINKS" : "PROFILE"}
                        </span>
                        <span className="text-[10px] font-mono text-[#0A1F44]/50">
                          {member.id.toUpperCase()}
                        </span>
                      </div>

                      {member.links && member.links.length > 0 ? (
                        <>
                          {/* Bio & Skills Tags */}
                          <div className="my-auto py-2 space-y-3">
                            <p className="text-xs text-[#0A1F44]/80 leading-relaxed font-normal">
                              {member.bio}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {member.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded bg-[#FAF5EB] border border-[#E3DCCB] font-mono text-[10px] text-[#0A1F44] font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Verified Links */}
                          <div className="border-t border-[#E3DCCB] pt-3 space-y-1.5">
                            {member.links.map((link, lIdx) => (
                              <div key={lIdx} className="flex items-center justify-between text-xs">
                                <span className="font-mono text-[10px] text-[#0A1F44]/60 uppercase">
                                  {link.label}
                                </span>
                                <Link
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[#FF6B4A] hover:underline font-mono text-[11px] font-bold inline-flex items-center"
                                >
                                  <span>Open</span>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        /* Somujjal Hazarika back: centered name, role, bio, no links, no gap */
                        <div className="my-auto py-4 flex flex-col items-center justify-center text-center">
                          <h3 className="font-serif text-lg font-bold text-[#0A1F44] leading-snug">
                            {member.name}
                          </h3>
                          <p className="font-mono text-[11px] text-[#0A1F44]/65 uppercase tracking-mono mt-1">
                            {member.role}
                          </p>
                          <div className="w-12 h-px bg-[#E3DCCB] my-3 mx-auto" />
                          <p className="text-xs text-[#0A1F44]/80 leading-relaxed font-normal max-w-[220px]">
                            {member.bio}
                          </p>
                          {member.tags && member.tags.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-1.5 pt-4">
                              {member.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded bg-[#FAF5EB] border border-[#E3DCCB] font-mono text-[10px] text-[#0A1F44] font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {(!member.links || member.links.length === 0) && (
                        <div className="border-t border-[#E3DCCB] pt-3 flex items-center justify-between font-mono text-[9px] text-[#0A1F44]/50">
                          <span>SD-ID // 0{index + 1}</span>
                          <span className="text-[#0A1F44]/40 font-mono">VERIFIED BUILDER</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE CAROUSEL MODE (1 badge centered, swipe left/right, dots below) */}
          <div className="md:hidden flex flex-col items-center">
            {(members || []).map((member, index) => {
              if (index !== activeIndex) return null;
              const tone = TONE_COLORS[member.tone] || TONE_COLORS[1];
              const isFlipped = !!flippedMap[member.id];
              const pullY = pullOffsets[member.id] || 0;

              return (
                <div
                  key={member.id}
                  className="flex flex-col items-center select-none w-full max-w-[290px]"
                  style={{ perspective: PERSPECTIVE }}
                >
                  {/* Metal Ring */}
                  <div className="w-5 h-5 rounded-full border-2 border-[#555555] bg-[#DDDDDD] shadow -mt-1 z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#333333]" />
                  </div>

                  {/* Ribbon Strap */}
                  <div
                    className="w-4 h-14 shadow-inner flex flex-col justify-between items-center py-1 transition-transform duration-150"
                    style={{
                      backgroundColor: tone.bg,
                      transform: `translateY(${pullY * 0.4}px)`,
                    }}
                  >
                    <div
                      className="w-[1.5px] h-full"
                      style={{ backgroundColor: tone.stitch }}
                    />
                  </div>

                  {/* Metal Clip */}
                  <div
                    className="flex flex-col items-center -mt-1 z-20"
                    style={{ transform: `translateY(${pullY * 0.4}px)` }}
                  >
                    <div className="w-3.5 h-3 bg-[#888888] rounded-sm" />
                    <div className="w-5 h-1 bg-[#555555] rounded-full mt-0.5" />
                  </div>

                  {/* Badge */}
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`${member.name} Pass Card. Click to flip.`}
                    onClick={() => handleFlip(member.id)}
                    onTouchStart={(e) => handleTouchStart(member.id, e)}
                    onTouchMove={(e) => handleTouchMove(member.id, e)}
                    onTouchEnd={() => handleTouchEnd(member.id)}
                    style={{
                      transform: `translateY(${pullY}px) rotateY(${isFlipped ? 180 : 0}deg)`,
                      transformStyle: "preserve-3d",
                      transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    className="relative w-full h-[410px] mt-1 rounded-2xl shadow-card"
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 w-full h-full bg-[#FFFFFF] border border-[#E3DCCB] rounded-2xl p-5 flex flex-col justify-between shadow-subtle"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                        <span className="font-serif text-xs font-bold text-[#0A1F44]">
                          STUDIO / DRAFT
                        </span>
                        <span
                          className="px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold text-white"
                          style={{ backgroundColor: tone.bg }}
                        >
                          {member.team}
                        </span>
                      </div>

                      <div className="my-auto py-2 flex flex-col items-center">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#E3DCCB] bg-[#FAF5EB] mb-3">
                          {!imageErrorMap[member.id] ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover object-top"
                              sizes="112px"
                              onError={() =>
                                setImageErrorMap((prev) => ({ ...prev, [member.id]: true }))
                              }
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-serif text-3xl font-bold text-[#0A1F44]">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        <h3 className="font-serif text-lg font-bold text-[#0A1F44] text-center">
                          {member.name}
                        </h3>
                        <p className="font-mono text-[11px] text-[#0A1F44]/65 uppercase tracking-mono text-center mt-0.5">
                          {member.role}
                        </p>
                      </div>

                      <div className="border-t border-[#E3DCCB] pt-3 flex items-center justify-between font-mono text-[9px] text-[#0A1F44]/50">
                        <span>TAP TO FLIP ↻</span>
                        <span className="text-[#FF6B4A]">PULL TO DRAG</span>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 w-full h-full bg-[#FFFFFF] border border-[#E3DCCB] rounded-2xl p-5 flex flex-col justify-between shadow-subtle"
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                        <span className="font-mono text-[10px] text-[#FF6B4A] font-bold">
                          {member.links && member.links.length > 0 ? "CREDENTIALS" : "PROFILE"}
                        </span>
                        <span className="text-[10px] font-mono text-[#0A1F44]/50">
                          {member.id.toUpperCase()}
                        </span>
                      </div>

                      {member.links && member.links.length > 0 ? (
                        <>
                          <div className="my-auto py-2 space-y-3">
                            <p className="text-xs text-[#0A1F44]/80 leading-relaxed">
                              {member.bio}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {member.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded bg-[#FAF5EB] border border-[#E3DCCB] font-mono text-[10px] text-[#0A1F44]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-[#E3DCCB] pt-3 space-y-1.5">
                            {member.links.map((link, lIdx) => (
                              <div key={lIdx} className="flex items-center justify-between text-xs">
                                <span className="font-mono text-[10px] text-[#0A1F44]/60">
                                  {link.label}
                                </span>
                                <Link
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[#FF6B4A] hover:underline font-mono text-[11px] font-bold inline-flex items-center"
                                >
                                  <span>Open</span>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        /* Somujjal Hazarika back (Mobile): centered name, role, bio, no links, no gap */
                        <div className="my-auto py-4 flex flex-col items-center justify-center text-center">
                          <h3 className="font-serif text-lg font-bold text-[#0A1F44]">
                            {member.name}
                          </h3>
                          <p className="font-mono text-[11px] text-[#0A1F44]/65 uppercase tracking-mono mt-1">
                            {member.role}
                          </p>
                          <div className="w-12 h-px bg-[#E3DCCB] my-3 mx-auto" />
                          <p className="text-xs text-[#0A1F44]/80 leading-relaxed max-w-[220px]">
                            {member.bio}
                          </p>
                          {member.tags && member.tags.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-1.5 pt-4">
                              {member.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded bg-[#FAF5EB] border border-[#E3DCCB] font-mono text-[10px] text-[#0A1F44]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {(!member.links || member.links.length === 0) && (
                        <div className="border-t border-[#E3DCCB] pt-3 flex items-center justify-between font-mono text-[9px] text-[#0A1F44]/50">
                          <span>SD-ID // 0{index + 1}</span>
                          <span className="text-[#0A1F44]/40 font-mono">VERIFIED BUILDER</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Carousel Navigation Dots */}
            <div className="flex items-center gap-3 mt-6">
              {members.map((member, idx) => (
                <button
                  key={member.id}
                  onClick={() => {
                    stopAutoplay();
                    setActiveIndex(idx);
                  }}
                  aria-label={`Show ${member.name}`}
                  className={`transition-all duration-200 ${idx === activeIndex
                      ? "w-8 h-2.5 rounded-full bg-[#FF6B4A]"
                      : "w-2.5 h-2.5 rounded-full bg-[#E3DCCB] hover:bg-[#0A1F44]/40"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
