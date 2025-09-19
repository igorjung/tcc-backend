import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    private readonly respository: Repository<UserEntity>,
  ) {}

  private validateUserPermission(id: string, payload?: UserPayload) {
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

  async create(data: CreateUserDto, payload?: UserPayload) {
    this.validateCanCreateAdmin(data, payload);
    const entity = new UserEntity();
    Object.assign(entity, data);
    return await this.respository.save(entity);
  }

  async findAll() {
    return await this.respository.find({ where: { deletedAt: undefined } });
  }

  async findOne(id: string, payload?: UserPayload) {
    this.validateUserPermission(id, payload);
    const user = await this.respository.findOneBy({ id, deletedAt: undefined });
    if (!user) throw new NotFoundException(`Usário não encontrado.`);
    return user;
  }

  async update(id: string, data: UpdateUserDto, payload?: UserPayload) {
    this.validateUserPermission(id, payload);
    this.validateCanCreateAdmin(data, payload);
    const user = await this.respository.findOneBy({ id });
    if (user === null)
      throw new NotFoundException('O usuário não foi encontrado.');
    Object.assign(user, data);
    return this.respository.save(user);
  }

  async remove(id: string, payload?: UserPayload) {
    this.validateUserPermission(id, payload);
    const response = await this.respository.delete(id);
    if (!response.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }

  async findOneByEmail(email: string) {
    const user = await this.respository.findOneBy({
      email,
      deletedAt: undefined,
    });
    if (!user)
      throw new NotFoundException(`Este email não pertence a um usuário.`);
    return user;
  }

  async updatePassword(
    id: string,
    data: UpdatePasswordDto,
    hashedPassword: string,
  ) {
    const user = await this.respository.findOneBy({ id });

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
    return this.respository.save(user);
  }
}
