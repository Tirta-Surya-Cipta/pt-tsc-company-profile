import { z } from "zod";

/**
 * Zod validation schema for project CRUD operations
 */
export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be under 150 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase alphanumeric characters and hyphens")
    .max(150, "Slug must be under 150 characters"),
  overview: z.string().min(10, "Overview must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  projectYear: z.number().int().min(1900).max(2100),
  industryType: z.string().min(2, "Industry type is required"),
  applicationType: z.string().min(2, "Application type is required"),
  projectType: z.string().min(2, "Project type is required"),
  services: z.string().min(2, "Services is required"),
  challenge: z.string().min(10, "Challenge must be at least 10 characters"),
  solution: z.string().min(10, "Solution must be at least 10 characters"),
  result: z.string().min(10, "Result must be at least 10 characters"),
  highlights: z.array(z.string()).default([]),
  thumbnailImage: z.string().min(1, "Thumbnail image is required"),
  galleryImages: z.array(z.string()).default([]),
});

export type ProjectInput = z.infer<typeof projectSchema>;
