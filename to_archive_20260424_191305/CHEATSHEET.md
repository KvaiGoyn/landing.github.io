# 🚀 Шпаргалка по быстрому деплою Next.js лэндинга

Краткие команды и инструкции для быстрого развертывания на различных платформах.

## 📋 Быстрые команды

### GitHub Pages
```bash
# Инициализация и пушинг
git init
git add .
git commit -m "Deploy"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main

# После пуша: Settings → Pages → Source: main branch
```

### Vercel (CLI)
```bash
# Установка и деплой
npm i -g vercel
vercel login
vercel --prod

# Или одной командой (если уже установлен)
vercel --prod --yes
```

### Netlify (CLI)
```bash
# Установка и деплой
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod

# Быстрый деплой без инициализации
netlify deploy --prod --dir=.
```

### Cloudflare Pages (CLI)
```bash
# Установка и деплой
npm i -g wrangler
wrangler login
wrangler pages publish . --project-name=PROJECT_NAME
```

### Общий хостинг (RSYNC/SCP)
```bash
# RSYNC
rsync -avz ./ user@server:/var/www/html/

# SCP
scp -r ./* user@server:/var/www/html/

# SFTP (интерактивно)
sftp user@server
put -r . /var/www/html/
```

## ⚡ Экспресс-деплой (1 минута)

### Вариант 1: Vercel (самый быстрый)
1. Перетащите папку на [vercel.com/drop](https://vercel.com/drop)
2. Получите URL сразу

### Вариант 2: Netlify Drop
1. Перетащите папку на [app.netlify.com/drop](https://app.netlify.com/drop)
2. Сайт готов через 30 секунд

### Вариант 3: Cloudflare Pages
1. Зайдите в Cloudflare Dashboard → Pages
2. Drag & Drop папку проекта
3. Деплой автоматически

## 🔧 Проверка деплоя

### Команды терминала
```bash
# Проверка доступности
curl -I https://ваш-сайт.com

# Проверка SSL сертификата
openssl s_client -connect ваш-сайт.com:443 -servername ваш-сайт.com

# Проверка DNS
nslookup ваш-сайт.com
dig ваш-сайт.com
```

### Онлайн-инструменты
- **Доступность**: [isitup.org](https://isitup.org/)
- **SSL**: [sslshopper.com/ssl-checker](https://www.sslshopper.com/ssl-checker)
- **Заголовки**: [webconcepts.info](https://webconcepts.info/concepts/http-header/)
- **Скорость**: [pagespeed.web.dev](https://pagespeed.web.dev/)

## 🛠️ Быстрые исправления

### Проблема: Белый экран
```bash
# 1. Проверьте консоль браузера
# 2. Проверьте пути к ресурсам
# 3. Очистите кэш CDN (если есть)

# Для Cloudflare
curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache" \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### Проблема: 404 ошибки
```bash
# Проверьте конфигурацию сервера

# Для Apache (в .htaccess)
# Добавьте: FallbackResource /index.html

# Для Nginx (в nginx.conf)
# Добавьте: try_files $uri $uri/ /index.html;
```

### Проблема: Mixed Content
```bash
# Найдите HTTP ссылки
grep -r "http://" . --include="*.html" --include="*.css" --include="*.js"

# Замените на // или https://
sed -i 's|http://|https://|g' файл.html
```

## 📊 Мониторинг (быстрый старт)

### Google Analytics
1. Добавьте ID в HTML: `GA_MEASUREMENT_ID`
2. Проверьте в реальном времени: [analytics.google.com](https://analytics.google.com)

### Uptime мониторинг (бесплатно)
- **UptimeRobot**: 50 мониторов бесплатно
- **StatusCake**: 10 мониторов бесплатно
- **Pingdom**: 1 монитор бесплатно

### Ошибки (бесплатно)
- **Sentry**: 5000 событий/мес бесплатно
- **LogRocket**: 1000 сессий/мес бесплатно

## 🔄 Обновление контента

### Статический сайт (уже собран)
```bash
# 1. Обновите исходный Next.js проект
# 2. Пересоберите: npm run build
# 3. Скопируйте файлы из out/ в текущую папку
# 4. Повторите деплой

# Пример копирования
cp -r out/* ./
```

### Автоматическое обновление (Git-based)
```bash
# Настройте автоматический деплой на:
# - Vercel: при пуше в main
# - Netlify: при пуше в main  
# - GitHub Pages: при пуше в main
# - Cloudflare Pages: при пуше в main
```

## 📞 Экстренные контакты

### Поддержка хостингов
- **Vercel**: support@vercel.com или [версель.ком/help](https://vercel.com/help)
- **Netlify**: support@netlify.com или [документация](https://docs.netlify.com/)
- **GitHub**: [поддержка](https://support.github.com/)
- **Cloudflare**: [сообщество](https://community.cloudflare.com/)

### Полезные ссылки
- **Документация по деплою**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Конфигурационные файлы**: см. README.md
- **Исходный код**: (если есть ссылка на репозиторий)

---

## 🎯 TL;DR (Самый быстрый способ)

1. **Есть аккаунт Vercel?** → Перетащи папку на vercel.com/drop
2. **Есть аккаунт Netlify?** → Перетащи папку на netlify.com/drop  
3. **Есть GitHub?** → Закоммить и включи GitHub Pages
4. **Есть свой сервер?** → `rsync -avz ./ user@server:/var/www/html/`

**Сайт будет работать через 1-2 минуты!** ✅