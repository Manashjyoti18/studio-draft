"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { STUDIO_DATA } from "@/data/studio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(now.toLocaleTimeString("en-GB", options) + " IST");
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Studio", href: "#studio" },
    { name: "Services", href: "#services" },
    { name: "Works", href: "#past-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blueprints", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        setMobileMenuOpen(false);
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#111111] py-3.5 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Category */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="group flex items-baseline gap-1"
              data-cursor
              data-cursor-text="SD"
            >
              <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#111111] uppercase">
                STUDIO
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] mx-0.5" />
              <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#111111] uppercase">
                DRAFT
              </span>
            </Link>

            {/* Availability Badge */}
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-sm border border-[#111111]/15 bg-[#111111]/[0.03] text-[11px] font-mono text-[#111111]/70">
              <span className="w-2 h-2 rounded-full bg-[#B7E4C7] animate-pulse" />
              <span>{STUDIO_DATA.status}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-mono uppercase tracking-widest text-[#111111]/70 hover:text-[#111111] transition-colors relative py-1 group font-semibold"
                data-cursor
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6B35] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action & Clock */}
          <div className="flex items-center gap-5">
            <div className="hidden xl:flex flex-col text-right font-mono text-[11px] text-[#111111]/60">
              <span>GUWAHATI / DIBRUGARH</span>
              <span className="text-[#111111] font-semibold tabular-nums">
                {currentTime || "12:00:00 IST"}
              </span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] hover:bg-[#FF6B35] text-[#FFFFFF] text-xs font-mono font-bold tracking-wider uppercase transition-colors duration-200 group shadow-[3px_3px_0px_0px_#FF6B35]"
              data-cursor
              data-cursor-text="TALK"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#111111] hover:text-[#FF6B35] transition-colors border border-[#111111]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FFFFFF] text-[#111111] pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden">
          <div className="space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-[#FF6B35] font-bold border-b border-[#111111] pb-3">
              INDEX DIRECTORY
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-display text-3xl font-bold uppercase tracking-tight text-[#111111] hover:text-[#FF6B35] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#111111] space-y-4 font-mono text-xs text-[#111111]/70">
            <div>
              <span className="block text-[#111111] font-bold uppercase mb-1">
                // DIRECT INBOX
              </span>
              <a
                href={`mailto:${STUDIO_DATA.contactEmail}`}
                className="text-[#111111] hover:text-[#FF6B35] transition-colors font-semibold"
              >
                {STUDIO_DATA.contactEmail}
              </a>
            </div>
            <div>
              <span className="block text-[#111111] font-bold uppercase mb-1">
                // SYSTEM TIME
              </span>
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
