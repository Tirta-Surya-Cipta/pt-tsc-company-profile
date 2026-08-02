import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email dan password wajib diisi.",
        },
        { status: 400 }
      );
    }

    console.log("================================");
    console.log("LOGIN ATTEMPT");
    console.log("Email Input :", email);
    console.log("Password Input :", password);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("User Found :", !!user);

    if (!user || !user.password) {
      console.log("User tidak ditemukan.");
      return NextResponse.json(
        {
          success: false,
          error: "Email atau password salah.",
        },
        { status: 401 }
      );
    }

    console.log("DB Email :", user.email);
    console.log("DB Hash :", user.password);

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Valid :", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Password tidak cocok.");
      return NextResponse.json(
        {
          success: false,
          error: "Email atau password salah.",
        },
        { status: 401 }
      );
    }

    const secret = process.env.AUTH_SECRET;

    if (!secret) {
      throw new Error("AUTH_SECRET belum diatur di .env");
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: "admin",
      },
      secret,
      {
        expiresIn: "7d",
      }
    );

    const cookieStore = await cookies();

    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("Login berhasil.");
    console.log("================================");

    return NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
      }
    );
  }
}