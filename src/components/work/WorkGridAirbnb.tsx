"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, type Project } from "@/data/projects";
import { Search, ArrowUpRight, X } from "lucide-react";

const CHIP_CATEGORIES = [
  "All",
  "Websites",
  "SaaS",
  "Cafe and Bakery",
  "Tools",
  "Client Work",
] as const;

export default function WorkGridAirbnb() {
  const [selectedChip, setSelectedChip] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: '/' focuses the search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute live count for each chip category
  const chipCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS.length };
    CHIP_CATEGORIES.forEach((cat) => {
      if (cat === "All") return;
      counts[cat] = PROJECTS.filter((p) => p.tags.includes(cat)).length;
    });
    return counts;
  }, []);

  // Filter projects based on selected chip and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesChip =
        selectedChip === "All" || proj.tags.includes(selectedChip);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        proj.name.toLowerCase().includes(q) ||
        proj.type.toLowerCase().includes(q) ||
        proj.domain.toLowerCase().includes(q) ||
        proj.tags.some((t) => t.toLowerCase().includes(q));
      return matchesChip && matchesSearch;
    });
  }, [selectedChip, searchQuery]);

  return (
    <section
      id="work"
      className="relative w-full bg-[#FAF5EB] text-[#0A1F44] py-16 sm:py-24 px-6 border-b border-[#0A1F44]/10 select-none scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#0A1F44]/10 gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
              <span>02 / WORK</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#0A1F44]">
              Websites we built and operate.
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#0A1F44]/75 max-w-md">
            Production software and custom brand storefronts designed and developed directly by our founders.
          </p>
        </div>

        {/* Sticky Search & Chips Container (stays sticky under nav) */}
        <div className="sticky top-20 z-30 bg-[#FAF5EB]/95 backdrop-blur-md py-4 mb-8 -mx-6 px-6 border-y border-[#0A1F44]/10 shadow-sm transition-all">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Pill Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A1F44]/40" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-14 py-2 rounded-full border border-[#0A1F44]/20 bg-white text-xs font-mono text-[#0A1F44] placeholder-[#0A1F44]/40 focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A] transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="pointer-events-auto text-[#0A1F44]/60 hover:text-[#0A1F44]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#0A1F44]/50 bg-[#FAF5EB] border border-[#0A1F44]/15 rounded">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Chips with live counts */}
            <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {CHIP_CATEGORIES.map((cat) => {
                const isSelected = selectedChip === cat;
                const count = chipCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedChip(cat)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-mono transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#0A1F44] text-[#FAF5EB] font-bold shadow-sm"
                        : "bg-white text-[#0A1F44]/80 border border-[#0A1F44]/15 hover:border-[#0A1F44]/40"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-white/20 text-[#FAF5EB]"
                          : "bg-[#0A1F44]/10 text-[#0A1F44]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 font-mono text-xs text-[#0A1F44]/60">
          <span>
            Showing {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </span>
          {(selectedChip !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedChip("All");
                setSearchQuery("");
              }}
              className="text-[#FF6B4A] hover:underline font-bold"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="w-full py-16 text-center rounded-2xl border border-dashed border-[#0A1F44]/20 bg-white p-8">
            <p className="font-serif text-xl font-bold text-[#0A1F44] mb-2">
              No matching projects found.
            </p>
            <p className="text-xs font-mono text-[#0A1F44]/60 mb-4">
              Try adjusting your search terms or filter chip.
            </p>
            <button
              onClick={() => {
                setSelectedChip("All");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded-full bg-[#0A1F44] text-[#FAF5EB] font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#15346d] transition-all"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Grid of Projects (Tall screenshot crop, image zoom on hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((proj) => {
            const hasUrl = Boolean(proj.url);

            return (
              <div
                key={proj.slug}
                className="group rounded-2xl border border-[#0A1F44]/15 bg-white p-4 shadow-sm hover:shadow-xl hover:border-[#0A1F44]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Tall Crop Image Container */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#0A1F44] mb-4 border border-[#0A1F44]/10">
                    {/* Typographic fallback or screenshot */}
                    {proj.screenshot ? (
                      <Image
                        src={proj.screenshot}
                        alt={`${proj.name} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#FAF5EB]">
                        <span className="font-serif text-2xl font-black mb-2">
                          {proj.name}
                        </span>
                        <span className="font-mono text-xs text-[#FF6B4A] uppercase tracking-mono">
                          {proj.type}
                        </span>
                      </div>
                    )}

                    {/* Demo Tag if isDemo */}
                    {proj.isDemo && (
                      <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#FF6B4A] text-white font-mono text-[10px] font-bold uppercase tracking-mono shadow-sm">
                        Demo
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1F44] tracking-tight">
                      {proj.name}
                    </h3>
                    <span className="font-mono text-[11px] text-[#0A1F44]/60 uppercase tracking-mono shrink-0">
                      {proj.type}
                    </span>
                  </div>

                  {/* Domain and Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <span className="font-mono text-xs text-[#0A1F44]/70 font-medium">
                      {proj.domain}
                    </span>
                    <span className="text-[#0A1F44]/30">•</span>
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] bg-[#FAF5EB] text-[#0A1F44]/80 px-2 py-0.5 rounded border border-[#0A1F44]/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visit website button only if URL exists */}
                {hasUrl ? (
                  <div className="pt-3 border-t border-[#0A1F44]/10 flex items-center justify-between">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#FF6B4A] hover:text-[#e05232] transition-colors"
                    >
                      <span>Visit website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <span className="font-mono text-[11px] text-[#0A1F44]/40">Live ↗</span>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-[#0A1F44]/10 font-mono text-[11px] text-[#0A1F44]/40">
                    Client proprietary software
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
