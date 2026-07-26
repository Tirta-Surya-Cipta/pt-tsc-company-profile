import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
    try {
        // Cek apakah admin sudah ada
        const existingAdmin = await prisma.user.findUnique({
            where: { email: "admin@tscindo.net" }
        });

        if (existingAdmin) {
            return NextResponse.json({ message: "Admin account already exists!" });
        }

        // Hash password "admin123" (Bisa lu ganti password-nya)
        const hashedPassword = await bcrypt.hash("admin123", 10);

        // Buat user baru
        const admin = await prisma.user.create({
            data: {
                name: "Super Admin",
                email: "admin@tscindo.net",
                passwordHash: hashedPassword,
            }
        });

        return NextResponse.json({ message: "Admin created successfully!", user: admin.email });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
    }
}