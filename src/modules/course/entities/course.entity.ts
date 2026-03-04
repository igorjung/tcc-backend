import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CourseSubject } from '../../../enum/course.enum';
import { EnrollmentEntity } from '../../enrollment/entities/enrollmen.entity';
import { LessonEntity } from '../../lesson/entities/lesson.entity';

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
  @ManyToMany(() => CourseEntity, (course) => course.requirements, {
    onDelete: 'CASCADE',
  })
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
  requirements: CourseEntity[];

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

  @ApiProperty({
    description: 'Matrículas do curso.',
  })
  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
  enrollments: () => EnrollmentEntity[];

  @ApiProperty({
    description: 'Aulas do curso.',
  })
  @OneToMany(() => LessonEntity, (lesson) => lesson.course)
  lessons: () => LessonEntity[];
}
