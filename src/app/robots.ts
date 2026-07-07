import type { MetadataRoute } from "next";

// Ensure robots.txt is statically exportable
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://rahulbhola.dev/sitemap.xml",
  };
}
