import { ValidationError } from 'class-validator';

export class ClassValidadorError extends Error {
  code: number;

  constructor(private errors: ValidationError[], code: number = 400) {
    super(errors.toString());

    this.code = code;
    this.name = this.constructor.name;
  }

  getErrors() {
    return this.errors;
  }
}
