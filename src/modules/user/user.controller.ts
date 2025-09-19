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

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

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

  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Req() req: UserRequest, @Param('id') id: string) {
    const payload = req.user;
    return await this.service.findOne(id, payload);
  }

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
