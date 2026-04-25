import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-orange-500 font-bold text-xl lg:text-2xl">М</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-gray-900">МеталлПро</div>
              <div className="text-xs text-gray-600">Производство металлоизделий</div>
            </div>
          </a>
          
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800">Услуги</a>
            <a href="#advantages" className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800">Преимущества</a>
            <a href="#portfolio" className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800">Портфолио</a>
            <a href="#pricing" className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800">Цены</a>
            <a href="#contacts" className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800">Контакты</a>
          </nav>
          
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+78001234567" className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-orange-500 transition-colors">
              <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              8 (800) 123-45-67
            </a>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25">
              Заказать звонок
            </button>
          </div>
          
          <button className="lg:hidden p-2 text-gray-700">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;