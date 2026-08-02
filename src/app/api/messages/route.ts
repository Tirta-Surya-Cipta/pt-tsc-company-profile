import { NextRequest, NextResponse } from "next/server";
import { messageService } from "@/server/services/message.service";
import { MessageType } from "@/types";
import { verifyAdmin } from "@/server/auth/verify-admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await verifyAdmin();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const typeFilter = (searchParams.get("type") as "ALL" | MessageType) || "ALL";

    const messages = await messageService.getAllMessages(search, typeFilter);
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
