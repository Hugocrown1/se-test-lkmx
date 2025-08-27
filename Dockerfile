# Usar imagen base de Node.js
FROM node:18-alpine AS base

# Instalar dependencias necesarias
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Etapa de dependencias
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Etapa de construcción
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables de entorno para el build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Generar cliente de Prisma
RUN npx prisma generate

# Construir la aplicación
RUN npx next build

# Etapa de producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Instalar netcat para verificar conexiones
RUN apk add --no-cache netcat-openbsd

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar Prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]