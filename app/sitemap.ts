import type { MetadataRoute } from "next";

import { projects } from "@/lib/portfolio-data";
import { siteUrl } from "@/lib/site";

const sectionAnchors = [
  "about",
  "skills",
  "services",
  "stack",
  "projects",
  "testimonials",
  "contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const sections: MetadataRoute.Sitemap = sectionAnchors.map((id) => ({
    url: `${siteUrl}/#${id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: id === "projects" ? 0.9 : 0.8,
  }));

  const projectAnchors: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/#project-${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...home, ...sections, ...projectAnchors];
}