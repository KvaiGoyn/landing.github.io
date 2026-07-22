'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

const COOKIE_CONSENT_KEY = 'cookie_consent';

const CookieBanner: React.FC = () => {
  const [consent, setConsent] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
    setIsReady(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setConsent('accepted');
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setConsent('rejected');
  };

  return (
    <>
      {consent === 'accepted' && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j=0;j<document.scripts.length;j++) if (document.scripts[j].src===r) return;
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
            })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=110576597','ym');
            ym(110576597,'init',{ssr:true,webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});
          `}
        </Script>
      )}

      {isReady && consent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4" role="region" aria-label="Настройки cookie">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 text-sm text-gray-700">
              <p>
                Мы используем аналитические cookie только с вашего согласия. Подробнее в{' '}
                <a href="/legal/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:text-orange-800 underline">
                  Политике использования cookie
                </a>{' '}
                и{' '}
                <a href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:text-orange-800 underline">
                  Политике конфиденциальности
                </a>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleReject}
                className="whitespace-nowrap px-6 py-2.5 border border-gray-400 text-gray-800 font-medium rounded-lg hover:bg-gray-100 text-sm"
              >
                Отклонить
              </button>
              <button
                onClick={handleAccept}
                className="whitespace-nowrap px-6 py-2.5 bg-orange-700 text-white font-medium rounded-lg hover:bg-orange-800 text-sm"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
