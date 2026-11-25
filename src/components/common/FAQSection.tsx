import React from "react";
import { FAQ_DATA } from "@/data/faq";

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="relative w-full bg-[#071633] text-[#FAF5EB] py-16 md:py-24 px-6 md:px-8 border-b border-[#FAF5EB]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-3xl pb-6 border-b border-[#FAF5EB]/15">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0]">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-[17px] text-[#FAF5EB]/80 leading-[1.7]">
            Straight answers about how Studio Draft operates, our engineering standards, and our commercial deliverables.
          </p>
        </div>

        {/* 5 Questions in Clean Open Layout with Hairline Dividers */}
        <div className="flex flex-col border-t border-[#FAF5EB]/15 divide-y divide-[#FAF5EB]/15">
          {FAQ_DATA.map((item, index) => (
            <div
              key={index}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
            >
              <h3 className="md:col-span-5 font-serif text-xl sm:text-2xl text-[#FAF5EB] font-light leading-snug">
                {item.question}
              </h3>
              <p className="md:col-span-7 font-sans text-[16px] text-[#FAF5EB]/80 leading-[1.7]">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
