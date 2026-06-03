'use client';

import React, { useMemo, useEffect } from 'react';
import Image from 'next/image';
import { usePortfolioFilter as usePortfolioFilterHook } from '@/app/hooks/usePortfolioFilter';
import { usePortfolioFilter as usePortfolioFilterContext, PortfolioFilter } from '@/app/context/FilterContext';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';

const Portfolio = () => {
  const portfolioItems = useMemo(
    () => [
      {
        id: 1,
        title: "Антивандальные решётки для офиса Мегафон",
        description: "Проект под ключ: усиленная сварка, порошковая покраска, антивандальное покрытие, монтаж на объекте.",
        image: "/images/megofon.jpg",
        tags: ["Сварка", "Покраска", "Монтаж"],
        category: "Решётки",
        hasRealPhoto: true
      },
      {
        id: 2,
        title: "Антивандальная решетка в частный дом",
        description: "Решетка из нержавеющей стали с порошковым покрытием.",
        image: "/images/armature.jpeg",
        tags: ["Сварка", "Покраска", "Монтаж"],
        category: "Решётки"
      },
      {
        id: 3,
        title: "Покраска рамы мотоцикла",
        description: "Пескоструйная очистка, порошковая покраска рамы в зеленый RAL6038.",
        image: "/images/motocycle.jpeg",
        tags: ["Покраска"],
        category: "Покраска"
      },
      {
        id: 4,
        title: "Транспортная система для печи",  // ← новое название
        description: "Рольганговая транспортная система для подачи заготовок в промышленную печь. Полный цикл: проектирование, сварка, порошковая покраска, монтаж и пусконаладка.",
        image: "/images/metal.jpg",
        tags: ["Сварка", "Покраска", "Монтаж"],  // ← добавлен монтаж
        category: "Металлоконструкции"
      },
      {
        id: 5,
        title: "Основание стола",
        description: "Декоративное подстолье по чертежам заказчика.",
        image: "/images/table.jpeg",
        tags: ["Сварка", "Покраска"],
        category: "Металлоконструкции",
      },
      {
        id: 6,
        title: "Покраска дисков",
        description: "Отчистка накладок на диски машины с последующей порошковой покраской",
        image: "/images/disk.jpeg",
        tags: ["Покраска"],  // ← убрал сварку (диски только красят)
        category: "Покраска",
      },
    ],
    []
  );

  // Все фото для модалки (карусель)
  const modalImages = [
    '/images/case_main.jpeg',
    '/images/case_build.jpeg',
    '/images/case_dev.jpeg',
    '/images/case_paint_before.jpg',
    '/images/case_paint_after.jpg',
  ];

  const {
    filteredItems,
    activeCategory,
    setActiveCategory,
    availableCategories,
    resetFilter,
    isCategoryActive,
  } = usePortfolioFilterHook({
    items: portfolioItems,
    initialCategory: 'all',
    getCategory: (item) => item.category,
    categories: [
      { id: 'all', label: 'Все работы' },
      { id: 'Решётки', label: 'Решётки' },
      { id: 'Покраска', label: 'Покраска' },
      { id: 'Металлоконструкции', label: 'Металлоконструкции' },
    ],
  });

  const { setFilter } = usePortfolioFilterContext();
  const { openModal } = useModal();

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilter('all');
    } else {
      setFilter(activeCategory as PortfolioFilter);
    }
  }, [activeCategory, setFilter]);

  const handleProjectDetailsClick = () => {
    openModal('project-details', {
      projectId: '8',
      projectName: 'Металлоконструкции с порошковой покраской',
      projectDescription: 'Заказчик обратился по техническому заданию на изготовление металлоконструкций с последующей порошковой покраской. Мы выполнили полный цикл: изготовление по чертежам, пескоструйную подготовку, окрашивание в RAL 9005 и RAL 1018, финальную упаковку и отгрузку. Весь процесс задокументирован на фото.',
      projectImages: modalImages,
      projectFeatures: [
        'Полный цикл: изготовление → пескоструй → порошковая покраска',
        'Упаковка и подготовка к отгрузке',
        'Фотофиксация каждого этапа',
        'Работа по ТЗ заказчика',
        'Цвет покраски: травяной зелёный RAL 6005'
      ],
      projectPrice: 'по запросу',
      projectTimeline: 'от 7 дней',
    });
  };

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
          {availableCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() =>
                category.id === 'all'
                  ? resetFilter()
                  : setActiveCategory(category.id)
              }
              variant={isCategoryActive(category.id) ? 'primary' : 'outline'}
              size="sm"
              className="rounded-full !ring-0 !outline-none"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title + ' — пример работ по металлообработке от компании Стиль Мастер'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                      {item.id === 1 ? "Отсутствие защиты" :
                       item.id === 2 ? "Пустой проем" :
                       item.id === 3 ? "Ржавчина на раме" :
                       item.id === 4 ? "Ручная подача заготовок" :  // ← изменено
                       item.id === 5 ? "Эскиз и замеры" : "Обычные диски"}
                    </div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="font-semibold text-gray-400">Процесс</div>
                    <div className="text-gray-500 mt-1 hidden sm:block">
                      {item.id === 1 ? "Изготовление решетки" :
                       item.id === 2 ? "Изготовление и монтаж" :
                       item.id === 3 ? "Очистка и покраска" :
                       item.id === 4 ? "Проектирование, сварка, покраска, монтаж" :  // ← изменено
                       item.id === 5 ? "Изготовление и покраска" : "Очистка и покраска"}
                    </div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="font-semibold text-orange-500">Результат</div>
                    <div className="text-gray-500 mt-1 hidden sm:block">
                      {item.id === 1 ? "Монтаж в офис Мегафон" :
                       item.id === 2 ? "Готовый элемент здания" :
                       item.id === 3 ? "Красивая рама" :
                       item.id === 4 ? "Автоматизированная подача в печь" :  // ← изменено
                       item.id === 5 ? "Готовое подстолье" : "Красивые диски"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-500"></div>
                  <svg className="w-3 h-3 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                  <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Кейс-стади (без изменений) */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            <div className="aspect-video rounded-2xl overflow-hidden relative">
              <Image
                src="/images/case_main.jpeg"
                alt="Готовые металлоконструкции после порошковой покраски — пример работы Стиль Мастер"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
                <span className="text-sm font-medium text-orange-300">Кейс-стади</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Металлоконструкции под заказ</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Заказчик обратился по ТЗ на изготовление металлоконструкций с порошковой покраской.
                Полный цикл: изготовление, пескоструй, покраска (травяной зелёный RAL 6005), упаковка и отгрузка.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div><div className="text-2xl font-bold text-orange-400">1 партия</div><div className="text-xs text-gray-400">металлоконструкций</div></div>
                <div><div className="text-2xl font-bold text-orange-400">7 дней</div><div className="text-xs text-gray-400">срок работ</div></div>
                <div><div className="text-2xl font-bold text-orange-400">1 год</div><div className="text-xs text-gray-400">гарантия</div></div>
              </div>
              <Button onClick={handleProjectDetailsClick} variant="primary" size="lg" rounded="md">Подробнее о проекте</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;