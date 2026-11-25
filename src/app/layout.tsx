import type { Metadata, Viewport } from "next";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";

const fraunces = Fraunces({
  weight: ["300", "600"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const archivo = Archivo({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#071633",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://studiodraft.space"),
  title: {
    default: "Studio Draft, Websites That Make Money, Design Develop Deploy, Assam India",
    template: "%s",
  },
  description:
    "We design, develop, and market digital products and websites built to generate revenue for businesses from Assam, India.",
  keywords: [
    "Studio Draft",
    "Digital Products",
    "Website Design",
    "Bespoke Websites",
    "Local Booking Chatbot",
    "Found on Google",
    "Technical SEO",
    "MVP Development",
    "Abhigyan Saikia",
    "Manash Jyoti Baruah",
    "Assam",
    "India",
  ],
  authors: [{ name: "Studio Draft" }, { name: "Abhigyan Saikia" }],
  creator: "Studio Draft",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://studiodraft.space",
    title: "Studio Draft, Websites That Make Money, Design Develop Deploy, Assam India",
    description:
      "We design, develop, and market digital products and websites built to generate revenue for businesses from Assam, India.",
    siteName: "Studio Draft",
    images: [
      {
        url: "/images/projects/toolkb.webp",
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
    images: ["/images/projects/toolkb.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-[#071633] text-[#FAF5EB] font-sans selection:bg-[#FF6B4A] selection:text-white antialiased">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
