import { randomUUID } from 'node:crypto';
import { Client } from '../entities/Client/Client';
import {
  findAllProps,
  FindAllReturn,
  IClientRepository,
} from '../interfaces/IClientRepository';

export class ClientRepositoryInMemory implements IClientRepository {
  items: Client[] = [];

  async findById(clientId: string): Promise<boolean | Client> {
    return this.items.find((client) => client.id === clientId) || false;
  }

  async remove(clientId: string): Promise<boolean> {
    const client = this.items.find((client) => client.id === clientId);

    if (!client) return false;

    this.items = this.items.filter((client) => client.id !== clientId);

    return true;
  }

  async findAll(props: findAllProps): Promise<FindAllReturn> {
    return {
      count: this.items.length,
      limit: 4,
      clients: this.items,
    };
  }

  async findByWhatsapp(whatsapp: string): Promise<Client | boolean> {
    const client = this.items.find((c) => c.whatsapp === whatsapp);

    return client ? client : false;
  }

  async create(client: Client): Promise<Client> {
    client.id = randomUUID();

    this.items.push(client);

    return client;
  }
}
