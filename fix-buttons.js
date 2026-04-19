// Исправление неработающих кнопок на сайте МеталлПро
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fix buttons script loaded');

    // Вспомогательная функция для поиска элементов по тексту
    function findElementsByText(selector, text) {
        const elements = document.querySelectorAll(selector);
        return Array.from(elements).filter(el => 
            el.textContent.trim().includes(text)
        );
    }

    // 1. Обработка навигационных ссылок с якорями
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('Якорная ссылка кликнута:', href);
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                console.log('Прокрутка к элементу:', targetId);
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Обновляем URL без перезагрузки
                history.pushState(null, null, href);
            } else {
                console.warn('Элемент с id', targetId, 'не найден');
            }
        });
    });

    // 2. Обработка кнопок "Рассчитать стоимость", "Заказать звонок", "Получить консультацию" и т.д.
    // Эти кнопки должны прокручивать к форме контактов (секция #contacts)
    const contactButtons = [
        'Рассчитать стоимость',
        'Заказать звонок',
        'Получить консультацию',
        'Заказать расчёт',
        'Вызвать замерщика бесплатно',
        'Отправить заявку',
        'Смотреть портфолио',
        'Подробнее',
        'Смотреть все кейсы',
        'Задать вопрос'
    ];
    
    contactButtons.forEach(buttonText => {
        findElementsByText('button', buttonText).forEach(button => {
            button.addEventListener('click', function() {
                const contactsSection = document.getElementById('contacts');
                if (contactsSection) {
                    contactsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Если секции контактов нет, просто показываем сообщение
                    alert('Форма заявки будет доступна после прокрутки к разделу "Контакты".');
                }
            });
        });
    });

    // 3. Обработка кнопок фильтров портфолио
    const portfolioFilters = ['Все работы', 'Решётки', 'Перила и лестницы', 'Козырьки и навесы', 'Ворота и заборы'];
    portfolioFilters.forEach(filterText => {
        findElementsByText('button', filterText).forEach(button => {
            button.addEventListener('click', function() {
                // Просто добавляем активный класс для визуальной обратной связи
                document.querySelectorAll('.portfolio-filter button').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // Здесь можно добавить фильтрацию карточек портфолио
                alert('Фильтрация портфолио будет реализована в полной версии.');
            });
        });
    });

    // 4. Обработка кнопок "Подробнее" в услугах
    findElementsByText('button', 'Подробнее').forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            if (serviceCard) {
                const details = serviceCard.querySelector('.service-details');
                if (details) {
                    details.classList.toggle('hidden');
                    this.textContent = details.classList.contains('hidden') ? 'Подробнее' : 'Скрыть';
                }
            }
        });
    });

    // 5. Обработка формы заявки
    const submitButtons = findElementsByText('button', 'Отправить заявку');
    if (submitButtons.length > 0) {
        submitButtons.forEach(submitButton => {
            // Проверяем, что кнопка находится внутри формы (обычно так и есть)
            const form = submitButton.closest('form');
            if (!form) {
                console.warn('Кнопка "Отправить заявку" не находится внутри формы', submitButton);
                return;
            }
            submitButton.addEventListener('click', function(e) {
                console.log('Обработка отправки формы');
                e.preventDefault();
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                let valid = true;
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        valid = false;
                        input.style.borderColor = 'red';
                    } else {
                        input.style.borderColor = '';
                    }
                });
                
                if (valid) {
                    alert('Заявка успешно отправлена! Мы свяжемся с вами в течение 15 минут.');
                    form.reset();
                } else {
                    alert('Пожалуйста, заполните все обязательные поля.');
                }
            });
        });
    }

    // 6. Обработка аккордеона FAQ (Частые вопросы)
    // Поиск секции FAQ по заголовку
    const headings = Array.from(document.querySelectorAll('h2, h3')).filter(h =>
        h.textContent.includes('Частые вопросы') || h.textContent.includes('Ответы на популярные вопросы')
    );
    if (headings.length > 0) {
        const heading = headings[0];
        const section = heading.closest('section') || heading.parentElement;
        if (section) {
            // Находим все кнопки внутри этой секции, которые являются вопросами
            // Ограничимся кнопками, которые находятся внутри заголовков h3 (вопросы)
            const questionButtons = section.querySelectorAll('h3 button, h4 button');
            questionButtons.forEach(button => {
                // Проверяем, что кнопка не является частью навигации или других элементов
                if (button.textContent.length > 10 && !button.closest('nav')) {
                    button.addEventListener('click', function() {
                        // Переключаем атрибут aria-expanded
                        const expanded = this.getAttribute('aria-expanded') === 'true';
                        this.setAttribute('aria-expanded', !expanded);
                        // Ищем следующий элемент (ответ)
                        let answer = this.nextElementSibling;
                        // Если следующий элемент не div, ищем дальше
                        while (answer && !answer.classList.contains('answer') && answer.tagName !== 'DIV') {
                            answer = answer.nextElementSibling;
                        }
                        if (answer) {
                            answer.classList.toggle('hidden');
                            // Меняем иконку, если есть
                            const icon = this.querySelector('svg');
                            if (icon) {
                                icon.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
                            }
                        }
                    });
                }
            });
        }
    }

    console.log('Все обработчики кнопок установлены');
});