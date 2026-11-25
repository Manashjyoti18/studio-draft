import type { Metadata } from "next";
import FathomlessHeader from "@/components/fathomless/FathomlessHeader";
import FathomlessFooter from "@/components/fathomless/FathomlessFooter";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cookie Policy, Studio Draft, Assam India",
  description:
    "Read the Cookie Policy for Studio Draft to understand the essential technical cookies used to run our website smoothly in Assam, India.",
  alternates: {
    canonical: "https://studiodraft.space/cookies",
  },
  openGraph: {
    title: "Cookie Policy, Studio Draft, Assam India",
    description:
      "Read the Cookie Policy for Studio Draft to understand the essential technical cookies used to run our website smoothly in Assam, India.",
    url: "https://studiodraft.space/cookies",
    siteName: "Studio Draft",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://studiodraft.space/images/projects/toolkb.webp",
        width: 1200,
        height: 630,
        alt: "Studio Draft Cookie Policy, Assam India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy, Studio Draft, Assam India",
    description:
      "Read the Cookie Policy for Studio Draft to understand the essential technical cookies used to run our website smoothly in Assam, India.",
    images: ["https://studiodraft.space/images/projects/toolkb.webp"],
  },
};

export default function CookiePolicyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Cookie Policy", path: "/cookies" },
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
            Cookie Policy
          </h1>

          <p className="font-sans text-[16px] text-[#FAF5EB]/60 mb-10 pb-6 border-b border-[#FAF5EB]/15">
            Last updated 23 November 2026
          </p>

          <div className="font-sans text-[16px] text-[#FAF5EB]/80 leading-[1.7] space-y-8">
            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                What cookies are
              </h2>
              <p>
                Cookies are small plain text files placed in your browser when you visit a website. They help the browser remember necessary settings so pages load smoothly and display properly across sessions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                What cookies we use
              </h2>
              <p>
                We use only essential technical cookies necessary for our site to load, remember your accessibility preferences (such as reduced motion), and measure visits in anonymous aggregate. We do not use tracking cookies for third-party advertising, and we do not deploy marketing trackers across the web.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                How to control cookies
              </h2>
              <p>
                You can delete or block cookies directly through your browser settings at any time. Our website will still load and function cleanly without non-essential storage, although some visual motion preferences may revert to default.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-[24px] font-normal text-[#FAF5EB]">
                Questions
              </h2>
              <p>
                If you have any questions regarding our cookie practices, reach out to Studio Draft, Assam, India at{" "}
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
