import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Убрано output: 'export' - приложение использует API routes и требует сервер
  // Для статического экспорта используйте отдельную сборку с NEXT_EXPORT=true
  // но тогда API routes не будут работать
  basePath: isProduction && process.env.NEXT_PUBLIC_BASE_PATH ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  assetPrefix: isProduction && process.env.NEXT_PUBLIC_BASE_PATH ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  trailingSlash: true,
  images: {
    unoptimized: false, // Оптимизация изображений включена
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: isProduction,
  },
};

const withBundleAnalyzer = (process.env.ANALYZE === 'true')
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config: NextConfig) => config;

export default withBundleAnalyzer(nextConfig);
