"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPermitDataInclude, PermitData } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function fetchPermits(
  page: number,
  pageSize: number,
): Promise<{ permits: PermitData[]; totalCount: number } | { error: string }> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Unauthorized Role");

    const [permits, totalCount] = await Promise.all([
      prisma.permit.findMany({
        where: { userId: user.id }, // Filter permits by the current user's ID
        include: getPermitDataInclude(),
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.permit.count({ where: { userId: user.id } }), // Count only the current user's permits
    ]);

    revalidatePath("/skipper/permit");
    return { permits, totalCount };
  } catch (error) {
    console.error("Error fetching permits:", error);
    return { error: "Failed to fetch permits. Please try again." };
  }
}
