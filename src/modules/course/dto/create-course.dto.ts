import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { CourseSubject } from 'src/enum/course.enum';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Título do curso.',
    default: 'JS Básico - Lista',
  })
  @IsString({ message: 'O título informado é inválido' })
  title: string;

  @ApiProperty({
    description: 'Descrição do curso.',
    default:
      'Aprenda como manipular listas (arrays): adicionar item, remover itens, filtrar e dividir uma lista em duas.',
  })
  @IsString({ message: 'A descrição informado é inválido' })
  description: string;

  @ApiProperty({
    description: 'Dificuldade do curso.',
    default: 0,
  })
  @IsString({ message: 'A dificuldade informado é inválida' })
  difficulty: 0;

  @ApiProperty({
    description: 'Tema do curso.',
    default: 'JS',
  })
  @IsEnum(CourseSubject)
  subject: CourseSubject;

  @ApiProperty({
    description: 'Requisitos do curso.',
    default: '[1,2]',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  requirementsId: string[];
}
