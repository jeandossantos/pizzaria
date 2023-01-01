import { RemoveClientUseCase } from './RemoveClientUseCase';
import { describe, expect, it } from '@jest/globals';

import { ClientRepositoryInMemory } from '../../in-memory-database/ClientRepositoryInMemory';
import { Client } from '../../entities/Client/Client';
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

describe('Remove Client', () => {
  it('should remove a client', async () => {
    const removeClientUseCase = new RemoveClientUseCase(clientRepository);

    const result = await removeClientUseCase.execute({ clientId: client.id });

    expect(result).toBeUndefined();
  });

  it('should not remove a client if not exists', async () => {
    const removeClientUseCase = new RemoveClientUseCase(clientRepository);

    const result = removeClientUseCase.execute({ clientId: 'not exists' });

    expect(result).rejects.toThrowError(
      new CustomException('Client not exists!')
    );
  });

  it('should not remove a client if not exists', async () => {
    const removeClientUseCase = new RemoveClientUseCase(clientRepository);

    const result = removeClientUseCase.execute({ clientId: 'not exists' });

    expect(result).rejects.toThrowError(
      new CustomException('Client not exists!')
    );
  });
});
