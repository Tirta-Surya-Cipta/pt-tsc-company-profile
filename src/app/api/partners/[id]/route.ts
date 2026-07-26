import { NextResponse } from "next/server";
import { partnerService } from "@/server/services/partner.service";

// GET /api/partners/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const partner = await partnerService.getPartnerById(id);

    return NextResponse.json({
      success: true,
      partner,
    });
  } catch (error: any) {
    if (error.message && error.message.includes("not found")) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch partner" },
      { status: 500 }
    );
  }
}

// PUT /api/partners/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedPartner = await partnerService.updatePartner(id, body);

    return NextResponse.json({
      success: true,
      message: "Partner updated successfully",
      partner: updatedPartner,
    });
  } catch (error: any) {
    if (error.message && error.message.includes("not found")) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update partner" },
      { status: 500 }
    );
  }
}

// DELETE /api/partners/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await partnerService.deletePartner(id);

    return NextResponse.json({
      success: true,
      message: "Partner deleted successfully",
    });
  } catch (error: any) {
    if (error.message && error.message.includes("not found")) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete partner" },
      { status: 500 }
    );
  }
}
