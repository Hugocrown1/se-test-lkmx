# Makefile para ejecutar tests y otras tareas

.PHONY: test test-docker test-watch help setup

# Ayuda por defecto
help:
	@echo "🧪 Comandos disponibles para tests:"
	@echo "  make test-docker     - Ejecutar tests en Docker"
	@echo "  make test-watch      - Ejecutar tests en modo watch"
	@echo "  make test-build      - Construir imagen y ejecutar tests"
	@echo "  make setup           - Configurar proyecto (base de datos + dependencias)"
	@echo "  make clean           - Limpiar contenedores y volúmenes"

# Ejecutar tests en Docker
test-docker:
	@echo "🧪 Ejecutando tests en Docker..."
	docker-compose up postgres -d
	docker-compose --profile testing run --rm tests
	@echo "✅ Tests completados!"

# Ejecutar tests en modo watch
test-watch:
	@echo "🧪 Ejecutando tests en modo watch..."
	docker-compose up postgres -d
	docker-compose --profile testing run --rm tests npm run test -- --watch

# Construir y ejecutar tests
test-build:
	@echo "🔨 Construyendo imagen de tests..."
	docker-compose --profile testing build tests
	@echo "🧪 Ejecutando tests..."
	docker-compose up postgres -d
	docker-compose --profile testing run --rm tests
	@echo "✅ Tests completados!"

# Configurar proyecto completo
setup:
	@echo "⚙️ Configurando proyecto..."
	docker-compose up postgres -d
	sleep 5
	docker-compose exec postgres psql -U test -d test_lkmx -c "SELECT 1;" || echo "Esperando a PostgreSQL..."
	@echo "✅ Proyecto configurado!"

# Limpiar contenedores y volúmenes
clean:
	@echo "🧹 Limpiando contenedores y volúmenes..."
	docker-compose down -v
	docker-compose --profile testing down -v
	@echo "✅ Limpieza completada!"
