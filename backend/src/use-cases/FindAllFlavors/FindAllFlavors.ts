import { IFlavorRepository } from '../../interfaces/IFlavorRepository';

export class FindAllFlavors {
  constructor(private flavorRepository: IFlavorRepository) {}

  async execute() {
    const flavors = await this.flavorRepository.findAll();

    return {
      ...flavors,
    };
  }
}
