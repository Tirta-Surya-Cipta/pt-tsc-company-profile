import { NextRequest, NextResponse } from "next/server";
import { messageService } from "@/server/services/message.service";
import { MessageType } from "@/types";
import { verifyAdmin } from "@/server/auth/verify-admin";

function isValidType(type: string): type is MessageType {
  return type === "CONTACT" || type === "QUOTE";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    await verifyAdmin();

    const resolvedParams = await params;
    const typeUpper = resolvedParams.type.toUpperCase();
    const id = resolvedParams.id;

    if (!isValidType(typeUpper)) {
      return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });
    }

    const message = await messageService.getMessageById(typeUpper, id);
    if (!message) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to fetch message detail:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    await verifyAdmin();

    const resolvedParams = await params;
    const typeUpper = resolvedParams.type.toUpperCase();
    const id = resolvedParams.id;

    if (!isValidType(typeUpper)) {
      return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });
    }

    await messageService.deleteMessage(typeUpper, id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to delete message:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
