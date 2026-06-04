import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Реквизиты | Стиль Мастер',
  description: 'Реквизиты и контактная информация ИП Игнатьев Д.Ю.',
};

export default function CompanyDetailsPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Реквизиты компании</h1>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Шапка карточки */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <h2 className="text-2xl font-bold">Карточка предприятия</h2>
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            {/* Основная информация */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Полное наименование</h3>
                <p className="text-gray-900 font-medium">Индивидуальный предприниматель Игнатьев Дмитрий Юрьевич</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Сокращённое наименование</h3>
                <p className="text-gray-900 font-medium">ИП Игнатьев Д.Ю.</p>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Адреса */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Юридический адрес</h3>
                <p className="text-gray-900">624091, Свердловская область, г. Верхняя Пышма, СНТ &laquo;Ключи&raquo;, д. 36</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Фактический адрес</h3>
                <p className="text-gray-900">620098, г. Екатеринбург, ул. Восстания, д. 32 Б, оф. 8</p>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* ИНН / ОГРН */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">ИНН</h3>
                <p className="text-gray-900 font-mono text-lg">667306104565</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">ОГРНИП</h3>
                <p className="text-gray-900 font-mono text-lg">319665800156626</p>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Банковские реквизиты */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Банковские реквизиты</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Расчётный счёт</p>
                  <p className="text-gray-900 font-mono">40802810800001185635</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Корреспондентский счёт</p>
                  <p className="text-gray-900 font-mono">30101810145250000974</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">БИК</p>
                  <p className="text-gray-900 font-mono">044525974</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Банк</p>
                  <p className="text-gray-900">АО &laquo;ТБанк&raquo; г. Москва</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Контакты */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Контакты</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Телефон</p>
                  <a href="tel:+79122220241" className="text-orange-600 hover:text-orange-700 font-medium">8-912-22-20-241</a>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a href="mailto:dmn-ekb@yandex.ru" className="text-orange-600 hover:text-orange-700 font-medium">dmn-ekb@yandex.ru</a>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Директор</p>
                  <p className="text-gray-900">Игнатьев Дмитрий Юрьевич</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">НДС</p>
                  <p className="text-gray-900">Работаем с НДС 20%</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* ЭДО */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">ID для ЭДО (электронный документооборот)</h3>
              <p className="text-gray-900 font-mono text-sm break-all">2AEB718755B-5FA3-4034-84A0-38207BC332EA</p>
            </div>
          </div>
        </div>

        <div className="text-gray-500 text-sm mt-8">
          <p>Дата последнего обновления: июнь 2025 г.</p>
        </div>
      </div>
    </div>
  );
}