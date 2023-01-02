import { IFlavorRepository } from '../../../interfaces/IFlavorRepository';
import { Flavor } from '../../../entities/Flavor/Flavor';
import { validate } from 'class-validator';
import { ClassValidadorError } from '../../../exceptions/ClassValidadorError';

type CreateFlavorUseCaseProps = Omit<Flavor, 'id'>;

export class CreateFlavorUseCase {
  constructor(private flavorRepository: IFlavorRepository) {}

  async execute({ name, price, size }: CreateFlavorUseCaseProps) {
    const flavor = new Flavor({
      name,
      price,
      size,
    });

    const errors = await validate(flavor);

    if (errors.length > 0) {
      throw new ClassValidadorError(errors);
    }

    const newFlavor = await this.flavorRepository.create(flavor);

    return {
      flavor: newFlavor,
    };
  }
}
