import { z } from "zod";

/**
 * Zod validation schema for Client CRUD operations
 */
export const clientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Client name must be at least 2 characters")
    .max(100, "Client name must be under 100 characters"),
  logoUrl: z
    .string()
    .min(1, "Logo is required"),
  displayOrder: z
    .number()
    .int("Display order must be an integer")
    .min(0, "Display order must be 0 or greater")
    .default(0),
});

export type ClientInput = z.infer<typeof clientSchema>;
