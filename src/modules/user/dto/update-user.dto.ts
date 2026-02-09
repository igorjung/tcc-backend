import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {
  @ApiProperty({
    description: 'E-mail do usuário.',
    default: 'aluno@mail.com',
  })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;
}
