import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'tailwindui.com'],
  },
  output: 'standalone',
};

export default nextConfig;
