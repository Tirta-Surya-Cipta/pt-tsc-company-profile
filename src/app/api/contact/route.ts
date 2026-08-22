import { NextRequest, NextResponse } from "next/server";
import { contactService } from "@/server/services/contact.service";
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from "@/lib/security";

/**
 * Route handler for POST /api/contact
 */

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 submissions per 5 minutes per IP
    const clientIp = getClientIdentifier(request.headers);
    const rateLimit = checkRateLimit(clientIp, RATE_LIMITS.contact);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Terlalu banyak pesan dikirim. Silakan coba lagi nanti.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((rateLimit.resetAt - Date.now()) / 1000)
            ),
          },
        }
      );
    }

    const body = await request.json();
    const lead = await contactService.submitContactForm(body);

    return NextResponse.json({
      success: true,
      message: "Lead inquiry captured successfully",
      data: { id: lead.id },
    });
  } catch (error: any) {
    console.error("[CONTACT_POST_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process message. Please check input values." },
      { status: 400 }
    );
  }
}
