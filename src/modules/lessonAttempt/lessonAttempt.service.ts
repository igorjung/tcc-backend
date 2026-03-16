import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPayload } from '../auth/auth.service';
import { UserRole } from 'src/enum/user.enum';
import { LessonAttemptEntity } from './entities/lessonAttempt.entity';
import { CreateLessonAttemptDto } from './dto/create-lesson-attempt.dto';
import { LessonService } from '../lesson/lesson.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { UserService } from '../user/user.service';

@Injectable()
export class LessonAttemptService {
  constructor(
    @InjectRepository(LessonAttemptEntity)
    private readonly repository: Repository<LessonAttemptEntity>,
    private enrollmentService: EnrollmentService,
    private lessonService: LessonService,
    private userService: UserService,
  ) {}

  private async validateCanCreateAttempt(
    data: CreateLessonAttemptDto,
    payload: UserPayload,
  ) {
    const enrollment = await this.enrollmentService.findOne(
      data.enrollmentId,
      payload,
    );
    if (!enrollment) throw new BadRequestException(`Matrícula não encontrada.`);

    this.userService.validateUserPermission(enrollment.userId, payload);

    const lesson = await this.lessonService.findOne(data.lessonId, payload);
    if (!lesson) throw new BadRequestException(`Aula não encontrada.`);

    if (enrollment.courseId !== lesson.courseId)
      throw new BadRequestException(
        `A matrícula não pertence ao mesmo curso que a aula.`,
      );

    if (!lesson.options.find((option) => option.id === data.lessonOptionId))
      throw new BadRequestException(`Alternativa de resposta não encontrada.`);

    const prevAttempt = await this.repository.findOne({
      where: {
        enrollmentId: enrollment.id,
        lessonId: lesson.id,
      },
    });
    if (prevAttempt)
      throw new BadRequestException(
        `Você já respondeu esse questionário antes. É permitido apenas uma resposta por usuário.`,
      );
  }

  async create(data: CreateLessonAttemptDto, payload: UserPayload) {
    const entity = new LessonAttemptEntity();

    await this.validateCanCreateAttempt(data, payload);

    Object.assign(entity, data);
    await this.repository.save(entity);

    const { isCompleted, enrollment } =
      await this.enrollmentService.validateCourseCompleted(data.enrollmentId);
    const { isCorrect, correctAnswer } =
      await this.lessonService.validateLessonAnswer(
        data.lessonId,
        data.lessonOptionId,
      );

    return { isCompleted, enrollment, isCorrect, correctAnswer };
  }

  async findAll(payload?: UserPayload) {
    const queryBuilder = this.repository
      .createQueryBuilder('lesson_attempt')
      .leftJoinAndSelect('lesson_attempt.enrollment', 'enrollment')
      .leftJoinAndSelect('lesson_attempt.lesson', 'lesson')
      .leftJoinAndSelect('lesson_attempt.lessonOption', 'answer');

    if (payload?.role !== UserRole.ADMIN) {
      queryBuilder.where('enrollment.user_id = :userId', {
        userId: payload?.sub,
      });
    }

    return queryBuilder
      .andWhere('lesson_attempt.deleted_at IS NULL')
      .getManyAndCount();
  }

  async findOne(id: string, payload?: UserPayload) {
    const queryBuilder = this.repository
      .createQueryBuilder('lesson_attempt')
      .leftJoinAndSelect('lesson_attempt.enrollment', 'enrollment')
      .leftJoinAndSelect('lesson_attempt.lesson', 'lesson')
      .leftJoinAndSelect('lesson_attempt.lessonOption', 'answer');

    if (payload?.role !== UserRole.ADMIN) {
      queryBuilder.where('enrollment.user_id = :userId', {
        userId: payload?.sub,
      });
    }

    const lessonAttempt = await queryBuilder
      .where('lesson_attempt.id = :id', {
        id,
      })
      .andWhere('lesson_attempt.deleted_at IS NULL')
      .getOne();

    if (!lessonAttempt) {
      throw new NotFoundException('Resposta não encontrada.');
    }

    return lessonAttempt;
  }

  async remove(id: string) {
    const lesson = await this.repository.findOneBy({ id });
    if (lesson === null)
      throw new NotFoundException('A resposta não foi encontrada.');

    const response = await this.repository.delete(id);
    if (!response.affected)
      throw new NotFoundException('Resposta não encontrada.');
  }
}
