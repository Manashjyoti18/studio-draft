import type { Metadata } from "next";
import Link from "next/link";
import FathomlessHeader from "@/components/fathomless/FathomlessHeader";
import FathomlessFooter from "@/components/fathomless/FathomlessFooter";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy, Studio Draft, Assam India",
  description:
    "Read the Privacy Policy for Studio Draft to learn how we handle your project inquiries and contact information securely in Assam, India.",
  alternates: {
    canonical: "https://studiodraft.space/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy, Studio Draft, Assam India",
    description:
      "Read the Privacy Policy for Studio Draft to learn how we handle your project inquiries and contact information securely in Assam, India.",
    url: "https://studiodraft.space/privacy-policy",
    siteName: "Studio Draft",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://studiodraft.space/images/projects/toolkb.webp",
        width: 1200,
        height: 630,
        alt: "Studio Draft Privacy Policy, Assam India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy, Studio Draft, Assam India",
    description:
      "Read the Privacy Policy for Studio Draft to learn how we handle your project inquiries and contact information securely in Assam, India.",
    images: ["https://studiodraft.space/images/projects/toolkb.webp"],
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Privacy Policy", path: "/privacy-policy" },
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
            Privacy Policy
          </h1>

          <p className="font-sans text-[16px] text-[#FAF5EB]/60 mb-10 pb-6 border-b border-[#FAF5EB]/15">
            Last updated 23 November 2026
          </p>

          <div className="font-sans text-[16px] text-[#FAF5EB]/80 leading-[1.7] space-y-8">
            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                What we collect
              </h2>
              <p>
                We collect your name, email, phone number, business name and city only when you choose to fill out the Start a Project form on our site or when you email us directly. We do not gather personal information passively or harvest data in the background.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                How we use your information
              </h2>
              <p>
                We use your details only to reply to your inquiry, to build your website, and to send your scope and quote. We do not sell your data, we do not share it with advertisers, and we do not use it for unsolicited marketing without your word.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                How we store it
              </h2>
              <p>
                Your project details and correspondence are stored securely in Gmail and within our internal project files, only for as long as needed to plan, execute, and deliver your project.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Your rights
              </h2>
              <p>
                You can ask us to delete your details, contacts, or communications at any time. Simply send an email with your request to{" "}
                <a
                  href="mailto:work@abhigyansaikia.in"
                  className="text-[#FF6B4A] underline hover:opacity-80 transition-opacity"
                >
                  work@abhigyansaikia.in
                </a>
                . Studio Draft, Assam, India will promptly remove your records.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Cookies
              </h2>
              <p>
                We use only essential cookies required for the website to function properly and maintain basic session state. For full details on our minimal cookie footprint, see our{" "}
                <Link
                  href="/cookies"
                  className="text-[#FF6B4A] underline hover:opacity-80 transition-opacity"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Third party links
              </h2>
              <p>
                Our website links to Instagram, as well as production client sites such as ToolKB.in, Brandcey, Arogya Relief, and The Retro Cafe. When you navigate to those third-party sites, their respective privacy policies apply.
              </p>
            </section>
          </div>
        </article>

        <FathomlessFooter />
      </main>
    </>
  );
}
