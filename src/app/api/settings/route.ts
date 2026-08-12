import { NextResponse } from "next/server";

/**
 * Route handler for GET /api/settings
 */

export async function GET() {
  try {
    const settings = {
      id: 1,
      companyName: "PT Tirta Surya Cipta",
      contactEmail: "admin@tirtasuryacipta.com",
      metaTitle: "PT Tirta Surya Cipta - Industrial Automation & System Integration",
      metaDescription: "Specialist in PLC Programming, SCADA Systems, VSD, and Electrical Control Panels.",
    };

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error: any) {
    console.error("[SETTINGS_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
