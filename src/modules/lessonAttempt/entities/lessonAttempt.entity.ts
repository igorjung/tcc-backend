import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToOne,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { EnrollmentEntity } from '../../enrollment/entities/enrollmen.entity';
import { LessonEntity } from '../../lesson/entities/lesson.entity';
import { LessonOptionEntity } from '../../lesson/entities/lessonOption.entity';

@Entity({ name: 'lesson_attempts' })
@Unique(['enrollmentId', 'lessonId'])
export class LessonAttemptEntity {
  @ApiProperty({
    description: 'Id da tentativa.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Id da matrícula.',
  })
  @ManyToOne(
    () => EnrollmentEntity,
    (enrollment) => enrollment.lessonAttempts,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: () => EnrollmentEntity;
  @Column({ name: 'enrollment_id' })
  enrollmentId: string;

  @ApiProperty({
    description: 'Id da aula.',
  })
  @ManyToOne(() => LessonEntity, (lesson) => lesson.attempts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: () => LessonEntity;
  @Column({ name: 'lesson_id' })
  lessonId: string;

  @ApiProperty({
    description: 'Id da alternativa escolhida.',
  })
  @OneToOne(() => LessonOptionEntity, (option) => option.id)
  @JoinColumn({ name: 'lesson_option_id' })
  lessonOption: () => LessonOptionEntity;
  @Column({ name: 'lesson_option_id', nullable: true })
  lessonOptionId: string;

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
