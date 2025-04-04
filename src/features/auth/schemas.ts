import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1, "Password is required"),
});


export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .max(256, "Maximum 256 characters allowed"),
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(8, "Minimum 8 characters required")
    .max(256, "Maximum 256 characters allowed"),
});