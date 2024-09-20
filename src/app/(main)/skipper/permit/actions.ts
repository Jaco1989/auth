"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPermitDataInclude, PermitData } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function fetchPermits(): Promise<
  { permits: PermitData[] } | { error: string }
> {
  try {
    // First Apply backend security check before access is granted to use actions
    const { user } = await validateRequest();
    if (!user) throw new Error("Not logged In");
    if (user.role !== "SKIPPER") throw new Error("Not Unauthorized Role");

    const permits = await prisma.permit.findMany({
      include: getPermitDataInclude(),
      orderBy: {
        createdAt: "desc",
      },
    });
    revalidatePath("/skipper/permit");
    return { permits };
  } catch (error) {
    console.error("Error fetching permits:", error);
    return { error: "Failed to fetch permits. Please try again." };
  }
}
