import { projectRepository } from "../repositories/project.repository";
import { projectSchema, ProjectInput } from "../validators/project.validator";
import { Prisma } from "@prisma/client";

/**
 * Service handling business logic for Projects.
 */
export class ProjectService {
  async getAllProjects(filters?: { take?: number; skip?: number }) {
    return projectRepository.findAll(filters);
  }

  async getProjectBySlug(slug: string) {
    const project = await projectRepository.findBySlug(slug);
    if (!project) {
      throw new Error(`Project with slug "${slug}" not found`);
    }
    return project;
  }

  async getProjectById(id: string) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new Error(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async createProject(input: ProjectInput) {
    // Validate input using Zod
    const validatedData = projectSchema.parse(input);

    // Check slug uniqueness
    const existing = await projectRepository.findBySlug(validatedData.slug);
    if (existing) {
      throw new Error(`A project with slug "${validatedData.slug}" already exists`);
    }

    // Map input to Prisma create parameters
    const createData: Prisma.ProjectCreateInput = {
      title: validatedData.title,
      slug: validatedData.slug,
      overview: validatedData.overview,
      location: validatedData.location,
      projectYear: validatedData.projectYear,
      industryType: validatedData.industryType,
      applicationType: validatedData.applicationType,
      projectType: validatedData.projectType,
      services: validatedData.services,
      challenge: validatedData.challenge,
      solution: validatedData.solution,
      result: validatedData.result,
      highlights: validatedData.highlights,
      thumbnailImage: validatedData.thumbnailImage,
      galleryImages: validatedData.galleryImages,
      youtubeUrl: validatedData.youtubeUrl || null,
    };

    return projectRepository.create(createData);
  }

  async updateProject(id: string, input: Partial<ProjectInput>) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    // Validate input partial schema
    const validatedData = projectSchema.partial().parse(input);

    if (validatedData.slug && validatedData.slug !== project.slug) {
      const existing = await projectRepository.findBySlug(validatedData.slug);
      if (existing) {
        throw new Error(`A project with slug "${validatedData.slug}" already exists`);
      }
    }

    // Prepare updates
    const updateData: Prisma.ProjectUpdateInput = {
      title: validatedData.title,
      slug: validatedData.slug,
      overview: validatedData.overview,
      location: validatedData.location,
      projectYear: validatedData.projectYear,
      industryType: validatedData.industryType,
      applicationType: validatedData.applicationType,
      projectType: validatedData.projectType,
      services: validatedData.services,
      challenge: validatedData.challenge,
      solution: validatedData.solution,
      result: validatedData.result,
      highlights: validatedData.highlights,
      thumbnailImage: validatedData.thumbnailImage,
      galleryImages: validatedData.galleryImages,
      youtubeUrl: validatedData.youtubeUrl !== undefined ? (validatedData.youtubeUrl || null) : undefined,
    };

    return projectRepository.update(id, updateData);
  }

  async deleteProject(id: string) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return projectRepository.delete(id);
  }
}

export const projectService = new ProjectService();
