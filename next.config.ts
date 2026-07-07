import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export a fully static site suitable for GitHub Pages
  output: "export",
  // Serve from the repository subpath: https://<user>.github.io/portfolio
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
  // Use trailing slashes so exported routes map to folders on GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
