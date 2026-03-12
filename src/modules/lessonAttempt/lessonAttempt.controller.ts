import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from 'src/resources/guards/auth.guard';
import type { UserRequest } from 'src/resources/guards/auth.guard';
import { UserRole } from 'src/enum/user.enum';
import { RolesGuard } from 'src/resources/guards/roles.guard';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { LessonAttemptService } from './lessonAttempt.service';
import { LessonAttemptEntity } from './entities/lessonAttempt.entity';
import { CreateLessonAttemptDto } from './dto/create-lesson-attempt.dto';

@Controller('lesson_attempts')
export class LessonAttemptController {
  constructor(private readonly service: LessonAttemptService) {}

  @ApiOperation({ summary: 'Cadastro de resposta' })
  @ApiResponse({
    status: 201,
    description: 'Resposta cadastrada com sucesso.',
    type: LessonAttemptEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: UserRequest, @Body() data: CreateLessonAttemptDto) {
    const payload = req.user;

    const { isCompleted, isCorrect } = await this.service.create(data, payload);

    return {
      isCompleted,
      isCorrect,
      message: 'Resposta criada com suceso',
    };
  }

  @ApiOperation({ summary: 'Listagem de respostas' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: LessonAttemptEntity,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: UserRequest) {
    const payload = req.user;
    const [data, total] = await this.service.findAll(payload);
    return { data, total };
  }

  @ApiOperation({ summary: 'Buscar uma resposta' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: LessonAttemptEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Resposta não encontrada.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Req() req: UserRequest, @Param('id') id: string) {
    const payload = req.user;
    return await this.service.findOne(id, payload);
  }

  @ApiOperation({ summary: 'Remoção de resposta' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Resposta removida com suceso.',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 404,
    description: 'Resposta não encontrada.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const lessonAttempt = await this.service.remove(id);

    return {
      lessonAttempt,
      message: 'Resposta removida com suceso',
    };
  }
}
