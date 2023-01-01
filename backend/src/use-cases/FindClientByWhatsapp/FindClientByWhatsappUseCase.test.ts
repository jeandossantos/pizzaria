import { FindClientByWhatsappUseCase } from './FindClientByWhatsappUseCase';
import { Client } from './../../entities/Client/Client';
import { describe, expect, it } from '@jest/globals';

import { ClientRepositoryInMemory } from '../../in-memory-database/ClientRepositoryInMemory';
import { Address } from '../../entities/Address/Address';
import { CustomException } from '../../exceptions/CustomException';

const clientRepository = new ClientRepositoryInMemory();

let client: Client;

beforeAll(async () => {
  client = await clientRepository.create({
    id: '',
    name: 'client',
    whatsapp: '21970707070',
    address: new Address({
      neighborhood: 'us-central1',
      street: '123 Main St',
      number: 123,
    }),
  });
});

describe('Find a client by whatsapp', () => {
  it('should find a client', async () => {
    const findClientByWhatsappUeCase = new FindClientByWhatsappUseCase(
      clientRepository
    );

    const result = await findClientByWhatsappUeCase.execute({
      whatsapp: client.whatsapp,
    });

    expect(result).not.toBeFalsy();
  });

  it('should not find a client if not exists', async () => {
    const findClientByWhatsappUeCase = new FindClientByWhatsappUseCase(
      clientRepository
    );

    const result = findClientByWhatsappUeCase.execute({
      whatsapp: '21912345678',
    });

    expect(result).rejects.toThrowError(new CustomException('User not found!'));
  });
});
