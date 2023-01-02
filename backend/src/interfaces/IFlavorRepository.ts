import { Flavor } from '../entities/Flavor/Flavor';

export interface FindAllReturn {
  flavors: Flavor[];
  count: number;
  limit: number;
}

export interface IFlavorRepository {
  create: (flavor: Flavor) => Promise<Flavor>;
  update: (flavor: Flavor) => Promise<Flavor>;
  findAll(): Promise<FindAllReturn>;
}
