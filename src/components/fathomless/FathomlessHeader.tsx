"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function FathomlessHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("the-descent");
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const onLoaderDone = () => setIsLoaded(true);
    window.addEventListener("studio-loader-complete", onLoaderDone);

    const timer = setTimeout(() => setIsLoaded(true), 2400);

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 120) {
        setIsHeaderHidden(false);
      } else {
        const diff = currentY - lastScrollY.current;
        if (diff > 8) {
          setIsHeaderHidden(true);
        } else if (diff < -8) {
          setIsHeaderHidden(false);
        }
      }
      lastScrollY.current = currentY;

      const sections = [
        "the-descent",
        "depth-profile",
        "field-notes",
        "work",
        "testimonials",
        "services",
        "process",
        "compare",
        "team",
        "contact",
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("studio-loader-complete", onLoaderDone);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === "hero" || id === "the-descent") {
      scrollToTop();
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const beginDescent = () => {
    setMobileMenuOpen(false);
    window.scrollTo({
      top: window.innerHeight * 0.95,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { id: "work", label: "WORK" },
    { id: "team", label: "TEAM" },
    { id: "testimonials", label: "CLIENTS" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] px-3 sm:px-6 md:px-8 border-b bg-[#071633] border-[#FAF5EB]/15 select-none transition-all duration-300 ease-in-out ${
          isHeaderHidden ? "-translate-y-full" : "translate-y-0"
        } ${isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{
          transitionProperty: "transform, opacity",
          transitionDuration: "350ms, 400ms",
        }}
      >
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] mx-auto h-full flex items-center justify-between gap-2 sm:gap-4">
          {/* Wordmark STUDIO DRAFT */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 sm:gap-3 text-[#FAF5EB] flex-shrink-0 min-h-[44px]"
            aria-label="Studio Draft - Return to surface"
          >
            <span className="font-serif text-[16px] sm:text-[19px] lg:text-[20px] font-semibold tracking-tight whitespace-nowrap">
              STUDIO DRAFT
            </span>
          </button>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-[#FAF5EB]/40 font-mono text-[11px] font-semibold tracking-wider uppercase text-[#FAF5EB] hover:opacity-75 transition-opacity min-h-[44px]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>
          </div>

          {/* CENTRE LINKS: Desktop / Laptop */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-mono text-[12px] xl:text-[13px] font-semibold tracking-[0.12em] text-[#FAF5EB]">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative py-1 transition-colors text-[#FAF5EB] hover:text-[#FF6B4A] whitespace-nowrap min-h-[44px] flex items-center"
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-[#FF6B4A]" />
                )}
              </button>
            ))}
          </nav>

          {/* RIGHT ACTIONS: Begin Descent + START A PROJECT */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={beginDescent}
              className="hidden xl:inline-flex items-center justify-center whitespace-nowrap flex-shrink-0 min-h-[44px] px-5 py-2.5 rounded-[4px] border border-[#FAF5EB]/40 text-[#FAF5EB] hover:bg-[#FAF5EB] hover:text-[#071633] font-mono text-[12px] font-semibold tracking-[0.12em] transition-all duration-300"
            >
              <span>Begin Descent</span>
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center whitespace-nowrap flex-shrink-0 min-h-[40px] sm:min-h-[44px] 2xl:min-h-[52px] px-4 sm:px-5 2xl:px-7 py-2 sm:py-2.5 rounded-[4px] bg-[#FF6B4A] text-white hover:bg-[#FAF5EB] hover:text-[#071633] font-mono text-[11px] sm:text-[12px] 2xl:text-[13px] font-semibold tracking-[0.12em] shadow-sm transition-all duration-300 active:translate-y-0.5"
            >
              START A PROJECT
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE / TABLET FULL-SCREEN NAVY MENU OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#071633] text-[#FAF5EB] flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-[#FAF5EB]/15 pb-6">
            <span className="font-serif text-[18px] font-semibold text-[#FAF5EB] tracking-tight">
              STUDIO DRAFT
            </span>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 rounded-[4px] border border-[#FAF5EB]/30 flex items-center justify-center text-[#FAF5EB] hover:bg-[#FAF5EB] hover:text-[#071633] transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 py-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left font-serif text-[28px] sm:text-[32px] font-light tracking-tight text-[#FAF5EB] hover:text-[#FF6B4A] transition-colors flex items-center justify-between group py-1"
              >
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#FAF5EB]/15">
            <button
              onClick={beginDescent}
              className="w-full min-h-[48px] flex items-center justify-center py-3 rounded-[4px] border border-[#FAF5EB]/30 font-mono text-[12px] font-semibold tracking-[0.14em] text-[#FAF5EB] hover:bg-[#FAF5EB] hover:text-[#071633] transition-all"
            >
              <span>Begin Descent</span>
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="w-full min-h-[48px] py-3 rounded-[4px] bg-[#FF6B4A] text-white font-mono text-[12px] font-semibold tracking-[0.14em] hover:bg-[#FAF5EB] hover:text-[#071633] transition-all"
            >
              START A PROJECT
            </button>
          </div>
        </div>
      )}
    </>
  );
}
