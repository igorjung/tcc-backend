import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { GetLessonDto } from './dto/get-lesson.dto';
import { UserPayload } from '../auth/auth.service';
import { UserRole } from 'src/enum/user.enum';
import { CourseService } from '../course/course.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly repository: Repository<LessonEntity>,
    private courseService: CourseService,
  ) {}

  async create(data: CreateLessonDto) {
    const entity = new LessonEntity();

    const course = await this.courseService.findOne(data.courseId);
    if (!course) throw new BadRequestException(`Curso não encontrado.`);

    Object.assign(entity, data);
    return await this.repository.save(entity);
  }

  async findAll(queryParams: GetLessonDto, payload?: UserPayload) {
    const queryBuilder = this.repository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.course', 'course');

    if (payload?.role !== UserRole.ADMIN) {
      queryBuilder.innerJoin(
        'course.enrollments',
        'enrollment',
        'enrollment.user_id = :userId',
        { userId: payload?.sub },
      );
    }

    if (queryParams.title) {
      queryBuilder.andWhere('lesson.title ILIKE :title', {
        title: `%${queryParams.title}%`,
      });
    }

    if (queryParams.courseId) {
      queryBuilder.andWhere('lesson.courseId = :courseId', {
        courseId: queryParams.courseId,
      });
    }

    if (queryParams.limit) {
      queryBuilder.take(queryParams.limit);
    }

    if (queryParams.offset) {
      queryBuilder.skip(queryParams.offset);
    }

    return queryBuilder.getManyAndCount();
  }

  async findOne(id: string, payload: UserPayload) {
    const queryBuilder = this.repository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.course', 'course');
    if (payload?.role !== UserRole.ADMIN) {
      queryBuilder.innerJoin(
        'course.enrollments',
        'enrollment',
        'enrollment.user_id = :userId',
        { userId: payload?.sub },
      );
    }

    const lesson = await queryBuilder
      .leftJoinAndSelect('lesson.options', 'options')
      .where('lesson.id = :id', {
        id,
      })
      .andWhere('lesson.deleted_at IS NULL')
      .getOne();

    if (!lesson) {
      throw new NotFoundException('Aula não encontrada.');
    }

    return lesson;
  }

  async update(id: string, data: UpdateLessonDto) {
    const lesson = await this.repository.findOneBy({ id });
    if (lesson === null)
      throw new NotFoundException('A aula não foi encontrada.');
    Object.assign(lesson, data);
    return this.repository.save(lesson);
  }

  async remove(id: string) {
    const lesson = await this.repository.findOneBy({ id });
    if (lesson === null)
      throw new NotFoundException('A aula não foi encontrada.');

    const response = await this.repository.delete(id);
    if (!response.affected) throw new NotFoundException('Aula não encontrada.');
  }
}
