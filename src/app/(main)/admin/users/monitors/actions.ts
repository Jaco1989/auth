"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchAllMonitors() {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged in");
    if (user.role !== "ADMIN")
      throw new Error("Unauthorized. Admin or Skipper access required.");

    const monitors = await prisma.user.findMany({
      where: {
        role: "MONITOR",
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

    revalidatePath("/dashboard/monitors"); // Adjust the path as needed
    return { monitors };
  } catch (error) {
    console.error("Error fetching monitors:", error);
    return { error: "Failed to fetch monitors. Please try again." };
  }
}
