import { IClientRepository } from './../../interfaces/IClientRepository';

interface FindAllClientsUseCaseProps {
  page: number;
}
export class FindAllClientsUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute({ page }: FindAllClientsUseCaseProps) {
    const result = await this.clientRepository.findAll({
      page,
    });

    return {
      ...result,
    };
  }
}
