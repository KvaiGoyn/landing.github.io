import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Александр Петров",
      role: "Частный заказчик",
      avatar: "/images/placeholder_image.jpg",
      text: "Заказывал решётки на окна и ворота для дачи. Сделали всё за неделю! Качество сварки отличное, покраска ровная. Ребята приехали на замер в тот же день. Рекомендую!",
      rating: 5,
    },
    {
      id: 2,
      name: "Елена Смирнова",
      role: "Владелец коттеджа",
      avatar: "/images/placeholder_image.jpg",
      text: "Муж хотел сам сварить лестницу, но я уговорила заказать у профессионалов. Не пожалели! Лестница — просто мечта: надёжная, красивая, покрашена идеально. Спасибо за терпение с нашим ремонтом!",
      rating: 5,
    },
    {
      id: 3,
      name: "Дмитрий Иванов",
      role: "Директор офиса",
      avatar: "/images/placeholder_image.jpg",
      text: "Нужно было защитить окна офиса на первом этаже. МеталлПрофессионально подошли к задаче: предложили дизайн, который не портит фасад, и антивандальное покрытие. Уже год — никаких нареканий.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-sm font-medium text-orange-700">Отзывы клиентов</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Нам доверяют <span className="gradient-text">более 2500 клиентов</span>
          </h2>
          <p className="text-lg text-gray-600">Реальные отзывы от наших заказчиков — частных лиц и компаний</p>
        </div>
        
        <div className="hidden lg:block relative">
          <div className="flex gap-6 justify-center">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`w-96 bg-white rounded-2xl border transition-all duration-500 p-6 ${
                  index === 1 
                    ? "border-orange-200 shadow-xl shadow-orange-100/50 scale-105 z-10" 
                    : "border-gray-100 opacity-60 scale-95"
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{testimonial.text}"</p>
                
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-500 hover:border-orange-300 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-500 hover:border-orange-300 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <div className="flex justify-center gap-2 mt-8">
            <button className="w-2 h-2 rounded-full transition-all w-8 bg-orange-500"></button>
            <button className="w-2 h-2 rounded-full transition-all bg-gray-300 hover:bg-gray-400"></button>
            <button className="w-2 h-2 rounded-full transition-all bg-gray-300 hover:bg-gray-400"></button>
            <button className="w-2 h-2 rounded-full transition-all bg-gray-300 hover:bg-gray-400"></button>
            <button className="w-2 h-2 rounded-full transition-all bg-gray-300 hover:bg-gray-400"></button>
            <button className="w-2 h-2 rounded-full transition-all bg-gray-300 hover:bg-gray-400"></button>
          </div>
        </div>
        
        <div className="lg:hidden">
          <div className="bg-white rounded-2xl border border-orange-200 shadow-xl p-6">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              ))}
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              "Заказывал решётки на окна и ворота для дачи. Сделали всё за неделю! Качество сварки отличное, покраска ровная. Ребята приехали на замер в тот же день. Рекомендую!"
            </p>
            
            <div className="flex items-center gap-3">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVcJtA-ACnnL8hZ26ppuTdQ0of7T-v30ef1RxDfqBjhGeSxND3KT9VgzmXg4iznJPPS_-4zSLPcFJ9l-9nnKI1B52n7Pil7bE&s&ec=121644734seed/alex/48/48" 
                alt="Александр Петров" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900">Александр Петров</div>
                <div className="text-sm text-gray-500">Частный заказчик</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-100">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">4.9</div>
            <div className="flex justify-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              ))}
            </div>
            <div className="text-sm text-gray-500">Средняя оценка</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">500+</div>
            <div className="text-sm text-gray-500">Отзывов на сайтах</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">98%</div>
            <div className="text-sm text-gray-500">Рекомендуют нас</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">0.2%</div>
            <div className="text-sm text-gray-500">Претензий</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;