"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchAllDrivers() {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged in");
    if (user.role !== "ADMIN")
      throw new Error("Unauthorized. Admin or Skipper access required.");

    const drivers = await prisma.user.findMany({
      where: {
        role: "DRIVER",
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

    revalidatePath("/dashboard/drivers"); // Adjust the path as needed
    return { drivers };
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return { error: "Failed to fetch drivers. Please try again." };
  }
}
