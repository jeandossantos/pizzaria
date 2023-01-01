import { Flavor } from '../entities/Flavor/Flavor';

export interface FindAllReturn {
  flavours: Flavor[];
  count: number;
  limit: number;
}

export interface IFlavorRepository {
  create: (flavor: Flavor) => Promise<Flavor>;
}
