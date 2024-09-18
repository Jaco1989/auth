"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createPermitSchema, CreatePermitValues } from "@/lib/validation";

export async function submitPermit(
  permitData: CreatePermitValues,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate user session
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    // Check if the user has the SKIPPER role
    if (user.role !== "SKIPPER") {
      return { success: false, error: "Only skippers can create permits." };
    }

    // Validate the input data
    const validatedData = createPermitSchema.parse(permitData);

    // Create the permit
    await prisma.permit.create({
      data: {
        title: validatedData.title,
        type: validatedData.type,
        location: validatedData.location,
        description: validatedData.description,
        companyName: validatedData.companyName,
        userId: user.id,
        approved: false, // Set to false by default as per the schema
      },
    });

    // If successful, return success true
    return { success: true };
  } catch (error) {
    console.error("Error submitting permit:", error);

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something went wrong. Please try again." };
  }
}
