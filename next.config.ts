import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use unoptimized so static export does not require the Next.js image optimization server.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.WORDPRESS_MEDIA_HOSTNAME || "cms.nexvoraagency.com",
      },
    ],
  },

  // Static export
  output: "export",

  // Hostinger prefers directory-style URLs
  trailingSlash: true,
};

export default nextConfig;