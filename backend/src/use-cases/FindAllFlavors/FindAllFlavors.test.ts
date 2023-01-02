import { FlavorRepositoryInMemory } from '../../in-memory-database/FlavorRepositoryInMemory';
import { describe, expect, it } from '@jest/globals';
import { FindAllFlavors } from './FindAllFlavors';

const flavorRepository = new FlavorRepositoryInMemory();

describe('Find All Flavours', () => {
  it('should find all flavours', async () => {
    const findAllFlavors = new FindAllFlavors(flavorRepository);

    const result = await findAllFlavors.execute();

    expect(result.flavors).toBeInstanceOf(Array);
    expect(result).toHaveProperty('count');
    expect(result).toHaveProperty('limit');
  });
});
