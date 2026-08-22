"use server";

import { projectSchema } from "@/lib/validations/project";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { verifyAdmin } from "@/server/auth/verify-admin";
import { isValidImageMagicBytes } from "@/lib/validations/upload";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function createProject(formData: FormData) {
  try {
    await verifyAdmin();
    
    // Extract thumbnail
    const thumbnailFile = formData.get("thumbnailFile") as File | null;
    let thumbnailUrl = "";
    
    if (thumbnailFile && thumbnailFile.size > 0) {
      if (!ALLOWED_MIME_TYPES.includes(thumbnailFile.type) || thumbnailFile.size > MAX_FILE_SIZE) {
        return { error: "File thumbnail tidak valid (harus JPG, PNG, WEBP & maksimal 5MB)" };
      }
      const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
      if (!isValidImageMagicBytes(buffer)) {
        return { error: "Format file binary thumbnail bukan gambar yang valid" };
      }
      thumbnailUrl = await uploadImageToCloudinary(buffer, "projects/thumbnails");
    }

    // Extract galleries
    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const galleryImages: string[] = [];
    
    for (const file of galleryFiles) {
      if (file.size > 0) {
        if (!ALLOWED_MIME_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE) {
          return { error: "Salah satu file galeri tidak valid (harus JPG, PNG, WEBP & maksimal 5MB)" };
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        if (!isValidImageMagicBytes(buffer)) {
          return { error: "Format file binary galeri bukan gambar yang valid" };
        }
        const url = await uploadImageToCloudinary(buffer, "projects/galleries");
        galleryImages.push(url);
      }
    }

    const rawData = {
      title: (formData.get("title") as string) || "",
      slug: (formData.get("slug") as string) || "",
      overview: (formData.get("overview") as string) || "",
      location: (formData.get("location") as string) || "Indonesia",
      projectYear: parseInt(formData.get("projectYear") as string) || new Date().getFullYear(),
      industryType: (formData.get("industryType") as string) || "General",
      applicationType: (formData.get("applicationType") as string) || "Standard",
      projectType: (formData.get("projectType") as string) || "Industrial",
      services: (formData.get("services") as string) || "General",
      challenge: (formData.get("challenge") as string) || "-",
      solution: (formData.get("solution") as string) || "-",
      result: (formData.get("result") as string) || "-",
      highlights: formData.getAll("highlights").map((h) => h.toString()),
      thumbnailImage: thumbnailUrl || "placeholder",
      galleryImages,
    };

    const validatedData = projectSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        error: "Validasi gagal",
        details: validatedData.error.flatten().fieldErrors,
      };
    }

    await prisma.project.create({
      data: validatedData.data,
    });

    revalidatePath("/projects");
    revalidatePath("/admin/dashboard");

    return { success: true, message: "Proyek berhasil dibuat" };
  } catch (error) {
    console.error("Error di createProject:", error);
    return { error: "Terjadi kesalahan saat menyimpan proyek." };
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      }
    });
    return projects;
  } catch (error) {
    console.error("Error getProjects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    if (project?.deletedAt) return null;
    return project;
  } catch (error) {
    console.error("Error getProjectBySlug:", error);
    return null;
  }
}

export async function updateProject(id: string, data: any) {
  try {
    await verifyAdmin();

    const validatedData = projectSchema.partial().safeParse(data);
    if (!validatedData.success) {
      return {
        error: "Validasi data update gagal",
        details: validatedData.error.flatten().fieldErrors,
      };
    }

    await prisma.project.update({
      where: { id },
      data: validatedData.data,
    });

    revalidatePath("/projects");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Proyek berhasil diperbarui" };
  } catch (error) {
    console.error("Error updateProject:", error);
    return { error: "Terjadi kesalahan saat memperbarui proyek" };
  }
}

export async function deleteProject(id: string) {
  try {
    await verifyAdmin();
    await prisma.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    revalidatePath("/projects");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Proyek berhasil dihapus" };
  } catch (error) {
    console.error("Error deleteProject:", error);
    return { error: "Terjadi kesalahan saat menghapus proyek" };
  }
}
