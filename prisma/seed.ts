import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Verificar si ya hay usuarios
  const userCount = await prisma.user.count()
  
  if (userCount > 0) {
    console.log(`Ya existen ${userCount} usuarios en la base de datos`)
    return
  }

  // Crear usuarios de prueba
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'juan.perez@example.com',
        name: 'Juan Pérez',
      },
    }),
    prisma.user.create({
      data: {
        email: 'maria.garcia@example.com',
        name: 'María García',
      },
    }),
    prisma.user.create({
      data: {
        email: 'carlos.lopez@example.com',
        name: 'Carlos López',
      },
    }),
  ])

  users.forEach(user => {
    console.log(`   - ${user.name} (${user.email})`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
  })
