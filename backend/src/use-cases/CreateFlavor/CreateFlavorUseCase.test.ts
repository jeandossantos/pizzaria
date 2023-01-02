import { describe, expect, it } from '@jest/globals';

import { FlavorRepositoryInMemory } from '../../in-memory-database/FlavorRepositoryInMemory';
import { CreateFlavorUseCase } from './CreateFlavorUseCase';

const flavorRepository = new FlavorRepositoryInMemory();

describe('Create Flavor', () => {
  it('should create a flavor', async () => {
    const createFlavorUseCase = new CreateFlavorUseCase(flavorRepository);

    const { flavor } = await createFlavorUseCase.execute({
      name: 'Calabresa',
      price: 15,
      size: 'pequena',
    });

    expect(flavor).toHaveProperty('id');
  });

  it('should not create a flavor', async () => {
    const createFlavorUseCase = new CreateFlavorUseCase(flavorRepository);

    const result = createFlavorUseCase.execute({
      name: '',
      price: 150.0,
      size: 'pequena',
    });

    expect(result).rejects.toThrow();
  });
});
