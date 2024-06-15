"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { AuthUser } from "@/modules/auth/types";

export default async function getUser(): Promise<AuthUser | null> {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const session = await prisma.session.findUnique({
      where: {
        token,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!session) return null;

    if (!session.user) return null;

    return session.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
