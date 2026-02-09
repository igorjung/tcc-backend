import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { HashPassowrdPipe } from 'src/resources/pipes/hash-password.pipe';
import { UserRole } from 'src/enum/user.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ summary: 'Login de usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário logado com sucesso.',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'O email ou a senha está incorreto.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Post('login')
  login(@Body() { email, password }: AuthDTO) {
    return this.service.login(email, password);
  }

  @ApiOperation({ summary: 'Registro de usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso.',
    type: String,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Post('register')
  async register(
    @Body() { password, ...data }: CreateUserDto,
    @Body('password', HashPassowrdPipe) hashedPassword: string,
  ) {
    return await this.service.register(
      {
        ...data,
        role: UserRole.STUDENT,
        password: hashedPassword,
      },
      password,
    );
  }
}
