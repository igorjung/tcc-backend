import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';
import { GetCourseDto } from './dto/get-course.dto';
import { CourseSubject } from 'src/enum/course.enum';
import { UserPayload } from '../auth/auth.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly repository: Repository<CourseEntity>,
  ) {}

  private async getCourseRequirements(data: CreateCourseDto) {
    const requirements = await this.repository.find({
      where: {
        id: In(data.requirementsId),
      },
    });
    if (data.requirementsId.length && !requirements.length)
      throw new NotFoundException(`Requisitos não encontrados.`);
    return requirements;
  }

  async create(data: CreateCourseDto) {
    const requirements = await this.getCourseRequirements(data);
    const entity = new CourseEntity();
    Object.assign(entity, { ...data, requirements });
    return await this.repository.save(entity);
  }

  async findAll(queryParams: GetCourseDto, payload?: UserPayload) {
    const queryBuilder = this.repository.createQueryBuilder('course');

    if (queryParams.title) {
      queryBuilder.andWhere('course.title ILIKE :title', {
        title: `%${queryParams.title}%`,
      });
    }

    if (payload?.sub) {
      if (!queryParams.showEnrolled) {
        queryBuilder
          .andWhere((qb) => {
            const subQuery = qb
              .subQuery()
              .select('1')
              .from('enrollments', 'enrollment')
              .where('enrollment.courseId = course.id')
              .andWhere('enrollment.userId = :userId')
              .getQuery();

            return `NOT EXISTS ${subQuery}`;
          })
          .setParameter('userId', payload.sub);
      } else {
        queryBuilder.leftJoinAndSelect(
          'course.enrollments',
          'enrollment',
          'enrollment.userId = :userId',
          { userId: payload.sub },
        );
      }
    }

    if (queryParams.subject?.length) {
      const validSubject = queryParams.subject
        .split(',')
        .filter((subject) =>
          Object.values(CourseSubject).includes(subject as CourseSubject),
        );

      if (validSubject.length) {
        queryBuilder.andWhere('course.subject IN (:...status)', {
          status: validSubject,
        });
      }
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
    const course = await this.repository.findOne({
      where: { id, deletedAt: undefined },
      relations: ['requirements'],
    });
    if (!course) throw new NotFoundException(`Curso não encontrado.`);
    return course;
  }

  async update(id: string, data: UpdateCourseDto) {
    const course = await this.repository.findOneBy({ id });
    if (course === null)
      throw new NotFoundException('O curso não foi encontrado.');
    Object.assign(course, data);
    return this.repository.save(course);
  }

  async remove(id: string) {
    const response = await this.repository.delete(id);
    if (!response.affected)
      throw new NotFoundException('O curso não foi encontrado.');
  }
}
