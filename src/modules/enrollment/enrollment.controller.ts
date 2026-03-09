import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from 'src/resources/guards/auth.guard';
import type { UserRequest } from 'src/resources/guards/auth.guard';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentEntity } from './entities/enrollmen.entity';
import { UserRole } from 'src/enum/user.enum';
import { RolesGuard } from 'src/resources/guards/roles.guard';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { GetEnrollmentDto } from './dto/get-enrollment.dto';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}

  @ApiOperation({ summary: 'Cadastro de matrícula' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Matrícula cadastrada com sucesso.',
    type: EnrollmentEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário deve estar logado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: UserRequest, @Body() data: CreateEnrollmentDto) {
    const payload = req.user;
    const enrollment = await this.service.create(data, payload);
    return {
      enrollment,
      message: 'Matrícula criada com sucesso',
    };
  }

  @ApiOperation({ summary: 'Listagem de matrículas' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: EnrollmentEntity,
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

  @ApiOperation({ summary: 'Listagem de matrículas' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: EnrollmentEntity,
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
  @Get('/by-user')
  async findByUser(
    @Req() req: UserRequest,
    @Query() queryParams: GetEnrollmentDto,
  ) {
    const payload = req.user;
    return await this.service.findByUser(payload, queryParams);
  }

  @ApiOperation({ summary: 'Buscar uma matrícula' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: EnrollmentEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário deve estar logado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Matrícula não encontrada.',
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

  @ApiOperation({ summary: 'Atualização de matrícula' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Matrícula atualizada com sucesso.',
    type: EnrollmentEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não tem permissão para realizar essa ação.',
  })
  @ApiResponse({
    status: 404,
    description: 'Matrícula não encontrada.',
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
    @Body() data: UpdateEnrollmentDto,
  ) {
    const payload = req.user;

    const enrollment = await this.service.update(id, data, payload);
    return {
      enrollment,
      message: 'Matrícula atualizada com sucesso',
    };
  }

  @ApiOperation({ summary: 'Remoção de matrícula' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Matrícula removida com suceso.',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'O usuário não está logado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Matrícula não encontrada.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Req() req: UserRequest, @Param('id') id: string) {
    const payload = req.user;
    const enrollment = await this.service.remove(id, payload);

    return {
      enrollment,
      message: 'Matrícula removida com suceso',
    };
  }
}
