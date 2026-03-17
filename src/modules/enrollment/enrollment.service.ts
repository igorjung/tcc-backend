import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { EnrollmentEntity } from './entities/enrollmen.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UserService } from '../user/user.service';
import { UserPayload } from '../auth/auth.service';
import { CourseService } from '../course/course.service';
import { UserRole } from 'src/enum/user.enum';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { CourseEntity } from '../course/entities/course.entity';
import { GetEnrollmentDto } from './dto/get-enrollment.dto';
import { CourseSubject } from 'src/enum/course.enum';
import { isUniqueViolation } from 'src/resources/helpers/isUniqueViolation';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly repository: Repository<EnrollmentEntity>,
    private userService: UserService,
    private courseService: CourseService,
  ) {}

  private async validateRequirements(course: CourseEntity, userId: string) {
    const { requirements } = course;

    const requirementIds = requirements.map((r) => r.id);

    if (requirementIds.length > 0) {
      const completedRequirements = await this.repository.find({
        where: {
          courseId: In(requirementIds),
          userId,
          isCompleted: true,
        },
      });

      if (completedRequirements.length !== requirementIds.length) {
        throw new BadRequestException(
          'Você precisa concluir todos os pré-requisitos antes de iniciar esse curso.',
        );
      }
    }
  }

  async validateCourseCompleted(id: string) {
    const enrollment = await this.repository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.course', 'course')
      .leftJoinAndSelect('course.lessons', 'lesson')
      .leftJoinAndSelect('lesson.options', 'option')
      .addSelect('option.isCorrect')
      .leftJoinAndSelect('enrollment.lessonAttempts', 'attempt')
      .leftJoinAndSelect('attempt.lessonOption', 'answer')
      .addSelect('answer.isCorrect')
      .where('enrollment.id = :id', { id })
      .andWhere('enrollment.deleted_at IS NULL')
      .getOne();

    if (!enrollment) return { isCompleted: false, enrollment };
    const { lessonAttempts } = enrollment;
    const { lessons } = enrollment.course;

    const isCompleted = lessonAttempts.length === lessons.length;

    if (!isCompleted) return { isCompleted: false, enrollment };

    let correctAnswers = 0;
    lessonAttempts.forEach((attempt) => {
      const answer = lessons
        .find((item) => item.id === attempt.lessonId)
        ?.options.find((option) => option.isCorrect);

      if (answer && answer.id === attempt.lessonOptionId) correctAnswers++;
    });

    const grade = (correctAnswers / lessons.length) * 10;

    Object.assign(enrollment, { isCompleted: true, grade });
    const completedEnrollment = await this.repository.save(enrollment);

    return { isCompleted: true, enrollment: completedEnrollment };
  }

  async create(data: CreateEnrollmentDto, payload?: UserPayload) {
    const { userId, courseId } = data;
    this.userService.validateUserPermission(userId, payload);

    const user = await this.userService.findOne(userId, payload);
    if (!user) throw new BadRequestException(`Usuário não encontrado.`);

    const course = await this.courseService.findOne(courseId);
    if (!course) throw new BadRequestException(`Curso não encontrado.`);

    await this.validateRequirements(course, userId);

    const entity = new EnrollmentEntity();
    Object.assign(entity, { user, course });

    try {
      return await this.repository.save(entity);
    } catch (err) {
      if (isUniqueViolation(err)) {
        throw new BadRequestException(
          'Usuário já possuí uma matrícula para esse curso.',
        );
      }
    }
  }

  async findAll() {
    return await this.repository.find({ where: { deletedAt: undefined } });
  }

  async findByUser(payload: UserPayload, queryParams: GetEnrollmentDto) {
    const queryBuilder = this.repository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.course', 'course');

    if (payload?.role !== UserRole.ADMIN) {
      queryBuilder.where('enrollment.user_id = :userId', {
        userId: payload?.sub,
      });
    }

    if (queryParams.title) {
      queryBuilder.andWhere('course.title ILIKE :title', {
        title: `%${queryParams.title}%`,
      });
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

    if (Number(queryParams.isCompleted) === 1) {
      queryBuilder.andWhere('enrollment.isCompleted = true');
    } else {
      queryBuilder.andWhere('enrollment.isCompleted isNull');
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
    const where = {
      id,
      deletedAt: undefined,
      userId: payload.role === UserRole.ADMIN ? undefined : payload.sub,
    };

    const enrollment = await this.repository.findOne({
      where,
      relations: ['user', 'course'],
    });
    if (!enrollment) throw new NotFoundException(`Matrícula não encontrada.`);
    return enrollment;
  }

  async update(id: string, data: UpdateEnrollmentDto, payload: UserPayload) {
    const enrollment = await this.findOne(id, payload);

    Object.assign(enrollment, data);
    return this.repository.save(enrollment);
  }

  async remove(id: string, payload: UserPayload) {
    await this.findOne(id, payload);

    const response = await this.repository.delete(id);
    if (!response.affected)
      throw new NotFoundException('Matrícula não encontrada.');
  }
}
