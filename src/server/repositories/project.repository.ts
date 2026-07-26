import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

/**
 * Data access repository for the Project model.
 */
export class ProjectRepository {
  async findAll(options?: {
    take?: number;
    skip?: number;
  }) {
    return prisma.project.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: options?.take,
      skip: options?.skip,
    });
  }

  async findById(id: string) {
    return prisma.project.findFirst({
      where: { 
        id,
        deletedAt: null,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.project.findFirst({
      where: { 
        slug,
        deletedAt: null,
      },
    });
  }

  async create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

export const projectRepository = new ProjectRepository();
