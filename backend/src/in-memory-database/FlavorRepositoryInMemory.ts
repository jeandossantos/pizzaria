import { randomUUID } from 'node:crypto';
import { Flavor } from './../entities/Flavor/Flavor';
import {
  FindAllReturn,
  IFlavorRepository,
} from '../interfaces/IFlavorRepository';

export class FlavorRepositoryInMemory implements IFlavorRepository {
  items: Flavor[] = [];

  async update(flavor: Flavor) {
    this.items = this.items.map((current) => {
      if (current.id === flavor.id) {
        current.name = flavor.name;
        current.price = flavor.price;
        current.size = flavor.size;
      }

      return current;
    });

    return flavor;
  }

  async findAll(): Promise<FindAllReturn> {
    return {
      count: this.items.length,
      flavors: this.items,
      limit: 4,
    };
  }
  async create(flavor: Flavor) {
    flavor.id = randomUUID();

    this.items.push(flavor);

    return flavor;
  }
}
