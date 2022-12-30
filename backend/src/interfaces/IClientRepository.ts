import { Client } from '../entities/Client/Client';

type findByWhatsapp = Pick<Client, 'whatsapp'>;

export interface IClientRepository {
  create(client: Client): Promise<Client>;
  findByWhatsapp(props: findByWhatsapp): Promise<Client>;
}
