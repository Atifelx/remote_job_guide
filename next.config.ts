import type { NextConfig } from "next";

// Static export so the site can be served from GitHub Pages. The Pages workflow sets
// PAGES_BASE_PATH to "/remote_job_guide"; local dev runs at the root.
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.PAGES_BASE_PATH || "",
};

export default nextConfig;
