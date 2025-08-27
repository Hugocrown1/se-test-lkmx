import { prisma } from "@/lib/db";

export const GET = async () => {
  try {

    // Test de conexión a la base de datos
    await prisma.$queryRaw`SELECT 1`; 
    return Response.json({ ok: true });

  } catch (error) {

    // Manejo de errores
    if (error instanceof Error) {
      return Response.json({ ok: false, message: error.message });
    }
    return Response.json({ ok: false, message: "Unexpected error" });
  }
}
