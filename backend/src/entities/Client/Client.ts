import {
  IsOptional,
  IsUUID,
  Max,
  Min,
  MinLength,
  validate,
  Length,
  ValidateNested,
} from 'class-validator';
import { Address } from '../Address';

export class Client {
  @IsOptional()
  @IsUUID()
  id: string;

  @MinLength(2)
  name: string;

  @Length(11, 11)
  whatsapp: string;

  @ValidateNested()
  address: Address;

  constructor(props: Omit<Client, 'id'> & { id?: string }) {
    Object.assign(this, props);
  }
}
