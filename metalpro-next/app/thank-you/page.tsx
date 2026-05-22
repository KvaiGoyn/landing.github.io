import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Спасибо за заявку!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Ваша заявка успешно отправлена. Наш менеджер свяжется с вами в ближайшее время
          для уточнения деталей и ответа на ваши вопросы.
        </p>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-left">
            <h3 className="font-medium text-blue-800 mb-2">Что дальше?</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Мы перезвоним вам в течение 15 минут в рабочее время</li>
              <li>• Подготовим расчёт стоимости по вашим требованиям</li>
              <li>• Ответим на все вопросы по услугам и срокам</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-500">
            Если у вас срочный вопрос, звоните прямо сейчас:
            <a
              href="tel:+79991234567"
              className="block text-orange-600 font-semibold text-lg mt-1 hover:text-orange-700"
            >
              +7 (999) 123-45-67
            </a>
          </p>
        </div>
        
        <div className="mt-8 space-y-3">
          <Link
            href="/"
            className="block w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg transition-all duration-200 text-center shadow-xl shadow-orange-500/25"
          >
            Вернуться на главную
          </Link>
          
          <Link
            href="/#services"
            className="block w-full px-6 py-3 text-lg font-medium text-orange-600 border border-orange-600 hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg transition-all duration-200 text-center"
          >
            Посмотреть услуги
          </Link>
        </div>
        
        <p className="text-xs text-gray-400 mt-8">
          Лендинг «Стиль Мастер» — профессиональные металлоконструкции любой сложности
        </p>
      </div>
    </div>
  );
}