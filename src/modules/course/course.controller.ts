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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from 'src/resources/guards/auth.guard';
import type { UserRequest } from 'src/resources/guards/auth.guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseEntity } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('coursers')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @ApiOperation({ summary: 'Cadastro de curso' })
  @ApiResponse({
    status: 201,
    description: 'Curso cadastrado com sucesso.',
    type: CourseEntity,
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
  async create(@Body() data: CreateCourseDto) {}

  @ApiOperation({ summary: 'Listagem de cursos' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CourseEntity,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Buscar um curso' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: CourseEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Curso não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Get(':id')
  async findOne(@Req() req: UserRequest, @Param('id') id: string) {
    const payload = req.user;
    return await this.service.findOne(id, payload);
  }

  @ApiOperation({ summary: 'Atualização de curso' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Curso atualizado com sucesso.',
    type: CourseEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 404,
    description: 'Curso não encontrado.',
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
    @Body() data: UpdateCourseDto,
  ) {}

  @ApiOperation({ summary: 'Remoção de curso' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Curso removido com suceso.',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 404,
    description: 'Curso não encontrado.',
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
      message: 'Curso removido com suceso',
    };
  }
}
