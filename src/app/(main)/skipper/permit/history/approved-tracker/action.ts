"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ApprovedPermit = {
  id: number; // Changed from string to number
  createdAt: Date;
  updatedAt: Date; // Add updatedAt to the ApprovedPermit type if needed
};

export type ApprovedPermitsResult = ApprovedPermit[] | { error: string };

export async function getApprovedPermits(): Promise<ApprovedPermitsResult> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Unauthorized Role");

    const approvedPermits = await prisma.permit.findMany({
      where: {
        userId: user.id,
        approved: true,
      },
      select: {
        id: true,
        createdAt: true, // Ensure createdAt is selected
        updatedAt: true,
      },
    });

    revalidatePath("/skipper/permit/history/approved-tracker");
    return approvedPermits;
  } catch (error) {
    console.error("Error fetching approved permits:", error);
    return { error: "Failed to fetch approved permits. Please try again." };
  }
}
