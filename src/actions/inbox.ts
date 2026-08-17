"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import { verifyAdmin } from "@/server/auth/verify-admin";
import { quoteSchema } from "@/server/validators/quote.validator";
import { escapeHtml, stripHeaderInjection } from "@/lib/security";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

// Nodemailer Transporter Configuration using custom SMTP host/port from env
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.tirtasuryacipta.com",
  port: parseInt(process.env.EMAIL_PORT || "465", 10),
  secure: process.env.EMAIL_PORT === "465",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function submitQuoteRequest(formData: FormData) {
  try {
    const rawData = {
      fullName: (formData.get("fullName") as string) || "",
      email: (formData.get("email") as string) || "",
      companyName: (formData.get("companyName") as string) || "",
      phone: (formData.get("phone") as string) || "",
      serviceType: (formData.get("serviceType") as string) || "",
      message: (formData.get("message") as string) || "",
    };

    const validation = quoteSchema.safeParse(rawData);
    if (!validation.success) {
      return {
        error: "Validasi gagal. Pastikan semua bidang terisi dengan benar.",
        details: validation.error.flatten().fieldErrors,
      };
    }

    const { fullName, email, companyName, phone, serviceType, message } = validation.data;

    const safeCompanyName = companyName || "Tidak disebutkan";
    const safePhone = phone || "Tidak disebutkan";
    const safeServiceType = serviceType || "Lain-lain";

    // Handle file attachment upload to Cloudinary
    const file = formData.get("attachment") as File | null;
    let attachmentUrl = "";

    if (file && file.size > 0) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        attachmentUrl = await uploadFileToCloudinary(buffer, "attachments", "auto");
      } catch (uploadError) {
        console.error("Gagal mengunggah lampiran ke Cloudinary:", uploadError);
        attachmentUrl = "Gagal diunggah";
      }
    }

    let projectScope = `Layanan: ${safeServiceType}\n\nDetail:\n${message}`;
    if (attachmentUrl) {
      projectScope += `\n\n[Attachment]: ${attachmentUrl}`;
    }

    // 1. Simpan ke Database
    const newQuote = await prisma.quoteRequest.create({
      data: {
        fullName,
        email,
        companyName: safeCompanyName,
        phone: safePhone,
        projectScope,
      },
    });

    // 2. Kirim Email Notifikasi ke Admin (with HTML escaping and header sanitization)
    try {
      const safeSubjectName = stripHeaderInjection(fullName);
      const safeAdminEmail = process.env.ADMIN_RECEIVER_EMAIL;

      if (safeAdminEmail) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: safeAdminEmail,
          subject: `[NEW QUOTE] Permintaan Quote Baru dari ${safeSubjectName}`,
          html: `
            <h3>Ada Permintaan Quote Baru!</h3>
            <p><b>Nama:</b> ${escapeHtml(fullName)}</p>
            <p><b>Email:</b> ${escapeHtml(email)}</p>
            <p><b>Telepon:</b> ${escapeHtml(safePhone)}</p>
            <p><b>Perusahaan:</b> ${escapeHtml(safeCompanyName)}</p>
            <p><b>Detail Project:</b></p>
            <blockquote><pre style="font-family: inherit;">${escapeHtml(projectScope)}</pre></blockquote>
          `,
        });
      }
    } catch (emailError) {
      console.error("Gagal kirim email notifikasi quote:", emailError);
    }

    // Refresh tampilan admin
    revalidatePath("/admin/dashboard");

    return { success: true, message: "Quote berhasil dikirim!", data: newQuote };

  } catch (error: any) {
    console.error("Quote Submission Error:", error);
    return { error: "Gagal mengirim quote. Silakan coba lagi nanti." };
  }
}

export async function getInboxMessages() {
  try {
    await verifyAdmin();

    const [contacts, quotes] = await Promise.all([
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.quoteRequest.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const formattedContacts = contacts.map((c) => ({
      id: c.id,
      type: "CONTACT",
      name: c.fullName,
      email: c.email,
      message: c.subject ? `[${c.subject}] ${c.message}` : c.message,
      createdAt: c.createdAt,
    }));

    const formattedQuotes = quotes.map((q) => ({
      id: q.id,
      type: "QUOTE",
      name: q.fullName,
      email: q.email,
      message: q.projectScope,
      createdAt: q.createdAt,
    }));

    const allMessages = [...formattedContacts, ...formattedQuotes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return allMessages;
  } catch (error) {
    console.error("Gagal mengambil pesan inbox:", error);
    return [];
  }
}