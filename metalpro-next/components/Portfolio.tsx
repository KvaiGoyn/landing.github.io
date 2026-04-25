import React from 'react';

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      title: "Антивандальные решётки для офиса",
      description: "Комплексный проект: проектирование, сварка, порошковая покраска и монтаж.",
      image: "/images/placeholder_image.jpg",
      tags: ["Сварка", "Покраска", "Монтаж"],
    },
    {
      id: 2,
      title: "Перила для частного дома",
      description: "Нержавеющая сталь с порошковым покрытием под дерево.",
      image: "/images/placeholder_image.jpg",
      tags: ["Сварка", "Покраска"],
    },
    {
      id: 3,
      title: "Козырёк над входом",
      description: "Кованый козырёк с поликарбонатом и антивандальным покрытием.",
      image: "/images/placeholder_image.jpg",
      tags: ["Сварка", "Покраска", "Монтаж"],
    },
    {
      id: 4,
      title: "Откатные ворота",
      description: "Автоматические ворота с порошковым покрытием и противовандальной защитой.",
      image: "/images/placeholder_image.jpg",
      tags: ["Сварка", "Покраска", "Автоматика"],
    },
    {
      id: 5,
      title: "Решётки на окна коттеджа",
      description: "Декоративные кованые решётки с защитой от взлома.",
      image: "/images/placeholder_image.jpg",
      tags: ["Сварка", "Покраска", "Монтаж"],
    },
    {
      id: 6,
      title: "Лестница в таунхаусе",
      description: "Металлический каркас лестницы с деревянными ступенями.",
      image: "/images/placeholder_image.jpg",
      tags: ["Сварка", "Покраска"],
    },
  ];

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-orange-700">Портфолио</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Примеры наших <span className="gradient-text">работ</span>
          </h2>
          <p className="text-lg text-gray-600">
            Каждый проект — это полный цикл производства. Смотрите, как мы превращаем идеи в надёжные металлоконструкции.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button className="px-5 py-2.5 rounded-full text-sm font-medium transition-all bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25">
            Все работы
          </button>
          <button className="px-5 py-2.5 rounded-full text-sm font-medium transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-200">
            Решётки
          </button>
          <button className="px-5 py-2.5 rounded-full text-sm font-medium transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-200">
            Перила и лестницы
          </button>
          <button className="px-5 py-2.5 rounded-full text-sm font-medium transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-200">
            Козырьки и навесы
          </button>
          <button className="px-5 py-2.5 rounded-full text-sm font-medium transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-200">
            Ворота и заборы
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="text-center flex-1">
                    <div className="font-semibold text-gray-400">До</div>
                    <div className="text-gray-500 mt-1 hidden sm:block">
                      {item.id === 1 ? "Голый сварной каркас" : 
                       item.id === 2 ? "Металлический каркас" :
                       item.id === 3 ? "Сварка каркаса" :
                       item.id === 4 ? "Рама ворот" :
                       item.id === 5 ? "Эскиз и замеры" : "Проектирование"}
                    </div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="font-semibold text-gray-400">Процесс</div>
                    <div className="text-gray-500 mt-1 hidden sm:block">
                      {item.id === 1 ? "Порошковая покраска" :
                       item.id === 2 ? "Покраска под дерево" :
                       item.id === 3 ? "Покраска RAL 7016" :
                       item.id === 4 ? "Покраска и сборка" :
                       item.id === 5 ? "Изготовление и покраска" : "Сварка и покраска"}
                    </div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="font-semibold text-orange-500">Результат</div>
                    <div className="text-gray-500 mt-1 hidden sm:block">
                      {item.id === 1 ? "Установка на объекте" :
                       item.id === 2 ? "Готовые перила" :
                       item.id === 3 ? "Монтаж на фасад" :
                       item.id === 4 ? "Установка автоматики" :
                       item.id === 5 ? "Установка на окна" : "Монтаж конструкции"}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-3">
                  <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-500"></div>
                  <svg className="w-3 h-3 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                  <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            <div className="aspect-video rounded-2xl relative overflow-hidden">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVcJtA-ACnnL8hZ26ppuTdQ0of7T-v30ef1RxDfqBjhGeSxND3KT9VgzmXg4iznJPPS_-4zSLPcFJ9l-9nnKI1B52n7Pil7bE&s&ec=121644734seed/officecase/800/450" 
                alt="Защита окон офисного здания" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
                <span className="text-sm font-medium text-orange-300">Кейс-стади</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Защита окон офисного здания</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Заказчику требовалась защита окон офиса на первом этаже с сохранением эстетичного вида фасада. 
                Мы спроектировали решётки, усилили сварные швы, подобрали цвет по фасаду и покрыли порошковой краской, 
                устойчивой к царапинам.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-2xl font-bold text-orange-400">24</div>
                  <div className="text-xs text-gray-400">решётки</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">5 дней</div>
                  <div className="text-xs text-gray-400">срок работ</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">20 лет</div>
                  <div className="text-xs text-gray-400">гарантия</div>
                </div>
              </div>
              
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/25">
                Подробнее о проекте
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;