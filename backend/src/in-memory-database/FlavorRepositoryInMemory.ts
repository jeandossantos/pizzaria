import { randomUUID } from 'node:crypto';
import { Flavor } from './../entities/Flavor/Flavor';
import { IFlavorRepository } from '../interfaces/IFlavorRepository';

export class FlavorRepositoryInMemory implements IFlavorRepository {
  items: Flavor[] = [];

  async create(flavor: Flavor) {
    flavor.id = randomUUID();

    this.items.push(flavor);

    return flavor;
  }
}
