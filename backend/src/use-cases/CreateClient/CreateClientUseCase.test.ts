import { describe, expect, it } from '@jest/globals';

import { CreateClientUseCase } from './CreateClientUseCase';
import { ClientRepositoryInMemory } from '../../in-memory-database/ClientRepositoryInMemory';

const clientRepository = new ClientRepositoryInMemory();

describe('create a Client', () => {
  it('should create a new Client', async () => {
    const createClientUseCase = new CreateClientUseCase(clientRepository);

    const { client } = await createClientUseCase.execute({
      name: 'client 1',
      whatsapp: '21970707070',
      address: {
        neighborhood: 'neighborhood',
        street: 'street',
        number: 100,
        complement: 'some complement',
      },
    });

    expect(client).toHaveProperty('id');
  });
});
