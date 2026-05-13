// Базовые стили для карусели
// Можно расширить с помощью Tailwind классов в компоненте

export const carouselStyles = {
  container: 'relative overflow-hidden',
  slidesContainer: 'flex transition-transform duration-500 ease-in-out',
  slide: 'flex-shrink-0',
  navigationButton:
    'absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-500 hover:border-orange-300 transition-colors z-10',
  navigationButtonPrev: 'left-4',
  navigationButtonNext: 'right-4',
  indicatorsContainer: 'flex justify-center gap-2 mt-8',
  indicator:
    'w-2 h-2 rounded-full transition-all bg-gray-300 hover:bg-gray-400 cursor-pointer',
  indicatorActive: 'w-8 bg-orange-500',
};