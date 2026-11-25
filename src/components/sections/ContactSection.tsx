"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function ContactSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    whatDoYouSell: "",
    whatShouldSiteDo: "",
    whenLive: "",
    name: "",
    contact: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    contact?: string;
    whenLive?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      name?: string;
      contact?: string;
      whenLive?: string;
    } = {};

    const trimmedName = formData.name.trim();
    const trimmedContact = formData.contact.trim();
    const trimmedWhenLive = formData.whenLive.trim();

    if (!trimmedName) {
      newErrors.name = "Name is required.";
    }

    if (!trimmedContact) {
      newErrors.contact = "Email or phone is required.";
    }

    if (!trimmedWhenLive) {
      newErrors.whenLive = "Timeline choice is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const subject = `New Project Scope - ${trimmedName}`;
    const bodyLines = [
      `Name: ${trimmedName}`,
      `Email or Phone: ${trimmedContact}`,
      `Timeline: ${trimmedWhenLive}`,
      `What do you sell?: ${formData.whatDoYouSell.trim() || "Not specified"}`,
      `What should the website do?: ${formData.whatShouldSiteDo.trim() || "Not specified"}`
    ];
    const body = bodyLines.join("\n");
    const mailtoUrl = `mailto:work@abhigyansaikia.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("work@abhigyansaikia.in");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = "work@abhigyansaikia.in";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Section Header Block */}
        <div className="flex flex-col gap-3 max-w-3xl pb-6 border-b border-[#FAF5EB]/15">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0]">
            Begin your build in three stages.
          </h2>
          <p className="font-sans text-[17px] text-[#FAF5EB]/80 leading-[1.7]">
            Our founders review every questionnaire and reply directly within 24 hours.
          </p>
        </div>

        {/* 3-Step Form in an open layout with hairline borders, no card box */}
        <div className="border-t border-b border-[#FAF5EB]/15 py-8 flex flex-col gap-8 text-[#FAF5EB]">
          {!submitted && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between font-mono text-xs text-[#FAF5EB]/60">
                <span>PROJECT ONBOARDING PROGRESS</span>
                <span className="text-[#FF6B4A] font-semibold">{Math.round((step / 3) * 100)}% COMPLETED</span>
              </div>
              <div className="w-full h-1 bg-[#FAF5EB]/15 overflow-hidden">
                <div
                  className="h-full bg-[#FF6B4A] transition-all duration-300 ease-out"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              {/* STAGE 1: What do you sell? */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <label className="font-serif text-xl sm:text-2xl text-[#FAF5EB] font-light">
                    What do you sell?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      "Coffee, Food & Hospitality",
                      "SaaS Platform or Software Tool",
                      "Professional Design & Creative Services",
                      "Physical Goods & Direct Commerce",
                    ].map((option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => {
                          setFormData({ ...formData, whatDoYouSell: option });
                          handleNext();
                        }}
                        className={`p-4 rounded-[4px] border text-left font-sans text-sm sm:text-base transition-all ${
                          formData.whatDoYouSell === option
                            ? "border-[#FF6B4A] bg-[#FF6B4A]/15 text-[#FAF5EB] font-medium"
                            : "border-[#FAF5EB]/15 bg-[#0A1F44]/50 text-[#FAF5EB]/80 hover:border-[#FAF5EB]/30"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STAGE 2: What should the website do? */}
              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <label className="font-serif text-xl sm:text-2xl text-[#FAF5EB] font-light">
                    What should the website do?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      "Capture leads and direct WhatsApp orders",
                      "Instant local bookings and customer questions",
                      "Showcase verified portfolio and conversion",
                      "Full web application with payments and auth",
                    ].map((option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => {
                          setFormData({ ...formData, whatShouldSiteDo: option });
                          handleNext();
                        }}
                        className={`p-4 rounded-[4px] border text-left font-sans text-sm sm:text-base transition-all ${
                          formData.whatShouldSiteDo === option
                            ? "border-[#FF6B4A] bg-[#FF6B4A]/15 text-[#FAF5EB] font-medium"
                            : "border-[#FAF5EB]/15 bg-[#0A1F44]/50 text-[#FAF5EB]/80 hover:border-[#FAF5EB]/30"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STAGE 3: When do you want it live? */}
              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <label className="font-serif text-xl sm:text-2xl text-[#FAF5EB] font-light">
                    When do you want it live?
                  </label>

                  <div className="flex flex-col gap-1.5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        "14 TO 30 DAYS (STANDARD MVP)",
                        "UNDER 48 HOURS SPRINT",
                        "FLEXIBLE HORIZON",
                      ].map((timeOption) => (
                        <button
                          type="button"
                          key={timeOption}
                          onClick={() => {
                            setFormData({ ...formData, whenLive: timeOption });
                            if (errors.whenLive) {
                              setErrors((prev) => ({ ...prev, whenLive: undefined }));
                            }
                          }}
                          className={`p-3.5 rounded-[4px] border text-center font-mono text-xs sm:text-sm uppercase tracking-wider transition-all ${
                            formData.whenLive === timeOption
                              ? "border-[#FF6B4A] bg-[#FF6B4A]/15 text-[#FAF5EB] font-semibold"
                              : "border-[#FAF5EB]/15 bg-[#0A1F44]/50 text-[#FAF5EB]/70 hover:border-[#FAF5EB]/30"
                          }`}
                        >
                          {timeOption}
                        </button>
                      ))}
                    </div>
                    {errors.whenLive && (
                      <p className="font-sans text-xs text-[#FF6B4A] mt-1">
                        {errors.whenLive}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs text-[#FAF5EB]/60">YOUR NAME</span>
                      <input
                        type="text"
                        placeholder="Founder name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) {
                            setErrors((prev) => ({ ...prev, name: undefined }));
                          }
                        }}
                        className={`p-3.5 rounded-[4px] bg-[#0A1F44] border text-[#FAF5EB] font-sans text-sm focus:outline-none transition-colors ${
                          errors.name ? "border-[#FF6B4A]" : "border-[#FAF5EB]/15 focus:border-[#FF6B4A]"
                        }`}
                      />
                      {errors.name && (
                        <p className="font-sans text-xs text-[#FF6B4A] mt-0.5">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs text-[#FAF5EB]/60">EMAIL OR PHONE</span>
                      <input
                        type="text"
                        placeholder="contact@company.com / +91 ..."
                        value={formData.contact}
                        onChange={(e) => {
                          setFormData({ ...formData, contact: e.target.value });
                          if (errors.contact) {
                            setErrors((prev) => ({ ...prev, contact: undefined }));
                          }
                        }}
                        className={`p-3.5 rounded-[4px] bg-[#0A1F44] border text-[#FAF5EB] font-sans text-sm focus:outline-none transition-colors ${
                          errors.contact ? "border-[#FF6B4A]" : "border-[#FAF5EB]/15 focus:border-[#FF6B4A]"
                        }`}
                      />
                      {errors.contact && (
                        <p className="font-sans text-xs text-[#FF6B4A] mt-0.5">
                          {errors.contact}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-3 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85635] text-white font-mono text-xs uppercase tracking-mono font-bold transition-all shadow-md active:translate-y-0.5"
                  >
                    SUBMIT PROJECT SCOPE
                  </button>
                </div>
              )}

              {/* Navigation Back: Plain text only, no arrows */}
              {step > 1 && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="font-mono text-xs text-[#FAF5EB]/60 hover:text-[#FAF5EB] transition-colors"
                  >
                    <span>Previous Question</span>
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="flex flex-col items-start py-8 sm:py-12 gap-6 text-left">
              <div className="w-12 h-12 rounded-[4px] bg-[#FF6B4A]/20 border border-[#FF6B4A] flex items-center justify-center text-[#FF6B4A]">
                <Check className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-3 max-w-2xl">
                <h3 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-[#FAF5EB] leading-tight">
                  Your mail app is open.
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#FAF5EB]/90 leading-relaxed">
                  Press Send in your mail app to send your project scope to Studio Draft.
                </p>
                <p className="font-sans text-sm sm:text-base text-[#FAF5EB]/70 leading-relaxed">
                  If your mail app did not open, email work@abhigyansaikia.in directly.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-6 py-3.5 rounded-[4px] bg-[#FF6B4A] hover:bg-[#E85635] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md active:translate-y-0.5"
                >
                  {copied ? "EMAIL COPIED TO CLIPBOARD" : "COPY EMAIL"}
                </button>
                <Link
                  href="/"
                  className="px-6 py-3.5 rounded-[4px] border border-[#FAF5EB]/20 bg-[#0A1F44]/50 hover:bg-[#0A1F44] text-[#FAF5EB] font-mono text-xs uppercase tracking-wider font-semibold transition-all text-center"
                >
                  BACK TO HOMEPAGE
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* DIRECT CONTACTS LIST: Open layout with hairline dividers, no boxes, no green, no arrows */}
        <div className="flex flex-col gap-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email */}
            <div className="border-b border-[#FAF5EB]/15 pb-6 flex flex-col justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B4A] font-semibold">
                EMAIL
              </span>
              <a
                href="mailto:work@abhigyansaikia.in"
                className="font-serif text-[20px] sm:text-[22px] font-normal text-[#FAF5EB] hover:text-[#FF6B4A] transition-colors leading-snug break-all"
              >
                work@abhigyansaikia.in
              </a>
            </div>

            {/* Phone */}
            <div className="border-b border-[#FAF5EB]/15 pb-6 flex flex-col justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B4A] font-semibold">
                PHONE
              </span>
              <a
                href="tel:+918822532722"
                className="font-serif text-[20px] sm:text-[22px] font-normal text-[#FAF5EB] hover:text-[#FF6B4A] transition-colors leading-snug"
              >
                +91 88225 32722
              </a>
            </div>

            {/* WhatsApp */}
            <div className="border-b border-[#FAF5EB]/15 pb-6 flex flex-col justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B4A] font-semibold">
                WHATSAPP
              </span>
              <a
                href="https://wa.me/916001580182"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-[20px] sm:text-[22px] font-normal text-[#FAF5EB] hover:text-[#FF6B4A] transition-colors leading-snug"
              >
                +91 60015 80182
              </a>
            </div>

            {/* Instagram */}
            <div className="border-b border-[#FAF5EB]/15 pb-6 flex flex-col justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B4A] font-semibold">
                INSTAGRAM
              </span>
              <a
                href="https://www.instagram.com/studiodraft.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-[20px] sm:text-[22px] font-normal text-[#FAF5EB] hover:text-[#FF6B4A] transition-colors leading-snug"
              >
                <span>@studiodraft.space</span>
              </a>
            </div>

            {/* Portfolio */}
            <div className="border-b border-[#FAF5EB]/15 pb-6 flex flex-col justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B4A] font-semibold">
                PORTFOLIO
              </span>
              <a
                href="https://abhigyansaikia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-[20px] sm:text-[22px] font-normal text-[#FAF5EB] hover:text-[#FF6B4A] transition-colors leading-snug"
              >
                <span>https://abhigyansaikia.in</span>
              </a>
            </div>

            {/* Location */}
            <div className="border-b border-[#FAF5EB]/15 pb-6 flex flex-col justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B4A] font-semibold">
                LOCATION
              </span>
              <div className="font-serif text-[20px] sm:text-[22px] font-normal text-[#FAF5EB] leading-snug">
                Assam, India
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
