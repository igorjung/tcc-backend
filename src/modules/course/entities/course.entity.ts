import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CourseSubject } from '../../../enum/course.enum';

@Entity({ name: 'courses' })
export class CourseEntity {
  @ApiProperty({
    description: 'Id do curso.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Título do curso.',
  })
  @Column({ name: 'title', length: 100, nullable: false })
  title: string;

  @ApiProperty({
    description: 'Descrição do curso.',
  })
  @Column({ name: 'description', length: 500, nullable: false })
  description: string;

  @ApiProperty({
    description: 'Tema do curso.',
  })
  @Column({
    name: 'subject',
    type: 'enum',
    enum: CourseSubject,
    default: CourseSubject.JS,
  })
  subject: CourseSubject;

  @ApiProperty({
    description: 'Requisitos do curso.',
  })
  @ManyToMany(() => CourseEntity, (course) => course.requirements)
  @JoinTable({
    name: 'course_requirements',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'requirement_id',
      referencedColumnName: 'id',
    },
  })
  requirements: CourseSubject;

  @ApiProperty({
    description: 'Cursos para qual é requisito.',
  })
  @ManyToMany(() => CourseEntity, (course) => course.requirements)
  requirementFor: CourseEntity[];

  @ApiProperty({
    description: 'Data de criação do curso.',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização curso.',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ApiProperty({
    description: 'Data de deleção curso.',
  })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
