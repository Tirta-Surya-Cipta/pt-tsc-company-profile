import { z } from "zod";

/**
 * Zod validation schema for Partner CRUD operations
 */
export const partnerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Partner name must be at least 2 characters")
    .max(100, "Partner name must be under 100 characters"),
  logoUrl: z
    .string()
    .min(1, "Logo is required"),
  displayOrder: z
    .number()
    .int("Display order must be an integer")
    .min(0, "Display order must be 0 or greater")
    .default(0),
});

export type PartnerInput = z.infer<typeof partnerSchema>;
