import { NextResponse } from "next/server";
import { partnerService } from "@/server/services/partner.service";

/**
 * Route handler for /api/partners
 */

// GET /api/partners
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

// POST /api/partners
export async function POST(request: Request) {
  try {
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
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create partner" },
      { status: 400 }
    );
  }
}
