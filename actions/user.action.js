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

export const getUser = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return { success: true, data: user };
  } catch (err) {
    return err?.message;
  }
};
