'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { useMobileMenu } from '@/app/context/UIContext';
import { SECTION_IDS } from '@/app/constants/sections';
import { Button } from '@/app/components/ui/Button/Button';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { openModal } = useModal();
  const { toggleMobileMenu, isMobileMenuOpen } = useMobileMenu();

  const handleCallbackClick = () => {
    openModal('callback');
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#" className="flex items-center gap-3">
              <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                <img src="/logo.svg" alt="Логотип Стиль Мастер" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-gray-900">Стиль Мастер</div>
                <div className="text-xs text-gray-600">Производство металлоизделий</div>
              </div>
            </a>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href={`#${SECTION_IDS.SERVICES}`}
                onClick={(e) => handleNavLinkClick(e, SECTION_IDS.SERVICES)}
                className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800"
              >
                Услуги
              </a>
              <a
                href={`#${SECTION_IDS.ADVANTAGES}`}
                onClick={(e) => handleNavLinkClick(e, SECTION_IDS.ADVANTAGES)}
                className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800"
              >
                Преимущества
              </a>
              <a
                href={`#${SECTION_IDS.PORTFOLIO}`}
                onClick={(e) => handleNavLinkClick(e, SECTION_IDS.PORTFOLIO)}
                className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800"
              >
                Портфолио
              </a>
              <a
                href={`#${SECTION_IDS.PRICING}`}
                onClick={(e) => handleNavLinkClick(e, SECTION_IDS.PRICING)}
                className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800"
              >
                Цены
              </a>
              <a
                href={`#${SECTION_IDS.CONTACTS}`}
                onClick={(e) => handleNavLinkClick(e, SECTION_IDS.CONTACTS)}
                className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-800"
              >
                Контакты
              </a>
            </nav>
            
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+79122220241" className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-orange-500 transition-colors">
                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                +7 (912) 222-02-41
              </a>
              <Button
                onClick={handleCallbackClick}
                variant="primary"
                size="sm"
                rounded="md"
              >
                Заказать звонок
              </Button>
            </div>
            
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18M3 6h18M3 18h18"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
};

export default Header;