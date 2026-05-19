import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';
const isExport = process.env.NEXT_EXPORT === 'true' || isProduction;

const nextConfig: NextConfig = {
  // output: 'export' только для production сборки, иначе dev сервер не работает
  ...(isExport ? { output: 'export' } : {}),
  basePath: isProduction ? '/landing.github.io' : '',
  assetPrefix: isProduction ? '/landing.github.io' : '',
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
    removeConsole: isProduction,
  },
};

// Bundle analyzer для анализа размера бандла
const withBundleAnalyzer = (process.env.ANALYZE === 'true')
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config: NextConfig) => config;

export default withBundleAnalyzer(nextConfig);
