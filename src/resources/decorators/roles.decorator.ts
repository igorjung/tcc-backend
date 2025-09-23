import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/enum/user.enum';

export const Roles = Reflector.createDecorator<UserRole[]>();
