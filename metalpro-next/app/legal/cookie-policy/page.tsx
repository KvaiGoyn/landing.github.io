import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика использования файлов cookie | Стиль Мастер',
  description: 'Политика использования файлов cookie на сайте Стиль Мастер',
};

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Политика использования файлов cookie</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Настоящая Политика использования файлов cookie объясняет, что такое файлы cookie, как мы их используем на сайте Стиль Мастер и как вы можете управлять своими предпочтениями.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Что такое файлы cookie?</h2>
            <p className="mb-4">
              Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, планшете, смартфоне) при посещении веб-сайтов. Они помогают сайту запоминать информацию о вашем посещении, что делает последующие посещения более удобными.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Какие типы cookie мы используем?</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-2">2.1. Необходимые cookie</h3>
            <p className="mb-4">
              Эти файлы cookie необходимы для работы сайта и не могут быть отключены. Они обычно устанавливаются в ответ на ваши действия, такие как вход в систему или заполнение форм.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2">2.2. Аналитические cookie</h3>
            <p className="mb-4">
              Эти файлы cookie позволяют нам подсчитывать посещения и источники трафика, чтобы мы могли измерять и улучшать производительность нашего сайта. Они помогают нам узнать, какие страницы наиболее и наименее популярны, и увидеть, как посетители перемещаются по сайту.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2">2.3. Функциональные cookie</h3>
            <p className="mb-4">
              Эти файлы cookie позволяют сайту предоставлять расширенные функциональные возможности и персонализацию. Они могут быть установлены нами или сторонними поставщиками, чьи услуги мы добавили на наши страницы.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2">2.4. Маркетинговые cookie</h3>
            <p className="mb-4">
              Эти файлы cookie могут быть установлены через наш сайт нашими партнерами по рекламе. Они могут использоваться для создания профиля ваших интересов и показа релевантной рекламы на других сайтах.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Как мы используем cookie?</h2>
            <p className="mb-4">
              Мы используем файлы cookie для следующих целей:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Обеспечение корректной работы сайта</li>
              <li>Запоминание ваших предпочтений (например, языка)</li>
              <li>Анализ использования сайта для его улучшения</li>
              <li>Предоставление персонализированного контента</li>
              <li>Обеспечение безопасности сайта</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Управление cookie</h2>
            <p className="mb-4">
              Вы можете управлять файлами cookie через настройки своего браузера. Большинство браузеров позволяют:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Просматривать, какие файлы cookie установлены</li>
              <li>Удалять отдельные файлы cookie или все файлы cookie</li>
              <li>Блокировать установку файлов cookie</li>
              <li>Блокировать файлы cookie третьих сторон</li>
            </ul>
            <p className="mb-4">
              Обратите внимание, что отключение файлов cookie может повлиять на функциональность сайта, и некоторые функции могут быть недоступны.
            </p>
            <p>
              Для получения подробной информации о том, как управлять файлами cookie в вашем браузере, обратитесь к документации производителя браузера.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Сторонние cookie</h2>
            <p className="mb-4">
              На нашем сайте могут использоваться службы третьих сторон, которые также используют файлы cookie. К ним относятся:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Сервисы аналитики (например, Google Analytics)</li>
              <li>Сервисы видеохостинга (например, YouTube)</li>
              <li>Социальные платформы (например, Facebook, Instagram)</li>
            </ul>
            <p>
              Мы не контролируем файлы cookie, которые используют эти третьи стороны. Для получения дополнительной информации о том, как они используют файлы cookie, ознакомьтесь с их политиками конфиденциальности.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Изменения в Политике cookie</h2>
            <p className="mb-4">
              Мы можем периодически обновлять эту Политику использования файлов cookie. Любые изменения будут опубликованы на этой странице с указанием даты последнего обновления.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Контактная информация</h2>
            <p className="mb-4">
              Если у вас есть вопросы относительно нашей Политики использования файлов cookie, пожалуйста, свяжитесь с нами:
            </p>
            <p>
              Электронная почта: <strong>info@stil-master.ru</strong>
            </p>
          </section>

          <div className="text-gray-500 text-sm mt-12">
            <p>Дата последнего обновления: 21 мая 2025 г.</p>
          </div>
        </div>
      </div>
    </div>
  );
}