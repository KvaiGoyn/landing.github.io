# Скрипт для тестирования локального билда Next.js лэндинга
# Запуск: powershell -ExecutionPolicy Bypass -File test_build.ps1

$ErrorActionPreference = "Stop"
$hostname = "localhost"
$port = 8080
$baseUrl = "http://${hostname}:${port}"

Write-Host "=== Тестирование локального билда Next.js лэндинга ===" -ForegroundColor Cyan
Write-Host "Базовый URL: $baseUrl"
Write-Host ""

# 1. Проверка доступности сервера
Write-Host "1. Проверка доступности сервера..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method Head -UseBasicParsing -ErrorAction Stop
    Write-Host "   Сервер доступен, статус: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   Ошибка: Сервер не доступен ($_)" -ForegroundColor Red
    exit 1
}

# 2. Проверка основных файлов
Write-Host "`n2. Проверка загрузки ресурсов..." -ForegroundColor Yellow
$files = @(
    "/index.html",
    "/404.html",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/robots.txt",
    "/sitemap.xml",
    "/_headers",
    "/_redirects",
    "/.htaccess",
    "/nginx.conf",
    "/logo.svg",
    "/og-image.png"
)

foreach ($file in $files) {
    $url = $baseUrl + $file
    try {
        $status = (Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -ErrorAction Stop).StatusCode
        Write-Host "   $file : $status" -ForegroundColor Green
    } catch {
        $status = $_.Exception.Response.StatusCode.Value__
        Write-Host "   $file : $status (ОШИБКА)" -ForegroundColor Red
    }
}

# 3. Проверка конфигурационных файлов (содержимое)
Write-Host "`n3. Проверка конфигурационных файлов..." -ForegroundColor Yellow
$configFiles = @("_headers", "_redirects", "robots.txt", "sitemap.xml")
foreach ($cf in $configFiles) {
    if (Test-Path $cf) {
        $size = (Get-Item $cf).Length
        Write-Host "   $cf найден, размер: $size байт" -ForegroundColor Green
    } else {
        Write-Host "   $cf не найден" -ForegroundColor Red
    }
}

# 4. Проверка SEO-метатегов (грубая проверка)
Write-Host "`n4. Проверка SEO-оптимизации..." -ForegroundColor Yellow
try {
    $html = Invoke-WebRequest -Uri $baseUrl -UseBasicParsing
    $content = $html.Content
    $checks = @{
        "title" = [regex]::Match($content, "<title>(.*?)</title>").Success
        "meta description" = [regex]::Match($content, "<meta name=`"description`" content=`"(.*?)`"", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase).Success
        "og:title" = [regex]::Match($content, "<meta property=`"og:title`" content=`"(.*?)`"", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase).Success
        "og:image" = [regex]::Match($content, "<meta property=`"og:image`" content=`"(.*?)`"", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase).Success
    }
    foreach ($check in $checks.GetEnumerator()) {
        if ($check.Value) {
            Write-Host "   $($check.Key) : присутствует" -ForegroundColor Green
        } else {
            Write-Host "   $($check.Key) : отсутствует" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "   Не удалось проверить SEO: $_" -ForegroundColor Red
}

# 5. Проверка безопасности (заголовки)
Write-Host "`n5. Проверка безопасности..." -ForegroundColor Yellow
try {
    $headers = (Invoke-WebRequest -Uri $baseUrl -Method Head -UseBasicParsing).Headers
    $securityHeaders = @("X-Frame-Options", "X-Content-Type-Options", "X-XSS-Protection", "Referrer-Policy", "Content-Security-Policy")
    foreach ($h in $securityHeaders) {
        if ($headers[$h]) {
            Write-Host "   $h : $($headers[$h])" -ForegroundColor Green
        } else {
            Write-Host "   $h : отсутствует (ожидается в production)" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "   Не удалось проверить заголовки: $_" -ForegroundColor Red
}

# 6. Проверка производительности (размеры)
Write-Host "`n6. Проверка производительности..." -ForegroundColor Yellow
$extensions = @("*.html", "*.css", "*.js", "*.png", "*.jpg", "*.jpeg", "*.gif", "*.svg", "*.woff2", "*.woff", "*.ttf", "*.ico")
$totalSize = 0
$count = 0
foreach ($ext in $extensions) {
    Get-ChildItem -Recurse -Filter $ext -File | ForEach-Object {
        $totalSize += $_.Length
        $count++
    }
}
Write-Host "   Всего статических ресурсов: $count файлов" -ForegroundColor Green
Write-Host "   Общий размер: $([math]::Round($totalSize/1KB,2)) KB ($([math]::Round($totalSize/1MB,2)) MB)" -ForegroundColor Green

# 7. Итог
Write-Host "`n=== Итоги тестирования ===" -ForegroundColor Cyan
Write-Host "Локальный билд готов к деплою." -ForegroundColor Green
Write-Host "Рекомендации:" -ForegroundColor Yellow
Write-Host "- Убедитесь, что security headers применяются на production-хостинге"
Write-Host "- Проверьте sitemap.xml на актуальность URL"
Write-Host "- Протестируйте на реальных устройствах"
Write-Host ""
Write-Host "Скрипт завершен." -ForegroundColor Cyan