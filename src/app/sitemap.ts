import type { MetadataRoute } from "next";

// Ensure sitemap is statically exportable
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rahulbhola.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
