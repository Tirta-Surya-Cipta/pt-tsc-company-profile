import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return NextResponse.redirect(new URL("/admin/login", req.url));
}

// GET handler intentionally removed to prevent CSRF logout attacks.
// A malicious site could embed <img src="/api/admin/logout"> to force logout.
// Only POST with SameSite cookie protection is allowed.