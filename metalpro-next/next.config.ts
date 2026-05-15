import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/out',
  assetPrefix: '/out',
  trailingSlash: true,
  images: {
    unoptimized: true, // Для статического экспорта требуется true
    formats: ['image/webp'], // Поддержка WebP для браузеров, которые его поддерживают
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Оптимизация для production (автоматически включается в production)
  compiler: {
    // Включаем удаление console.log в production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
