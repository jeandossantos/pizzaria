import {
  IsNotEmpty,
  IsUUID,
  IsInt,
  IsOptional,
  IsNumber,
} from 'class-validator';

type SizeType = 'pequena' | 'media' | 'grande';

export class Flavor {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  size: SizeType;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  price: number;

  constructor(props: Omit<Flavor, 'id'> & { id?: string }) {
    Object.assign(this, props);
  }
}
