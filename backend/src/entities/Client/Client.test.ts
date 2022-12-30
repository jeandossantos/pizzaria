import { randomUUID } from 'node:crypto';
import { Client } from './Client';
import { describe, expect, it } from '@jest/globals';
import { Address } from '../Address/Address';
import { validate } from 'class-validator';

describe('Create class', () => {
  it('should create a Client', async () => {
    const client = new Client({
      id: randomUUID(),
      name: 'test',
      whatsapp: '00123456789',
      address: new Address({
        neighborhood: 'Itaípu',
        street: 'rua sociedade',
        number: 201,
      }),
    });

    const error = await validate(client);

    expect(error).toHaveLength(0);
  });

  it('should not create a Client with invalid name', async () => {
    const client = new Client({
      id: randomUUID(),
      name: '1',
      whatsapp: '00123456789',
      address: new Address({
        neighborhood: 'Itaípu',
        street: 'rua sociedade',
        number: 201,
      }),
    });

    const error = await validate(client);

    expect(error[0].property).toBe('name');
    expect(error[0].constraints?.minLength).toBe(
      'name must be longer than or equal to 2 characters'
    );
  });

  it('should not create a Client with invalid whatsapp', async () => {
    const client = new Client({
      id: randomUUID(),
      name: 'Test',
      whatsapp: '0012345678',
      address: new Address({
        neighborhood: 'Itaípu',
        street: 'rua sociedade',
        number: 201,
      }),
    });

    const error = await validate(client);

    expect(error[0].property).toBe('whatsapp');
    expect(error[0].constraints?.isLength).toBe(
      'whatsapp must be longer than or equal to 11 characters'
    );
  });

  it('should not create a client address with no neighborhood', async () => {
    const client = new Client({
      id: randomUUID(),
      name: 'Test',
      whatsapp: '00123456780',
      address: new Address({
        neighborhood: '',
        street: 'Rua 1',
        number: 201,
      }),
    });

    const error = await validate(client);

    expect(error[0].property).toBe('address');
    expect(error[0].children![0].property).toBe('neighborhood');
    expect(error[0].children![0].constraints!.isNotEmpty).toBe(
      'neighborhood should not be empty'
    );
  });

  it('should not create a client address with no street', async () => {
    const client = new Client({
      id: randomUUID(),
      name: 'Test',
      whatsapp: '00123456780',
      address: new Address({
        neighborhood: 'new york',
        street: '',
        number: 201,
      }),
    });

    const error = await validate(client);

    expect(error[0].property).toBe('address');
    expect(error[0].children![0].property).toBe('street');
    expect(error[0].children![0].constraints!.isNotEmpty).toBe(
      'street should not be empty'
    );
  });

  it('should not create a client address with no number', async () => {
    const client = new Client({
      id: randomUUID(),
      name: 'Test',
      whatsapp: '00123456780',
      address: new Address({
        neighborhood: 'new york',
        street: 'rua 1',
        number: NaN,
      }),
    });

    const error = await validate(client);

    expect(error[0].property).toBe('address');
    expect(error[0].children![0].property).toBe('number');
    expect(error[0].children![0].constraints!.isInt).toBe(
      'number must be an integer number'
    );
  });

  it('should not create a client with invalid id', async () => {
    const client = new Client({
      id: '',
      name: 'Test',
      whatsapp: '00123456780',
      address: new Address({
        neighborhood: 'new york',
        street: 'rua 1',
        number: NaN,
      }),
    });

    const errors = await validate(client);

    expect(errors[0].constraints?.isUuid).toBe('id must be a UUID');
  });
});
