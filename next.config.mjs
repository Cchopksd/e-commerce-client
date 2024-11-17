/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This wildcard will allow images from any domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow any hostname
      },
    ],
  },
};

export default nextConfig;
