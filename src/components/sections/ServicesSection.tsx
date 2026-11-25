"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UtensilsCrossed,
  Clock,
  MapPin,
  MessageSquare,
  Calendar,
  Phone,
  CheckCircle2,
  ChevronRight,
  Store,
  Sparkles,
} from "lucide-react";
import { STUDIO_DATA } from "@/data/studio";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const businessFocuses = [
    { title: "CAFES & BAKERIES", desc: "Specialty menus, ambiance highlights, daily specials, and location discovery." },
    { title: "RESTAURANTS", desc: "Digital dining menus, reservation pathways, table bookings, and food imagery." },
    { title: "LOCAL BUSINESSES", desc: "Professional credibility, customer reviews, service lists, and clear directions." },
    { title: "INDEPENDENT BRANDS", desc: "Editorial lookbooks, brand storytelling, wholesale inquiries, and product showcases." },
  ];

  const coreFeatures = [
    { icon: UtensilsCrossed, label: "Digital Menu", desc: "Fast-loading, mobile-friendly menus that patrons can read easily." },
    { icon: Clock, label: "Opening Hours", desc: "Accurate operating schedules with holiday exceptions & live open status." },
    { icon: MapPin, label: "Interactive Location", desc: "Integrated Google Maps, street navigation & neighborhood guide." },
    { icon: Phone, label: "Contact Info", desc: "One-tap direct calling and clear address info with zero friction." },
    { icon: MessageSquare, label: "WhatsApp Contact", desc: "Instant click-to-chat WhatsApp button for immediate customer queries." },
    { icon: Calendar, label: "Online Booking", desc: "Direct reservation & appointment booking without third-party fees." },
  ];

  return (
    <section
      id="services"
      className="relative py-28 md:py-36 border-b border-[#111111] bg-[#FFFFFF] text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Typography Entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#111111]">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#FF6B35]" />
              <span>CHAPTER 02 // SERVICES &amp; ESSENTIAL OFFERINGS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase text-[#111111] leading-[0.9]">
              WEBSITES THAT <br />
              <span className="text-[#111111]">WORK FOR BUSINESS.</span>
            </h2>
          </div>

          <div className="max-w-md text-base md:text-lg text-[#111111]/80 leading-relaxed font-normal">
            We focus on fast, professional websites for cafes, restaurants, local businesses and independent brands. We bring essential customer information together with zero friction.
          </div>
        </div>

        {/* ======================================================== */}
        {/* CORE LOCAL BUSINESS FOCUSES (PHASE 7 REQUIREMENT) */}
        {/* ======================================================== */}
        <div className="mt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#FF6B35] font-bold mb-6 flex items-center gap-2">
            <Store className="w-4 h-4 text-[#FF6B35]" />
            <span>PRIMARY PRACTICE SECTORS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessFocuses.map((f, i) => (
              <div
                key={f.title}
                className="p-6 border-2 border-[#111111] bg-[#FFFFFF] shadow-[4px_4px_0px_0px_#111111] hover:shadow-[6px_6px_0px_0px_#FF6B35] transition-all duration-200"
              >
                <div className="font-mono text-xs text-[#FF6B35] font-bold mb-2">
                  // SECTOR 0{i + 1}
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#111111] mb-2">
                  {f.title}
                </h3>
                <p className="font-sans text-sm text-[#111111]/75 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* ESSENTIAL BUSINESS CAPABILITIES MATRIX */}
        {/* ======================================================== */}
        <div className="mt-16 pt-16 border-t border-[#111111]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[#111111] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>ESSENTIAL BUSINESS CAPABILITIES IN EVERY BUILD</span>
            </div>
            <div className="font-mono text-xs text-[#111111]/60">
              FAST &bull; DISCOVERABLE &bull; CONTACT-READY
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.label}
                  className="p-6 border-2 border-[#111111] bg-[#FFFFFF] flex items-start gap-4"
                >
                  <div className="p-3 bg-[#111111] text-[#FFFFFF] shrink-0">
                    <Icon className="w-5 h-5 text-[#B7E4C7]" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold uppercase text-[#111111]">
                      {feat.label}
                    </h4>
                    <p className="mt-1 text-xs text-[#111111]/70 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* STUDIO DISCIPLINE BREAKDOWN */}
        {/* ======================================================== */}
        <div className="mt-20 pt-16 border-t border-[#111111]">
          <div className="font-mono text-xs uppercase tracking-widest text-[#FF6B35] font-bold mb-8">
            TECHNICAL STUDIO DISCIPLINES
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Category Navigation (Left 5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              {STUDIO_DATA.services.map((category, idx) => {
                const isActive = activeTab === idx;
                return (
                  <div
                    key={category.number}
                    onClick={() => setActiveTab(idx)}
                    className={`p-6 border-2 cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-[#111111] text-[#FFFFFF] border-[#111111] shadow-[4px_4px_0px_0px_#FF6B35]"
                        : "bg-[#FFFFFF] text-[#111111] border-[#111111] hover:bg-[#111111]/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive ? "text-[#FF6B35]" : "text-[#111111]/50"
                          }`}
                        >
                          {category.number}
                        </span>
                        <h3 className="font-display text-lg font-bold tracking-tight uppercase">
                          {category.title}
                        </h3>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive
                            ? "text-[#FF6B35] rotate-90"
                            : "text-[#111111]/40"
                        }`}
                      />
                    </div>
                    <p
                      className={`mt-2 text-xs leading-relaxed line-clamp-2 ${
                        isActive ? "text-[#FFFFFF]/80" : "text-[#111111]/70"
                      }`}
                    >
                      {category.tagline}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Active Category Capabilities (Right 7 Cols) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {(() => {
                  const active = STUDIO_DATA.services[activeTab];
                  return (
                    <motion.div
                      key={active.number}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="p-8 md:p-10 border-2 border-[#111111] bg-[#FFFFFF] shadow-[6px_6px_0px_0px_#111111]"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-[#111111] mb-6 font-mono text-xs">
                        <span className="text-[#FF6B35] font-bold uppercase tracking-wider">
                          DISCIPLINE 0{activeTab + 1}
                        </span>
                        <span className="text-[#111111] font-bold">
                          [ SENIOR IN-HOUSE SPECIALISTS ]
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#111111] mb-4">
                        {active.title}
                      </h3>
                      <p className="font-sans text-base text-[#111111]/80 leading-relaxed mb-8">
                        {active.tagline}
                      </p>

                      {/* Capabilities Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {active.services.map((item) => (
                          <div
                            key={item}
                            className="p-3.5 border border-[#111111] flex items-center gap-2.5 text-xs font-mono font-bold text-[#111111]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Deliverables List */}
                      <div className="mt-8 pt-6 border-t border-[#111111]">
                        <div className="font-mono text-xs uppercase tracking-wider text-[#111111]/60 mb-3">
                          TYPICAL SPRINT DELIVERABLES
                        </div>
                        <ul className="space-y-2 text-xs font-sans text-[#111111]/85">
                          {active.deliverables.map((del) => (
                            <li key={del} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[#B7E4C7] shrink-0" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
