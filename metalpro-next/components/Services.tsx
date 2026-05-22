'use client';

import React from 'react';
import { useScrollTo } from '@/app/hooks/useScrollTo';
import { useModal } from '@/app/context/ModalContext';
import { SECTION_IDS } from '@/app/constants/sections';
import { Button } from '@/app/components/ui/Button/Button';

const Services = () => {
  const { scrollToSection } = useScrollTo();
  const { openModal } = useModal();

  const handleConsultationClick = () => {
    // Согласно требованиям: скролл к секции contact или открытие формы консультации
    // Выбираем открытие модального окна консультации
    openModal('consultation');
    // Альтернативно можно скроллить к контактам:
    // scrollToSection(SECTION_IDS.CONTACTS, { behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"></path>
            </svg>
            <span className="text-sm font-medium text-orange-700">Наши услуги</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Три направления — <span className="gradient-text">единый результат</span>
          </h2>
          <p className="text-lg text-gray-600">
            Мы не просто сварщики или маляры — это производственная компания полного цикла. 
            Каждая услуга — часть единого процесса создания качественного изделия.
          </p>
        </div>
        
        <div className="hidden lg:flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-orange-500">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold">1</div>
            <span className="font-medium">Сварка</span>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-orange-300 to-gray-300"></div>
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">2</div>
            <span className="font-medium">Покраска</span>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-gray-300 to-gray-400"></div>
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">3</div>
            <span className="font-medium">Защита</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Сварочные работы */}
          <div className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 lg:scale-105 lg:shadow-xl lg:shadow-orange-100/50">
            <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
              Популярно
            </div>
            <div className="p-6 pb-0 bg-gradient-to-br from-orange-50 to-orange-100/50">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M6 8l-2 2 2 2M18 8l2 2-2 2"></path>
                  <path d="M8 14c0 2.5 1.5 4 4 4s4-1.5 4-4"></path>
                  <path d="M4 22h16"></path>
                  <circle cx="12" cy="12" r="3" fill="currentColor"></circle>
                  <path d="M9 12l-3 4M15 12l3 4"></path>
                </svg>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Сварочные работы</h3>
              <p className="text-sm font-medium mb-4 text-orange-600">Изготовление металлоконструкций</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Создаем надёжные конструкции, которые простоят десятилетия. Работаем с чёрным металлом, нержавеющей сталью и алюминием.
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-orange-100">
                    <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Каркасы и металлоконструкции</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-orange-100">
                    <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Ворота, заборы, навесы</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-orange-100">
                    <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Лестницы и перила</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-orange-100">
                    <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Выездные сварочные работы</span>
                </li>
              </ul>
            </div>
            
            <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
          </div>
          
          {/* Порошковая покраска */}
          <div className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2">
            <div className="p-6 pb-0 bg-gradient-to-br from-gray-50 to-gray-100/50">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg shadow-gray-700/25">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                  <path d="M12 11v10"></path>
                  <path d="M8 21h8"></path>
                  <path d="M7 7h.01M12 7h.01M17 7h.01"></path>
                </svg>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Порошковая покраска</h3>
              <p className="text-sm font-medium mb-4 text-gray-500">Защита от коррозии на долгий срок</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Профессиональное покрытие в камерах полимеризации. Равномерный слой без подтёков, 
                устойчивый к УФ-лучам и механическим повреждениям.
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Палитра цветов RAL</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Камеры полимеризации</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Подготовка поверхности</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Гарантия на покрытие</span>
                </li>
              </ul>
            </div>
            
            <div className="h-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"></div>
          </div>
          
          {/* Антивандальные решётки */}
          <div className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2">
            <div className="p-6 pb-0 bg-gradient-to-br from-orange-50/50 to-gray-100/50">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-400/25">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Антивандальные решётки</h3>
              <p className="text-sm font-medium mb-4 text-gray-500">Стильная защита от взлома</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Готовые изделия с усиленной конструкцией. Кованые и сварные решётки, рольставни — 
                надёжная защита вашего имущества.
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Защита от взлома</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Надёжные замки</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Декоративные элементы</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Монтаж с гарантией</span>
                </li>
              </ul>
            </div>
            
            <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Не знаете, какая услуга вам нужна? Оставьте заявку — мы поможем подобрать оптимальное решение
          </p>
          <Button
            onClick={handleConsultationClick}
            variant="primary"
            size="lg"
            rounded="lg"
            rightIcon={
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            }
          >
            Получить консультацию
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;