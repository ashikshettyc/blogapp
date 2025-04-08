import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blogapp-backend-gkmv.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
