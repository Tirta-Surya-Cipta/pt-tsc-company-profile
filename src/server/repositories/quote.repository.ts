import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

/**
 * Data access repository for quote requests.
 */
export class QuoteRepository {
  async findAll() {
    return prisma.quoteRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.quoteRequest.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.QuoteRequestCreateInput) {
    return prisma.quoteRequest.create({
      data,
    });
  }

  async delete(id: string) {
    return prisma.quoteRequest.delete({
      where: { id },
    });
  }
}

export const quoteRepository = new QuoteRepository();
