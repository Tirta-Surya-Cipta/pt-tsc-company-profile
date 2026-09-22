import { NextResponse } from "next/server";
import { clientService } from "@/server/services/client.service";
import { verifyAdmin } from "@/server/auth/verify-admin";

export const dynamic = "force-dynamic";

// GET /api/clients/[id] (ADMIN ONLY)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await verifyAdmin();

    const { id } = await params;
    const client = await clientService.getClientById(id);

    return NextResponse.json({
      success: true,
      client,
    });
  } catch (error: any) {
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    if (error.message && error.message.includes("not found")) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }
    console.error("[CLIENT_GET_ID_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch client" },
      { status: 500 }
    );
  }
}

// PUT /api/clients/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await verifyAdmin();

    const { id } = await params;
    const body = await request.json();

    const updatedClient = await clientService.updateClient(id, body);

    return NextResponse.json({
      success: true,
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error: any) {
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    if (error.message && error.message.includes("not found")) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }
    console.error("[CLIENT_PUT_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to update client" },
      { status: 400 }
    );
  }
}

// DELETE /api/clients/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await verifyAdmin();

    const { id } = await params;

    await clientService.deleteClient(id);

    return NextResponse.json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error: any) {
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    if (error.message && error.message.includes("not found")) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }
    console.error("[CLIENT_DELETE_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete client" },
      { status: 500 }
    );
  }
}
