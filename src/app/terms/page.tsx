import type { Metadata } from "next";
import FathomlessHeader from "@/components/fathomless/FathomlessHeader";
import FathomlessFooter from "@/components/fathomless/FathomlessFooter";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms of Service, Studio Draft, Assam India",
  description:
    "Review the Terms of Service for Studio Draft covering our website engineering standards, delivery timelines, and warranty terms in Assam, India.",
  alternates: {
    canonical: "https://studiodraft.space/terms",
  },
  openGraph: {
    title: "Terms of Service, Studio Draft, Assam India",
    description:
      "Review the Terms of Service for Studio Draft covering our website engineering standards, delivery timelines, and warranty terms in Assam, India.",
    url: "https://studiodraft.space/terms",
    siteName: "Studio Draft",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://studiodraft.space/images/projects/toolkb.webp",
        width: 1200,
        height: 630,
        alt: "Studio Draft Terms of Service, Assam India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service, Studio Draft, Assam India",
    description:
      "Review the Terms of Service for Studio Draft covering our website engineering standards, delivery timelines, and warranty terms in Assam, India.",
    images: ["https://studiodraft.space/images/projects/toolkb.webp"],
  },
};

export default function TermsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Terms of Service", path: "/terms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="relative min-h-screen bg-[#071633] text-[#FAF5EB] overflow-x-clip selection:bg-[#FF6B4A] selection:text-white pt-[72px]">
        <FathomlessHeader />

        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <h1 className="font-serif text-[40px] sm:text-[48px] font-light text-[#FAF5EB] leading-[1.05] tracking-tight mb-3">
            Terms of Service
          </h1>

          <p className="font-sans text-[16px] text-[#FAF5EB]/60 mb-10 pb-6 border-b border-[#FAF5EB]/15">
            Last updated 23 November 2026
          </p>

          <div className="font-sans text-[16px] text-[#FAF5EB]/80 leading-[1.7] space-y-8">
            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Services
              </h2>
              <p>
                Studio Draft provides digital product engineering, including bespoke websites, local booking chatbots, order and enquiry forms, and technical SEO (Found on Google). The chatbot operates locally, answering questions solely from your own website data with zero external AI dependencies and zero recurring API costs. Additional capabilities, such as full automation pipelines, direct payment gateways, and custom customer desks, are available as distinct architectural add-ons and are not included in the standard bundle.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Payment terms
              </h2>
              <p>
                Projects require a 50 percent upfront deposit to initiate development, with the remaining 50 percent due upon final production delivery. No development or architectural work commences prior to the receipt of the upfront deposit.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Delivery timeline
              </h2>
              <p>
                Standard production MVPs are delivered within 14 to 30 days. Timelines depend directly upon the prompt provision of required client content, brand assets, and feedback.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Revisions and warranty
              </h2>
              <p>
                All technical fixes, bug patches, and layout corrections are provided free of charge for 6 months following delivery. After 6 months, ongoing changes and feature additions are billed at agreed small task rates.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Client content
              </h2>
              <p>
                Clients must furnish their authentic menu items, pricing structures, high-resolution photography, and copy. Studio Draft builds custom technical architecture; we do not invent menu items, services, or fake business claims for your company.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Ownership and portfolio rights
              </h2>
              <p>
                Upon receipt of full payment, full ownership of the custom codebase and website transfers to the client. Studio Draft reserves the right to display the completed work, screenshots, and metrics in our public portfolio and case studies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Cancellation policy
              </h2>
              <p>
                If a client cancels a project after development has commenced, the initial 50 percent deposit is retained by Studio Draft to cover labor, engineering, and infrastructure work completed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Legal questions
              </h2>
              <p>
                For any questions regarding these terms, contact Studio Draft, Assam, India via email at{" "}
                <a
                  href="mailto:work@abhigyansaikia.in"
                  className="text-[#FF6B4A] underline hover:opacity-80 transition-opacity"
                >
                  work@abhigyansaikia.in
                </a>
                .
              </p>
            </section>
          </div>
        </article>

        <FathomlessFooter />
      </main>
    </>
  );
}
