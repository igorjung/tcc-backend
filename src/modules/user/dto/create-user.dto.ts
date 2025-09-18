import {
  IsDateString,
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
  @IsString({ message: 'O nome informado é inválido' })
  name: string;

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

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsEnum(UserExperience)
  experience: UserExperience;

  @IsOptional()
  @IsEnum(UserAvailability)
  availability: UserAvailability;
}
