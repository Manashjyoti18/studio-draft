"use client";

import { MessageSquare, Check } from "lucide-react";

export default function TestimonialsSection() {
  return (
    // Section 2: TESTIMONIALS
    <section id="testimonials" className="relative py-28 md:py-36 border-t border-[#111111] bg-[#FFFFFF] text-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#111111]">
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase font-bold tracking-widest text-[#FF6B35]">
              <span className="w-2.5 h-2.5 bg-[#FF6B35]" />
              <span>SECTION 02 // VERIFIED FEEDBACK</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tightest uppercase text-[#111111] leading-[0.9]">
              WORDS FROM CLIENTS.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-base md:text-lg text-[#111111]/80 leading-relaxed font-medium">
              Authentic statements from founders and teams we have built for.
            </p>
            <div className="mt-4 font-mono text-xs uppercase tracking-wider text-[#111111]/50">
              [ 100% VERIFIED TESTIMONIAL PROTOCOL &bull; ZERO FABRICATION ]
            </div>
          </div>
        </div>

        {/* Editorial Notice & Unpopulated Policy Banner */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Notice (8 cols) */}
          <div className="lg:col-span-8 p-8 md:p-14 border-2 border-[#111111] bg-[#FFFFFF] shadow-[8px_8px_0px_0px_#111111] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#111111] mb-8 font-mono text-xs">
                <span className="px-3 py-1 bg-[#111111] text-[#FFFFFF] font-bold uppercase tracking-wider">
                  POLICY PROTOCOL
                </span>
                <span className="text-[#FF6B35] font-bold uppercase tracking-wider">
                  HONEST ATTESTATION
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] uppercase leading-tight mb-6">
                CLIENT TESTIMONIALS ARE PUBLISHED ONLY UPON WRITTEN AUTHORIZATION.
              </h3>

              <div className="space-y-4 font-sans text-base text-[#111111]/85 leading-relaxed font-normal">
                <p>
                  Studio Draft does not manufacture fake customer quotes, fictional five-star ratings, or unverified performance statistics.
                </p>
                <p>
                  Client feedback is published exclusively when client engagements reach completion and formal permission has been granted by the business owner.
                </p>
              </div>
            </div>

            {/* Verification Commitments */}
            <div className="mt-10 pt-6 border-t border-[#111111] grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF6B35]" />
                <span className="font-bold">No Ghostwritten Quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF6B35]" />
                <span className="font-bold">No Fabricated Ratings</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF6B35]" />
                <span className="font-bold">Human Verification</span>
              </div>
            </div>
          </div>

          {/* Submission / Contact Conduit for Current Clients (4 cols) */}
          <div className="lg:col-span-4 p-8 md:p-10 border-2 border-[#111111] bg-[#B7E4C7] shadow-[8px_8px_0px_0px_#111111] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#111111] text-[#FFFFFF] flex items-center justify-center font-bold mb-6">
                <MessageSquare className="w-5 h-5 text-[#B7E4C7]" />
              </div>

              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#111111] uppercase mb-4 leading-tight">
                HAVE WE BUILT FOR YOUR BUSINESS?
              </h4>

              <p className="font-sans text-sm text-[#111111]/90 leading-relaxed font-medium">
                If you are a past or active client of Studio Draft and would like to submit feedback regarding your website, product, or engagement, contact the studio directly.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#111111]">
              <a
                href="mailto:studiodraft.space@gmail.com?subject=Studio%20Draft%20Client%20Testimonial%20Submission"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#111111] hover:bg-[#FF6B35] text-[#FFFFFF] font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200"
              >
                <span>Submit Client Review</span>
                <span className="text-[#B7E4C7]">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
