import { NextResponse } from 'next/server';

const SITE_URL = 'https://stylmaster.ru';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>2025-12-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="${SITE_URL}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
    <image:image>
      <image:loc>${SITE_URL}/images/project-gates-main.jpeg</image:loc>
      <image:title>Пример работ Стиль Мастер — металлоконструкции</image:title>
      <image:caption>Производство металлоизделий под ключ</image:caption>
    </image:image>
    <image:image>
      <image:loc>${SITE_URL}/images/project-gates-paint-after.jpg</image:loc>
      <image:title>Порошковая покраска металлоизделий</image:title>
    </image:image>
    <image:image>
      <image:loc>${SITE_URL}/images/project-gates-welding.jpeg</image:loc>
      <image:title>Сварочные работы</image:title>
    </image:image>
    <image:image>
      <image:loc>${SITE_URL}/images/hero-bg.jpg</image:loc>
      <image:title>Производство металлоизделий Стиль Мастер</image:title>
    </image:image>
    <image:image>
      <image:loc>${SITE_URL}/images/advantages-bg.jpg</image:loc>
      <image:title>Цех металлообработки Стиль Мастер</image:title>
    </image:image>
  </url>
  
  <!-- Юридические страницы -->
  <url>
    <loc>${SITE_URL}/legal/privacy-policy</loc>
    <lastmod>2025-12-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/legal/terms-of-service</loc>
    <lastmod>2025-12-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/legal/cookie-policy</loc>
    <lastmod>2025-12-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/legal/company-details</loc>
    <lastmod>2025-12-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Страница благодарности -->
  <url>
    <loc>${SITE_URL}/thank-you</loc>
    <lastmod>2025-12-18</lastmod>
    <changefreq>never</changefreq>
    <priority>0.1</priority>
  </url>
</urlset>`;

export async function GET() {
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}