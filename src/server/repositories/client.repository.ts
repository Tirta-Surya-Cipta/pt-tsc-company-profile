import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

/**
 * Data access repository for the Client model.
 */
export class ClientRepository {
  async findAll() {
    return prisma.client.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "asc" },
      ],
    });
  }

  async findById(id: string) {
    return prisma.client.findUnique({
      where: { id },
    });
  }

  async count() {
    return prisma.client.count();
  }

  async create(data: Prisma.ClientCreateInput) {
    return prisma.client.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ClientUpdateInput) {
    return prisma.client.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.client.delete({
      where: { id },
    });
  }
}

export const clientRepository = new ClientRepository();
