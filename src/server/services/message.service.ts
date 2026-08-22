import { contactRepository } from "../repositories/contact.repository";
import { quoteRepository } from "../repositories/quote.repository";
import { AdminMessage, MessageType } from "@/types";

export class MessageService {
  /**
   * Menggabungkan semua ContactMessage dan QuoteRequest menjadi satu array AdminMessage
   * Diurutkan berdasarkan createdAt descending.
   */
  async getAllMessages(
    search?: string,
    typeFilter: "ALL" | MessageType = "ALL"
  ): Promise<AdminMessage[]> {
    const [contacts, quotes] = await Promise.all([
      contactRepository.findAll(),
      quoteRepository.findAll(),
    ]);

    let unifiedMessages: AdminMessage[] = [];

    // Transform contacts
    if (typeFilter === "ALL" || typeFilter === "CONTACT") {
      unifiedMessages = unifiedMessages.concat(
        contacts.map((c) => ({
          id: c.id,
          type: "CONTACT" as MessageType,
          fullName: c.fullName,
          companyName: c.companyName || "-",
          email: c.email,
          phone: c.phone || "-",
          subject: c.subject,
          serviceType: c.serviceType || undefined,
          message: c.message,
          createdAt: c.createdAt,
        }))
      );
    }

    // Transform quotes
    if (typeFilter === "ALL" || typeFilter === "QUOTE") {
      unifiedMessages = unifiedMessages.concat(
        quotes.map((q) => ({
          id: q.id,
          type: "QUOTE" as MessageType,
          fullName: q.fullName,
          companyName: q.companyName,
          email: q.email,
          phone: q.phone,
          subject: "Request for Quote",
          serviceType: undefined,
          message: q.projectScope,
          createdAt: q.createdAt,
        }))
      );
    }

    // Sort combined array by date descending
    unifiedMessages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Apply search filter if provided
    if (search) {
      const lowerSearch = search.toLowerCase();
      unifiedMessages = unifiedMessages.filter(
        (m) =>
          m.fullName.toLowerCase().includes(lowerSearch) ||
          m.companyName.toLowerCase().includes(lowerSearch) ||
          m.email.toLowerCase().includes(lowerSearch) ||
          m.subject.toLowerCase().includes(lowerSearch)
      );
    }

    return unifiedMessages;
  }

  async getMessageById(type: MessageType, id: string): Promise<AdminMessage | null> {
    if (type === "CONTACT") {
      const c = await contactRepository.findById(id);
      if (!c) return null;
      return {
        id: c.id,
        type: "CONTACT",
        fullName: c.fullName,
        companyName: c.companyName || "-",
        email: c.email,
        phone: c.phone || "-",
        subject: c.subject,
        serviceType: c.serviceType || undefined,
        message: c.message,
        createdAt: c.createdAt,
      };
    } else if (type === "QUOTE") {
      const q = await quoteRepository.findById(id);
      if (!q) return null;
      return {
        id: q.id,
        type: "QUOTE",
        fullName: q.fullName,
        companyName: q.companyName,
        email: q.email,
        phone: q.phone,
        subject: "Request for Quote",
        serviceType: undefined,
        message: q.projectScope,
        createdAt: q.createdAt,
      };
    }
    return null;
  }

  async deleteMessage(type: MessageType, id: string): Promise<void> {
    if (type === "CONTACT") {
      await contactRepository.delete(id);
    } else if (type === "QUOTE") {
      await quoteRepository.delete(id);
    } else {
      throw new Error("Invalid message type");
    }
  }
}

export const messageService = new MessageService();
