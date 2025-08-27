import { createUser, getUsers } from "@/lib/services/userService";

export async function GET() {
  try {
    const users = await getUsers();
    return Response.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return Response.json({ error: "Failed to retrieve users" });
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const newUser = await createUser(userData);
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Failed to create user" });
  }
}
