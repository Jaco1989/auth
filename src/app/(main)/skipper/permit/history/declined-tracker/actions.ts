import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
