import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: '</service/>; rel="service-doc", </about-us/>; rel="about"',
          },
        ],
      },
    ];
  },

  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.nexvoraagency.com",
      },
    ],
  },
};

export default nextConfig;