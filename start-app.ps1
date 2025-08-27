# Script para iniciar la aplicación con base de datos
Write-Host "🚀 Iniciando aplicación con base de datos..." -ForegroundColor Green

# Verificar que existe el archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "❌ Archivo .env no encontrado!" -ForegroundColor Red
    Write-Host "📝 Copia .env.example a .env y configura las variables:" -ForegroundColor Yellow
    Write-Host "   cp .env.example .env" -ForegroundColor Gray
    exit 1
}

# Leer variables del archivo .env para mostrar información
$envContent = Get-Content ".env" | Where-Object { $_ -match "^[^#].*=" }
$dbUser = ($envContent | Where-Object { $_ -match "^POSTGRES_USER=" }) -replace "POSTGRES_USER=", ""
$dbName = ($envContent | Where-Object { $_ -match "^POSTGRES_DB=" }) -replace "POSTGRES_DB=", ""

# Limpiar contenedores y volúmenes existentes
Write-Host "🧹 Limpiando contenedores y volúmenes anteriores..." -ForegroundColor Yellow
docker-compose down -v
docker system prune -f

# Construir y levantar contenedores
Write-Host "🔨 Construyendo y levantando contenedores..." -ForegroundColor Blue
docker-compose up --build -d




# Ejecutar migraciones
Write-Host "📦 Ejecutando migraciones de Prisma..." -ForegroundColor Blue
docker-compose exec nextjs-app npx prisma migrate deploy

# Ejecutar seed
Write-Host "🌱 Ejecutando seed de la base de datos..." -ForegroundColor Blue
docker-compose exec nextjs-app npx prisma db seed

Write-Host "✅ ¡Aplicación lista!" -ForegroundColor Green
Write-Host "🌐 Aplicación disponible en: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🗄️ Base de datos disponible en: localhost:5432" -ForegroundColor Cyan
Write-Host ""
Write-Host "Credenciales de la base de datos (desde .env):" -ForegroundColor White
Write-Host "- Usuario: $dbUser" -ForegroundColor Gray
Write-Host "- Base de datos: $dbName" -ForegroundColor Gray
Write-Host ""
Write-Host "Para ver logs: docker-compose logs -f" -ForegroundColor Gray
Write-Host "Para detener: docker-compose down" -ForegroundColor Gray
