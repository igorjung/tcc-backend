import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from 'src/resources/guards/auth.guard';
import { UserRole } from 'src/enum/user.enum';
import { RolesGuard } from 'src/resources/guards/roles.guard';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { LessonService } from './lesson.service';
import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
export class LessonController {
  constructor(private readonly service: LessonService) {}

  @ApiOperation({ summary: 'Cadastro de aula' })
  @ApiResponse({
    status: 201,
    description: 'Aula cadastrada com sucesso.',
    type: LessonEntity,
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
  async create(@Body() data: CreateLessonDto) {
    const lesson = await this.service.create(data);
    return {
      lesson,
      message: 'aula criada com sucesso',
    };
  }

  @ApiOperation({ summary: 'Listagem de aulas' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: LessonEntity,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma aula' })
  @ApiResponse({
    status: 200,
    type: LessonEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Aula não encontrada.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Atualização de aula' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Aula atualizada com sucesso.',
    type: LessonEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 404,
    description: 'Aula não encontrada.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateLessonDto) {
    const lesson = await this.service.update(id, data);
    return {
      lesson,
      message: 'Aula atualizada com sucesso',
    };
  }

  @ApiOperation({ summary: 'Remoção de aula' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Aula removida com suceso.',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 404,
    description: 'Aula não encontrada.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const lesson = await this.service.remove(id);

    return {
      lesson,
      message: 'Aula removida com suceso',
    };
  }
}
