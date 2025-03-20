import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Single hostname
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "daffodil-rose.vercel.app", // Single hostname
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;