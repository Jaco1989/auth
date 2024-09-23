"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchAllSkippers() {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged in");
    if (user.role !== "ADMIN")
      throw new Error("Unauthorized. Admin access required.");

    const skippers = await prisma.user.findMany({
      where: {
        role: "SKIPPER",
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

    revalidatePath("/admin/skippers"); // Adjust the path as needed
    return { skippers };
  } catch (error) {
    console.error("Error fetching skippers:", error);
    return { error: "Failed to fetch skippers. Please try again." };
  }
}
