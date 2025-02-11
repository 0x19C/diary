import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'tailwindui.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: `${process.env.NEXT_PUBLIC_IMAGE_HOST}`,
        port: `${process.env.NEXT_PUBLIC_IMAGE_PORT}`,
      }
    ]
  },
  output: 'standalone',
};

export default nextConfig;
