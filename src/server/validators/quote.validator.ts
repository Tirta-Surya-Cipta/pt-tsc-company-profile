import { z } from "zod";

/**
 * Zod validation schema for quote request submissions.
 * Enforces length limits, email format, and required fields
 * to prevent abuse and ensure data quality.
 */
export const quoteSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Must be a valid email address")
    .max(254, "Email must be under 254 characters"),
  companyName: z
    .string()
    .max(100, "Company name must be under 100 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .max(20, "Phone number must be under 20 characters")
    .optional()
    .or(z.literal("")),
  serviceType: z
    .string()
    .max(100, "Service type must be under 100 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be under 5000 characters"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
