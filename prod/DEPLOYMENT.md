# Руководство по деплою Next.js лэндинга

Этот документ содержит подробные инструкции по развертыванию оптимизированного статического Next.js лэндинга на различных хостинговых платформах. Проект уже включает все необходимые конфигурационные файлы для быстрого деплоя.

## 📋 Предварительные требования

Перед деплоем убедитесь, что у вас есть:

1. **Аккаунты на выбранной платформе хостинга**
   - GitHub (для GitHub Pages)
   - Vercel (бесплатный аккаунт)
   - Netlify (бесплатный аккаунт)
   - Cloudflare (бесплатный аккаунт)

2. **Доступ к домену** (опционально, для кастомного домена)

3. **Локальная копия проекта** со всеми файлами

4. **Проверка проекта** (см. раздел "Чек-лист преддеплойной проверки")

---

## 🚀 GitHub Pages

GitHub Pages — бесплатный хостинг для статических сайтов прямо из репозитория GitHub.

### Шаги для деплоя:

1. **Создайте репозиторий** на GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ваш-username/ваш-репозиторий.git
   git push -u origin main
   ```

2. **Настройте GitHub Pages**:
   - Перейдите в Settings → Pages
   - В разделе "Source" выберите ветку `main` и папку `/ (root)`
   - Нажмите "Save"

3. **Кастомный домен** (опционально):
   - В файле `CNAME` укажите ваш домен (например, `example.com`)
   - В настройках GitHub Pages введите тот же домен
   - Настройте DNS записи у вашего регистратора:
     ```
     Тип: CNAME
     Имя: www (или @)
     Значение: ваш-username.github.io
     ```

4. **Деплой через GitHub Actions** (альтернатива):
   - Проект уже содержит `.nojekyll` для отключения обработки Jekyll
   - GitHub автоматически развернет сайт через 1-2 минуты

### Проверка деплоя:
- Откройте `https://ваш-username.github.io/ваш-репозиторий`
- Проверьте консоль браузера на ошибки (F12 → Console)
- Убедитесь, что все ресурсы загружаются

---

## ⚡ Vercel

Vercel — оптимальная платформа для Next.js с автоматическим деплоем и CDN.

### Шаги для деплоя:

#### Способ 1: Через веб-интерфейс
1. Зайдите на [vercel.com](https://vercel.com) и авторизуйтесь
2. Нажмите "Add New" → "Project"
3. Импортируйте ваш GitHub репозиторий
4. Настройки автоматически определятся из `vercel.json`
5. Нажмите "Deploy"

#### Способ 2: Через Vercel CLI
```bash
# Установите Vercel CLI
npm i -g vercel

# Логин (первый раз)
vercel login

# Деплой
vercel --prod
```

### Конфигурация `vercel.json`:
Проект уже включает оптимизированную конфигурацию:
- Кэширование статических ресурсов на 1 год
- Security headers (X-Frame-Options, CSP и др.)
- Правильная маршрутизация для Next.js

### Кастомный домен:
1. В панели Vercel перейдите в Project → Settings → Domains
2. Добавьте ваш домен
3. Настройте DNS записи как указано в Vercel

### Особенности Vercel:
- **Автоматический HTTPS** (Let's Encrypt)
- **CDN глобально** (Edge Network)
- **Preview deployments** для каждой ветки
- **Аналитика производительности** встроена

---

## 🌐 Netlify

Netlify — мощная платформа для статических сайтов с функциями serverless.

### Шаги для деплоя:

#### Способ 1: Drag & Drop
1. Зайдите на [netlify.com](https://netlify.com)
2. Перетащите всю папку проекта в область "Drop your site folder here"
3. Netlify автоматически развернет сайт

#### Способ 2: Через Git
1. Нажмите "New site from Git"
2. Выберите ваш репозиторий
3. Настройки сборки:
   - Build command: (оставьте пустым, т.к. проект уже собран)
   - Publish directory: `.`
4. Нажмите "Deploy site"

#### Способ 3: Через Netlify CLI
```bash
# Установите Netlify CLI
npm i -g netlify-cli

# Логин
netlify login

# Инициализация
netlify init

# Деплой
netlify deploy --prod
```

### Конфигурация `netlify.toml`:
Проект включает:
- Security headers (`_headers` файл)
- Правила перенаправления (`_redirects`)
- Оптимизированные настройки кэширования

### Кастомный домен:
1. В Netlify: Site settings → Domain management
2. Добавьте кастомный домен
3. Настройте DNS (используйте Netlify DNS или внешний)

### Функции Netlify:
- **Form handling** (бесплатно до 100 отправок/мес)
- **Serverless functions** (если добавите)
- **Split testing** (A/B тестирование)
- **Instant rollbacks**

---

## 🖥️ Общий хостинг (Apache/Nginx)

Для развертывания на традиционном хостинге с Apache или Nginx.

### Подготовка файлов:

1. **Загрузите все файлы** на хостинг:
   ```bash
   # Пример через rsync
   rsync -avz ./ user@server:/var/www/html/
   
   # Или через FTP/SFTP
   # Загрузите всю папку в корень сайта
   ```

2. **Проверьте структуру**:
   ```
   /var/www/html/
   ├── index.html
   ├── 404.html
   ├── _next/
   ├── .htaccess (для Apache)
   ├── nginx.conf (для Nginx)
   └── [остальные файлы]
   ```

### Для Apache:

1. Убедитесь, что включен `mod_rewrite` и `mod_headers`:
   ```bash
   sudo a2enmod rewrite headers expires
   sudo systemctl restart apache2
   ```

2. Файл `.htaccess` уже содержит:
   - Security headers
   - Кэширование ресурсов
   - Перенаправление на HTTPS (раскомментировать при необходимости)

3. **Настройка виртуального хоста** (пример):
   ```apache
   <VirtualHost *:80>
       ServerName example.com
       ServerAlias www.example.com
       DocumentRoot /var/www/html
       
       <Directory /var/www/html>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

### Для Nginx:

1. Используйте готовый `nginx.conf` как основу:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/example.com
   sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
   ```

2. Отредактируйте конфиг:
   - Измените `root /var/www/html;` на ваш путь
   - Укажите `server_name example.com www.example.com;`
   - Настройте SSL (рекомендуется)

3. Проверьте и перезагрузите Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### SSL сертификат (рекомендуется):
Используйте Let's Encrypt (Certbot):
```bash
# Для Apache
sudo certbot --apache -d example.com -d www.example.com

# Для Nginx
sudo certbot --nginx -d example.com -d www.example.com
```

---

## ☁️ Cloudflare Pages

Cloudflare Pages — быстрый хостинг с глобальной сетью CDN.

### Шаги для деплоя:

1. **Войдите в Cloudflare Dashboard** → Pages
2. **Создайте новый проект** → "Connect to Git"
3. **Выберите репозиторий** и настройте:
   - Framework preset: "None" (статический сайт)
   - Build command: (оставьте пустым)
   - Build output directory: `.`
4. **Нажмите "Save and Deploy"**

### Через Cloudflare Wrangler CLI:
```bash
# Установите Wrangler
npm i -g wrangler

# Логин
wrangler login

# Деплой
wrangler pages publish . --project-name=ваш-проект
```

### Кастомный домен:
1. В Cloudflare Pages: Settings → Custom domains
2. Добавьте домен
3. Настройте DNS в Cloudflare (или у вашего регистратора)

### Преимущества Cloudflare Pages:
- **Бесплатный SSL** автоматически
- **Глобальная CDN** (275+ точек присутствия)
- **Бесплатные сборки** (500 сборок/мес)
- **Интеграция с Cloudflare Workers**

---

## ✅ Чек-лист преддеплойной проверки

Перед деплоем выполните эти проверки:

### 1. Проверка файлов
- [ ] `index.html` существует и открывается локально
- [ ] `404.html` существует для обработки 404 ошибок
- [ ] Папка `_next/` содержит статические ресурсы
- [ ] `robots.txt` и `sitemap.xml` настроены правильно
- [ ] Фавиконки и иконки присутствуют (favicon.ico, apple-touch-icon.png)
- [ ] `humans.txt` содержит информацию о разработчиках

### 2. Локальное тестирование
- [ ] Откройте `index.html` в браузере
- [ ] Проверьте консоль на ошибки (F12 → Console)
- [ ] Проверьте сетевые запросы (F12 → Network)
- [ ] Убедитесь, что все ресурсы загружаются (CSS, JS, изображения)
- [ ] Проверьте адаптивность на разных размерах экрана

### 3. Валидация конфигураций
- [ ] `vercel.json` — корректный JSON
- [ ] `netlify.toml` — корректный TOML
- [ ] `.htaccess` — правильный синтаксис Apache
- [ ] `nginx.conf` — правильный синтаксис Nginx
- [ ] `_headers` и `_redirects` — правильный формат

### 4. SEO и мета-теги
- [ ] Title и description установлены
- [ ] Open Graph теги присутствуют (og:image, og:title и др.)
- [ ] Twitter Card теги настроены
- [ ] Канонический URL указан
- [ ] Мета-теги для мобильных устройств

### 5. Производительность
- [ ] Изображения оптимизированы
- [ ] CSS и JS минифицированы
- [ ] Включено кэширование статических ресурсов
- [ ] Gzip/Brotli сжатие настроено (на хостинге)

### 6. Безопасность
- [ ] Security headers настроены (X-Frame-Options, CSP и др.)
- [ ] Нет чувствительных данных в коде
- [ ] SSL сертификат готов (для продакшена)

---

## 📊 Мониторинг после деплоя

После успешного деплоя важно убедиться, что сайт работает корректно.

### 1. Базовая проверка работоспособности:
- [ ] Сайт открывается по URL
- [ ] HTTPS работает (зеленый замочек в браузере)
- [ ] Все страницы загружаются
- [ ] Формы работают (если есть)
- [ ] Ссылки ведут на правильные страницы

### 2. Инструменты для проверки:
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpageTest.org/
- **Security Headers Check**: https://securityheaders.com/
- **SSL Labs Test**: https://www.ssllabs.com/ssltest/

### 3. Мониторинг производительности:
- **Google Analytics** или **Plausible** для трафика
- **Sentry** или **LogRocket** для ошибок
- **UptimeRobot** или **StatusCake** для мониторинга доступности
- **Cloudflare Analytics** (если используете Cloudflare)

### 4. Что делать в случае проблем:

#### Проблема: Сайт не открывается
- **Проверьте DNS**: `dig example.com` или `nslookup example.com`
- **Проверьте хостинг**: Убедитесь, что хостинг-провайдер работает
- **Проверьте файлы**: Убедитесь, что файлы загружены в правильную директорию

#### Проблема: Ошибки 404 для ресурсов
- **Проверьте пути**: Убедитесь, что пути к ресурсам правильные
- **Проверьте конфигурацию сервера**: Правильно ли настроены rewrite правила
- **Проверьте кэш браузера**: Очистите кэш или откройте в инкогнито

#### Проблема: Медленная загрузка
- **Включите кэширование**: Проверьте headers Cache-Control
- **Оптимизируйте изображения**: Используйте WebP, сжимайте
- **Включите сжатие**: Gzip/Brotli на сервере
- **Используйте CDN**: Для глобального ускорения

#### Проблема: Ошибки SSL
- **Проверьте срок действия сертификата**
- **Проверьте цепочку сертификатов**
- **Обновите сертификат** (Let's Encrypt обновляется автоматически)

---

## 🚀 Быстрая шпаргалка по деплою

### GitHub Pages
```bash
git add . && git commit -m "Deploy"
git push origin main
# Затем: Settings → Pages → Source: main branch
```

### Vercel (CLI)
```bash
npm i -g vercel
vercel --prod
```

### Netlify (CLI)
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 🔐 Переменные окружения (env)

Для отправки писем через SendGrid и использования карт потребуется задать секреты в окружении. Никогда не храните реальные ключи в репозитории.

- `SENDGRID_API_KEY` — ключ SendGrid для отправки писем.
- `TO_EMAIL` — email получателя заявок (куда будут приходить заявки).
- `FROM_EMAIL` — email отправителя (должен быть подтверждён в SendGrid).
- `YANDEX_API_KEY` — ключ Яндекс.Карт (необязательно, можно задать как meta тег).

Пример локального файла: `.env` (не добавляйте в git)
```
SENDGRID_API_KEY=SG.xxxxxx
TO_EMAIL=owner@example.com
FROM_EMAIL=sender@example.com
YANDEX_API_KEY=ya.xxxxxx
```

### Как применить в Netlify

1. В веб-интерфейсе Netlify → Site settings → Build & deploy → Environment → Environment variables — добавьте переменные.
2. Или в CLI при `netlify dev` можно использовать файл `.env` (Netlify Dev его подхватит).

## 🔎 Локальное тестирование serverless

1. Установите зависимости:
```powershell
npm install
```
2. Запустите Netlify Dev (подхватит функции и env):
```powershell
npx netlify-cli@latest dev
```
3. Откройте `http://localhost:8888` (или порт, который покажет Netlify Dev) и протестируйте форму.

Если `netlify dev` не подходит, можно эмулировать вызов функции вручную (node) или временно использовать `curl` к прод-эндпоинту после деплоя.

---

### Cloudflare Pages (CLI)
```bash
npm i -g wrangler
wrangler pages publish . --project-name=PROJECT
```

### Общий хостинг (RSYNC)
```bash
rsync -avz ./ user@server:/var/www/html/
```

### Проверка деплоя
```bash
# Проверка доступности
curl -I https://ваш-сайт.com

# Проверка SSL
openssl s_client -connect ваш-сайт.com:443
```

---

## 🔧 Troubleshooting

### Частые проблемы и решения:

1. **Белый экран после деплоя**
   - Проверьте консоль браузера на ошибки JavaScript
   - Убедитесь, что пути к `_next/static` правильные
   - Проверьте, что все файлы загружены

2. **Ошибки 404 для маршрутов Next.js**
   - Убедитесь, что сервер настроен на отдачу `index.html` для всех маршрутов
   - Для Apache: проверьте `.htaccess` rewrite правила
   - Для Nginx: проверьте `try_files $uri $uri/ /index.html;`

3. **Проблемы с кэшированием**
   - Очистите кэш CDN (если используете)
   - Добавьте version hash к статическим файлам
   - Используйте `Cache-Control: no-cache` для HTML

4. **Mixed Content ошибки**
   - Убедитесь, что все ресурсы загружаются по HTTPS
   - Проверьте ссылки в CSS и JavaScript файлах
   - Используйте относительные пути или протокол-относительные URL

5. **Медленная загрузка на мобильных**
   - Оптимизируйте изображения (используйте WebP)
   - Включите lazy loading для изображений
   - Минифицируйте CSS и JavaScript
   - Используйте CDN для статических ресурсов

---

## 📞 Поддержка

Если у вас возникли проблемы с деплоем:

1. **Проверьте документацию** хостинг-провайдера
2. **Используйте инструменты диагностики** из раздела "Мониторинг"
3. **Проверьте логи** на хостинге
4. **Создайте issue** в репозитории проекта

---

## 🔄 Обновление сайта

Для обновления контента:

1. Внесите изменения в исходный код Next.js
2. Пересоберите проект: `npm run build` (если это исходный проект)
3. Скопируйте файлы из `out/` (или `.next/static`) в текущую папку
4. Задеплойте обновленные файлы на хостинг

**Примечание**: Этот проект уже содержит собранную статическую версию. Для обновления контента вам нужно пересобрать Next.js проект и заменить файлы.

---

## 📝 Заключение

Проект полностью готов к продакшен деплою на любую из перечисленных платформ. Все конфигурационные файлы уже настроены для оптимальной производительности и безопасности.

**Рекомендуемая платформа**: Vercel или Netlify для максимальной простоты и автоматизации.

Успешного деплоя! 🚀