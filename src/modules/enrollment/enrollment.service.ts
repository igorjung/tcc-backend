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

  async create(data: CreateEnrollmentDto, payload?: UserPayload) {
    const { userId, courseId } = data;
    this.userService.validateUserPermission(userId, payload);

    const user = await this.userService.findOne(userId, payload);
    if (!user) throw new BadRequestException(`Usuário não encontrado.`);

    const course = await this.courseService.findOne(courseId);
    if (!course) throw new BadRequestException(`Curso não encontrado.`);

    const isEnrolled = await this.repository.findOne({
      where: { courseId, userId, deletedAt: undefined },
    });
    if (isEnrolled)
      throw new BadRequestException(`Você já iniciou esse curso.`);

    await this.validateRequirements(course, userId);

    const entity = new EnrollmentEntity();
    Object.assign(entity, { user, course });
    return await this.repository.save(entity);
  }

  async findAll() {
    return await this.repository.find({ where: { deletedAt: undefined } });
  }

  async findByUser(payload: UserPayload) {
    return await this.repository.find({
      where: {
        deletedAt: undefined,
        userId: payload.sub,
      },
      relations: ['course'],
    });
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
