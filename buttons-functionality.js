/**
 * buttons-functionality.js
 * Полная функциональность для всех кнопок лендинга "МеталлПро"
 * Включает: плавную прокрутку, модальные окна, валидацию форм, визуальную обратную связь
 */

(function() {
    'use strict';

    // Конфигурация
    const CONFIG = {
        scrollDuration: 800,
        scrollOffset: 80, // Отступ от верха для фиксированного хедера
        modalAnimationDuration: 300,
        formSubmitDelay: 1500, // Имитация задержки отправки
        phoneMask: '+7 (___) ___-__-__'
    };

    // Состояние приложения
    const state = {
        activeModal: null,
        isSubmitting: false
    };

    // DOM элементы
    let elements = {};

    /**
     * Инициализация
     */
    function init() {
        console.log('Инициализация функциональности кнопок...');
        
        // Сбор элементов
        collectElements();
        
        // Настройка обработчиков
        setupEventListeners();
        
        // Инициализация масок телефона
        initPhoneMasks();
        
        // Инициализация модальных окон
        initModals();
        
        console.log('Функциональность кнопок готова!');
    }

    /**
     * Сбор основных DOM элементов
     */
    function collectElements() {
        // Навигационные ссылки (якорные ссылки и кнопки с data-scroll-to)
        elements.navLinks = document.querySelectorAll('a[href^="#"], [data-scroll-to]');
        
        // Кнопки вызова модальных окон (с атрибутами data-modal)
        elements.modalTriggers = document.querySelectorAll('[data-modal]');
        
        // Кнопки закрытия модальных окон
        elements.modalClosers = document.querySelectorAll('.modal-close, [data-close-modal]');
        
        // Формы
        elements.forms = document.querySelectorAll('form');
        
        // Кнопки отправки форм
        elements.submitButtons = document.querySelectorAll('button[type="submit"]');
        
        // Поля ввода телефона
        elements.phoneInputs = document.querySelectorAll('input[type="tel"]');
        
        // Основные модальные окна
        elements.modals = {
            callback: document.getElementById('modal-callback'),
            consultation: document.getElementById('modal-consultation'),
            calculation: document.getElementById('modal-calculation'),
            success: document.getElementById('modal-success')
        };
        
        // Если модальных окон нет в DOM, создадим их
        createModalStructures();
    }

    /**
     * Создание структуры модальных окон, если их нет в HTML
     */
    function createModalStructures() {
        // Проверяем наличие модального окна обратного звонка
        if (!elements.modals.callback) {
            const modal = document.createElement('div');
            modal.id = 'modal-callback';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-overlay" data-close-modal></div>
                <div class="modal-content">
                    <button class="modal-close" data-close-modal>&times;</button>
                    <h3>Заказать звонок</h3>
                    <p>Оставьте ваш номер телефона, и мы перезвоним вам в течение 15 минут</p>
                    <form id="callback-form">
                        <div class="form-group">
                            <input type="text" name="name" placeholder="Ваше имя" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required>
                        </div>
                        <div class="form-group">
                            <textarea name="message" placeholder="Комментарий (необязательно)" rows="3"></textarea>
                        </div>
                        <div class="form-group checkbox">
                            <label>
                                <input type="checkbox" name="privacy" required checked>
                                <span>Согласен с <a href="#">политикой конфиденциальности</a></span>
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary">Заказать звонок</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
            elements.modals.callback = modal;
        }
        
        // Аналогично для других модальных окон можно добавить при необходимости
    }

    /**
     * Настройка обработчиков событий
     */
    function setupEventListeners() {
        // Плавная прокрутка к якорям
        elements.navLinks.forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });

        // Открытие модальных окон
        elements.modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', handleModalOpen);
        });

        // Закрытие модальных окон
        elements.modalClosers.forEach(closer => {
            closer.addEventListener('click', handleModalClose);
        });

        // Закрытие по клику на оверлей
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                handleModalClose(e);
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.activeModal) {
                closeModal(state.activeModal);
            }
        });

        // Обработка отправки форм
        elements.forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });

        // Визуальная обратная связь для кнопок
        document.querySelectorAll('button, a.btn').forEach(button => {
            button.addEventListener('mousedown', addButtonPressEffect);
            button.addEventListener('mouseup', removeButtonPressEffect);
            button.addEventListener('mouseleave', removeButtonPressEffect);
        });

        // Инициализация кнопок фильтра портфолио
        initPortfolioFilters();
    }

    /**
     * Плавная прокрутка к якорю
     */
    function handleSmoothScroll(e) {
        e.preventDefault();
        
        // Определяем целевой идентификатор из href или data-scroll-to
        let targetId = this.getAttribute('href');
        let scrollToAttr = this.getAttribute('data-scroll-to');
        
        if (scrollToAttr) {
            targetId = '#' + scrollToAttr;
        }
        
        if (targetId === '#' || targetId === '' || !targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Добавляем активный класс для визуальной обратной связи
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 300);
        
        // Вычисляем позицию с учетом фиксированного хедера
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - CONFIG.scrollOffset;
        
        // Плавная прокрутка
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Обновляем URL без перезагрузки страницы (только для href, чтобы избежать дублирования #)
        if (this.hasAttribute('href') && targetId.startsWith('#')) {
            history.pushState(null, null, targetId);
        }
    }

    /**
     * Открытие модального окна
     */
    function handleModalOpen(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal') || 'callback';
        const modal = elements.modals[modalId] || elements.modals.callback;
        
        if (modal) {
            openModal(modal);
        }
    }

    /**
     * Закрытие модального окна
     */
    function handleModalClose(e) {
        if (e) e.preventDefault();
        if (state.activeModal) {
            closeModal(state.activeModal);
        }
    }

    /**
     * Открыть модальное окно
     */
    function openModal(modal) {
        if (state.activeModal) {
            closeModal(state.activeModal);
        }
        
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        state.activeModal = modal;
        
        // Фокус на первое поле ввода
        const input = modal.querySelector('input, textarea, select');
        if (input) input.focus();
    }

    /**
     * Закрыть модальное окно
     */
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        state.activeModal = null;
    }

    /**
     * Обработка отправки формы
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        
        // Проверяем валидацию
        if (!validateForm(form)) {
            showFormError(form, 'Пожалуйста, заполните все обязательные поля корректно');
            return;
        }
        
        // Блокируем повторную отправку
        if (state.isSubmitting) return;
        state.isSubmitting = true;
        
        // Показываем индикатор загрузки
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        // Собираем данные формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Отправка формы:', data);
        
        // Имитация отправки на сервер
        setTimeout(() => {
            // Сброс состояния
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            state.isSubmitting = false;
            
            // Показываем сообщение об успехе
            showFormSuccess(form);
            
            // Закрываем модальное окно, если форма в нем
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal);
                
                // Показываем окно успеха
                if (elements.modals.success) {
                    setTimeout(() => openModal(elements.modals.success), 500);
                }
            }
            
            // Очищаем форму
            form.reset();
            
            // Сбрасываем маску телефона
            const phoneInputs = form.querySelectorAll('input[type="tel"]');
            phoneInputs.forEach(input => applyPhoneMask(input));
            
        }, CONFIG.formSubmitDelay);
    }

    /**
     * Валидация формы
     */
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            // Проверка чекбокса
            if (field.type === 'checkbox' && !field.checked) {
                isValid = false;
                highlightFieldError(field);
            }
            // Проверка текстовых полей
            else if (field.type !== 'checkbox' && field.value.trim() === '') {
                isValid = false;
                highlightFieldError(field);
            }
            // Специальная валидация для телефона
            else if (field.type === 'tel' && !isValidPhone(field.value)) {
                isValid = false;
                highlightFieldError(field, 'Введите корректный номер телефона');
            }
            // Специальная валидация для email
            else if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                highlightFieldError(field, 'Введите корректный email');
            }
            else {
                clearFieldError(field);
            }
        });
        
        return isValid;
    }

    /**
     * Проверка валидности телефона
     */
    function isValidPhone(phone) {
        // Простая проверка: минимум 10 цифр
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 10;
    }

    /**
     * Проверка валидности email
     */
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Подсветка поля с ошибкой
     */
    function highlightFieldError(field, message = 'Это поле обязательно для заполнения') {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            
            // Добавляем сообщение об ошибке
            let errorElement = formGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = message;
        }
    }

    /**
     * Очистка ошибки поля
     */
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) errorElement.remove();
        }
    }

    /**
     * Показать ошибку формы
     */
    function showFormError(form, message) {
        // Создаем или находим элемент для ошибки
        let errorElement = form.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            form.prepend(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add('active');
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => {
            errorElement.classList.remove('active');
        }, 5000);
    }

    /**
     * Показать успешное сообщение формы
     */
    function showFormSuccess(form) {
        // Создаем элемент успеха
        const successElement = document.createElement('div');
        successElement.className = 'form-success';
        successElement.innerHTML = `
            <div class="success-icon">✓</div>
            <div class="success-message">
                <h4>Спасибо!</h4>
                <p>Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.</p>
            </div>
        `;
        
        // Вставляем перед формой
        form.parentNode.insertBefore(successElement, form);
        
        // Скрываем форму
        form.style.display = 'none';
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => {
            successElement.classList.add('fade-out');
            setTimeout(() => {
                successElement.remove();
                form.style.display = '';
            }, 500);
        }, 5000);
    }

    /**
     * Инициализация масок телефона
     */
    function initPhoneMasks() {
        elements.phoneInputs.forEach(input => {
            // Устанавливаем placeholder
            if (!input.placeholder) {
                input.placeholder = CONFIG.phoneMask;
            }
            
            // Обработчик ввода
            input.addEventListener('input', handlePhoneInput);
            input.addEventListener('focus', handlePhoneFocus);
            input.addEventListener('blur', handlePhoneBlur);
            
            // Применяем маску к текущему значению
            applyPhoneMask(input);
        });
    }

    /**
     * Обработчик ввода телефона
     */
    function handlePhoneInput(e) {
        applyPhoneMask(e.target);
    }

    /**
     * Обработчик фокуса на поле телефона
     */
    function handlePhoneFocus(e) {
        const input = e.target;
        if (!input.value) {
            input.value = '+7 (';
        }
    }

    /**
     * Обработчик потери фокуса поля телефона
     */
    function handlePhoneBlur(e) {
        const input = e.target;
        if (input.value === '+7 (') {
            input.value = '';
        }
    }

    /**
     * Применение маски телефона
     */
    function applyPhoneMask(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (!value.startsWith('7') && value.length > 0) {
            value = '7' + value;
        }
        
        let formattedValue = '+7 (';
        
        if (value.length > 1) {
            formattedValue += value.substring(1, 4);
        }
        if (value.length >= 4) {
            formattedValue += ') ' + value.substring(4, 7);
        }
        if (value.length >= 7) {
            formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length >= 9) {
            formattedValue += '-' + value.substring(9, 11);
        }
        
        input.value = formattedValue;
    }

    /**
     * Инициализация модальных окон
     */
    function initModals() {
        // Добавляем стили для модальных окон, если их нет
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = getModalStyles();
            document.head.appendChild(style);
        }
    }

    /**
     * Стили для модальных окон и форм
     */
    function getModalStyles() {
        return `
            /* Модальные окна */
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .modal.active {
                display: flex;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 12px;
                padding: 30px;
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .modal-close {
                position: absolute !important;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s;
            }
            
            .modal-close:hover {
                background: #f5f5f5;
            }
            
            .modal h3 {
                margin-top: 0;
                margin-bottom: 10px;
                color: #333;
            }
            
            .modal p {
                margin-bottom: 20px;
                color: #666;
            }
            
            /* Формы */
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #333;
            }
            
            .form-group input,
            .form-group textarea,
            .form-group select {
                width: 100%;
                padding: 12px 15px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 16px;
                box-sizing: border-box;
                transition: border 0.2s, box-shadow 0.2s;
            }
            
            .form-group input:focus,
            .form-group textarea:focus,
            .form-group select:focus {
                outline: none;
                border-color: #ff6b35;
                box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
            }
            
            .form-group.error input,
            .form-group.error textarea,
            .form-group.error select {
                border-color: #e53e3e;
            }
            
            .form-group.checkbox {
                display: flex;
                align-items: center;
            }
            
            .form-group.checkbox input {
                width: auto;
                margin-right: 10px;
            }
            
            .form-group.checkbox label {
                margin-bottom: 0;
                display: flex;
                align-items: center;
            }
            
            .error-message {
                color: #e53e3e;
                font-size: 14px;
                margin-top: 5px;
            }
            
            .form-error {
                background: #fed7d7;
                color: #9b2c2c;
                padding: 12px 15px;
                border-radius: 6px;
                margin-bottom: 20px;
                display: none;
            }
            
            .form-error.active {
                display: block;
                animation: fadeIn 0.3s;
            }
            
            .form-success {
                background: #c6f6d5;
                color: #22543d;
                padding: 20px;
                border-radius: 6px;
                text-align: center;
                animation: fadeIn 0.5s;
            }
            
            .success-icon {
                font-size: 40px;
                margin-bottom: 15px;
            }
            
            .success-message h4 {
                margin: 0 0 10px 0;
                color: #22543d;
            }
            
            .success-message p {
                margin: 0;
                color: #22543d;
            }
            
            .fade-out {
                opacity: 0;
                transition: opacity 0.5s;
            }
            
            /* Эффекты кнопок */
            .button-press {
                transform: scale(0.98);
                transition: transform 0.1s;
            }
            
            /* Состояние modal-open для body */
            body.modal-open {
                overflow: hidden;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
    }

    /**
     * Эффект нажатия кнопки
     */
    function addButtonPressEffect(e) {
        this.classList.add('button-press');
    }

    function removeButtonPressEffect() {
        this.classList.remove('button-press');
    }

    /**
     * Инициализация фильтров портфолио
     */
    function initPortfolioFilters() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        if (filterButtons.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Удаляем активный класс у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Добавляем активный класс текущей кнопке
                this.classList.add('active');
                
                // Получаем категорию для фильтрации
                const filter = this.getAttribute('data-filter');
                
                // Здесь можно добавить логику фильтрации элементов портфолио
                console.log('Фильтрация портфолио по категории:', filter);
                
                // Визуальная обратная связь
                this.classList.add('button-press');
                setTimeout(() => this.classList.remove('button-press'), 150);
            });
        });
    }

    /**
     * Полифиллы для старых браузеров
     */
    function applyPolyfills() {
        // Полифилл для Element.closest()
        if (!Element.prototype.closest) {
            Element.prototype.closest = function(s) {
                var el = this;
                do {
                    if (el.matches(s)) return el;
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);
                return null;
            };
        }
        
        // Полифилл для Element.matches()
        if (!Element.prototype.matches) {
            Element.prototype.matches = 
                Element.prototype.matchesSelector || 
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector || 
                Element.prototype.oMatchesSelector || 
                Element.prototype.webkitMatchesSelector ||
                function(s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {}
                    return i > -1;
                };
        }
    }

    // Запуск при полной загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Применяем полифиллы
    applyPolyfills();
    
    /**
     * Настройка индикаторов и контейнера карусели отзывов (стрелочки скрыты, остаётся автопрокрутка)
     */
    function fixReviewsNavigation() {
        // Ждем, пока динамические элементы появятся в DOM
        setTimeout(() => {
            // Найдем раздел отзывов
            const reviewSection = Array.from(document.querySelectorAll('section')).find(section =>
                section.textContent.includes('Отзывы клиентов') || section.textContent.includes('Нам доверяют более 2500 клиентов')
            );
            
            if (!reviewSection) {
                console.log('Раздел отзывов не найден');
                return;
            }
            
            // Скрываем стрелочки навигации (если они ещё не скрыты CSS)
            const prevBtn = reviewSection.querySelector('button.absolute.left-4');
            const nextBtn = reviewSection.querySelector('button.absolute.right-4');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            
            // Найдем контейнер индикаторов
            const indicatorContainer = reviewSection.querySelector('div.flex.justify-center.gap-2');
            if (indicatorContainer) {
                // Убедимся, что индикаторы правильно выровнены
                indicatorContainer.style.display = 'flex';
                indicatorContainer.style.justifyContent = 'center';
                indicatorContainer.style.alignItems = 'center';
                indicatorContainer.style.gap = '0.5rem';
                indicatorContainer.style.marginTop = '1.5rem';
                indicatorContainer.style.width = '100%';
            }
            
            // Найдем контейнер карусели (возможно div с relative)
            const carouselContainer = reviewSection.querySelector('div.relative');
            if (carouselContainer) {
                // Убедимся, что контейнер имеет правильное позиционирование
                carouselContainer.style.position = 'relative';
                carouselContainer.style.overflow = 'visible';
            }
            
            console.log('Настройка карусели отзывов завершена (стрелочки скрыты)');
        }, 1000); // Задержка для гарантии загрузки динамического контента
    }
    
    // Запускаем исправление после полной загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(fixReviewsNavigation, 500);
        });
    } else {
        setTimeout(fixReviewsNavigation, 500);
    }
    
    // Экспорт функций для глобального доступа (если нужно)
    window.MetallProButtons = {
        init,
        openModal: (modalId) => {
            const modal = elements.modals[modalId];
            if (modal) openModal(modal);
        },
        closeModal: handleModalClose,
        validateForm
    };

})();