import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const totalUsers = await prisma.user.count();
        return Response.json({ totalUsers });
    } catch (error) {
        return Response.json({ error: "Failed to retrieve analytics data" });
    }
}

