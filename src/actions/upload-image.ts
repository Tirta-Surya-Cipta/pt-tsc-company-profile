"use server";

import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { verifyAdmin } from "@/server/auth/verify-admin";
import { isValidImageMagicBytes } from "@/lib/validations/upload";

export async function uploadImageAction(formData: FormData): Promise<{
    success: boolean;
    url?: string;
    publicId?: string;
    error?: string;
}> {
    try {
        await verifyAdmin();

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

        // Magic Bytes Verification (Security Fix)
        if (!isValidImageMagicBytes(buffer)) {
            return { success: false, error: "File binary content is not a valid image format" };
        }

        // Upload ke Cloudinary
        const url = await uploadImageToCloudinary(buffer, "projects");

        return { success: true, url };
    } catch (error: any) {
        if (error.name === "UnauthorizedError") {
            return { success: false, error: "Unauthorized" };
        }
        if (error.name === "ForbiddenError") {
            return { success: false, error: "Forbidden" };
        }
        console.error("Upload action error:", error);
        return { success: false, error: "Upload failed" };
    }
}