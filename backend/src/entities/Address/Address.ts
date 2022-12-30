import { IsNotEmpty, IsInt } from 'class-validator';

export class Address {
  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  street: string;

  @IsInt()
  @IsNotEmpty()
  number: number;

  complement?: string;

  constructor(props: Address) {
    Object.assign(this, props);
  }
}
