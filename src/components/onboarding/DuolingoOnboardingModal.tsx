"use client";

import React, { useState, useEffect } from "react";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

interface OnboardingData {
  projectType: string;
  businessName: string;
  businessType: string;
  businessCity: string;
  clientName: string;
  contactMethod: string;
}

export default function DuolingoOnboardingSection() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [bouncingCard, setBouncingCard] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [planeFlying, setPlaneFlying] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    projectType: "",
    businessName: "",
    businessType: "",
    businessCity: "",
    clientName: "",
    contactMethod: "",
  });

  // Step 1 Validation: projectType selected
  const isStep1Valid = Boolean(formData.projectType);
  // Step 2 Validation: businessName, businessType, businessCity
  const isStep2Valid =
    Boolean(formData.businessName.trim()) &&
    Boolean(formData.businessType.trim()) &&
    Boolean(formData.businessCity.trim());
  // Step 3 Validation: clientName, contactMethod
  const isStep3Valid =
    Boolean(formData.clientName.trim()) &&
    Boolean(formData.contactMethod.trim());

  const handleCardPick = (type: string) => {
    setBouncingCard(type);
    setFormData((prev) => ({ ...prev, projectType: type }));
    setTimeout(() => {
      setBouncingCard(null);
    }, 400);
  };

  const nextStep = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) setStep(3);
  };

  const prevStep = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!isStep3Valid) return;
    setIsSubmitting(true);
    setPlaneFlying(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.clientName,
          email: formData.contactMethod,
          projectType: formData.projectType,
          message: `Business: ${formData.businessName} (${formData.businessType}, ${formData.businessCity})`,
        }),
      });
    } catch (err) {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStep(4);
      }, 700);
    }
  };

  // Keyboard Enter handler to continue
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step === 1 && isStep1Valid) nextStep();
      else if (step === 2 && isStep2Valid) nextStep();
      else if (step === 3 && isStep3Valid) handleFinalSubmit();
    }
  };

  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <section
      id="onboarding"
      className="relative w-full bg-[#FAF5EB] text-[#0A1F44] py-18 sm:py-24 px-6 border-b border-[#0A1F44]/10 select-none overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-2 font-bold flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
            <span>06 // START A PROJECT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#0A1F44]">
            Draft Your Sprint.
          </h2>
          <p className="mt-2 text-sm text-[#0A1F44]/75 font-sans">
            Three quick steps. Direct founder access with zero account managers.
          </p>
        </div>

        {/* Progress bar that fills with a spring */}
        <div className="mb-8">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-mono text-[#0A1F44]/60 mb-2 font-bold">
            <span>{step <= 3 ? `Step ${step} of 3` : "Complete"}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-white rounded-full border border-[#0A1F44]/15 p-0.5 overflow-hidden shadow-inner">
            <div
              className="h-full bg-[#FF6B4A] rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </div>
        </div>

        {/* Gamified Container with slide transitions between steps */}
        <div className="relative bg-white rounded-2xl border border-[#0A1F44]/15 shadow-xl p-6 sm:p-10 overflow-hidden">
          {/* STEP 1: What do you need? */}
          {step === 1 && (
            <div className="transition-all duration-300">
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#0A1F44] text-center mb-2">
                What do you need?
              </h3>
              <p className="text-xs text-center text-[#0A1F44]/70 mb-8 font-sans">
                Select one to begin drafting your project.
              </p>

              {/* Three big tappable cards: Single Page, Full Website, Full Product */}
              <div className="space-y-4">
                {[
                  {
                    id: "Single Page",
                    title: "Single Page",
                    desc: "One structured high-conversion scroll page for launches and cafes.",
                  },
                  {
                    id: "Full Website",
                    title: "Full Website",
                    desc: "Multi-page bespoke platform with reservation systems and local SEO.",
                  },
                  {
                    id: "Full Product",
                    title: "Full Product",
                    desc: "SaaS application, rapid MVP, authenticated accounts and payments.",
                  },
                ].map((item) => {
                  const isSelected = formData.projectType === item.id;
                  const isBouncing = bouncingCard === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleCardPick(item.id)}
                      className={`w-full text-left p-5 sm:p-6 rounded-xl border-2 transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-[#FF6B4A] bg-[#FF6B4A]/5 shadow-md"
                          : "border-[#0A1F44]/15 hover:border-[#0A1F44]/40 bg-white"
                      }`}
                      style={{
                        transform: isBouncing ? "scale(1.04)" : "scale(1)",
                        transition: "all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    >
                      <div>
                        <div className="font-serif text-lg sm:text-xl font-bold text-[#0A1F44]">
                          {item.title}
                        </div>
                        <p className="text-xs text-[#0A1F44]/75 mt-1 font-sans">
                          {item.desc}
                        </p>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                          isSelected
                            ? "border-[#FF6B4A] bg-[#FF6B4A] text-white"
                            : "border-[#0A1F44]/20"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Continue button disabled until answered */}
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStep1Valid}
                className="w-full mt-8 py-4 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:bg-[#E85635] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: What is your business? (Name, type, city) */}
          {step === 2 && (
            <div className="transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="font-mono text-xs text-[#0A1F44]/70 hover:text-[#0A1F44] flex items-center gap-1 uppercase tracking-mono font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <span className="font-mono text-xs text-[#FF6B4A] font-bold uppercase tracking-mono">
                  {formData.projectType}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#0A1F44] text-center mb-2">
                What is your business?
              </h3>
              <p className="text-xs text-center text-[#0A1F44]/70 mb-6 font-sans">
                Tell us about your venture so we can prepare your sprint.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-mono font-bold text-[#0A1F44] mb-1.5">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    placeholder="e.g. The Retro Cafe, Nel Cakes"
                    className="w-full px-4 py-3 rounded-lg border border-[#0A1F44]/20 bg-white text-sm text-[#0A1F44] placeholder:text-[#0A1F44]/40 focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-mono font-bold text-[#0A1F44] mb-1.5">
                    Business Type *
                  </label>
                  <input
                    type="text"
                    value={formData.businessType}
                    onChange={(e) =>
                      setFormData({ ...formData, businessType: e.target.value })
                    }
                    placeholder="e.g. Cafe, Bakery, SaaS, Studio, Clinic"
                    className="w-full px-4 py-3 rounded-lg border border-[#0A1F44]/20 bg-white text-sm text-[#0A1F44] placeholder:text-[#0A1F44]/40 focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-mono font-bold text-[#0A1F44] mb-1.5">
                    City &amp; Region *
                  </label>
                  <input
                    type="text"
                    value={formData.businessCity}
                    onChange={(e) =>
                      setFormData({ ...formData, businessCity: e.target.value })
                    }
                    placeholder="e.g. Mon, Dimapur, Guwahati, Global"
                    className="w-full px-4 py-3 rounded-lg border border-[#0A1F44]/20 bg-white text-sm text-[#0A1F44] placeholder:text-[#0A1F44]/40 focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep2Valid}
                  className="w-full mt-6 py-4 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:bg-[#E85635] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Continue to Step 3</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: How do we reach you? (Name, WhatsApp or email) */}
          {step === 3 && (
            <div className="transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="font-mono text-xs text-[#0A1F44]/70 hover:text-[#0A1F44] flex items-center gap-1 uppercase tracking-mono font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <span className="font-mono text-xs text-[#0A1F44]/60 tracking-mono">
                  FINAL STEP
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#0A1F44] text-center mb-2">
                How do we reach you?
              </h3>
              <p className="text-xs text-center text-[#0A1F44]/70 mb-6 font-sans">
                Direct founder response within 24 hours. No account managers.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-mono font-bold text-[#0A1F44] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    placeholder="e.g. Abhigyan"
                    className="w-full px-4 py-3 rounded-lg border border-[#0A1F44]/20 bg-white text-sm text-[#0A1F44] placeholder:text-[#0A1F44]/40 focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-mono font-bold text-[#0A1F44] mb-1.5">
                    WhatsApp or Email *
                  </label>
                  <input
                    type="text"
                    value={formData.contactMethod}
                    onChange={(e) =>
                      setFormData({ ...formData, contactMethod: e.target.value })
                    }
                    placeholder="e.g. +91 88225 32722 or work@abhigyansaikia.in"
                    className="w-full px-4 py-3 rounded-lg border border-[#0A1F44]/20 bg-white text-sm text-[#0A1F44] placeholder:text-[#0A1F44]/40 focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={!isStep3Valid || isSubmitting}
                  className="w-full mt-6 py-4 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:bg-[#E85635] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Start a Project</span>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Done Screen with Paper Plane animation */}
          {step === 4 && (
            <div className="text-center py-8">
              {/* Paper plane flies off */}
              <div
                className="w-16 h-16 rounded-full bg-[#FF6B4A]/10 text-[#FF6B4A] border border-[#FF6B4A]/30 flex items-center justify-center mx-auto mb-4"
                style={{
                  transform: planeFlying ? "translate(100px, -80px) rotate(-20deg) scale(0.4)" : "none",
                  transition: "transform 1s cubic-bezier(0.25, 0.75, 0.2, 1)",
                }}
              >
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-black text-[#0A1F44] mb-2">
                Done.
              </h3>
              <p className="text-base text-[#0A1F44] font-medium max-w-md mx-auto">
                We will reply within one working day.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-[#FAF5EB] border border-[#0A1F44]/15 text-left text-xs font-mono space-y-1.5 max-w-sm mx-auto">
                <div>
                  <span className="text-[#0A1F44]/60">Format:</span>{" "}
                  <span className="font-bold text-[#0A1F44]">{formData.projectType}</span>
                </div>
                <div>
                  <span className="text-[#0A1F44]/60">Business:</span>{" "}
                  <span className="font-bold text-[#0A1F44]">{formData.businessName}</span>
                </div>
                <div>
                  <span className="text-[#0A1F44]/60">Contact:</span>{" "}
                  <span className="font-bold text-[#0A1F44]">{formData.contactMethod}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <a
                  href={`https://wa.me/918822532722?text=${encodeURIComponent(
                    `Hi Studio Draft, I just submitted an inquiry for ${formData.businessName} (${formData.projectType}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-mono font-bold hover:bg-[#E85635] transition-all shadow-md"
                >
                  Direct WhatsApp Ping ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
