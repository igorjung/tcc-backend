import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from 'src/resources/guards/auth.guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { GetCourseDto } from './dto/get-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';
import { UserRole } from 'src/enum/user.enum';
import { RolesGuard } from 'src/resources/guards/roles.guard';
import { Roles } from 'src/resources/decorators/roles.decorator';

@Controller('courses')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @ApiOperation({ summary: 'Cadastro de curso' })
  @ApiBearerAuth()
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
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() data: CreateCourseDto) {
    const course = await this.service.create(data);
    return {
      course,
      message: 'curso criado com sucesso',
    };
  }

  @ApiOperation({ summary: 'Listagem de cursos' })
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
  findAll(@Query() queryParams: GetCourseDto) {
    return this.service.findAll(queryParams);
  }

  @ApiOperation({ summary: 'Buscar um curso' })
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
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
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
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCourseDto) {
    const course = await this.service.update(id, data);
    return {
      course,
      message: 'Curso atualizado com sucesso',
    };
  }

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
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const course = await this.service.remove(id);

    return {
      course,
      message: 'Curso removido com suceso',
    };
  }
}
