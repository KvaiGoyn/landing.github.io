import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';
const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig: NextConfig = {
  // output: 'export' только если явно указан NEXT_EXPORT=true
  ...(isExport ? { output: 'export' } : {}),
  basePath: isProduction && process.env.NEXT_PUBLIC_BASE_PATH ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  assetPrefix: isProduction && process.env.NEXT_PUBLIC_BASE_PATH ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  trailingSlash: true,
  images: {
    unoptimized: isExport, // Для статического экспорта требуется true
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
