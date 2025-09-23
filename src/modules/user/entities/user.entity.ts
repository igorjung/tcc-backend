import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  UserAvailability,
  UserExperience,
  UserRole,
} from '../../../enum/user.enum';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({
    description: 'Id do usuário.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nome do usuário.',
  })
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário.',
  })
  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @ApiProperty({
    description: 'Data de nascimento do usuário.',
  })
  @Column({ type: 'date', name: 'birth_date', nullable: true })
  birthDate: string;

  @ApiProperty({
    description: 'Função do usuário.',
  })
  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Experiência do usuário.',
  })
  @Column({
    name: 'experience',
    type: 'enum',
    enum: UserExperience,
    nullable: true,
  })
  experience: UserExperience;

  @ApiProperty({
    description: 'Disponibilidade do usuário.',
  })
  @Column({
    name: 'availability',
    type: 'enum',
    enum: UserAvailability,
    nullable: true,
  })
  availability: UserAvailability;

  @ApiProperty({
    description: 'Data de criação do usuário.',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização usuário.',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ApiProperty({
    description: 'Data de deleção usuário.',
  })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
