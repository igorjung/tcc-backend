import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { CourseEntity } from '../../course/entities/course.entity';
import { LessonOptionEntity } from './lessonOption.entity';
import { LessonAttemptEntity } from '../../lessonAttempt/entities/lessonAttempt.entity';

@Entity({ name: 'lessons' })
export class LessonEntity {
  @ApiProperty({
    description: 'Id do aula.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Id do curso.',
  })
  @ManyToOne(() => CourseEntity, (course) => course.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: () => CourseEntity;
  @Column({ name: 'course_id' })
  courseId: string;

  @ApiProperty({
    description: 'Título da aula.',
  })
  @Column({ name: 'title', length: 100, nullable: false })
  title: string;

  @ApiProperty({
    description: 'Descrição da aula.',
  })
  @Column({ name: 'description', length: 500, nullable: false })
  description: string;

  @ApiProperty({
    description: 'Conteúdo da aula.',
  })
  @Column({ name: 'content', nullable: false })
  content: string;

  @ApiProperty({
    description: 'Questionário da aula.',
  })
  @Column({ name: 'question', length: 500, nullable: false })
  question: string;

  @ApiProperty({
    description: 'Data de criação da aula.',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização da aula.',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ApiProperty({
    description: 'Data de deleção da aula.',
  })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ApiProperty({
    description: 'Opções de resposta.',
  })
  @OneToMany(() => LessonOptionEntity, (option) => option.lesson, {
    cascade: true,
    eager: true,
  })
  options: LessonOptionEntity[];

  @ApiProperty({
    description: 'Respostas da atividade.',
  })
  @OneToMany(() => LessonAttemptEntity, (attempt) => attempt.lesson)
  attempts: LessonAttemptEntity[];
}
