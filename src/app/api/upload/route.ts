import { NextResponse } from "next/server";
import path from "path";
import { mkdir } from "fs/promises";
import sharp from "sharp";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "projects";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 5MB limit." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate unique filename
    const uuid = crypto.randomUUID();
    const filename = `${uuid}.webp`;
    
    // Sanitize folder name to prevent path traversal
    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
    
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);

    // Convert to webp using sharp
    await sharp(buffer)
      .webp({ quality: 85 })
      .toFile(filePath);

    const url = `/uploads/${safeFolder}/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename
    }, { status: 201 });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

