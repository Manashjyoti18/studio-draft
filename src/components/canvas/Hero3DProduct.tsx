"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Calendar, ArrowRight, Utensils, Star, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero3DProduct() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Mouse move 3D tilt
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = -y * 8; // Tilt X: -4 to +4 deg
      targetY = x * 10; // Tilt Y: -5 to +5 deg
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Lerp loop for silky 60fps tilt
    const updateTilt = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setTilt({ x: currentX, y: currentY });
      animId = requestAnimationFrame(updateTilt);
    };
    animId = requestAnimationFrame(updateTilt);

    // ScrollTrigger: gentle scale & rotation on scroll
    const ctx = gsap.context(() => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom top",
          scrub: 1.2,
        },
        rotateX: 4,
        scale: 0.97,
        y: 20,
      });
    }, container);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center py-2"
      style={{ perspective: 1200 }}
    >
      {/* 3D Browser Mockup Card */}
      <div
        ref={cardRef}
        className="w-full max-w-5xl rounded-2xl border border-[#E3DCCB] bg-[#FFFDF9] shadow-floating overflow-hidden transition-shadow duration-300"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Browser Top Chrome */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#E3DCCB] bg-[#FAF5EB]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF6B4A]/80 border border-[#FF6B4A]" />
            <span className="w-3 h-3 rounded-full bg-[#E3DCCB]" />
            <span className="w-3 h-3 rounded-full bg-[#E3DCCB]" />
          </div>

          <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E3DCCB] text-[11px] font-mono text-[#0A1F44]/70 max-w-xs sm:max-w-md w-full justify-center">
            <span className="text-[#FF6B4A]">https://</span>
            <span>theretrocafe.in/menu-and-bookings</span>
          </div>

          <div className="font-mono text-[10px] text-[#0A1F44]/50 uppercase tracking-mono hidden sm:block">
            60FPS // LIVE PREVIEW
          </div>
        </div>

        {/* Browser Viewport Content: Authentic Cafe Website UI */}
        <div className="relative bg-[#FFFDF9] text-[#0A1F44] p-6 sm:p-10 select-none">
          {/* Cafe Header Row */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E3DCCB]/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0A1F44] text-[#FAF5EB] flex items-center justify-center font-serif text-lg font-bold">
                R
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0A1F44]">
                  The Retro Cafe
                </div>
                <div className="font-mono text-[10px] text-[#0A1F44]/60 uppercase tracking-mono flex items-center gap-2">
                  <span>ESTD. 2023</span>
                  <span>•</span>
                  <span>MON, NAGALAND</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-6 font-mono text-xs uppercase text-[#0A1F44]/75">
                <span>Menu</span>
                <span>Story</span>
                <span>Location</span>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase font-medium shadow-sm">
                Order Online
              </span>
            </div>
          </div>

          {/* Cafe Hero & Offerings Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Artisanal Offerings & Menu Highlight (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-mono text-[#FF6B4A] font-bold mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
                  <span>FRESH ROASTS &amp; DAILY BAKES</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A1F44] leading-tight tracking-tight">
                  Artisanal Coffee, Warm Sourdough &amp; Unhurried Conversations.
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#0A1F44]/70 leading-relaxed max-w-lg">
                  Hand-crafted single origin brews, wood-fired bakes, and slow living in the hills of Mon. View our full digital menu below with zero markup.
                </p>
              </div>

              {/* Menu items row */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E3DCCB]/60">
                <div className="p-3 rounded-lg bg-[#FAF5EB] border border-[#E3DCCB]/60">
                  <div className="font-mono text-[10px] text-[#0A1F44]/60 uppercase">SIGNATURE</div>
                  <div className="text-xs sm:text-sm font-bold text-[#0A1F44] mt-0.5">Pour Over</div>
                  <div className="font-mono text-xs text-[#FF6B4A] font-bold mt-1">₹180</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF5EB] border border-[#E3DCCB]/60">
                  <div className="font-mono text-[10px] text-[#0A1F44]/60 uppercase">BAKERY</div>
                  <div className="text-xs sm:text-sm font-bold text-[#0A1F44] mt-0.5">Sourdough Toast</div>
                  <div className="font-mono text-xs text-[#FF6B4A] font-bold mt-1">₹220</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF5EB] border border-[#E3DCCB]/60">
                  <div className="font-mono text-[10px] text-[#0A1F44]/60 uppercase">DESSERT</div>
                  <div className="text-xs sm:text-sm font-bold text-[#0A1F44] mt-0.5">Basque Cake</div>
                  <div className="font-mono text-xs text-[#FF6B4A] font-bold mt-1">₹260</div>
                </div>
              </div>
            </div>

            {/* Right: Direct Table Reservation Card (5 cols) */}
            <div className="md:col-span-5 bg-[#FAF5EB] border border-[#E3DCCB] rounded-xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3DCCB]">
                <div className="font-serif text-sm font-bold uppercase text-[#0A1F44]">
                  Table Reservation
                </div>
                <span className="font-mono text-[10px] text-[#FF6B4A] uppercase tracking-mono font-bold">
                  ● INSTANT CONFIRM
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs p-2.5 rounded bg-white border border-[#E3DCCB]/80 text-[#0A1F44]">
                  <span className="font-mono text-[11px] text-[#0A1F44]/60">DATE</span>
                  <span className="font-bold">Today, 7:00 PM</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded bg-white border border-[#E3DCCB]/80 text-[#0A1F44]">
                  <span className="font-mono text-[11px] text-[#0A1F44]/60">GUESTS</span>
                  <span className="font-bold">2 Persons (Booth)</span>
                </div>

                <div className="flex items-center justify-between font-mono text-[11px] text-[#0A1F44]/70 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF6B4A]" />
                    <span>Mon Town Main Road</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#FF6B4A]" />
                    <span>Open till 10 PM</span>
                  </span>
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 rounded bg-[#FF6B4A] hover:bg-[#E85635] text-white font-mono text-xs uppercase font-bold tracking-mono transition-colors shadow-sm mt-2 flex items-center justify-center gap-1.5"
                >
                  <span>Confirm Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
