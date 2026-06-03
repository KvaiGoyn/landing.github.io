'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { SECTION_IDS } from '@/app/constants/sections';
import { Button } from '@/app/components/ui/Button/Button';

const Hero = () => {
  const { openModal } = useModal();

  const handlePortfolioClick = () => {
    const el = document.getElementById(SECTION_IDS.PORTFOLIO);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCalculationClick = () => {
    openModal('calculation');
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/123.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Затемнение для улучшения читаемости текста */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-orange-50/90 backdrop-blur-sm border border-orange-200 rounded-full px-4 py-2 mb-6">
              <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
              <span className="text-sm font-medium text-orange-700">Гарантия качества работы</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Полный цикл производства <span className="text-orange-400">металлоизделий</span>: от сварки до покраски и монтажа 
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              <span className="font-semibold">Сварим, покрасим, защитим.</span> Изготовим решётки, козырьки, перила и любые металлоконструкции под ключ. Один подрядчик — единая ответственность за результат.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-5 h-5 rounded-full bg-green-500/30 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                Бесплатный выезд замерщика
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-5 h-5 rounded-full bg-green-500/30 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                Возможность купить в кредит
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-5 h-5 rounded-full bg-green-500/30 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                Доставка по регионам
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleCalculationClick}
                variant="primary"
                size="lg"
                rounded="lg"
                rightIcon={
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                }
                className="group"
              >
                Рассчитать стоимость
              </Button>
              <Button
                onClick={handlePortfolioClick}
                variant="outline"
                size="lg"
                rounded="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                Смотреть портфолио
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">9</div>
                <div className="text-sm text-white/80 mt-1">лет на рынке</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">1500 +</div>
                <div className="text-sm text-white/80 mt-1">заказов выполнено</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">98%</div>
                <div className="text-sm text-white/80 mt-1">довольных клиентов</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-gray-500/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-4 overflow-hidden border border-white/20">
                <div className="aspect-[4/3] rounded-2xl relative overflow-hidden">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/images/case_main.jpeg"
                  >
                    <source src="/images/Hero_optimized.webm" type="video/webm" />
                    <source src="/images/Hero_optimized.mp4" type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                  </video>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full font-medium backdrop-blur-sm">Сварка</span>
                  <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full font-medium backdrop-blur-sm">Покраска</span>
                  <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full font-medium backdrop-blur-sm">Монтаж</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Гарантия</div>
                    <div className="text-sm text-gray-600">на все виды работ</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 animate-float" style={{animationDelay: "0.5s"}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Сроки</div>
                    <div className="text-sm text-gray-600">от 3 дней</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-3 animate-float" style={{animationDelay: "1s"}}>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                </div>
                <div className="text-xs text-gray-600 mt-1">500+ отзывов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-white/70">Листайте вниз</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;