'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Carousel, CarouselSlide } from '@/app/components/ui/Carousel';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

type PaddedTestimonial = (Testimonial & { isEmpty?: boolean }) | { isEmpty: true };

// Компонент-заглушка для аватара
const AvatarPlaceholder = ({ name }: { name: string }) => (
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
    {name.charAt(0)}
  </div>
);

// Карточка отзыва
const TestimonialCard = ({
  testimonial,
  isActive = false,
}: {
  testimonial: PaddedTestimonial;
  isActive?: boolean;
}) => {
  if ('isEmpty' in testimonial && testimonial.isEmpty) {
    return <div className="bg-transparent p-6 h-full invisible" aria-hidden="true" />;
  }

  // После проверки TypeScript знает, что testimonial имеет свойства Testimonial
  const t = testimonial as Testimonial;

  return (
    <div
      className={`
        bg-white rounded-2xl border transition-all duration-500 p-6 h-full flex flex-col
        ${
          isActive
            ? 'border-orange-200 shadow-xl shadow-orange-100/50 scale-105 z-10'
            : 'border-gray-100 opacity-60 scale-95'
        }
      `}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < t.rating ? 'text-yellow-400' : 'text-gray-200'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed mb-6 text-sm flex-grow">
        “{t.text}”
      </p>

      <div className="flex items-center gap-3">
        {t.avatar ? (
          <img
            src={t.avatar}
            alt={t.name}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.fallback-avatar')) {
                const fallback = document.createElement('div');
                fallback.className = 'fallback-avatar';
                fallback.textContent = t.name.charAt(0);
                fallback.classList.add(
                  'w-12',
                  'h-12',
                  'rounded-full',
                  'bg-gradient-to-br',
                  'from-orange-400',
                  'to-orange-600',
                  'flex',
                  'items-center',
                  'justify-center',
                  'text-white',
                  'font-bold',
                  'text-lg'
                );
                parent.appendChild(fallback);
              }
            }}
          />
        ) : (
          <AvatarPlaceholder name={t.name} />
        )}
        <div>
          <div className="font-semibold text-gray-900">{t.name}</div>
          <div className="text-sm text-gray-500">{t.role}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [desktopFirstIndex, setDesktopFirstIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true); // для паузы при наведении

  // Обновлённые отзывы: разные рейтинги (4 или 5), разная длина текста
  const testimonials = [
    {
      id: 1,
      name: 'Александр Петров',
      role: 'Частный заказчик',
      avatar: '/images/placeholder_image.jpg',
      text: 'Заказывал решётки на окна и ворота для дачи. Сделали всё за неделю! Качество сварки отличное, покраска ровная. Ребята приехали на замер в тот же день. Рекомендую!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Елена Смирнова',
      role: 'Владелец коттеджа',
      avatar: '/images/placeholder_image.jpg',
      text: 'Муж хотел сам сварить лестницу, но я уговорила заказать у профессионалов. Лестница — просто мечта: надёжная, красивая, покрашена идеально. Спасибо за терпение!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      role: 'Директор офиса',
      avatar: '/images/placeholder_image.jpg',
      text: 'Нужно было защитить окна офиса на первом этаже. Предложили дизайн, который не портит фасад, и антивандальное покрытие. Уже год — никаких нареканий. В целом доволен, но монтаж затянули на два дня.',
      rating: 4,
    },
    {
      id: 4,
      name: 'Алексей',
      role: 'Частный заказчик',
      avatar: '/images/placeholder_image.jpg',
      text: 'Отдал ржавые диски на покраску. Сделали пескоструй, обезжирили, покрасили чёрным глянцем. Прислали фото до/после. Каждый диск упаковали в плёнку и мягкие уголки. Всё ровно, без косяков. Через месяц полёт нормальный. Отличная работа!',
      rating: 5,
    },
    {
      id: 5,
      name: 'Светлана',
      role: 'Частный заказчик',
      avatar: '/images/placeholder_image.jpg',
      text: 'Привезла старые стеллажи — ржавые, краска потрескалась. Восстановили: всё зачистили, обезжирили, покрасили белый глянец. Упаковали аккуратно, каждую деталь. По деньгам не обманули, выглядит как новое. Спасибо!',
      rating: 5,
    },
    {
      id: 6,
      name: 'Игорь',
      role: 'Частный заказчик',
      avatar: '/images/placeholder_image.jpg',
      text: 'Заказал решётки на окна. Замерщик нормальный, лишнего не навязывал. Сварили каркас, покрасили в шоколад. Монтаж аккуратный. Решётки ходят мягко, зазоров нет. Пока доволен, но один угол чуть кривой — не критично.',
      rating: 4,
    },
    {
      id: 7,
      name: 'Денис',
      role: 'Частный заказчик',
      avatar: '/images/placeholder_image.jpg',
      text: 'Нужны были ворота. Сделали из профтрубы, зачистили швы, покрасили порошком RAL 7024. Фактура ровная, матовая. Упаковка — стрейч, уголки. Навесил сам, размеры чёткие. Без обмана, рекомендую.',
      rating: 5,
    },
    {
      id: 8,
      name: 'Пётр',
      role: 'Частный заказчик',
      avatar: '/images/placeholder_image.jpg',
      text: 'Привёз ржавые ворота с дачи. Отпескоструили, обезжирили, покрыли зелёным порошком. Краска легла ровно, без подтёков. Упаковали, загрузили. Год стоят — ни одной ржавой точки. Отличная работа, буду обращаться ещё.',
      rating: 5,
    },
    {
      id: 9,
      name: 'Марина',
      role: 'Дизайнер интерьера',
      avatar: '/images/placeholder_image.jpg',
      text: 'По моему эскизу сварили перегородку. Швы зачищены, покраска порошком в красно-коричневый, фактура шагрень. Прислали фото процесса. Упаковка основательная. Клиент принял без замечаний. Цена финальная по договору. Очень довольна сотрудничеством!',
      rating: 5,
    },
    {
      id: 10,
      name: 'Николай',
      role: 'Владелец коммерческого транспорта',
      avatar: '/images/placeholder_image.jpg',
      text: 'Красил раму от Газели — ржавчина была сильная. Всё разобрали, отпескоструили, обезжирили, покрыли чёрным матовым. Даже в трудных местах ровно. Детали упаковали, подписали. Стало лучше нового. Спасибо бригаде за терпение.',
      rating: 5,
    },
    {
      id: 11,
      name: 'Олег',
      role: 'Частный заказчик',
      avatar: '/images/placeholder_image.jpg',
      text: 'Заказал металлическую лестницу. Сделали быстро, но один пролёт немного гуляет. Приехали на следующий день, переварили. Стало отлично. За качество покраски твёрдая 4, сварка хорошая.',
      rating: 4,
    },
    {
      id: 12,
      name: 'Татьяна',
      role: 'Владелец кафе',
      avatar: '/images/placeholder_image.jpg',
      text: 'Делали антивандальные решётки на окна кафе. Работа выполнена аккуратно, в срок. Отдельное спасибо за то, что подобрали цвет в тон фасаду. Решётки прочные, замки надёжные. Рекомендую!',
      rating: 5,
    },
  ];

  // Добавляем пустые слайды-заглушки по бокам для десктопной карусели (по одному с каждой стороны)
  const paddedTestimonials: PaddedTestimonial[] = [
    { isEmpty: true } as PaddedTestimonial,
    ...testimonials,
    { isEmpty: true } as PaddedTestimonial,
  ];

  // Для десктопа центральный слайд имеет индекс = первый_видимый + 1
  const centerIndex = desktopFirstIndex + 1;

  // Настройки автопрокрутки (пауза при наведении на контейнер карусели)
  const desktopCarouselRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  // Для десктопа автопрокрутка активна, если isAutoPlayActive = true
  // Саму автопрокрутку обеспечивает Carousel через проп autoPlayInterval
  // Пауза при наведении реализована через обработчики мыши, которые переключают состояние,
  // но Carousel должен реагировать на изменение autoPlayInterval динамически.
  // Если Carousel не обновляет интервал, можно использовать этот трюк:
  // принудительно пересоздавать карусель, но лучше довериться реализации Carousel.
  // Предположим, что Carousel смотрит на autoPlayInterval и перезапускается при его изменении.
  // Для гарантии - используем ключ (key), который заставит перемонтироваться при изменении паузы.
  const [desktopKey, setDesktopKey] = useState(0);
  const [mobileKey, setMobileKey] = useState(0);

  const handleDesktopMouseEnter = () => {
    setIsAutoPlayActive(false);
    setDesktopKey(prev => prev + 1);
  };
  const handleDesktopMouseLeave = () => {
    setIsAutoPlayActive(true);
    setDesktopKey(prev => prev + 1);
  };
  const handleMobileMouseEnter = () => {
    setIsAutoPlayActive(false);
    setMobileKey(prev => prev + 1);
  };
  const handleMobileMouseLeave = () => {
    setIsAutoPlayActive(true);
    setMobileKey(prev => prev + 1);
  };

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-medium text-orange-700">Отзывы клиентов</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Нам доверяют <span className="gradient-text">более 800 клиентов</span>
          </h2>
          <p className="text-lg text-gray-600">
            Реальные отзывы от наших заказчиков — частных лиц и компаний
          </p>
        </div>

        {/* Десктопная карусель с автопрокруткой и паузой при наведении */}
        <div
          ref={desktopCarouselRef}
          onMouseEnter={handleDesktopMouseEnter}
          onMouseLeave={handleDesktopMouseLeave}
          className="hidden lg:block"
        >
          <Carousel
            key={desktopKey}
            visibleSlides={3}
            autoPlayInterval={isAutoPlayActive ? 4000 : 0}
            loop={true}
            showNavigation={true}
            showIndicators={true}
            initialIndex={1}
            onSlideChange={setDesktopFirstIndex}
          >
            {paddedTestimonials.map((testimonial, idx) => (
              <CarouselSlide key={idx}>
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={idx === centerIndex && !('isEmpty' in testimonial && testimonial.isEmpty)}
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </div>

        {/* Мобильная карусель с автопрокруткой (опционально) */}
        <div
          ref={mobileCarouselRef}
          onMouseEnter={handleMobileMouseEnter}
          onMouseLeave={handleMobileMouseLeave}
          className="lg:hidden"
        >
          <Carousel
            key={mobileKey}
            visibleSlides={1}
            autoPlayInterval={isAutoPlayActive ? 4000 : 0}
            loop={true}
            showNavigation={true}
            showIndicators={true}
            initialIndex={0}
            onSlideChange={setMobileIndex}
          >
            {testimonials.map((testimonial) => (
              <CarouselSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} isActive={true} />
              </CarouselSlide>
            ))}
          </Carousel>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-100">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">4.9</div>
            <div className="flex justify-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-gray-500">Средняя оценка</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">500+</div>
            <div className="text-sm text-gray-500">Отзывов от довольных клиентов</div>
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