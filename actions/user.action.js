"use server";

import prisma from "@/lib/prisma";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        id: true,
      },
    });
    return users;
  } catch (err) {
    return err?.message;
  }
};
