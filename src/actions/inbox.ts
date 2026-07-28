"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

// Konfigurasi transporter Email (Gunakan SMTP / Gmail App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function submitQuoteRequest(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    
    // Fallback opsional
    const companyName = (formData.get("companyName") as string) || "Tidak disebutkan";
    const phone = (formData.get("phone") as string) || "Tidak disebutkan";
    
    // UBAH DISINI: Gabungkan serviceType dan message ke dalam projectScope
    const serviceType = (formData.get("serviceType") as string) || "Lain-lain";
    let projectScope = `Layanan: ${serviceType}\n\nDetail:\n${message}`;

    // Handle File Attachment
    const attachment = formData.get("attachment") as File | null;
    let attachmentUrl = "";

    if (attachment && attachment.size > 0) {
      if (attachment.size > 10 * 1024 * 1024) {
        return { error: "File terlalu besar. Maksimal 10MB." };
      }
      try {
        const bytes = await attachment.arrayBuffer();
        const buffer = Buffer.from(bytes);
        attachmentUrl = await uploadImageToCloudinary(buffer, "quotes", "auto");
        projectScope += `\n\n[Attachment]: ${attachmentUrl}`;
      } catch (err) {
        console.error("Failed to upload attachment:", err);
        // Continue even if upload fails
        projectScope += `\n\n[Attachment]: Gagal diunggah`;
      }
    }

    // Validasi manual sederhana
    if (!fullName || !email || !message) {
      return { error: "Nama, Email, dan Pesan wajib diisi!" };
    }

    // Simpan ke Database
    const newQuote = await prisma.quoteRequest.create({
      data: {
        fullName,
        email,
        companyName,
        phone,
        projectScope,
      },
    });

    // Refresh tampilan admin
    revalidatePath("/admin/dashboard");
    
    return { success: true, message: "Quote berhasil dikirim!", data: newQuote };

  } catch (error: any) {
    console.error("Quote Error:", error);
    return { error: "Gagal mengirim quote: " + error.message };
  }
}