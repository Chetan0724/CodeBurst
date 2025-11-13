import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "6hnd5t76-3000.inc1.devtunnels.ms"],
    },
  },
};

export default nextConfig;
