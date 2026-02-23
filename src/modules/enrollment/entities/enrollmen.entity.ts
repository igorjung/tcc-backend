import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../../user/entities/user.entity';
import { CourseEntity } from '../../course/entities/course.entity';

@Entity({ name: 'enrollments' })
export class EnrollmentEntity {
  @ApiProperty({
    description: 'Id do matrícula.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Id do usuário.',
  })
  @ManyToOne(() => UserEntity, (user) => user.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: () => UserEntity;
  @Column({ name: 'user_id' })
  userId: string;

  @ApiProperty({
    description: 'Id do curso.',
  })
  @ManyToOne(() => CourseEntity, (course) => course.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: () => CourseEntity;
  @Column({ name: 'course_id' })
  courseId: string;

  @ApiProperty({
    description: 'Nota do usuário no curso',
  })
  @Column({ type: 'float', name: 'grade', nullable: true })
  grade?: number;

  @ApiProperty({
    description: 'O curso foi finalizado?',
  })
  @Column({ type: 'boolean', name: 'is_completed', nullable: true })
  isCompleted?: boolean;

  @ApiProperty({
    description: 'Data de criação do matrícula.',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização matrícula.',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ApiProperty({
    description: 'Data de deleção matrícula.',
  })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
