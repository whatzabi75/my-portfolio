import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // keep your existing options here, PLUS this block:
  experimental: {
    // If you already have `experimental` with other settings,
    // just add `serverActions` inside it.
    serverActions: {
      bodySizeLimit: "16mb", // or "10mb" if your PDFs are bigger
    },
  },
};

export default nextConfig;