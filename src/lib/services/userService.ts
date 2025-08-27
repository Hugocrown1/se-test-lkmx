import { prisma } from "@/lib/db";
import { User } from "@prisma/client";

export const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};


export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
  return await prisma.user.create({
    data,
  });
};


