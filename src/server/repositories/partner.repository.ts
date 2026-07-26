import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

/**
 * Data access repository for the Partner model.
 */
export class PartnerRepository {
  async findAll() {
    return prisma.partner.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "asc" },
      ],
    });
  }

  async findById(id: string) {
    return prisma.partner.findUnique({
      where: { id },
    });
  }

  async count() {
    return prisma.partner.count();
  }

  async create(data: Prisma.PartnerCreateInput) {
    return prisma.partner.create({
      data,
    });
  }

  async update(id: string, data: Prisma.PartnerUpdateInput) {
    return prisma.partner.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.partner.delete({
      where: { id },
    });
  }
}

export const partnerRepository = new PartnerRepository();
