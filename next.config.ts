import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Your Strapi or API port
        pathname: '/uploads/**', // Path to images
      },
    ],
  },
};

export default nextConfig;
