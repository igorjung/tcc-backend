import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnrollmentEntity } from './entities/enrollmen.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UserService } from '../user/user.service';
import { UserPayload } from '../auth/auth.service';
import { CourseService } from '../course/course.service';
import { UserRole } from 'src/enum/user.enum';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly respository: Repository<EnrollmentEntity>,
    private userService: UserService,
    private courseService: CourseService,
  ) {}

  async create(data: CreateEnrollmentDto, payload?: UserPayload) {
    const { userId, courseId } = data;
    this.userService.validateUserPermission(userId, payload);

    const user = await this.userService.findOne(userId, payload);
    if (!user) throw new BadRequestException(`Usuário não encontrado.`);

    const course = await this.courseService.findOne(courseId);
    if (!course) throw new BadRequestException(`Curso não encontrado.`);

    const entity = new EnrollmentEntity();
    Object.assign(entity, { user, course });
    return await this.respository.save(entity);
  }

  async findAll() {
    return await this.respository.find({ where: { deletedAt: undefined } });
  }

  async findByUser(payload: UserPayload) {
    return await this.respository.find({
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

    const enrollment = await this.respository.findOne({
      where,
      relations: ['user', 'course'],
    });
    if (!enrollment) throw new NotFoundException(`Matrícula não encontrada.`);
    return enrollment;
  }

  async update(id: string, data: UpdateEnrollmentDto, payload: UserPayload) {
    const enrollment = await this.findOne(id, payload);

    Object.assign(enrollment, data);
    return this.respository.save(enrollment);
  }

  async remove(id: string, payload: UserPayload) {
    await this.findOne(id, payload);

    const response = await this.respository.delete(id);
    if (!response.affected)
      throw new NotFoundException('Matrícula não encontrada.');
  }
}
