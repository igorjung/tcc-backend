import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly respository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const entity = new UserEntity();
    Object.assign(entity, data);
    return await this.respository.save(entity);
  }

  async findAll() {
    return await this.respository.find({ where: { deletedAt: undefined } });
  }

  async findOne(id: string) {
    const user = await this.respository.findOneBy({ id, deletedAt: undefined });
    if (!user) throw new NotFoundException(`Usário não encontrado.`);
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.respository.findOneBy({ email, deletedAt: undefined });
    if (!user) throw new NotFoundException(`Este email não pertence a um usuário.`);
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.respository.findOneBy({ id });
    if (user === null) throw new NotFoundException('O usuário não foi encontrado.');
    Object.assign(user, data);
    return this.respository.save(user);
  }

  async remove(id: string) {
    const response = await this.respository.delete(id);
    if (!response.affected) throw new NotFoundException('O usuário não foi encontrado.');
  }
}
