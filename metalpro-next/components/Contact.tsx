import React from 'react';

const Contact = () => {
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
                <a href="tel:+78001234567" className="text-orange-600 hover:text-orange-700 font-medium">
                  8 (800) 123-45-67
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
                <a href="mailto:info@metallpro.ru" className="text-orange-600 hover:text-orange-700 font-medium">
                  info@metallpro.ru
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
                <p className="text-orange-600 font-medium">г. Москва, ул. Производственная, 15</p>
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
                <p className="text-orange-600 font-medium">Пн-Пт: 9:00–19:00</p>
                <p className="text-sm text-gray-500 mt-1">Сб-Вс: 10:00–17:00</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Оставьте заявку</h3>
              
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors resize-none"
                    placeholder="Опишите вашу задачу..."
                  ></textarea>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="agree" className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
                  <label htmlFor="agree" className="text-sm text-gray-600">
                    Согласен на обработку персональных данных
                  </label>
                </div>
                
                <button 
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-12 rounded-lg px-6 has-[>svg]:px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/25"
                >
                  Отправить заявку
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-64 relative overflow-hidden">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVcJtA-ACnnL8hZ26ppuTdQ0of7T-v30ef1RxDfqBjhGeSxND3KT9VgzmXg4iznJPPS_-4zSLPcFJ9l-9nnKI1B52n7Pil7bE&s&ec=121644734seed/map/800/400" 
                alt="Карта проезда" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h4>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <button className="flex items-center justify-between w-full text-left">
                    <span className="font-medium text-gray-800">Сколько времени занимает изготовление?</span>
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </button>
                  <p className="text-sm text-gray-600 mt-2 hidden">
                    От 3 дней для стандартных изделий. Срок зависит от сложности и объёма работ.
                  </p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <button className="flex items-center justify-between w-full text-left">
                    <span className="font-medium text-gray-800">Есть ли гарантия на работы?</span>
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </button>
                  <p className="text-sm text-gray-600 mt-2 hidden">
                    Да, гарантия до 20 лет на порошковое покрытие и до 10 лет на сварные швы.
                  </p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <button className="flex items-center justify-between w-full text-left">
                    <span className="font-medium text-gray-800">Работаете ли вы с регионами?</span>
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </button>
                  <p className="text-sm text-gray-600 mt-2 hidden">
                    Да, доставляем изделия по всей России. Монтаж возможен в крупных городах.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;