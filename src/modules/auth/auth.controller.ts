import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

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
  create(@Body() { email, password }: AuthDTO) {
    return this.service.login(email, password);
  }
}
