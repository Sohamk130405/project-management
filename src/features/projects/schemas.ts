import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .max(256, "Maximum 256 characters allowed"),
  image: z
    .union([
      z.string().transform((value) => (value === "" ? undefined : value)),
      z.instanceof(File),
    ])
    .optional(),
  workspaceId: z.string(),
});
 