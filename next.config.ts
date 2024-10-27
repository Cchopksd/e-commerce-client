import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // This wildcard will allow images from any domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow any hostname
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;
