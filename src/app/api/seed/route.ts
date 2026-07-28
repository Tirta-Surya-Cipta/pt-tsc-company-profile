import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
    // Block in production
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Seed endpoint is disabled in production" }, { status: 403 });
    }

    try {
        const existingAdmin = await prisma.user.findUnique({
            where: { email: "admin@tscindo.net" }
        });

        if (existingAdmin) {
            return NextResponse.json({ message: "Admin account already exists!" });
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = await prisma.user.create({
            data: {
                name: "Super Admin",
                email: "admin@tscindo.net",
                password: hashedPassword,
            }
        });

        return NextResponse.json({ message: "Admin created successfully!", user: admin.email });
    } catch (error) {
        console.error("Seed error:", error); // ← tambah ini
        return NextResponse.json({
            error: "Failed to create admin",
            detail: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}