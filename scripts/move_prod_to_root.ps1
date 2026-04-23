# Скрипт перемещает содержимое prod/ в корень и удаляет папку prod
Param()
$ErrorActionPreference = 'Stop'
Set-Location -Path (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Write-Host "Рабочая директория: $(Get-Location)"
if (-not (Test-Path .\prod)) {
    Write-Host "Папка prod не найдена, выходим." -ForegroundColor Yellow
    exit 1
}

$items = Get-ChildItem -LiteralPath .\prod -Force
foreach ($it in $items) {
    if ($it.Name -eq '.git') { Write-Host 'Пропускаю .git внутри prod' ; continue }
    Write-Host "Перемещаю: $($it.Name)"
    Move-Item -LiteralPath $it.FullName -Destination (Get-Location) -Force
}

Remove-Item -LiteralPath .\prod -Recurse -Force
Write-Host "Удалил папку prod и переместил содержимое в корень."
