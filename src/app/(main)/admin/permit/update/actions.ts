"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const approvePermitSchema = z.object({
  id: z.number(),
});

export async function approvePermit(data: z.infer<typeof approvePermitSchema>) {
  try {
    // Validate user session
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    // Check if the user has the SKIPPER role
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
