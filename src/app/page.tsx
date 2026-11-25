import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getFAQPageSchema,
  getSpeakableSchema,
  getHowToSchema,
  getServiceSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Studio Draft, Websites That Make Money, Design Develop Deploy, Assam India",
  description:
    "We design, develop, and market digital products and websites built to generate revenue for businesses from Assam, India.",
  alternates: {
    canonical: "https://studiodraft.space",
  },
  openGraph: {
    title: "Studio Draft, Websites That Make Money, Design Develop Deploy, Assam India",
    description:
      "We design, develop, and market digital products and websites built to generate revenue for businesses from Assam, India.",
    url: "https://studiodraft.space",
    siteName: "Studio Draft",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://studiodraft.space/images/projects/toolkb.webp",
        width: 1200,
        height: 630,
        alt: "Studio Draft digital product studio in Assam, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Draft, Websites That Make Money, Design Develop Deploy, Assam India",
    description:
      "We design, develop, and market digital products and websites built to generate revenue for businesses from Assam, India.",
    images: ["https://studiodraft.space/images/projects/toolkb.webp"],
  },
};

export default function HomePage() {
  const schemas = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getFAQPageSchema(),
    getSpeakableSchema(),
    getHowToSchema(),
    getServiceSchema(),
  ];

  return (
    <>
      {schemas.map((s, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <HomePageClient />
    </>
  );
}
