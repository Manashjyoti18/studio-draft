import type { Metadata } from "next";
import FathomlessHeader from "@/components/fathomless/FathomlessHeader";
import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/common/FAQSection";
import FathomlessFooter from "@/components/fathomless/FathomlessFooter";
import { getBreadcrumbSchema, getFAQPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Studio Draft, Start a Project, Assam India",
  description:
    "Start a project with Studio Draft in Assam, India. We design and develop bespoke websites, local booking chatbots, order forms, and digital products.",
  alternates: {
    canonical: "https://studiodraft.space/contact",
  },
  openGraph: {
    title: "Contact Studio Draft, Start a Project, Assam India",
    description:
      "Start a project with Studio Draft in Assam, India. We design and develop bespoke websites, local booking chatbots, order forms, and digital products.",
    url: "https://studiodraft.space/contact",
    siteName: "Studio Draft",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://studiodraft.space/images/projects/toolkb.webp",
        width: 1200,
        height: 630,
        alt: "Contact Studio Draft, Assam India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Studio Draft, Start a Project, Assam India",
    description:
      "Start a project with Studio Draft in Assam, India. We design and develop bespoke websites, local booking chatbots, order forms, and digital products.",
    images: ["https://studiodraft.space/images/projects/toolkb.webp"],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Contact", path: "/contact" },
  ]);
  const faqSchema = getFAQPageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="relative min-h-screen bg-[#071633] text-[#FAF5EB] overflow-x-clip selection:bg-[#FF6B4A] selection:text-white pt-[72px]">
        <FathomlessHeader />
        <div className="max-w-5xl mx-auto px-6 md:px-8 pt-12 pb-4">
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[-0.02em] text-[#FAF5EB] leading-[1.0] mb-4">
            Contact Studio Draft
          </h1>
          <p className="font-sans text-[17px] text-[#FAF5EB]/80 leading-[1.7] max-w-3xl">
            Begin your build or reach out directly to discuss your website and product architecture with our founders in Assam, India.
          </p>
        </div>
        <ContactSection />
        <FAQSection />
        <FathomlessFooter />
      </main>
    </>
  );
}
