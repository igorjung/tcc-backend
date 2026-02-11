import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly respository: Repository<CourseEntity>,
  ) {}

  async create(data: CreateCourseDto) {
    const entity = new CourseEntity();
    Object.assign(entity, data);
    return await this.respository.save(entity);
  }

  async findAll() {
    return await this.respository.find({ where: { deletedAt: undefined } });
  }

  async findOne(id: string) {
    const course = await this.respository.findOneBy({
      id,
      deletedAt: undefined,
    });
    if (!course) throw new NotFoundException(`Curso não encontrado.`);
    return course;
  }

  async update(id: string, data: UpdateCourseDto) {
    const course = await this.respository.findOneBy({ id });
    if (course === null)
      throw new NotFoundException('O curso não foi encontrado.');
    Object.assign(course, data);
    return this.respository.save(course);
  }

  async remove(id: string) {
    const response = await this.respository.delete(id);
    if (!response.affected)
      throw new NotFoundException('O curso não foi encontrado.');
  }
}
