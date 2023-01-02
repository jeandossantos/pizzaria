import { describe, expect, it } from '@jest/globals';

import { ClientRepositoryInMemory } from '../../../in-memory-database/ClientRepositoryInMemory';

import { FindAllClientsUseCase } from './FindAllClientsUseCase';

const clientRepository = new ClientRepositoryInMemory();

describe('Find All Clients', () => {
  it('should find all clients', async () => {
    const findAllClientsUseCase = new FindAllClientsUseCase(clientRepository);

    const result = await findAllClientsUseCase.execute({
      page: 1,
    });

    expect(result.clients).toBeInstanceOf(Array);
    expect(result).toHaveProperty('count');
    expect(result).toHaveProperty('limit');
  });
});
