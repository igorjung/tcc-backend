import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPayload } from '../auth/auth.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly respository: Repository<CourseEntity>,
  ) {}

  async create(data: CreateCourseDto, payload?: UserPayload) {}

  async findAll() {
    return await this.respository.find({ where: { deletedAt: undefined } });
  }

  async findOne(id: string, payload?: UserPayload) {}

  async update(id: string, data: UpdateCourseDto, payload?: UserPayload) {}

  async remove(id: string, payload?: UserPayload) {
    const response = await this.respository.delete(id);
    if (!response.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }
}
