import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-orange-700">Прозрачные цены</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Стоимость <span className="gradient-text">услуг</span>
          </h2>
          <p className="text-lg text-gray-600">
            Честные цены без скрытых платежей. Точная смета после замера — цена не изменится в процессе работ.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Сварочные работы */}
          <div className="relative bg-white rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-orange-200 shadow-xl shadow-orange-100/50 lg:scale-105">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold px-4 py-1.5 rounded-bl-xl">
              Популярно
            </div>
            
            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Сварочные работы</h3>
              <p className="text-sm text-gray-500 mb-4">Изготовление и ремонт</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-orange-600">от 500 ₽</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">погонный метр шва</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-orange-100">
                    <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Работа с любыми металлами</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-orange-100">
                    <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Выезд на объект</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-orange-100">
                    <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Сварка аргоном и полуавтоматом</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-orange-100">
                    <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Гарантия на швы</span>
                </li>
              </ul>
              
              <button className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-10 rounded-md px-4 has-[>svg]:px-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25">
                Заказать сварку
              </button>
            </div>
          </div>
          
          {/* Порошковая покраска */}
          <div className="relative bg-white rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-gray-100">
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100/50">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Порошковая покраска</h3>
              <p className="text-sm text-gray-500 mb-4">Защита и декор</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">от 350 ₽</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">м² поверхности</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Палитра RAL на выбор</span>
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
                  <span className="text-sm text-gray-700">Устойчивость к УФ</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Гарантия 20 лет</span>
                </li>
              </ul>
              
              <button className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-4 has-[>svg]:px-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700">
                Заказать покраску
              </button>
            </div>
          </div>
          
          {/* Антивандальные решётки */}
          <div className="relative bg-white rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-gray-100">
            <div className="p-6 bg-gradient-to-br from-orange-50/50 to-gray-100/50">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Антивандальные решётки</h3>
              <p className="text-sm text-gray-500 mb-4">Под ключ</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">от 3 500 ₽</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">м² изделия</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Проектирование</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Изготовление и покраска</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Монтаж с гарантией</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Антивандальные замки</span>
                </li>
              </ul>
              
              <button className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-4 has-[>svg]:px-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700">
                Заказать решётки
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Как мы работаем</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              От первого звонка до готового изделия — прозрачный процесс, который вы контролируете на каждом этапе.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Заявка и замер", description: "Вы оставляете заявку — мы выезжаем на бесплатный замер и консультацию." },
              { number: "02", title: "Проектирование", description: "Создаём 3D-визуализацию и точный чертёж с размерами." },
              { number: "03", title: "Производство", description: "Изготовление, сварка и покраска в наших цехах." },
              { number: "04", title: "Монтаж", description: "Доставка и установка изделия на вашем объекте." },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-orange-200 to-gray-200"></div>
                <div className="text-center">
                  <div className="relative inline-flex mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {index === 0 && <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"></path>}
                        {index === 1 && <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>}
                        {index === 2 && <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>}
                        {index === 3 && <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>}
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">Нужен точный расчёт?</h3>
            <p className="text-gray-300 mb-6">Закажите бесплатный выезд замерщика — получите смету в течение 24 часов</p>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/25">
              Вызвать замерщика бесплатно
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;