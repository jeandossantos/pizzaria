import { CustomException } from '../../../exceptions/CustomException';
import { IClientRepository } from './../../../interfaces/IClientRepository';

interface FindAllClientsUseCaseProps {
  clientId: string;
}

export class RemoveClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute({ clientId }: FindAllClientsUseCaseProps) {
    const client = await this.clientRepository.findById(clientId);

    if (!client) throw new CustomException('Client not exists!');

    await this.clientRepository.remove(clientId);
  }
}
