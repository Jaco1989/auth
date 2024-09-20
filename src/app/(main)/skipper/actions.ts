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

// 1. Action to count approved permits
export async function countApprovedPermits(): Promise<
  number | { error: string }
> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Unauthorized Role");

    const approvedPermits = await prisma.permit.count({
      where: {
        userId: user.id,
        approved: true,
      },
    });

    revalidatePath("/skipper/permit/history/approved-tracker");
    return approvedPermits;
  } catch (error) {
    console.error("Error counting approved permits:", error);
    return { error: "Failed to count approved permits. Please try again." };
  }
}

// 2. Action to count permits where createdAt equals updatedAt
export async function pendingPermitsCount(): Promise<
  number | { error: string }
> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Unauthorized Role");

    const unmodifiedPermits = await prisma.permit.count({
      where: {
        userId: user.id,
        createdAt: {
          equals: prisma.permit.fields.updatedAt,
        },
      },
    });

    revalidatePath("/skipper/permit/history/pending-tracker");
    return unmodifiedPermits;
  } catch (error) {
    console.error("Error counting unmodified permits:", error);
    return { error: "Failed to count unmodified permits. Please try again." };
  }
}

// 3. Action to count permits which are not approved with updatedAt less than createdAt
export async function declinedPermitsCount(): Promise<
  number | { error: string }
> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Unauthorized Role");

    const anomalousPermits = await prisma.permit.count({
      where: {
        userId: user.id,
        approved: false,
        updatedAt: {
          lt: prisma.permit.fields.createdAt,
        },
      },
    });

    revalidatePath("/skipper/permit/history/declined-permit");
    return anomalousPermits;
  } catch (error) {
    console.error("Error counting anomalous permits:", error);
    return { error: "Failed to count anomalous permits. Please try again." };
  }
}
