import { NextResponse } from "next/server";
import { clientService } from "@/server/services/client.service";
import { verifyAdmin } from "@/server/auth/verify-admin";

export const dynamic = "force-dynamic";

/**
 * Route handler for /api/clients
 */

// GET /api/clients (PUBLIC — used by homepage)
export async function GET() {
  try {
    const clients = await clientService.getAllClients();

    return NextResponse.json({
      success: true,
      clients,
    });
  } catch (error: any) {
    console.error("[CLIENTS_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

// POST /api/clients (ADMIN ONLY)
export async function POST(request: Request) {
  try {
    await verifyAdmin();

    const body = await request.json();
    const newClient = await clientService.createClient(body);

    return NextResponse.json(
      {
        success: true,
        message: "Client created successfully",
        client: newClient,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("[CLIENTS_POST_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create client" },
      { status: 400 }
    );
  }
}
