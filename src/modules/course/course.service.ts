import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';
import { GetCourseDto } from './dto/get-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly respository: Repository<CourseEntity>,
  ) {}

  private async getCourseRequirements(data: CreateCourseDto) {
    const requirements = await this.respository.find({
      where: {
        id: In(data.requirementsId),
      },
    });
    console.log(data.requirementsId.length && !requirements.length);
    if (data.requirementsId.length && !requirements.length)
      throw new NotFoundException(`Requisitos não encontrados.`);
    return requirements;
  }

  async create(data: CreateCourseDto) {
    const requirements = await this.getCourseRequirements(data);
    const entity = new CourseEntity();
    Object.assign(entity, { ...data, requirements });
    return await this.respository.save(entity);
  }

  async findAll(queryParams: GetCourseDto) {
    const queryBuilder = this.respository.createQueryBuilder('course');

    if (queryParams.title) {
      queryBuilder.andWhere('course.title ILIKE :title', {
        title: `%${queryParams.title}%`,
      });
    }

    if (queryParams.subject) {
      queryBuilder.andWhere('course.subject = :subject', {
        subject: queryParams.subject,
      });
    }

    if (queryParams.limit) {
      queryBuilder.take(queryParams.limit);
    }

    if (queryParams.offset) {
      queryBuilder.skip(queryParams.offset);
    }

    queryBuilder.leftJoinAndSelect(
      'course.requirements',
      'course_requirements',
    );

    return queryBuilder.getManyAndCount();
  }

  async findOne(id: string) {
    const course = await this.respository.find({
      where: { id, deletedAt: undefined },
      relations: ['requirements'],
    });
    if (!course) throw new NotFoundException(`Curso não encontrado.`);
    return course;
  }

  async filter(filters: UpdateCourseDto) {
    const queryBuilder = this.respository.createQueryBuilder('course');

    if (filters.title) {
      queryBuilder.andWhere('course.title ILIKE :title', {
        title: `%${filters.title}%`,
      });
    }

    if (filters.description) {
      queryBuilder.andWhere('user.description = :description', {
        description: filters.description,
      });
    }

    if (filters.subject) {
      queryBuilder.andWhere('user.role = :role', { role: filters.subject });
    }

    return queryBuilder.getMany();
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
