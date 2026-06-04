'use client';

import React, { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'cookie_consent';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-700">
          <p>
            Мы используем файлы cookie для улучшения работы сайта. Продолжая использование сайта, вы соглашаетесь с{' '}
            <a href="/legal/cookie-policy" target="_blank" className="text-orange-600 hover:text-orange-700 underline">
              Политикой использования cookie
            </a>{' '}
            и{' '}
            <a href="/legal/privacy-policy" target="_blank" className="text-orange-600 hover:text-orange-700 underline">
              Политикой конфиденциальности
            </a>.
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="whitespace-nowrap px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-orange-500/25 text-sm"
        >
          Принять
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;