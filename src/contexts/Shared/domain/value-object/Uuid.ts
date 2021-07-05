import { v4, validate } from 'uuid';
import InvalidUuid from '../errors/InvalidUuid';

export default class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);
    this.value = value;
  }

  private ensureIsValidUuid(id: string): void {
    const isValidUuid = validate(id);
    if (!isValidUuid) throw new InvalidUuid();
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

  public toString(): string {
    return this.value;
  }
}
