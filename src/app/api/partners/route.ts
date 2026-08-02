import { NextResponse } from "next/server";
import { partnerService } from "@/server/services/partner.service";
import { verifyAdmin } from "@/server/auth/verify-admin";

export const dynamic = "force-dynamic";

/**
 * Route handler for /api/partners
 */

// GET /api/partners (PUBLIC — used by homepage)
export async function GET() {
  try {
    const partners = await partnerService.getAllPartners();

    return NextResponse.json({
      success: true,
      partners,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch partners" },
      { status: 500 }
    );
  }
}

// POST /api/partners (ADMIN ONLY)
export async function POST(request: Request) {
  try {
    await verifyAdmin();

    const body = await request.json();
    const newPartner = await partnerService.createPartner(body);

    return NextResponse.json(
      {
        success: true,
        message: "Partner created successfully",
        partner: newPartner,
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
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create partner" },
      { status: 400 }
    );
  }
}
