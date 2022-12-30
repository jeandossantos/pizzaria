import { IsNotEmpty, IsUUID, IsInt } from 'class-validator';

type SizeType = 'pequena' | 'media' | 'grande';

export class Flavor {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  size: SizeType;

  @IsInt()
  price: number;

  constructor(props: Omit<Flavor, 'id'> & { id?: string }) {
    Object.assign(this, props);
  }
}
