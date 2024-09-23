"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchAllAdmins() {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged in");
    if (user.role !== "ADMIN")
      throw new Error("Unauthorized. Admin access required.");

    const admins = await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
      },
    });

    revalidatePath("/dashboard/admins"); // Adjust the path as needed
    return { admins };
  } catch (error) {
    console.error("Error fetching admins:", error);
    return { error: "Failed to fetch admins. Please try again." };
  }
}
