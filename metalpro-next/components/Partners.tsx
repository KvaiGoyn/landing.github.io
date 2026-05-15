import React from 'react';

const Partners = () => {
  const partners = [
        { name: "Кировский", type: "Продуктовый магазин", image: "/images/kirovski.png" },
        { name: "Магнит", type: "Продуктовый магазин", image: "/images/Magnit.png" },
        { name: "Пятёрочка", type: "Продуктовый магазин", image: "/images/pyaterochka.png" },
        { name: "Перекрёсток", type: "Продуктовый магазин", image: "/images/perekrestok.png" },
        { name: "МТС", type: "Салон связи", image: "/images/mts.png" },
        { name: "Мотив", type: "Салон связи", image: "/images/motiv.png" },
        { name: "Мегафон", type: "Салон связи", image: "/images/megofon.png" },
        { name: "Табак +", type: "Табачный магазин", image: null },
        { name: "Первый Табачный", type: "Табачный магазин", image: null }
  ];

  return (
    <section className="py-16 lg:py-20 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Нам доверяют</h3>
          <p className="text-gray-600">Работаем с ведущими застройщиками и компаниями</p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex gap-12 animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="flex-shrink-0 flex items-center gap-4 px-6">
                {partner.image ? (
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-12 h-12 rounded-lg object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-800 whitespace-nowrap">{partner.name}</div>
                  <div className="text-xs text-gray-400">{partner.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-12 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-orange-500">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">ISO 9001</div>
                <div className="text-xs text-gray-500">Система менеджмента качества</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-orange-500">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">ГОСТ Р</div>
                <div className="text-xs text-gray-500">Соответствие стандартам РФ</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-orange-500">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">СРО</div>
                <div className="text-xs text-gray-500">Допуск к строительным работам</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">25+</div>
            <div className="text-sm text-gray-500">корпоративных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">600+</div>
            <div className="text-sm text-gray-500">объектов сдано</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">9</div>
            <div className="text-sm text-gray-500">лет на рынке</div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Partners;