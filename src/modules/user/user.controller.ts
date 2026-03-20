/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Put,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashPassowrdPipe } from 'src/resources/pipes/hash-password.pipe';
import { AuthGuard } from 'src/resources/guards/auth.guard';
import type { UserRequest } from 'src/resources/guards/auth.guard';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { UserRole } from 'src/enum/user.enum';
import { RolesGuard } from 'src/resources/guards/roles.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: 'Cadastro de usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado com sucesso.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Post()
  async create(
    @Body() { password, ...data }: CreateUserDto,
    @Body('password', HashPassowrdPipe) hashedPassword: string,
  ) {
    const user = await this.service.create({
      ...data,
      role: UserRole.STUDENT,
      password: hashedPassword,
    });

    return {
      user,
      message: 'usuário criado com sucesso',
    };
  }

  @ApiOperation({ summary: 'Cadastro de administrador' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado com sucesso.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/admin')
  async createAdmin(
    @Req() req: UserRequest,
    @Body() { password, ...data }: CreateUserDto,
    @Body('password', HashPassowrdPipe) hashedPassword: string,
  ) {
    const payload = req.user;

    const user = await this.service.create(
      {
        ...data,
        role: UserRole.ADMIN,
        password: hashedPassword,
      },
      payload,
    );

    return {
      user,
      message: 'usuário criado com sucesso',
    };
  }

  @ApiOperation({ summary: 'Listagem de usuários' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: UserEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Buscar um usuário' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Usário não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Req() req: UserRequest, @Param('id') id: string) {
    const payload = req.user;
    return await this.service.findOne(id, payload);
  }

  @ApiOperation({ summary: 'Atualização de usuário' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Usuário atualizado com sucesso.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usário não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Req() req: UserRequest,
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ) {
    const payload = req.user;
    const user = await this.service.update(
      id,
      {
        ...data,
        password: undefined,
      },
      payload,
    );

    return {
      user,
      message: 'Usuário atualizado com sucesso',
    };
  }

  @ApiOperation({ summary: 'Atualização de senha' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Senha do usuário atualizado com sucesso.',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'A nova senha deve ser diferente da anterior.',
  })
  @ApiResponse({
    status: 401,
    description: 'A senha anterior está incorreta.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usário não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @UseGuards(AuthGuard)
  @Patch('/password')
  async updatePassword(
    @Req() req: UserRequest,
    @Body() data: UpdatePasswordDto,
    @Body('password', HashPassowrdPipe) hashedPassword: string,
  ) {
    const id = req.user.sub;
    const user = await this.service.updatePassword(id, data, hashedPassword);

    return {
      user,
      message: 'Senha do usuário atualizado com sucesso',
    };
  }

  @ApiOperation({ summary: 'Remoção de usuário' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Usuário removido com suceso.',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usário não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Req() req: UserRequest, @Param('id') id: string) {
    const payload = req.user;
    const user = await this.service.remove(id, payload);

    return {
      user,
      message: 'Usuário removido com suceso',
    };
  }
}
