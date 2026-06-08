import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AppProviders } from "@/app/context/AppProviders";
import ModalManager from "@/app/components/ModalManager";
import CookieBanner from "@/app/components/CookieBanner";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://stylmaster.ru'),
  title: "Стиль Мастер — Производство металлоизделий под ключ | Сварка, покраска, монтаж",
  description: "Профессиональное производство металлоизделий под ключ: сварочные работы, порошковая покраска, антивандальные решётки, перила, ворота, навесы. Гарантия до года. Работаем по Екатеринбургу и области.",
  keywords: "сварка, порошковая покраска, решётки, металлоконструкции, антивандальные решётки, перила, ворота, навесы, производство металлоизделий, металлообработка, сварочные работы цена, покраска металла, заказать решётки на окна",
  authors: [{ name: "Стиль Мастер" }],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  verification: {
    yandex: "e3ad7eec044ee846",
  },
  openGraph: {
    title: "Стиль Мастер — Производство металлоизделий под ключ",
    description: "Сварка, покраска, монтаж — всё в одном месте. Гарантия до года. Работаем по Екатеринбургу и области.",
    type: "website",
    url: "https://stylmaster.ru",
    siteName: "Стиль Мастер",
    images: [
      {
        url: "/images/project-gates-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Пример работ Стиль Мастер — металлоконструкции",
      },
    ],
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Стиль Мастер — Производство металлоизделий под ключ",
    description: "Сварка, покраска, монтаж — всё в одном месте. Гарантия до года.",
    images: ["/images/project-gates-main.jpeg"],
    creator: "@stil_master",
  },
  alternates: {
    canonical: "https://stylmaster.ru",
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
          href="/images/project-gates-main.jpeg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        
        {/* Предзагрузка оптимизированного видео в формате webm (самый легкий) */}
        <link
          rel="preload"
          href="/images/hero-video.webm"
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
                  "@id": "https://stylmaster.ru/#organization",
                  "name": "Стиль Мастер",
                  "description": "Профессиональное производство металлоизделий под ключ: сварочные работы, порошковая покраска, антивандальные решётки, перила, ворота, навесы.",
                  "url": "https://stylmaster.ru",
                  "logo": "https://stylmaster.ru/logo.svg",
                  "image": "https://stylmaster.ru/images/project-gates-main.jpeg",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Екатеринбург",
                    "addressRegion": "Свердловская область",
                    "addressCountry": "RU"
                  },
                  "telephone": "+7 (912) 222-02-41",
                  "email": "info@stil-master.ru",
                  "openingHours": "Mo-Fr 09:00-18:00",
                  "priceRange": "₽₽",
                  "sameAs": [
                    "https://vk.com/stil_master",
                    "https://instagram.com/stil_master"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://stylmaster.ru/#website",
                  "url": "https://stylmaster.ru",
                  "name": "Стиль Мастер",
                  "description": "Производство металлоизделий под ключ",
                  "publisher": {
                    "@id": "https://stylmaster.ru/#organization"
                  }
                },
                {
                  "@type": "Service",
                  "name": "Сварочные работы",
                  "serviceType": "Сварка металлоконструкций",
                  "description": "Изготовление металлоконструкций, каркасов, ворот, заборов, навесов, лестниц, перил. Работаем с чёрным металлом, нержавеющей сталью и алюминием.",
                  "provider": {
                    "@id": "https://stylmaster.ru/#organization"
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": "500",
                    "priceCurrency": "RUB",
                    "priceSpecification": {
                      "@type": "UnitPriceSpecification",
                      "unitText": "погонный метр шва"
                    }
                  }
                },
                {
                  "@type": "Service",
                  "name": "Порошковая покраска",
                  "serviceType": "Покраска металлоизделий",
                  "description": "Профессиональное покрытие в камерах полимеризации. Палитра RAL, устойчивость к УФ-лучам и механическим повреждениям.",
                  "provider": {
                    "@id": "https://stylmaster.ru/#organization"
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": "350",
                    "priceCurrency": "RUB",
                    "priceSpecification": {
                      "@type": "UnitPriceSpecification",
                      "unitText": "м² поверхности"
                    }
                  }
                },
                {
                  "@type": "Service",
                  "name": "Антивандальные решётки",
                  "serviceType": "Изготовление решёток",
                  "description": "Готовые изделия с усиленной конструкцией. Кованые и сварные решётки, рольставни — надёжная защита вашего имущества.",
                  "provider": {
                    "@id": "https://stylmaster.ru/#organization"
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": "3500",
                    "priceCurrency": "RUB",
                    "priceSpecification": {
                      "@type": "UnitPriceSpecification",
                      "unitText": "м² изделия"
                    }
                  }
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://stylmaster.ru/#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Главная",
                      "item": "https://stylmaster.ru/"
                    }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://stylmaster.ru/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Сколько времени занимает изготовление?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "От 3 дней для стандартных изделий. Срок зависит от сложности и объёма работ."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Есть ли гарантия на работы?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, гарантия 1 год на порошковое покрытие и 1 год на сварные швы."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Работаете ли вы с регионами?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, доставляем изделия по всей России. Монтаж возможен в крупных городах."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Сколько стоят сварочные работы?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Сварочные работы — от 500 ₽ за погонный метр шва. Точная смета после замера."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Как заказать бесплатный замер?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Оставьте заявку на сайте или позвоните по телефону +7 (912) 222-02-41. Мы выезжаем на бесплатный замер и консультацию."
                      }
                    }
                  ]
                },
                {
                  "@type": "Product",
                  "@id": "https://stylmaster.ru/#product-welding",
                  "name": "Сварочные работы",
                  "description": "Профессиональная сварка металлоконструкций. Работа с любыми металлами, выезд на объект, сварка аргоном и полуавтоматом.",
                  "brand": {
                    "@type": "Brand",
                    "name": "Стиль Мастер"
                  },
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "RUB",
                    "lowPrice": "500",
                    "highPrice": "5000",
                    "offerCount": "4"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "500",
                    "bestRating": "5"
                  }
                },
                {
                  "@type": "Product",
                  "@id": "https://stylmaster.ru/#product-painting",
                  "name": "Порошковая покраска",
                  "description": "Профессиональное покрытие в камерах полимеризации. Палитра RAL, подготовка поверхности, гарантия на покрытие.",
                  "brand": {
                    "@type": "Brand",
                    "name": "Стиль Мастер"
                  },
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "RUB",
                    "lowPrice": "350",
                    "highPrice": "3000",
                    "offerCount": "4"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "500",
                    "bestRating": "5"
                  }
                },
                {
                  "@type": "Product",
                  "@id": "https://stylmaster.ru/#product-grates",
                  "name": "Антивандальные решётки",
                  "description": "Усиленные решётки на окна с антивандальным покрытием. Проектирование, изготовление, покраска, монтаж под ключ.",
                  "brand": {
                    "@type": "Brand",
                    "name": "Стиль Мастер"
                  },
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "RUB",
                    "lowPrice": "3500",
                    "highPrice": "15000",
                    "offerCount": "4"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "500",
                    "bestRating": "5"
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
                <p className="text-gray-400">© 2025 Стиль Мастер. Все права защищены.</p>
                <p className="text-gray-500 text-sm mt-2">Производство металлоизделий под ключ</p>
                
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                    <a
                      href="/legal/privacy-policy"
                      className="hover:text-white transition-colors"
                    >
                      Политика конфиденциальности
                    </a>
                    <a
                      href="/legal/terms-of-service"
                      className="hover:text-white transition-colors"
                    >
                      Пользовательское соглашение
                    </a>
                    <a
                      href="/legal/cookie-policy"
                      className="hover:text-white transition-colors"
                    >
                      Политика использования cookie
                    </a>
                    <a
                      href="/legal/company-details"
                      className="hover:text-white transition-colors"
                    >
                      Реквизиты
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <CookieBanner />
        </AppProviders>
      </body>
    </html>
  );
}
