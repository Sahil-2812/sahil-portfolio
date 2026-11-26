import type { MetadataRoute } from "next";

import { siteConfig, siteUrl } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} Portfolio`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#050816",
    lang: "en",
    orientation: "portrait-primary",
    scope: "/",
    id: siteUrl,
    categories: ["portfolio", "business", "productivity"],
  };
}