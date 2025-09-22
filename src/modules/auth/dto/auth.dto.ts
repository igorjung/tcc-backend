import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @ApiProperty({
    description: 'E-mail do usuário.',
    default: 'admin@mail.com',
  })
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário.',
    default: 'Senha123@',
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;
}
