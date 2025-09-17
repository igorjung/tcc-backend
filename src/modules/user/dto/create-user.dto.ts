import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { isEmailUnique } from '../validators/is-email-unique.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @isEmailUnique({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 6 e 30 caracteres',
  })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(30, { message: 'A senha deve ter no máximo 30 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'A data de aniversário não pode ser vazia' })
  @IsDateString()
  birthDate: Date;
}
