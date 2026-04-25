/**
 * enhance-buttons.js
 * Динамическое добавление атрибутов и классов для кнопок лендинга
 * Интегрируется с buttons-functionality.js
 */

(function() {
    'use strict';
    
    // Конфигурация сопоставления текста кнопок с типами модальных окон
    const BUTTON_CONFIG = [
        // Кнопки "Заказать звонок" - открывают модальное окно обратного звонка
        {
            textMatch: /заказать звонок/i,
            attributes: {
                'data-modal': 'callback',
                'data-action': 'callback'
            }
        },
        // Кнопки "Рассчитать стоимость", "Заказать расчёт" - открывают модальное окно расчета
        {
            textMatch: /рассчитать стоимость|заказать расчёт/i,
            attributes: {
                'data-modal': 'calculation',
                'data-action': 'calculation'
            }
        },
        // Кнопки "Получить консультацию", "Вызвать замерщика", "Задать вопрос" - открывают модальное окно консультации
        {
            textMatch: /получить консультацию|вызвать замерщика|задать вопрос/i,
            attributes: {
                'data-modal': 'consultation',
                'data-action': 'consultation'
            }
        },
        // Кнопки "Подробнее" в разделе услуг
        {
            textMatch: /подробнее/i,
            attributes: {
                'data-modal': 'consultation',
                'data-action': 'service-details'
            }
        },
        // Кнопки фильтров портфолио
        {
            selector: '[data-filter]',
            attributes: {
                'class': 'portfolio-filter'
            }
        },
        // Кнопка "Смотреть портфолио" - плавная прокрутка к разделу портфолио
        {
            textMatch: /смотреть портфолио/i,
            attributes: {
                'data-scroll-to': 'portfolio',
                'class': 'smooth-scroll'
            }
        },
        // Кнопка "Смотреть все кейсы" - плавная прокрутка к разделу портфолио
        {
            textMatch: /смотреть все кейсы/i,
            attributes: {
                'data-scroll-to': 'portfolio',
                'class': 'smooth-scroll'
            }
        }
    ];
    
    // Селекторы для навигационных ссылок
    const NAV_SELECTORS = [
        'a[href="#services"]',
        'a[href="#advantages"]',
        'a[href="#portfolio"]',
        'a[href="#pricing"]',
        'a[href="#contacts"]'
    ];
    
    /**
     * Инициализация
     */
    function init() {
        console.log('Улучшение кнопок...');
        
        // Добавляем атрибуты к кнопкам на основе текста
        enhanceButtonsByText();
        
        // Улучшаем навигационные ссылки
        enhanceNavigationLinks();
        
        // Добавляем классы для визуальной обратной связи
        addVisualFeedbackClasses();
        
        // Создаем недостающие модальные окна
        createMissingModals();
        
        console.log('Улучшение кнопок завершено!');
    }
    
    /**
     * Добавление атрибутов к кнопкам на основе текста
     */
    function enhanceButtonsByText() {
        // Находим все кнопки и ссылки, которые похожи на кнопки
        const buttons = document.querySelectorAll('button, a.btn, a.button, [role="button"]');
        
        buttons.forEach(button => {
            const buttonText = button.textContent.trim();
            
            // Пропускаем кнопки, которые уже имеют data-modal
            if (button.hasAttribute('data-modal')) return;
            
            // Ищем конфигурацию по тексту кнопки
            for (const config of BUTTON_CONFIG) {
                if (config.textMatch && config.textMatch.test(buttonText)) {
                    // Добавляем атрибуты
                    Object.entries(config.attributes).forEach(([attr, value]) => {
                        button.setAttribute(attr, value);
                    });
                    
                    // Добавляем класс для стилизации
                    if (!button.classList.contains('enhanced-button')) {
                        button.classList.add('enhanced-button');
                    }
                    
                    console.log(`Улучшена кнопка: "${buttonText}" -> ${config.attributes['data-modal'] || 'без модального окна'}`);
                    break;
                }
            }
            
            // Для кнопок отправки форм
            if (button.type === 'submit' && button.closest('form')) {
                button.setAttribute('data-submit-button', 'true');
            }
        });
    }
    
    /**
     * Улучшение навигационных ссылок
     */
    function enhanceNavigationLinks() {
        NAV_SELECTORS.forEach(selector => {
            const links = document.querySelectorAll(selector);
            links.forEach(link => {
                // Добавляем класс для плавной прокрутки
                if (!link.classList.contains('smooth-scroll')) {
                    link.classList.add('smooth-scroll');
                }
                
                // Добавляем атрибут для отслеживания
                link.setAttribute('data-nav-link', 'true');
            });
        });
        
        // Также находим все ссылки с якорями
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href !== '#' && !link.hasAttribute('data-nav-link')) {
                link.classList.add('smooth-scroll');
            }
        });
    }
    
    /**
     * Добавление классов для визуальной обратной связи
     */
    function addVisualFeedbackClasses() {
        // Добавляем классы для всех интерактивных элементов
        const interactiveElements = document.querySelectorAll(
            'button, a.btn, a.button, [role="button"], .btn, input[type="submit"], input[type="button"]'
        );
        
        interactiveElements.forEach(el => {
            if (!el.classList.contains('interactive-element')) {
                el.classList.add('interactive-element');
            }
        });
        
        // Добавляем стили для визуальной обратной связи
        addFeedbackStyles();
    }
    
    /**
     * Добавление CSS стилей для обратной связи
     */
    function addFeedbackStyles() {
        const styleId = 'button-feedback-styles';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* Визуальная обратная связь для кнопок */
            .interactive-element {
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }
            
            .interactive-element:active {
                transform: scale(0.98);
            }
            
            .interactive-element::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 5px;
                height: 5px;
                background: rgba(255, 255, 255, 0.5);
                opacity: 0;
                border-radius: 100%;
                transform: scale(1, 1) translate(-50%);
                transform-origin: 50% 50%;
            }
            
            .interactive-element:focus:not(:active)::after {
                animation: ripple 1s ease-out;
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(0, 0);
                    opacity: 0.5;
                }
                20% {
                    transform: scale(25, 25);
                    opacity: 0.3;
                }
                100% {
                    transform: scale(40, 40);
                    opacity: 0;
                }
            }
            
            /* Стили для улучшенных кнопок */
            .enhanced-button {
                position: relative;
            }
            
            .enhanced-button:hover {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            /* Индикатор загрузки для кнопок отправки */
            button[data-submit-button].loading {
                position: relative;
                color: transparent !important;
            }
            
            button[data-submit-button].loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                margin: -10px 0 0 -10px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: button-spinner 0.8s linear infinite;
            }
            
            @keyframes button-spinner {
                to {
                    transform: rotate(360deg);
                }
            }
            
            /* Активное состояние навигационных ссылок */
            .smooth-scroll.active {
                color: #ff6b35 !important;
                font-weight: 600;
            }
            
            /* Анимация появления модальных окон */
            .modal-content {
                animation-duration: 0.3s;
                animation-fill-mode: both;
            }
            
            .modal.active .modal-content {
                animation-name: modalSlideIn;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * Создание недостающих модальных окон
     */
    function createMissingModals() {
        // Модальное окно для консультации
        if (!document.getElementById('modal-consultation')) {
            createModal('consultation', 'Получить консультацию', 
                'Оставьте заявку, и наш специалист свяжется с вами для бесплатной консультации');
        }
        
        // Модальное окно для расчета стоимости
        if (!document.getElementById('modal-calculation')) {
            createModal('calculation', 'Рассчитать стоимость', 
                'Заполните форму, и мы рассчитаем точную стоимость вашего проекта');
        }
        
        // Модальное окно успешной отправки
        if (!document.getElementById('modal-success')) {
            const modal = document.createElement('div');
            modal.id = 'modal-success';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-overlay" data-close-modal></div>
                <div class="modal-content">
                    <button class="modal-close" data-close-modal>&times;</button>
                    <div style="text-align: center; padding: 20px 0;">
                        <div style="font-size: 60px; color: #38a169; margin-bottom: 20px;">✓</div>
                        <h3 style="margin-bottom: 10px;">Заявка отправлена!</h3>
                        <p style="color: #666; margin-bottom: 30px;">
                            Спасибо! Мы свяжемся с вами в ближайшее время.
                        </p>
                        <button class="btn btn-primary" data-close-modal style="margin-top: 20px;">
                            Закрыть
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
    }
    
    /**
     * Создание модального окна
     */
    function createModal(id, title, description) {
        const modal = document.createElement('div');
        modal.id = `modal-${id}`;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay" data-close-modal></div>
            <div class="modal-content">
                <button class="modal-close" data-close-modal>&times;</button>
                <h3>${title}</h3>
                <p>${description}</p>
                <form id="${id}-form">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Ваше имя" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email (необязательно)">
                    </div>
                    <div class="form-group">
                        <textarea name="message" placeholder="Опишите вашу задачу..." rows="4"></textarea>
                    </div>
                    <div class="form-group checkbox">
                        <label>
                            <input type="checkbox" name="privacy" required checked>
                            <span>Согласен с <a href="#">политикой конфиденциальности</a></span>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">Отправить</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Запуск после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Экспорт для глобального доступа
    window.MetallProEnhancer = {
        init,
        enhanceButtonsByText,
        createModal
    };
    
})();