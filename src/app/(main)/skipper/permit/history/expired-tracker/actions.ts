"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Permit } from "@prisma/client";

// Type for the old permit, keeping the original id type and excluding userId
export type OldPermit = Omit<Permit, "userId">;

// Type for the result of getOldPermits, with id converted to string
export type OldPermitResult = Omit<OldPermit, "id"> & { id: string };

// Type for the overall result of getOldPermits
export type OldPermitsResult =
  | {
      permits: OldPermitResult[];
      total: number;
    }
  | { error: string };

export async function getOldPermits(
  page: number = 1,
  pageSize: number = 4,
): Promise<OldPermitsResult> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Unauthorized Role");

    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const totalPermits = await prisma.permit.count({
      where: {
        userId: user.id,
        createdAt: {
          lt: fiveDaysAgo,
        },
      },
    });

    const oldPermits = await prisma.permit.findMany({
      where: {
        userId: user.id,
        createdAt: {
          lt: fiveDaysAgo,
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    revalidatePath("/skipper/permit/history/expired-tracker");

    return {
      permits: oldPermits.map(
        (permit): OldPermitResult => ({
          ...permit,
          id: permit.id.toString(),
        }),
      ),
      total: totalPermits,
    };
  } catch (error) {
    console.error("Error fetching old permits:", error);
    return { error: "Failed to fetch old permits. Please try again." };
  }
}
