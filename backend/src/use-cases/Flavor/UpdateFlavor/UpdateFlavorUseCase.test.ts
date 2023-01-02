import { Flavor } from '../../../entities/Flavor/Flavor';
import { describe, expect, it } from '@jest/globals';

import { FlavorRepositoryInMemory } from '../../../in-memory-database/FlavorRepositoryInMemory';
import { UpdateFlavorUseCase } from './UpdateFlavorUseCase';

const flavorRepository = new FlavorRepositoryInMemory();

let flavor: Flavor;

beforeAll(async () => {
  flavor = await flavorRepository.create({
    id: '',
    name: '4 Queijos',
    price: 20,
    size: 'grande',
  });
});

describe('Update Flavor', () => {
  it('should update a flavor', async () => {
    const updateFlavorUseCase = new UpdateFlavorUseCase(flavorRepository);

    const result = await updateFlavorUseCase.execute({
      id: flavor.id,
      name: 'Mussarela',
      price: 18.5,
      size: 'media',
    });

    expect(result).toBeTruthy();
  });

  it('should not update a flavor', async () => {
    const updateFlavorUseCase = new UpdateFlavorUseCase(flavorRepository);

    const result = updateFlavorUseCase.execute({
      id: '123',
      name: '',
      price: 18.5,
      size: 'media',
    });

    expect(result).rejects.toThrow();
  });
});
