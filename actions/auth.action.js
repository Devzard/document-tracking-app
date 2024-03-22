"use server";

import * as argon2 from "argon2";
import { generateId } from "lucia";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";

import prisma from "@/lib/prisma";

export async function signUp(values) {
  const hashedPassword = await argon2.hash(values.password);
  const userId = generateId(15);

  try {
    let res = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (res) {
      throw Error("> Email already exists!");
    }

    await prisma.user.create({
      data: {
        id: userId,
        email: values.email,
        name: values.name,
        password: hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    console.log("> New User Signed Up", userId);

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (e) {
    return {
      error: e?.message,
    };
  }
}

export async function signIn(values) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (!existingUser || !existingUser.password) {
      return {
        error: "User not found",
      };
    }

    const isValidPassword = await argon2.verify(
      existingUser.password,
      values.password,
    );

    if (!isValidPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: "Logged in successfully",
    };
  } catch (e) {
    return {
      error: e?.message,
    };
  }
}

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (err) {
    return {
      error: err?.message,
    };
  }
};
