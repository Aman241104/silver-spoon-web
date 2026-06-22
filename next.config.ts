import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // serve images directly — we pre-compress with sharp, Vercel free tier has 1k/month limit
  },
};

export default nextConfig;
