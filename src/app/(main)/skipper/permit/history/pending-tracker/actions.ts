import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
