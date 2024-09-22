"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Existing action
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

// New action to fetch declined permits
export async function getDeclinedPermits(): Promise<
  DeclinedPermit[] | { error: string }
> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Unauthorized Role");

    const declinedPermits = await prisma.permit.findMany({
      where: {
        userId: user.id,
        approved: false,
        updatedAt: {
          lt: prisma.permit.fields.createdAt,
        },
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidatePath("/skipper/permit/history/declined-permit");
    return declinedPermits.map((permit) => ({
      ...permit,
      id: permit.id.toString(), // Convert id to string
    }));
  } catch (error) {
    console.error("Error fetching declined permits:", error);
    return { error: "Failed to fetch declined permits. Please try again." };
  }
}

export type DeclinedPermit = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DeclinedPermitsResult = DeclinedPermit[] | { error: string };
