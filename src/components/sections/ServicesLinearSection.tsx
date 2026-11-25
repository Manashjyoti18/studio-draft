"use client";

import React from "react";

interface ServiceBundle {
  title: string;
  tagline: string;
  copy: string;
}

const BUNDLE_ITEMS: ServiceBundle[] = [
  {
    title: "High-Performance Website",
    tagline: "STANDARD BUNDLE",
    copy: "We construct bespoke digital storefronts built with Next.js and TypeScript featuring sub-second load times and zero generic templates.",
  },
  {
    title: "Local Booking Chatbot",
    tagline: "INCLUDED // ZERO API COST",
    copy: "Our automated chatbot answers client questions instantly from your website data alone with zero recurring external API charges.",
  },
  {
    title: "Order & Enquiry Form",
    tagline: "CONVERSION READY",
    copy: "Direct WhatsApp and email order routing captures qualified inquiries directly into your operational inbox.",
  },
  {
    title: "Found on Google",
    tagline: "TECHNICAL SEO & SCHEMA",
    copy: "Complete search index optimization and structured JSON-LD schemas position your website prominently in regional search results.",
  },
];

const ADDONS = [
  { name: "Full Automation", desc: "Automated customer workflows, sync, and notifications." },
  { name: "Payment Gateway", desc: "Direct Stripe or Razorpay checkout integration with instant settlement." },
  { name: "Customer Desk", desc: "Dedicated ticketing and client relationship system." },
  { name: "Custom Tool Integration", desc: "Custom tool chains tailored to your workflows where the client covers direct third-party API costs." },
];

export default function ServicesLinearSection() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#FAF5EB]/15">
          <div className="max-w-3xl">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0]">
              Everything in one bundled build.
            </h2>
          </div>
          <p className="font-sans text-[17px] sm:text-[18px] text-[#FAF5EB]/80 leading-[1.6] max-w-md">
            We deliver our comprehensive conversion bundle for every project at the cost of a standard website.
          </p>
        </div>

        {/* Services are a plain list with a hairline between each item, one item per row on desktop, with the service name, one full sentence, and no icon card */}
        <div className="flex flex-col">
          {BUNDLE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="py-8 border-b border-[#FAF5EB]/15 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="md:w-1/3">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FF6B4A] font-semibold block mb-1">
                  {item.tagline}
                </span>
                <h3 className="font-serif text-[24px] sm:text-[28px] font-light text-[#FAF5EB] leading-snug">
                  {item.title}
                </h3>
              </div>
              <div className="md:w-2/3">
                <p className="font-sans text-[16px] sm:text-[17px] text-[#FAF5EB]/80 leading-[1.7]">
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons List with hairline dividers */}
        <div className="pt-8 flex flex-col gap-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#FAF5EB]/60 font-semibold">
            AVAILABLE ARCHITECTURAL ADD-ONS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {ADDONS.map((addon, i) => (
              <div
                key={i}
                className="py-4 border-b border-[#FAF5EB]/10 flex flex-col gap-1"
              >
                <div className="font-serif text-xl font-light text-[#FAF5EB]">
                  {addon.name}
                </div>
                <p className="font-sans text-sm text-[#FAF5EB]/75 leading-relaxed">
                  {addon.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Call */}
        <div className="pt-4 flex items-center justify-start">
          <button
            onClick={scrollToContact}
            className="h-[52px] px-7 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85A3A] text-[#FAF5EB] font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all shadow-sm active:translate-y-0"
          >
            START A PROJECT // BUNDLE INCLUDED
          </button>
        </div>
      </div>
    </section>
  );
}
