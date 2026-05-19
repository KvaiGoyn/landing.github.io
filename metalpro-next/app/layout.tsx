import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AppProviders } from "@/app/context/AppProviders";
import ModalManager from "@/app/components/ModalManager";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://metalpro.ru'),
  title: "МеталлПро — Производство металлоизделий под ключ | Сварка, покраска, монтаж",
  description: "Профессиональное производство металлоизделий под ключ: сварочные работы, порошковая покраска, антивандальные решётки, перила, ворота, навесы. Гарантия до 20 лет. Работаем по Москве и области.",
  keywords: "сварка, порошковая покраска, решётки, металлоконструкции, антивандальные решётки, перила, ворота, навесы, производство металлоизделий, металлообработка",
  authors: [{ name: "МеталлПро" }],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "МеталлПро — Производство металлоизделий под ключ",
    description: "Сварка, покраска, монтаж — всё в одном месте. Гарантия до 20 лет. Работаем по Москве и области.",
    type: "website",
    url: "https://metalpro.ru",
    siteName: "МеталлПро",
    images: [
      {
        url: "/images/case_main.jpeg",
        width: 1200,
        height: 630,
        alt: "Пример работ МеталлПро — металлоконструкции",
      },
    ],
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "МеталлПро — Производство металлоизделий под ключ",
    description: "Сварка, покраска, монтаж — всё в одном месте. Гарантия до 20 лет.",
    images: ["/images/case_main.jpeg"],
    creator: "@metalpro",
  },
  alternates: {
    canonical: "https://metalpro.ru",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Предзагрузка критических ресурсов для улучшения производительности */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Предзагрузка ключевого изображения для LCP (геройское изображение) */}
        <link
          rel="preload"
          href="/images/case_main.jpeg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        
        {/* Предзагрузка оптимизированного видео в формате webm (самый легкий) */}
        <link
          rel="preload"
          href="/images/Hero_optimized.webm"
          as="video"
          type="video/webm"
          fetchPriority="high"
        />
        
        {/* Предзагрузка логотипа */}
        <link
          rel="preload"
          href="/logo.svg"
          as="image"
          type="image/svg+xml"
        />

        {/* Favicon и иконки */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <meta name="theme-color" content="#1a202c" />

        {/* Семантическая разметка Schema.org (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://metalpro.ru/#organization",
                  "name": "МеталлПро",
                  "description": "Профессиональное производство металлоизделий под ключ: сварочные работы, порошковая покраска, антивандальные решётки, перила, ворота, навесы.",
                  "url": "https://metalpro.ru",
                  "logo": "https://metalpro.ru/logo.svg",
                  "image": "https://metalpro.ru/images/case_main.jpeg",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Москва",
                    "addressRegion": "Московская область",
                    "addressCountry": "RU"
                  },
                  "telephone": "+7 (495) 123-45-67",
                  "email": "info@metalpro.ru",
                  "openingHours": "Mo-Fr 09:00-18:00",
                  "priceRange": "₽₽",
                  "sameAs": [
                    "https://vk.com/metalpro",
                    "https://instagram.com/metalpro"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://metalpro.ru/#website",
                  "url": "https://metalpro.ru",
                  "name": "МеталлПро",
                  "description": "Производство металлоизделий под ключ",
                  "publisher": {
                    "@id": "https://metalpro.ru/#organization"
                  }
                },
                {
                  "@type": "Service",
                  "name": "Сварочные работы",
                  "serviceType": "Сварка металлоконструкций",
                  "provider": {
                    "@id": "https://metalpro.ru/#organization"
                  }
                },
                {
                  "@type": "Service",
                  "name": "Порошковая покраска",
                  "serviceType": "Покраска металлоизделий",
                  "provider": {
                    "@id": "https://metalpro.ru/#organization"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <AppProviders>
          <Header />
          <ModalManager />
          <main className="flex-1">{children}</main>
          <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center">
                <p className="text-gray-400">© 2025 МеталлПро. Все права защищены.</p>
                <p className="text-gray-500 text-sm mt-2">Производство металлоизделий под ключ</p>
              </div>
            </div>
          </footer>
        </AppProviders>
      </body>
    </html>
  );
}
