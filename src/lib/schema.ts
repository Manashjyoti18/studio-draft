import { FAQ_DATA } from "@/data/faq";

export const BASE_URL = "https://studiodraft.space";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Studio Draft",
    legalName: "Studio Draft Creative & Technical Studio",
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    email: "work@abhigyansaikia.in",
    telephone: "+91 88225 32722",
    description:
      "We design, develop, and market digital products and websites built to generate revenue for businesses from Assam, India.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Assam",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 88225 32722",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi", "Assamese"],
      },
    ],
    founder: [
      {
        "@type": "Person",
        name: "Manash Jyoti Baruah",
        jobTitle: "Co-Founder and Tech Architect",
      },
      {
        "@type": "Person",
        name: "Abhigyan Saikia",
        jobTitle: "Co-Founder and Design Lead",
        url: "https://abhigyansaikia.in",
      },
    ],
    member: [
      {
        "@type": "Person",
        name: "Gouri Gayan",
        jobTitle: "Product and Growth Strategist",
      },
      {
        "@type": "Person",
        name: "Somujjal Hazarika",
        jobTitle: "UI UX Designer",
      },
    ],
    sameAs: [
      "https://www.instagram.com/studiodraft.space/",
      "https://abhigyansaikia.in",
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Studio Draft",
    url: BASE_URL,
  };
}

export function getFAQPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getSpeakableSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Studio Draft, Websites That Make Money, Design Develop Deploy, Assam India",
    url: BASE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#studio-answer"],
    },
  };
}

export function getHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Start a Website Project with Studio Draft",
    description:
      "The seven-step process to start and launch a website with Studio Draft from scope to production.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Fill the form",
        text: "Complete the project onboarding questionnaire with your business type, website goals, timeline, and contact information.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Studio Draft replies",
        text: "Our founders review your answers and reply directly within 24 hours to clarify project parameters.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Demo",
        text: "We present a focused demonstration and architecture walkthrough tailored to your business model.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Quote",
        text: "You receive a transparent project scope and tailored quote based strictly on your project specifications.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Deposit",
        text: "You approve the quote and remit the project commencement deposit to schedule the build sprint.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Build sprint",
        text: "We execute the design and full-stack engineering in parallel with weekly milestone demonstrations.",
      },
      {
        "@type": "HowToStep",
        position: 7,
        name: "Deploy and handoff",
        text: "We deploy the website to production, conduct full QA, and hand over complete codebase ownership.",
      },
    ],
  };
}

export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Website Design and Development",
    name: "High-Performance Website Bundle",
    provider: {
      "@type": "Organization",
      name: "Studio Draft",
      url: BASE_URL,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Assam",
        addressCountry: "IN",
      },
    },
    description:
      "Standard digital product offer: bespoke website, local booking chatbot answering solely from business website data, order or enquiry form, and technical SEO on Google.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Standard Features & Add-ons",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "High-Performance Website",
            description: "Bespoke production website engineered to drive revenue.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local Booking Chatbot",
            description:
              "Local inquiry chatbot that answers strictly from website data with zero external AI and zero API costs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Order or Enquiry Form",
            description: "Direct order and lead submission routing.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Found on Google (Technical SEO)",
            description:
              "Search engine indexation, structured schema, and crawl optimization.",
          },
        },
      ],
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.name,
        item: `${BASE_URL}${item.path}`,
      })),
    ],
  };
}
