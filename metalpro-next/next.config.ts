import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/landing.github.io',
  assetPrefix: '/landing.github.io',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
