import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRole } from 'src/enum/user.enum';
import { UserPayload } from '../auth/auth.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  validateUserPermission(id: string, payload?: UserPayload) {
    if (payload?.sub !== id && payload?.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'O usuário não tem permissão para realizar essa ação.',
      );
    }
  }

  private validateCanCreateAdmin(
    data: UpdateUserDto | CreateUserDto,
    payload?: UserPayload,
  ) {
    if (payload?.role !== UserRole.ADMIN && data.role === UserRole.ADMIN) {
      throw new UnauthorizedException(
        'O usuário não tem permissão para realizar essa ação.',
      );
    }
  }

  private async validateEmailUnique(
    id: string,
    data: UpdateUserDto | CreateUserDto,
  ) {
    const userWithSameEmail = await this.repository.findOneBy({
      id: Not(id),
      email: data.email,
    });
    if (userWithSameEmail !== null)
      throw new BadRequestException('O email inserido já está em uso');
  }

  async create(data: CreateUserDto, payload?: UserPayload) {
    this.validateCanCreateAdmin(data, payload);
    const entity = new UserEntity();
    Object.assign(entity, data);
    return await this.repository.save(entity);
  }

  async findAll() {
    return await this.repository.find({ where: { deletedAt: undefined } });
  }

  async findOne(id: string, payload?: UserPayload) {
    this.validateUserPermission(id, payload);
    const user = await this.repository.findOneBy({ id, deletedAt: undefined });
    if (!user) throw new NotFoundException(`Usário não encontrado.`);
    return user;
  }

  async update(id: string, data: UpdateUserDto, payload?: UserPayload) {
    this.validateUserPermission(id, payload);
    this.validateCanCreateAdmin(data, payload);
    await this.validateEmailUnique(id, data);

    const user = await this.repository.findOneBy({ id });
    if (user === null)
      throw new NotFoundException('O usuário não foi encontrado.');
    Object.assign(user, data);
    return this.repository.save(user);
  }

  async remove(id: string, payload?: UserPayload) {
    this.validateUserPermission(id, payload);
    const response = await this.repository.delete(id);
    if (!response.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }

  async findOneByEmail(email: string, isAuthRequest?: boolean) {
    const user = await this.repository.findOneBy({
      email,
      deletedAt: undefined,
    });

    if (!user) {
      if (!isAuthRequest)
        throw new NotFoundException(`Este email não pertence a um usuário.`);
      else
        throw new UnauthorizedException('O email ou a senha está incorreto.');
    }

    return user;
  }

  async updatePassword(
    id: string,
    data: UpdatePasswordDto,
    hashedPassword: string,
  ) {
    const user = await this.repository.findOneBy({ id });

    if (user === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    const isAuthenticated = await bcrypt.compare(
      data.oldPassword,
      user.password,
    );

    if (!isAuthenticated)
      throw new UnauthorizedException('A senha anterior está incorreta.');

    if (data.oldPassword === data.password)
      throw new BadRequestException(
        'A nova senha deve ser diferente da anterior.',
      );

    Object.assign(user, { password: hashedPassword });
    return this.repository.save(user);
  }

  async updateUserXp(userId: string, xp?: number) {
    const user = await this.repository.findOneBy({ id: userId });
    if (user === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    const newXp = (user.xp ?? 0) + (xp ?? 1);
    Object.assign(user, { xp: newXp });
    this.repository.save(user);

    return newXp;
  }

  async getActivitySummary(id: string, payload?: UserPayload) {
    this.validateUserPermission(id, payload);
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.id = :userId', {
        userId: id,
      })
      .leftJoinAndSelect('user.enrollments', 'enrollments')
      .leftJoinAndSelect('enrollments.course', 'course')
      .leftJoinAndSelect('enrollments.lessonAttempts', 'attempts')
      .leftJoinAndSelect('attempts.lesson', 'lesson')
      .leftJoinAndSelect('attempts.lessonOption', 'option')
      .addSelect('option.isCorrect')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.birth_date',
        'user.experience',
        'user.availability',

        'enrollments.id',
        'enrollments.grade',
        'enrollments.isCompleted',

        'course.id',
        'course.title',
        'course.subject',

        'attempts.id',
        'attempts.createdAt',

        'lesson.id',
        'lesson.title',

        'option.id',
        'option.isCorrect',
      ])
      .getOne();

    const userData = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      birthDate: user?.birthDate,
      experience: user?.experience,
      availability: user?.availability,
    };

    const completedCourses = user?.enrollments
      .filter((enrollment) => enrollment.isCompleted)
      .map((enrollment) => ({
        title: enrollment.course.title,
        subject: enrollment.course.subject,
        grade: enrollment.grade,
      }));

    const ongoingCourses = user?.enrollments
      .filter((enrollment) => !!enrollment.isCompleted)
      .map((enrollment) => ({
        title: enrollment.course.title,
        subject: enrollment.course.subject,
      }));

    const completedLessons = user?.enrollments.map((enrollment) =>
      enrollment.lessonAttempts.map((attempt) => ({
        title: attempt.lesson.title,
        subject: enrollment.course.subject,
        isCorrect: attempt.lessonOption.isCorrect,
        createdAt: attempt.createdAt,
      })),
    );

    return {
      user: userData,
      completedCourses,
      ongoingCourses,
      completedLessons,
    };
  }
}
