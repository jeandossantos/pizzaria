import { Flavor } from './Flavor';
import { describe, expect, it } from '@jest/globals';
import { validate } from 'class-validator';
import { randomUUID } from 'node:crypto';

describe('Create Flavor', () => {
  it('should create a flavor', async () => {
    const flavor = new Flavor({
      id: randomUUID(),
      name: 'Calabresa',
      price: 10,
      size: 'pequena',
    });

    const errors = await validate(flavor);

    expect(errors).toHaveLength(0);
  });

  it('should not create a flavor with invalid id', async () => {
    const flavor = new Flavor({
      id: '',
      name: 'Mussarela',
      price: 20,
      size: 'pequena',
    });

    const errors = await validate(flavor);

    expect(errors[0].constraints?.isUuid).toBe('id must be a UUID');
  });

  it('should not create a flavor with no name', async () => {
    const flavor = new Flavor({
      id: randomUUID(),
      name: '',
      price: 10,
      size: 'pequena',
    });

    const errors = await validate(flavor);

    expect(errors[0].constraints?.isNotEmpty).toBe('name should not be empty');
  });

  it('should not create a flavor with invalid price', async () => {
    const flavor = new Flavor({
      id: randomUUID(),
      name: 'Mussarela',
      price: NaN,
      size: 'pequena',
    });

    const errors = await validate(flavor);

    expect(errors[0].constraints?.isInt).toBe(
      'price must be an integer number'
    );
  });

  it('should not create a flavor with no size', async () => {
    const wrongSize: any = '';

    const flavor = new Flavor({
      id: randomUUID(),
      name: 'Mussarela',
      price: 10,
      size: wrongSize,
    });

    const errors = await validate(flavor);

    expect(errors[0].constraints?.isNotEmpty).toBe('size should not be empty');
  });
});
