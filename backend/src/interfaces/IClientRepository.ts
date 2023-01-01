import { Client } from '../entities/Client/Client';

export interface IClientRepository {
  create(client: Client): Promise<Client>;
  findByWhatsapp(whatsapp: string): Promise<Client | boolean>;
}
