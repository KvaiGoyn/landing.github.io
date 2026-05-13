import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AppProvider } from "@/app/context/AppContext";
import ModalManager from "@/app/components/ModalManager";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "МеталлПро — Производство металлоизделий под ключ",
  description: "Полный цикл производства металлоизделий: сварочные работы, порошковая покраска, антивандальные решётки. Сварим, покрасим, защитим. Гарантия до 20 лет.",
  keywords: "сварка, порошковая покраска, решётки, металлоконструкции, антивандальные решётки, перила, ворота, навесы",
  authors: [{ name: "МеталлПро" }],
  openGraph: {
    title: "МеталлПро — Производство металлоизделий под ключ",
    description: "Сварка, покраска, монтаж — всё в одном месте. Гарантия до 20 лет.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "МеталлПро — Производство металлоизделий под ключ",
    description: "Сварка, покраска, монтаж — всё в одном месте. Гарантия до 20 лет.",
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
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <AppProvider>
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
        </AppProvider>
      </body>
    </html>
  );
}
