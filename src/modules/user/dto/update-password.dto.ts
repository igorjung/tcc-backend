import { ApiProperty } from '@nestjs/swagger';
import { Matches, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Senha atual do usuário.',
    default: 'Senha123@',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'A senha anterior deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 6 e 30 caracteres',
  })
  @MinLength(6, { message: 'A senha anterior deve ter no mínimo 6 caracteres' })
  @MaxLength(30, {
    message: 'A senha anterior deve ter no máximo 30 caracteres',
  })
  oldPassword: string;

  @ApiProperty({
    description: 'Senha nova do usuário.',
    default: 'SenhaNova123@',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'A nova senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 6 e 30 caracteres',
  })
  @MinLength(6, { message: 'A nova senha deve ter no mínimo 6 caracteres' })
  @MaxLength(30, { message: 'A nova senha deve ter no máximo 30 caracteres' })
  password: string;
}
