/**
 * load-scripts.js
 * Загрузка всех необходимых скриптов для функциональности кнопок
 * Этот файл должен быть подключен в конце body
 */

(function() {
    'use strict';
    
    // Конфигурация скриптов
    const scripts = [
        { id: 'buttons-functionality', src: 'buttons-functionality.js', async: false, defer: true },
        { id: 'enhance-buttons', src: 'enhance-buttons.js', async: false, defer: true }
    ];
    
    // Функция загрузки скрипта
    function loadScript(scriptConfig) {
        return new Promise((resolve, reject) => {
            // Проверяем, не загружен ли уже скрипт
            if (document.getElementById(scriptConfig.id)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.id = scriptConfig.id;
            script.src = scriptConfig.src;
            script.async = scriptConfig.async || false;
            script.defer = scriptConfig.defer || false;
            
            script.onload = () => {
                console.log(`Скрипт ${scriptConfig.src} загружен`);
                resolve();
            };
            
            script.onerror = () => {
                console.error(`Ошибка загрузки скрипта ${scriptConfig.src}`);
                reject(new Error(`Failed to load script: ${scriptConfig.src}`));
            };
            
            document.body.appendChild(script);
        });
    }
    
    // Функция инициализации
    function init() {
        console.log('Загрузка скриптов функциональности кнопок...');
        
        // Загружаем все скрипты последовательно
        const loadPromises = scripts.map(script => loadScript(script));
        
        Promise.all(loadPromises)
            .then(() => {
                console.log('Все скрипты успешно загружены');
                
                // Инициализируем улучшения кнопок после загрузки
                if (window.MetallProEnhancer && typeof window.MetallProEnhancer.init === 'function') {
                    window.MetallProEnhancer.init();
                }
                
                // Инициализируем функциональность кнопок
                if (window.MetallProButtons && typeof window.MetallProButtons.init === 'function') {
                    window.MetallProButtons.init();
                }
            })
            .catch(error => {
                console.error('Ошибка при загрузке скриптов:', error);
            });
    }
    
    // Запускаем после полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM уже загружен
        setTimeout(init, 100);
    }
    
})();