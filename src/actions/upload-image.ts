"use server";

import { uploadImage } from "@/lib/cloudinary";

export async function uploadImageAction(formData: FormData): Promise<{
    success: boolean;
    url?: string;
    publicId?: string;
    error?: string;
}> {
    try {
        const file = formData.get("file") as File;

        if (!file || file.size === 0) {
            return { success: false, error: "No file provided" };
        }

        // Validasi MIME type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            return { success: false, error: "Only JPG, PNG, and WEBP are allowed" };
        }

        // Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            return { success: false, error: "File size must be under 5MB" };
        }

        // Convert File ke Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload ke Cloudinary — auto convert ke webp
        const result = await uploadImage(buffer, "projects");

        return { success: true, url: result.url, publicId: result.publicId };
    } catch (error: any) {
        console.error("Upload error:", error);
        return { success: false, error: error.message || "Upload failed" };
    }
}