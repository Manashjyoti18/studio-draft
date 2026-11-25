import { MetadataRoute } from "next";
import { STUDIO_DATA } from "@/data/studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://studiodraft.space";

  const projectUrls = STUDIO_DATA.projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectUrls,
  ];
}
