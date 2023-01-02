import { CustomException } from '../../../exceptions/CustomException';
import { IClientRepository } from '../../../interfaces/IClientRepository';

interface FindClientByWhatsappUseCaseProps {
  whatsapp: string;
}

export class FindClientByWhatsappUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute({ whatsapp }: FindClientByWhatsappUseCaseProps) {
    const client = await this.clientRepository.findByWhatsapp(whatsapp);

    if (!client) {
      throw new CustomException('User not found!');
    }

    return {
      client,
    };
  }
}
