import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'tailwindui.com', 'localhost', `${process.env.NEXT_PUBLIC_BACKEND_API_URL}`],
  },
  output: 'standalone',
};

export default nextConfig;
