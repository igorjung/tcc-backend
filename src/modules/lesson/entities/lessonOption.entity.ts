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

import { LessonEntity } from './lesson.entity';

@Entity({ name: 'lesson-options' })
export class LessonQuestionEntity {
  @ApiProperty({
    description: 'Id da opção de resposta.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Id da aula.',
  })
  @ManyToOne(() => LessonEntity, (lesson) => lesson.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: () => LessonEntity;
  @Column({ name: 'lesson_id' })
  lessonId: string;

  @ApiProperty({
    description: 'Conteúdo da opção de resposta.',
  })
  @Column({ name: 'content', nullable: false })
  content: string;

  @ApiProperty({
    description: 'Data de criação da opção de resposta.',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização da opção de resposta.',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ApiProperty({
    description: 'Data de deleção da opção de resposta.',
  })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
