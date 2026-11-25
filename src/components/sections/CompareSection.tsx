"use client";

interface CompareTier {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  deliveryTime: string;
  features: {
    menuAndHours: boolean | string;
    bookingForm: boolean | string;
    foundOnGoogle: boolean | string;
    chatbot: boolean | string;
    payment: boolean | string;
  };
  ctaLabel: string;
  isPopular?: boolean;
}

const TIERS: CompareTier[] = [
  {
    id: "single-page",
    name: "Single Page",
    badge: "FASTEST LAUNCH",
    tagline: "For cafes, food joints and boutique businesses that need one clean, direct link.",
    deliveryTime: "5 - 7 Days",
    features: {
      menuAndHours: "Full digital menu & live opening hours",
      bookingForm: "WhatsApp / Direct phone click",
      foundOnGoogle: "Google Maps & Local Business profile",
      chatbot: false,
      payment: "UPI QR / Direct link",
    },
    ctaLabel: "Initialize Single Page",
  },
  {
    id: "full-website",
    name: "Full Website",
    badge: "MOST POPULAR",
    tagline: "For restaurants, clinics, local brands and studios wanting complete digital presence.",
    deliveryTime: "14 - 21 Days",
    features: {
      menuAndHours: "Multi-category interactive menu",
      bookingForm: "Automated table & slot reservation engine",
      foundOnGoogle: "Complete local SEO & schema markup",
      chatbot: "Custom automated FAQ responder",
      payment: "Stripe & Razorpay integrated",
    },
    ctaLabel: "Initialize Full Website",
    isPopular: true,
  },
  {
    id: "full-product",
    name: "Full Product",
    badge: "SQUAD SPRINT",
    tagline: "For SaaS startups, complex marketplaces, or multi-branch commercial operations.",
    deliveryTime: "30 Days",
    features: {
      menuAndHours: "Dynamic CMS & inventory sync",
      bookingForm: "Calendar sync & two-way SMS confirmations",
      foundOnGoogle: "High-authority programmatic SEO",
      chatbot: "Custom workflow automation",
      payment: "Subscription & recurring billing",
    },
    ctaLabel: "Initialize Product MVP",
  },
];

export default function CompareSection() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#FAF5EB] text-[#0A1F44] py-18 sm:py-20 px-6 border-b border-[#E3DCCB]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-2 font-bold">
            SPECIFICATION MATRIX // WHICH FITS YOUR BUSINESS?
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1F44]">
            Compare Studio Draft Builds.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#0A1F44]/75">
            Clear deliverables, honest delivery timelines, and direct builder access across all three options.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`bg-[#FFFDF9] border rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                tier.isPopular
                  ? "border-[#FF6B4A] shadow-card ring-1 ring-[#FF6B4A]"
                  : "border-[#E3DCCB] shadow-subtle hover:border-[#0A1F44]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E3DCCB]">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-mono font-bold px-2.5 py-0.5 rounded ${
                      tier.isPopular
                        ? "bg-[#FF6B4A] text-white"
                        : "bg-[#0A1F44]/5 text-[#0A1F44]/75"
                    }`}
                  >
                    {tier.badge}
                  </span>
                  <span className="font-mono text-xs text-[#0A1F44]/65">
                    {tier.deliveryTime}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0A1F44]">
                  {tier.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#0A1F44]/75 min-h-[40px]">
                  {tier.tagline}
                </p>

                {/* Features List */}
                <div className="mt-6 space-y-3 pt-5 border-t border-[#E3DCCB]">
                  {/* Feature: Menu and hours */}
                  <div className="pb-2.5 border-b border-[#E3DCCB]/60">
                    <div className="font-mono text-[10px] uppercase tracking-mono text-[#0A1F44]/50">
                      MENU &amp; HOURS
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#0A1F44] mt-0.5">
                      {tier.features.menuAndHours}
                    </div>
                  </div>

                  {/* Feature: Booking form */}
                  <div className="pb-2.5 border-b border-[#E3DCCB]/60">
                    <div className="font-mono text-[10px] uppercase tracking-mono text-[#0A1F44]/50">
                      BOOKING ENGINE
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#0A1F44] mt-0.5">
                      {tier.features.bookingForm}
                    </div>
                  </div>

                  {/* Feature: Found on Google */}
                  <div className="pb-2.5 border-b border-[#E3DCCB]/60">
                    <div className="font-mono text-[10px] uppercase tracking-mono text-[#0A1F44]/50">
                      FOUND ON GOOGLE (SEO)
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#0A1F44] mt-0.5">
                      {tier.features.foundOnGoogle}
                    </div>
                  </div>

                  {/* Feature: Chatbot */}
                  <div className="pb-2.5 border-b border-[#E3DCCB]/60">
                    <div className="font-mono text-[10px] uppercase tracking-mono text-[#0A1F44]/50">
                      AUTOMATION / CHAT
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#0A1F44] mt-0.5">
                      {tier.features.chatbot ? (
                        <span>{tier.features.chatbot}</span>
                      ) : (
                        <span className="text-[#0A1F44]/40 font-normal">
                          Not included
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Feature: Payment */}
                  <div className="pb-2.5">
                    <div className="font-mono text-[10px] uppercase tracking-mono text-[#0A1F44]/50">
                      PAYMENTS &amp; COMMERCE
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#0A1F44] mt-0.5">
                      {tier.features.payment}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Under Each Column */}
              <button
                onClick={scrollToContact}
                className={`mt-6 w-full py-3 rounded-full font-mono text-xs uppercase tracking-mono font-bold transition-all duration-200 shadow-sm ${
                  tier.isPopular
                    ? "bg-[#FF6B4A] text-white hover:bg-[#E85635]"
                    : "border-2 border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#FAF5EB]"
                }`}
              >
                {tier.ctaLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
