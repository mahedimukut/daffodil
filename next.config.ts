import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "daffodil-rose.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
