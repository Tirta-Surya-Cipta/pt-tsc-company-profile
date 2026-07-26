import { partnerRepository } from "../repositories/partner.repository";
import { partnerSchema, PartnerInput } from "../validators/partner.validator";
import { Prisma } from "@prisma/client";

/**
 * Service handling business logic for Partners.
 */
export class PartnerService {
  async getAllPartners() {
    return partnerRepository.findAll();
  }

  async getPartnerById(id: string) {
    const partner = await partnerRepository.findById(id);
    if (!partner) {
      throw new Error(`Partner with ID "${id}" not found`);
    }
    return partner;
  }

  async createPartner(input: PartnerInput) {
    // Validate input using Zod
    const validatedData = partnerSchema.parse(input);

    const createData: Prisma.PartnerCreateInput = {
      name: validatedData.name,
      logoUrl: validatedData.logoUrl,
      displayOrder: validatedData.displayOrder,
    };

    return partnerRepository.create(createData);
  }

  async updatePartner(id: string, input: Partial<PartnerInput>) {
    const partner = await partnerRepository.findById(id);
    if (!partner) {
      throw new Error("Partner not found");
    }

    // Validate partial input
    const validatedData = partnerSchema.partial().parse(input);

    const updateData: Prisma.PartnerUpdateInput = {
      name: validatedData.name,
      logoUrl: validatedData.logoUrl,
      displayOrder: validatedData.displayOrder,
    };

    return partnerRepository.update(id, updateData);
  }

  async deletePartner(id: string) {
    const partner = await partnerRepository.findById(id);
    if (!partner) {
      throw new Error("Partner not found");
    }
    return partnerRepository.delete(id);
  }
}

export const partnerService = new PartnerService();
