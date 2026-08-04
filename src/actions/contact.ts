"use server";

import { contactSchema } from "@/server/validators/contact.validator";
import { prisma } from "@/lib/prisma";

export async function sendContactForm(formData: FormData | any) {
  try {
    let data;
    if (formData instanceof FormData) {
      data = Object.fromEntries(formData.entries());
    } else {
      data = formData;
    }

    const validatedData = contactSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        error: "Validasi gagal",
        details: validatedData.error.flatten().fieldErrors
      };
    }

    await prisma.contactMessage.create({
      data: validatedData.data,
    });

    return { success: true, message: "Pesan berhasil dikirim" };
  } catch (error) {
    console.error("Error di sendContactForm:", error);
    return { error: "Terjadi kesalahan server saat mengirim pesan." };
  }
}
