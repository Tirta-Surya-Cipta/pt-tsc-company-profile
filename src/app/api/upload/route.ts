import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { verifyAdmin } from "@/server/auth/verify-admin";
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    // Authorization: Admin only
    await verifyAdmin();

    // Rate limiting: 10 uploads per 5 minutes per IP
    const clientIp = getClientIdentifier(req.headers);
    const rateLimit = checkRateLimit(clientIp, RATE_LIMITS.upload);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Upload limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validasi MIME type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Only JPG, PNG, and WEBP are allowed" },
        { status: 400 }
      );
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be under 5MB" },
        { status: 400 }
      );
    }

    // Convert ke Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Magic Bytes Verification (Security Fix)
    const { isValidImageMagicBytes } = await import("@/lib/validations/upload");
    if (!isValidImageMagicBytes(buffer)) {
      return NextResponse.json(
        { success: false, error: "File binary content is not a valid image format" },
        { status: 400 }
      );
    }

    // Upload ke Cloudinary — auto convert ke webp
    const url = await uploadImageToCloudinary(buffer, "pt-tsc/projects");

    // Extract filename dari URL
    const filename = url.split("/").pop() ?? file.name;

    return NextResponse.json({
      success: true,
      url,
      filename,
    });
  } catch (error: any) {
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("[UPLOAD_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}