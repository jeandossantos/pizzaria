import { randomUUID } from 'node:crypto';
import { Client } from '../entities/Client/Client';
import { IClientRepository } from '../interfaces/IClientRepository';

export class ClientRepositoryInMemory implements IClientRepository {
  async findByWhatsapp(props: { whatsapp: string }): Promise<Client> {
    throw new Error('Method not implemented.');
  }
  items: Client[] = [];

  async create(client: Client): Promise<Client> {
    client.id = randomUUID();

    this.items.push(client);

    return client;
  }
}
