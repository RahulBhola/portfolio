import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import type { NextConfig } from "next";

const githubPagesPath = "/portfolio";

const nextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Export a fully static site suitable for GitHub Pages
    output: "export",
    images: {
      unoptimized: true,
    },
    // Apply the GitHub Pages path only in production builds.
    ...(isDev
      ? {}
      : {
          basePath: githubPagesPath,
          assetPrefix: `${githubPagesPath}/`,
        }),
    // Use trailing slashes so exported routes map to folders on GitHub Pages
    trailingSlash: true,
  };
};

export default nextConfig;
