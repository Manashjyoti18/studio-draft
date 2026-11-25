"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface NavbarProps {
  isDark?: boolean;
}

const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "Work", id: "work" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ isDark: isDarkProp }: NavbarProps) {
  const [isDarkAuto, setIsDarkAuto] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Hide on fast scroll down, show on scroll up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current + 8) {
          setIsVisible(false);
          setMobileMenuOpen(false);
        } else if (currentScrollY < lastScrollY.current - 5) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // 2. Auto-detect if navbar is hovering over dark/navy sections (s4, s5, s6, manifesto, contact)
      const darkSections = ["scroll-story-navy", "manifesto", "s6-cta", "contact-dark"];
      let overDark = false;
      const navY = 40; // Approx screen Y of floating pill
      for (const id of darkSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navY && rect.bottom >= navY) {
            overDark = true;
            break;
          }
        }
      }
      setIsDarkAuto(overDark);

      // 3. Scroll progress for 2px coral line
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, currentScrollY / totalScroll)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = isDarkProp ?? isDarkAuto;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openOnboarding = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById("onboarding");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollTo("contact");
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 max-w-[94vw] lg:max-w-max select-none ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative rounded-[12px] px-3.5 py-2 flex items-center gap-4 sm:gap-6 backdrop-blur-md shadow-sm transition-colors duration-300 ${
            isDark
              ? "bg-[#0A1F44]/90 border border-white/15 text-[#FAF5EB]"
              : "bg-[#FAF5EB]/85 border border-[#0A1F44]/15 text-[#0A1F44]"
          }`}
        >
          {/* Segment 1: Logo Wordmark & Coral Dot */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 pr-2 border-r border-current/15 group"
          >
            <span className="font-serif text-xs sm:text-sm font-bold tracking-tight">
              STUDIO DRAFT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] inline-block transition-transform group-hover:scale-125" />
          </Link>

          {/* Segment 2: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-mono uppercase tracking-mono">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className={`transition-opacity hover:opacity-100 py-1 ${
                  isDark ? "opacity-75 hover:text-white" : "opacity-75 hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Segment 3: Start a Project Button */}
          <button
            onClick={openOnboarding}
            className={`hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-[8px] font-mono text-[11px] uppercase tracking-mono font-bold transition-all ${
              isDark
                ? "bg-[#FF6B4A] text-white hover:bg-[#FF8566]"
                : "bg-[#0A1F44] text-[#FAF5EB] hover:bg-[#142d5f]"
            }`}
          >
            Start a Project
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-1.5 rounded text-current hover:bg-current/10"
            aria-label="Toggle menu"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* 2px Coral Progress line under pill */}
          <div
            className="absolute -bottom-[2px] left-3 right-3 h-[2px] bg-[#FF6B4A] rounded-full transition-all duration-75 pointer-events-none"
            style={{ width: `calc(${scrollProgress * 100}% - 24px)` }}
          />
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-2 p-4 rounded-[12px] backdrop-blur-md shadow-lg border transition-all ${
              isDark
                ? "bg-[#0A1F44]/95 border-white/15 text-[#FAF5EB]"
                : "bg-[#FAF5EB]/95 border-[#0A1F44]/15 text-[#0A1F44]"
            }`}
          >
            <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-mono">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.id)}
                  className="text-left py-1 hover:text-[#FF6B4A] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={openOnboarding}
                className="mt-2 w-full py-2.5 rounded-[8px] bg-[#FF6B4A] text-white font-bold text-center uppercase tracking-mono"
              >
                Start a Project
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
