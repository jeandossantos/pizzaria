import { randomUUID } from 'node:crypto';
import { Client } from '../entities/Client/Client';
import { IClientRepository } from '../interfaces/IClientRepository';

export class ClientRepositoryInMemory implements IClientRepository {
  items: Client[] = [];

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
