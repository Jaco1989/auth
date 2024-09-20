"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchUserPermitCount(): Promise<
  { totalPermits: number; maxPermits: number } | { error: string }
> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Unauthorized Role");

    const totalPermits = await prisma.permit.count({
      where: {
        userId: user.id,
      },
    });

    // Assuming a fixed max permits value, adjust as needed
    const maxPermits = 50;

    revalidatePath("/skipper");
    return { totalPermits, maxPermits };
  } catch (error) {
    console.error("Error fetching user permit count:", error);
    return { error: "Failed to fetch permit count. Please try again." };
  }
}
