import { ClassValidadorError } from '../../../exceptions/ClassValidadorError';
import { validate } from 'class-validator';
import { Address } from '../../../entities/Address/Address';
import { Client } from '../../../entities/Client/Client';
import { IClientRepository } from '../../../interfaces/IClientRepository';

type CreateClientUseCaseProps = Omit<Client, 'id'>;

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute({ name, whatsapp, address }: CreateClientUseCaseProps) {
    const client = new Client({
      name,
      whatsapp,
      address: new Address({
        ...address,
      }),
    });

    const errors = await validate(client);

    if (errors.length > 0) {
      throw new ClassValidadorError(errors);
    }

    const newClient = await this.clientRepository.create(client);

    return { client: newClient };
  }
}
