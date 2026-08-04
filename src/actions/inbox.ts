"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

// Konfigurasi transporter Email (Gunakan SMTP / Gmail App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Set di file .env lu
    pass: process.env.EMAIL_PASS, // Set di file .env lu
  },
});

export async function submitQuoteRequest(formData: FormData) {
  console.log("Data diterima:", formData);
  try {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Fallback opsional
    const companyName = (formData.get("companyName") as string) || "Tidak disebutkan";
    const phone = (formData.get("phone") as string) || "Tidak disebutkan";

    // Gabungkan serviceType dan message ke dalam projectScope
    const serviceType = (formData.get("serviceType") as string) || "Lain-lain";
    const projectScope = `Layanan: ${serviceType}\n\nDetail:\n${message}`;

    // Validasi manual sederhana
    if (!fullName || !email || !message) {
      return { error: "Nama, Email, dan Pesan wajib diisi!" };
    }

    // 1. Simpan ke Database
    const newQuote = await prisma.quoteRequest.create({
      data: {
        fullName,
        email,
        companyName,
        phone,
        projectScope,
      },
    });

    // 2. Kirim Email Notifikasi ke Admin
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_RECEIVER_EMAIL, // Email yang mau nerima notif
        subject: `[NEW QUOTE] Permintaan Quote Baru dari ${fullName}`,
        html: `
          <h3>Ada Permintaan Quote Baru!</h3>
          <p><b>Nama:</b> ${fullName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Telepon:</b> ${phone}</p>
          <p><b>Perusahaan:</b> ${companyName}</p>
          <p><b>Detail Project:</b></p>
          <blockquote><pre style="font-family: inherit;">${projectScope}</pre></blockquote>
        `,
      });
    } catch (emailError) {
      // Kita log aja error emailnya, supaya response success tetap balik ke FE 
      // karena data sudah berhasil masuk ke Database.
      console.error("Gagal kirim email:", emailError);
    }

    // Refresh tampilan admin
    revalidatePath("/admin/dashboard");

    return { success: true, message: "Quote berhasil dikirim!", data: newQuote };

  } catch (error: any) {
    console.error("Quote Error:", error);
    return { error: "Gagal mengirim quote: " + error.message };
  }
}

export async function getInboxMessages() {
  try {
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