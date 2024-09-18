import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
  role: z
    .enum(["USER", "ADMIN", "MONITOR", "DRIVER", "SKIPPER"])
    .default("USER"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

////////////////////////////////////////////////////////////////////////////////////

export const createPermitSchema = z.object({
  title: requiredString.max(100),
  companyName: requiredString.max(100),
  description: z.string().max(5000),
  location: requiredString,
  type: requiredString.max(100),
});

export type CreatePermitValues = z.infer<typeof createPermitSchema>;
