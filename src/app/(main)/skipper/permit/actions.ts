"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPermitDataInclude, PermitData } from "@/lib/types";

export async function fetchPermits(): Promise<
  { permits: PermitData[] } | { error: string }
> {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized");

    const permits = await prisma.permit.findMany({
      include: getPermitDataInclude(),
      orderBy: {
        createdAt: "desc",
      },
    });

    return { permits };
  } catch (error) {
    console.error("Error fetching permits:", error);
    return { error: "Failed to fetch permits. Please try again." };
  }
}
