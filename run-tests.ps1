# Script para ejecutar tests en Docker
Write-Host "🧪 Ejecutando tests en Docker..." -ForegroundColor Green

# Verificar que Docker esté corriendo
try {
    docker --version | Out-Null
} catch {
    Write-Host "❌ Docker no está instalado o no está corriendo" -ForegroundColor Red
    exit 1
}

# Verificar que existe el archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "❌ Archivo .env no encontrado!" -ForegroundColor Red
    Write-Host "📝 Crea el archivo .env con las variables necesarias" -ForegroundColor Yellow
    exit 1
}

# Construir imagen de tests si no existe
Write-Host "🔨 Construyendo imagen de tests..." -ForegroundColor Blue
docker-compose --profile testing build tests

# Ejecutar tests
Write-Host "🚀 Ejecutando tests..." -ForegroundColor Blue
docker-compose --profile testing run --rm tests

Write-Host "✅ Tests completados!" -ForegroundColor Green
Write-Host ""
Write-Host "Para ejecutar tests en modo watch:" -ForegroundColor White
Write-Host "  npm run test:docker:watch" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para ejecutar solo una vez:" -ForegroundColor White
Write-Host "  npm run test:docker" -ForegroundColor Cyan
