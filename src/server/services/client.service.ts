import { clientRepository } from "../repositories/client.repository";
import { clientSchema, ClientInput } from "../validators/client.validator";
import { Prisma } from "@prisma/client";

/**
 * Service handling business logic for Clients.
 */
export class ClientService {
  async getAllClients() {
    return clientRepository.findAll();
  }

  async getClientById(id: string) {
    const client = await clientRepository.findById(id);
    if (!client) {
      throw new Error(`Client with ID "${id}" not found`);
    }
    return client;
  }

  async createClient(input: ClientInput) {
    // Validate input using Zod
    const validatedData = clientSchema.parse(input);

    const createData: Prisma.ClientCreateInput = {
      name: validatedData.name,
      logoUrl: validatedData.logoUrl,
      displayOrder: validatedData.displayOrder,
    };

    return clientRepository.create(createData);
  }

  async updateClient(id: string, input: Partial<ClientInput>) {
    const client = await clientRepository.findById(id);
    if (!client) {
      throw new Error("Client not found");
    }

    // Validate partial input
    const validatedData = clientSchema.partial().parse(input);

    const updateData: Prisma.ClientUpdateInput = {
      name: validatedData.name,
      logoUrl: validatedData.logoUrl,
      displayOrder: validatedData.displayOrder,
    };

    return clientRepository.update(id, updateData);
  }

  async deleteClient(id: string) {
    const client = await clientRepository.findById(id);
    if (!client) {
      throw new Error("Client not found");
    }
    return clientRepository.delete(id);
  }
}

export const clientService = new ClientService();
