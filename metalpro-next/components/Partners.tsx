import React from 'react';

const Partners = () => {
  const partners = [
    { name: "ПИК-Недвижимость", type: "Застройщик", image: "/images/placeholder_image.jpg" },
    { name: "MR Group", type: "Девелопер", image: "/images/placeholder_image.jpg" },
    { name: "ГК А101", type: "Застройщик", image: "/images/placeholder_image.jpg" },
    { name: "Самолёт", type: "Застройщик", image: "/images/placeholder_image.jpg" },
    { name: "Донстрой", type: "Девелопер", image: "/images/placeholder_image.jpg" },
    { name: "Мортон", type: "Застройщик", image: "/images/placeholder_image.jpg" },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Нам доверяют</h3>
          <p className="text-gray-600">Работаем с ведущими застройщиками и компаниями</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex gap-12 animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="flex-shrink-0 flex items-center gap-4 px-6">
                <img 
                  src={partner.image} 
                  alt={partner.name} 
                  className="w-12 h-12 rounded-lg object-contain"
                />
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
            <div className="text-2xl md:text-3xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-500">корпоративных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">100+</div>
            <div className="text-sm text-gray-500">объектов сдано</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">15</div>
            <div className="text-sm text-gray-500">лет на рынке</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-500">судебных разбирательств</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;