# SE Test LKMX - User Management App - Por: Hugo Corona 

Aplicación web de gestión de usuarios desarrollada con **Next.js 15**, **TypeScript**, **Prisma ORM** y **PostgreSQL**.

## 🚀 Inicio Rápido (Ejecución Local)

### Requisitos
- Node.js 18+
- Docker y Docker Compose

### Opción 1: Desarrollo Local
```bash
# 1. Clonar repositorio
git clone https://github.com/Hugocrown1/se-test-lkmx
cd se-test-lkmx

# 2. Instalar dependencias
npm install

# 3. Configurar base de datos local PostgreSQL
createdb test_lkmx

# 4. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu configuración local

# 5. Migrar y poblar base de datos
npx prisma migrate dev --name init
npm run db:seed

# 6. Ejecutar aplicación
npm run dev
```

### Opción 2: Docker (Recomendado)
```bash
# 1. Clonar repositorio
git clone https://github.com/Hugocrown1/se-test-lkmx
cd se-test-lkmx

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu configuración local

# 3. Ejecutar con script automatizado (Windows)
.\start-app.ps1

# O manualmente:
docker-compose up --build
```

**Accede a**: [http://localhost:3000](http://localhost:3000)

La base de datos se inicializa automáticamente con 3 usuarios de prueba.

## 🧪 Pruebas

```bash
# Pruebas locales
npm test

# Pruebas en Docker
npm run test:docker
```

## � Stack Técnico

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes, Prisma ORM  
- **Base de datos**: PostgreSQL 15
- **Testing**: Jest
- **Contenedorización**: Docker & Docker Compose

## �️ API Endpoints

### `GET /api/analytics`
Obtiene estadísticas básicas de la aplicación
```json
{"totalUsers": 3}
```

### `GET /api/health`
Verifica el estado de la aplicación y conexión a la base de datos
```json
{"ok": true}
```

### `GET /api/users`
Obtiene todos los usuarios
```json
[{"id": 1, "name": "Juan Pérez", "email": "juan.perez@example.com"}]
```

### `POST /api/users` 
Crea un nuevo usuario
```json
{"name": "Nuevo Usuario", "email": "nuevo@example.com"}
```



## � Scripts Principales

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción  
- `npm run test` - Ejecutar pruebas
- `npm run test:docker` - Pruebas en Docker
