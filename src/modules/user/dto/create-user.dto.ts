import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { isEmailUnique } from '../validators/is-email-unique.validator';
import { UserAvailability, UserExperience, UserRole } from 'src/enum/user.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário.',
    default: 'João Silva',
  })
  @IsString({ message: 'O nome informado é inválido' })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário.',
    default: 'aluno@mail.com',
  })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @isEmailUnique({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário.',
    default: 'Senha123@',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 6 e 30 caracteres',
  })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(30, { message: 'A senha deve ter no máximo 30 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Data de nascimento do usuário.',
    default: '2021-06-11T00:00',
  })
  @IsNotEmpty({ message: 'A data de aniversário não pode ser vazia' })
  @IsString({ message: 'A data de aniversário informada é inválida' })
  birthDate: string;

  @ApiProperty({
    description: 'Função do usuário.',
    default: 'STUDENT',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'Experiência do usuário.',
    default: 'BEGINNER',
  })
  @IsOptional()
  @IsEnum(UserExperience)
  experience: UserExperience;

  @ApiProperty({
    description: 'Disponibilidade do usuário.',
    default: 'LESS_THAN_30_MIN',
  })
  @IsOptional()
  @IsEnum(UserAvailability)
  availability: UserAvailability;
}
