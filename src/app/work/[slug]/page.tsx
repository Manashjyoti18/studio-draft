import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { STUDIO_DATA } from "@/data/studio";
import { getBreadcrumbSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return STUDIO_DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = STUDIO_DATA.projects.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: "Case Study, Studio Draft, Assam India",
      description: "Digital product case study by Studio Draft in Assam, India.",
    };
  }

  const cleanSummary = project.summary.replace(/—/g, ",").trim();
  const description =
    cleanSummary.length <= 155
      ? cleanSummary
      : `${cleanSummary.slice(0, 152)}...`;

  const ogImage = project.image.startsWith("http")
    ? project.image
    : `https://studiodraft.space${project.image}`;

  return {
    title: `${project.title}, Case Study, Studio Draft, Assam India`,
    description,
    alternates: {
      canonical: `https://studiodraft.space/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title}, Case Study, Studio Draft, Assam India`,
      description,
      url: `https://studiodraft.space/work/${project.slug}`,
      siteName: "Studio Draft",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} case study by Studio Draft, Assam India`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title}, Case Study, Studio Draft, Assam India`,
      description,
      images: [ogImage],
    },
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = STUDIO_DATA.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Work", path: "/#work" },
    { name: project.title, path: `/work/${project.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-[#071633] text-[#FAF5EB] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          {/* Back Link: Plain text only, no arrow */}
          <Link
            href="/#work"
            className="inline-flex items-center text-xs font-mono text-[#FAF5EB]/60 hover:text-[#FF6B4A] transition-colors mb-12 uppercase tracking-wider font-semibold"
          >
            <span>Back to Selected Work</span>
          </Link>

          {/* Header Telemetry */}
          <div className="border-b border-[#FAF5EB]/15 pb-8">
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#FAF5EB]">
              {project.title}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-[#FAF5EB]/80 leading-relaxed max-w-3xl">
              {project.summary}
            </p>

            {/* Links: Plain text only, rectangular 4px radius, no arrows */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#FF6B4A] hover:bg-[#E85A3A] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-[4px] shadow-sm transition-all"
                >
                  <span>Launch Live Platform</span>
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#0A1F44] hover:bg-[#071633] border border-[#FAF5EB]/20 text-[#FAF5EB] text-xs font-mono uppercase tracking-wider rounded-[4px] transition-all"
                >
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Featured Image guarded with SafeImage */}
          <div className="relative w-full aspect-video md:aspect-[21/9] my-12 border border-[#FAF5EB]/15 overflow-hidden bg-[#0A1F44]">
            <SafeImage
              src={project.image}
              alt={`${project.title} case study screenshot`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>

          {/* Case Study Content in an open layout with hairline dividers, no section numbers in headings */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-16">
            <div className="md:col-span-8 space-y-12">
              <div className="border-b border-[#FAF5EB]/15 pb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-light text-[#FAF5EB] mb-4">
                  The Problem
                </h2>
                <p className="text-base text-[#FAF5EB]/80 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="border-b border-[#FAF5EB]/15 pb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-light text-[#FAF5EB] mb-4">
                  Engineering and Design Architecture
                </h2>
                <p className="text-base text-[#FAF5EB]/80 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-light text-[#FAF5EB] mb-4">
                  Tangible Production Value
                </h2>
                <p className="text-base text-[#FAF5EB]/80 leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-4 space-y-8">
              {/* Stack Tags */}
              <div className="p-6 border border-[#FAF5EB]/15 bg-[#0A1F44]/40 space-y-4">
                <div className="text-xs font-mono text-[#FAF5EB]/60 uppercase tracking-wider font-semibold">
                  TECHNOLOGY STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#071633] border border-[#FAF5EB]/15 text-xs font-mono text-[#FAF5EB]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Inquiries */}
              <div className="p-6 border border-[#FF6B4A]/30 bg-[#FF6B4A]/10 space-y-4">
                <h3 className="font-serif text-lg font-light text-[#FAF5EB]">
                  Need similar architecture?
                </h3>
                <p className="text-xs text-[#FAF5EB]/80 leading-relaxed">
                  We can architect and deploy a comparable full-stack system or
                  design framework for your business.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center text-xs font-mono text-[#FF6B4A] hover:underline uppercase tracking-wider font-bold"
                >
                  <span>Initiate Sprint</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
