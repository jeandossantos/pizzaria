import { IFlavorRepository } from '../../interfaces/IFlavorRepository';
import { Flavor } from '../../entities/Flavor/Flavor';

type CreateFlavorUseCaseProps = Omit<Flavor, 'id'>;

export class CreateFlavorUseCase {
  constructor(private flavorRepository: IFlavorRepository) {}

  async execute({ name, price, size }: CreateFlavorUseCaseProps) {
    const flavor = new Flavor({
      name,
      price,
      size,
    });

    const newFlavor = await this.flavorRepository.create(flavor);

    return {
      flavor: newFlavor,
    };
  }
}
