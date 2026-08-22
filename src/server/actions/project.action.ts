"use server";

import { projectSchema } from "../validators/project.validator";
import { projectService } from "../services/project.service";
import { ActionResponse } from "./auth.action";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "../auth/verify-admin";

/**
 * Server Actions to manage projects inside the admin dashboard
 */

export async function createProjectAction(
  prevState: any,
  formData: FormData
): Promise<ActionResponse<any>> {
  try {
    await verifyAdmin();
  } catch (error: any) {
    console.error("[CREATE_PROJECT_ACTION_AUTH_ERROR]", error);
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  // Simple mapping, in a full client form validation TanStack query or react-hook-form can send JSON
  const rawData = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    client: formData.get("client") as string,
    location: formData.get("location") as string,
    completedAt: formData.get("completedAt") as string || undefined,
    status: (formData.get("status") as string) || "COMPLETED",
    serviceId: formData.get("serviceId") as string || undefined,
    imageUrls: formData.get("imageUrls") ? JSON.parse(formData.get("imageUrls") as string) : [],
    applicationAreaIds: formData.get("applicationAreaIds") ? JSON.parse(formData.get("applicationAreaIds") as string) : [],
  };

  const validation = projectSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const project = await projectService.createProject(validation.data);
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    return {
      success: true,
      message: "Project successfully created",
      data: project,
    };
  } catch (error: any) {
    console.error("[CREATE_PROJECT_ACTION_ERROR]", error);
    return {
      success: false,
      message: "Failed to create project",
    };
  }
}

export async function updateProjectAction(
  id: string,
  prevState: any,
  formData: FormData
): Promise<ActionResponse<any>> {
  try {
    await verifyAdmin();
  } catch (error: any) {
    console.error("[UPDATE_PROJECT_ACTION_AUTH_ERROR]", error);
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  const rawData: any = {};
  
  if (formData.has("title")) rawData.title = formData.get("title");
  if (formData.has("slug")) rawData.slug = formData.get("slug");
  if (formData.has("description")) rawData.description = formData.get("description");
  if (formData.has("content")) rawData.content = formData.get("content");
  if (formData.has("client")) rawData.client = formData.get("client");
  if (formData.has("location")) rawData.location = formData.get("location");
  if (formData.has("completedAt")) rawData.completedAt = formData.get("completedAt");
  if (formData.has("status")) rawData.status = formData.get("status");
  if (formData.has("serviceId")) rawData.serviceId = formData.get("serviceId");

  const validation = projectSchema.partial().safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const updated = await projectService.updateProject(id, validation.data);
    revalidatePath("/projects");
    revalidatePath(`/projects/${updated.slug}`);
    return {
      success: true,
      message: "Project successfully updated",
      data: updated,
    };
  } catch (error: any) {
    console.error("[UPDATE_PROJECT_ACTION_ERROR]", error);
    return {
      success: false,
      message: "Failed to update project",
    };
  }
}

export async function deleteProjectAction(id: string): Promise<ActionResponse<any>> {
  try {
    await verifyAdmin();
    const deleted = await projectService.deleteProject(id);
    revalidatePath("/projects");
    return {
      success: true,
      message: "Project successfully deleted",
      data: { id: deleted.id },
    };
  } catch (error: any) {
    console.error("[DELETE_PROJECT_ACTION_ERROR]", error);
    return {
      success: false,
      message: "Failed to delete project",
    };
  }
}
