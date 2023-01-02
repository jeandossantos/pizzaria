import { validate } from 'class-validator';
import { Flavor } from '../../entities/Flavor/Flavor';
import { ClassValidadorError } from '../../exceptions/ClassValidadorError';
import { IFlavorRepository } from '../../interfaces/IFlavorRepository';

type UpdateFlavorUseCaseProps = Flavor;

export class UpdateFlavorUseCase {
  constructor(private flavorRepository: IFlavorRepository) {}

  async execute({ id, name, price, size }: UpdateFlavorUseCaseProps) {
    const flavor = new Flavor({
      id,
      name,
      price,
      size,
    });

    const errors = await validate(flavor);

    if (errors.length > 0) {
      throw new ClassValidadorError(errors);
    }

    const updatedFlavor = await this.flavorRepository.update(flavor);

    return {
      flavor: updatedFlavor,
    };
  }
}
