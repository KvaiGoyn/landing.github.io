'use client';

import React, { useEffect } from 'react';
import { useMobileMenu } from '@/app/context/UIContext';
import { useNavigationScroll } from '@/app/hooks/useScrollTo';
import { SECTION_IDS } from '@/app/constants/sections';
import { Button } from '@/app/components/ui/Button/Button';
import { useModal } from '@/app/context/ModalContext';

const MobileMenu = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useMobileMenu();
  const { handleNavClick } = useNavigationScroll();
  const { openModal } = useModal();

  // Закрытие меню при нажатии Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    handleNavClick(e, sectionId);
    closeMobileMenu();
  };

  const handleCallbackClick = () => {
    openModal('callback');
    closeMobileMenu();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeMobileMenu();
    }
  };

  return (
    <>
      {/* Оверлей с анимацией */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      
      {/* Мобильное меню */}
      <div
        className={`lg:hidden fixed top-16 left-0 right-0 z-50 bg-white shadow-xl rounded-b-2xl mx-4 transition-all duration-300 transform ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col space-y-3">
            <a 
              href={`#${SECTION_IDS.SERVICES}`} 
              onClick={(e) => handleNavLinkClick(e, SECTION_IDS.SERVICES)}
              className="text-lg font-medium transition-all hover:text-orange-500 text-gray-800 py-3 px-4 rounded-lg hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500"
            >
              Услуги
            </a>
            <a 
              href={`#${SECTION_IDS.ADVANTAGES}`} 
              onClick={(e) => handleNavLinkClick(e, SECTION_IDS.ADVANTAGES)}
              className="text-lg font-medium transition-all hover:text-orange-500 text-gray-800 py-3 px-4 rounded-lg hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500"
            >
              Преимущества
            </a>
            <a 
              href={`#${SECTION_IDS.PORTFOLIO}`} 
              onClick={(e) => handleNavLinkClick(e, SECTION_IDS.PORTFOLIO)}
              className="text-lg font-medium transition-all hover:text-orange-500 text-gray-800 py-3 px-4 rounded-lg hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500"
            >
              Портфолио
            </a>
            <a 
              href={`#${SECTION_IDS.PRICING}`} 
              onClick={(e) => handleNavLinkClick(e, SECTION_IDS.PRICING)}
              className="text-lg font-medium transition-all hover:text-orange-500 text-gray-800 py-3 px-4 rounded-lg hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500"
            >
              Цены
            </a>
            <a 
              href={`#${SECTION_IDS.CONTACTS}`} 
              onClick={(e) => handleNavLinkClick(e, SECTION_IDS.CONTACTS)}
              className="text-lg font-medium transition-all hover:text-orange-500 text-gray-800 py-3 px-4 rounded-lg hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500"
            >
              Контакты
            </a>
          </nav>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <a
              href="tel:+79122220241"
              className="flex items-center gap-3 text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors mb-4 py-3 px-4 rounded-lg hover:bg-orange-50"
            >
              <svg className="w-5 h-5 text-orange-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+7 (912) 222-02-41</span>
            </a>
            <Button
              onClick={handleCallbackClick}
              variant="primary"
              size="md"
              rounded="lg"
              className="w-full py-3 text-base font-medium shadow-md hover:shadow-lg transition-shadow"
            >
              Заказать звонок
            </Button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <button
              onClick={closeMobileMenu}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Закрыть меню"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;