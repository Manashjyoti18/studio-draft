"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import { STUDIO_DATA, type Project } from "@/data/studio";

export default function SelectedWorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative py-28 md:py-36 border-b border-[#111111] bg-[#FFFFFF] text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#111111] pb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#FF6B35]" />
              <span>CHAPTER 04 // VERIFIED BLUEPRINTS &amp; ARCHIVES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] uppercase leading-[0.95]">
              VERIFIED WORK. <br />
              <span className="text-[#111111]">SYSTEM BLUEPRINTS.</span>
            </h2>
          </div>

          <div className="max-w-md text-base md:text-lg text-[#111111]/80 font-normal leading-relaxed">
            Every project below represents genuine design, architecture, or full-stack code authored by the Studio Draft founding team. No fictional showcase items.
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="mt-16 space-y-16">
          {STUDIO_DATA.projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={project.id}
                className="group border-2 border-[#111111] bg-[#FFFFFF] shadow-[8px_8px_0px_0px_#111111] hover:shadow-[10px_10px_0px_0px_#FF6B35] transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-0 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Visual Preview (7 cols) */}
                  <div
                    className={`lg:col-span-7 relative min-h-[320px] md:min-h-[440px] bg-[#111111] overflow-hidden flex items-center justify-center ${
                      isEven ? "border-b lg:border-b-0 lg:border-r" : "border-b lg:border-b-0 lg:border-l lg:order-2"
                    } border-[#111111]`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent" />

                    {/* Category pill */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#111111] border border-[#FFFFFF]/20 text-[10px] font-mono text-[#FFFFFF] uppercase tracking-wider font-bold">
                      {project.discipline}
                    </div>

                    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-2 bg-[#111111] hover:bg-[#FF6B35] text-white border border-[#FFFFFF]/30 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 font-bold"
                        data-cursor
                        data-cursor-text="INSPECT"
                      >
                        <span>Blueprint Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Project Info & Impact (5 cols) */}
                  <div
                    className={`lg:col-span-5 p-8 md:p-12 flex flex-col justify-between ${
                      isEven ? "" : "lg:order-1"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#111111]/70 mb-4 pb-2 border-b border-[#111111]/15">
                        <span>REF: 0{idx + 1} // {project.year}</span>
                        <span className="text-[#FF6B35] uppercase font-bold">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-display text-3xl md:text-4xl font-bold text-[#111111] mb-4 group-hover:text-[#FF6B35] transition-colors uppercase leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-sm md:text-base text-[#111111]/80 leading-relaxed mb-6">
                        {project.summary}
                      </p>

                      {/* Problem / Solution Excerpt */}
                      <div className="space-y-3 py-4 border-y border-[#111111] text-xs font-mono">
                        <div>
                          <span className="text-[#FF6B35] font-bold block mb-1">
                            // PROBLEM:
                          </span>
                          <span className="text-[#111111]/80 line-clamp-2">
                            {project.problem}
                          </span>
                        </div>
                      </div>

                      {/* Metrics Badges */}
                      {project.metrics && (
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="p-2.5 bg-[#111111]/[0.03] border border-[#111111]"
                            >
                              <div className="font-display text-base font-bold text-[#111111]">
                                {m.value}
                              </div>
                              <div className="text-[9px] font-mono text-[#111111]/60 uppercase">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Tags & External Link */}
                    <div className="mt-8 pt-4 border-t border-[#111111] flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 border border-[#111111] text-[10px] font-mono text-[#111111] font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono font-bold text-[#111111] hover:text-[#FF6B35] flex items-center gap-1 transition-colors"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <Link
                          href={`/work/${project.slug}`}
                          className="text-xs font-mono font-bold text-[#FF6B35] hover:underline flex items-center gap-1"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blueprint Specification Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#111111]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border-2 border-[#111111] text-[#111111] p-6 sm:p-10 shadow-[12px_12px_0px_0px_#111111]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="font-mono text-xs text-[#FF6B35] font-bold uppercase mb-2">
                SYSTEM SPECIFICATION // {selectedProject.id}
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase mb-4">
                {selectedProject.title}
              </h2>

              <p className="text-base text-[#111111]/85 leading-relaxed mb-6">
                {selectedProject.summary}
              </p>

              <div className="space-y-6 pt-6 border-t border-[#111111]">
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#FF6B35] mb-2">
                    // TECHNICAL PROBLEM STATEMENT:
                  </h4>
                  <p className="font-sans text-sm text-[#111111]/85 leading-relaxed bg-[#111111]/[0.03] p-4 border border-[#111111]">
                    {selectedProject.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#B7E4C7] bg-[#111111] px-2 py-0.5 inline-block mb-2">
                    // ARCHITECTURAL SOLUTION:
                  </h4>
                  <p className="font-sans text-sm text-[#111111]/85 leading-relaxed bg-[#111111]/[0.03] p-4 border border-[#111111]">
                    {selectedProject.solution}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#111111] mb-2">
                    // SYSTEM IMPACT &amp; VERIFICATION:
                  </h4>
                  <p className="font-sans text-sm text-[#111111]/85 leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#111111] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#111111] text-white font-mono text-xs font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white font-mono text-xs font-bold uppercase hover:bg-[#111111] transition-colors"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
