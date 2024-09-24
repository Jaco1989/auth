"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { catchSchema, CatchValues } from "@/lib/validation";

export async function submitCatch(
  catchData: CatchValues,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate user session
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    // Check if the user has the SKIPPER role (assuming you have roles)
    if (user.role !== "SKIPPER") {
      return { success: false, error: "Only skippers can submit catches." };
    }

    // Validate the input data
    const validatedData = catchSchema.parse(catchData);

    // Create the catch
    await prisma.catch.create({
      data: {
        userId: user.id,
        port: validatedData.port,
        logDate: validatedData.logDate,
        catchType: validatedData.catchType,
        quantity: validatedData.quantity,
        weight: validatedData.weight,
        country: validatedData.country,
        skipperName: validatedData.skipperName,
        permitHolder: validatedData.permitHolder,
        idNumber: validatedData.idNumber,
        permitType: validatedData.permitType,
        permitDate: validatedData.permitDate,
        vesselName: validatedData.vesselName,
        factoryName: validatedData.factoryName,
        factoryAddress: validatedData.factoryAddress,
        approved: false, // Set to false by default as per the schema
      },
    });

    // If successful, return success true
    return { success: true };
  } catch (error) {
    console.error("Error submitting catch:", error);

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something went wrong. Please try again." };
  }
}
