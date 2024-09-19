"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const approvePermitSchema = z.object({
  id: z.number(),
});

// Approve Permit Function
export async function approvePermit(data: z.infer<typeof approvePermitSchema>) {
  try {
    // Validate user session
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    // Check if the user has the ADMIN role
    if (user.role !== "ADMIN") {
      return { success: false, error: "Only admins can approve permits." };
    }
    const { id } = approvePermitSchema.parse(data);

    const updatedPermit = await prisma.permit.update({
      where: { id },
      data: { approved: true },
    });

    revalidatePath("/admin/permit");
    revalidatePath(`/skipper/permit/${id}`);
    revalidatePath(`/skipper/permit`);

    return { success: true, permit: updatedPermit };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Decline Permit Function
export async function declinePermit(data: z.infer<typeof approvePermitSchema>) {
  try {
    // Validate user session
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    // Check if the user has the ADMIN role
    if (user.role !== "ADMIN") {
      return { success: false, error: "Only admins can decline permits." };
    }
    const { id } = approvePermitSchema.parse(data);

    // Update the permit by setting the updateDate to a time before the createdAt
    const declinedPermit = await prisma.permit.update({
      where: { id },
      data: {
        updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24), // 24 hours before current time
      },
    });

    revalidatePath("/admin/permit");
    revalidatePath(`/skipper/permit/${id}`);
    revalidatePath(`/skipper/permit`);

    return { success: true, permit: declinedPermit };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
