"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Existing actions...

// Action to count pending permits
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

// New action to fetch pending permits
export async function getPendingPermits(): Promise<
  PendingPermit[] | { error: string }
> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Unauthorized Role");

    const pendingPermits = await prisma.permit.findMany({
      where: {
        userId: user.id,
        createdAt: {
          equals: prisma.permit.fields.updatedAt,
        },
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidatePath("/skipper/permit/history/pending-tracker");
    return pendingPermits.map((permit) => ({
      ...permit,
      id: permit.id.toString(), // Convert id to string
    }));
  } catch (error) {
    console.error("Error fetching pending permits:", error);
    return { error: "Failed to fetch pending permits. Please try again." };
  }
}

export type PendingPermit = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PendingPermitsResult = PendingPermit[] | { error: string };
