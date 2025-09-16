import { Injectable, NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly service: UserService) {}

  async validate(value: any): Promise<boolean> {
    try {
      const user = await this.service.findOneByEmail(value);
      return !user;
    } catch (err) {
      if (err instanceof NotFoundException) return true;
      throw err;
    }
  }
}

export const isEmailUnique = (options: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsEmailUniqueValidator,
    });
  };
};
