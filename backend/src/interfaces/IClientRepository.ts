import { Client } from '../entities/Client/Client';

export interface FindAllReturn {
  clients: Client[];
  count: number;
  limit: number;
}

export interface findAllProps {
  page: number;
}

export interface IClientRepository {
  create(client: Client): Promise<Client>;
  findByWhatsapp(whatsapp: string): Promise<Client | boolean>;
  findAll(props: findAllProps): Promise<FindAllReturn>;
  findById(clientId: string): Promise<Client | boolean>;
  remove(clientId: string): Promise<boolean>;
}
