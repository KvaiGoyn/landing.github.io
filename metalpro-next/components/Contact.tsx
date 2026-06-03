'use client';

import React, { useEffect, useRef } from 'react';
import ContactForm from '@/app/components/forms/ContactForm';
import { Accordion, AccordionItem } from '@/app/components/ui/Accordion';

// Объявление типов для Яндекс.Карт
declare global {
  interface Window {
    ymaps?: {
      ready: (callback: () => void) => void;
      Map: new (element: HTMLElement | string, options: any) => any;
      Placemark: new (coordinates: number[], properties?: any, options?: any) => any;
    };
  }
}

const Contact = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Координаты центра карты (адрес: Свердловская область, п. Садовый, ул. Глинная 9)
  // Можно уточнить через геокодер, но для демонстрации используем приблизительные координаты.
  const centerCoordinates = [56.953732, 60.672071]; // Широта, долгота (пример для района Екатеринбурга)

  useEffect(() => {
    // Проверяем, загружен ли уже API Яндекс.Карт
    if (typeof window !== 'undefined') {
      if (!window.ymaps) {
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`;
        script.async = true;
        script.onload = () => {
          if (window.ymaps) {
            window.ymaps.ready(initMap);
          }
        };
        document.head.appendChild(script);
      } else {
        window.ymaps.ready(initMap);
      }
    }

    return () => {
      // Очистка карты при размонтировании
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || typeof window === 'undefined' || !window.ymaps) return;

    // Создаём карту
    const map = new window.ymaps.Map(mapRef.current, {
      center: centerCoordinates,
      zoom: 16,
      controls: ['zoomControl', 'fullscreenControl'],
    });

    // Добавляем метку
    const placemark = new window.ymaps.Placemark(centerCoordinates, {
      hintContent: 'Наше производство',
      balloonContent: 'Свердловская область, п. Садовый, ул. Глинная 9',
    }, {
      preset: 'islands#redIcon',
    });

    map.geoObjects.add(placemark);
    mapInstanceRef.current = map;
  };

  return (
    <section id="contacts" className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-orange-700">Контакты</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Свяжитесь <span className="gradient-text">с нами</span>
          </h2>
          <p className="text-lg text-gray-600">
            Ответим на вопросы, поможем с выбором и рассчитаем стоимость вашего проекта
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Телефон</h4>
                <a href="tel:+79122220241" className="text-orange-600 hover:text-orange-700 font-medium">
                  +7 (912) 222-02-41
                </a>
                <p className="text-sm text-gray-500 mt-1">Бесплатно по России</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M22 7l-10 7L2 7"></path>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                <a href="mailto:dmn-ekb@yandex.ru" className="text-orange-600 hover:text-orange-700 font-medium">
                  dmn-ekb@yandex.ru 
                </a>
                <p className="text-sm text-gray-500 mt-1">Ответим за 1 час</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Адрес</h4>
                <p className="text-orange-600 font-medium">Свердловская область, п. Садовый, ул. Глинная 9</p>
                <p className="text-sm text-gray-500 mt-1">Производственный цех</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Режим работы</h4>
                <p className="text-orange-600 font-medium">Пн-Сб: 9:00–18:00</p>
              </div>
            </div>
            
            <ContactForm />
          </div>
          
          <div className="space-y-8">
            {/* Контейнер для карты */}
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-64 relative overflow-hidden">
              <div ref={mapRef} className="absolute inset-0 w-full h-full" />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h4>
              
              <Accordion multiple={false} defaultOpenIndex={0}>
                <AccordionItem
                  title="Сколько времени занимает изготовление?"
                  className="border-b border-gray-100 pb-4"
                  headerClassName="font-medium text-gray-800 hover:text-orange-600"
                >
                  От 3 дней для стандартных изделий. Срок зависит от сложности и объёма работ.
                </AccordionItem>
                <AccordionItem
                  title="Есть ли гарантия на работы?"
                  className="border-b border-gray-100 pb-4"
                  headerClassName="font-medium text-gray-800 hover:text-orange-600"
                >
                  Да, гарантия 1 год на порошковое покрытие и 1 год на сварные швы.
                </AccordionItem>
                <AccordionItem
                  title="Работаете ли вы с регионами?"
                  className="border-b border-gray-100 pb-4"
                  headerClassName="font-medium text-gray-800 hover:text-orange-600"
                >
                  Да, доставляем изделия по всей России. Монтаж возможен в крупных городах.
                </AccordionItem>
              </Accordion>
            </div>
            
            <a
              href="tel:+79122220241"
              className="block bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg">Позвоните сейчас</div>
                  <div className="text-white/90">Получите бесплатную консультацию</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;