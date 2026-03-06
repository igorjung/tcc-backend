import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateLessonOptionDto } from './create-lesson-option.dto';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Id do curso.',
    default: '1',
  })
  @IsUUID('4', { each: true })
  courseId: string;

  @ApiProperty({
    description: 'Título da aula.',
    default: 'Lista - Push e Pop',
  })
  @IsString({ message: 'O título informado é inválido' })
  title: string;

  @ApiProperty({
    description: 'Descrição da aula.',
    default: 'Entenda como adicionar e remover itens de uma lista',
  })
  @IsString({ message: 'A descrição informado é inválido' })
  description: string;

  @ApiProperty({
    description: 'Conteúdo da aula.',
    default:
      '<p>O comando <b>push()</b> adiciona um item ao fim de uma lista</p>',
  })
  @IsString({ message: 'O conteúdo informado é inválido' })
  content: string;

  @ApiProperty({
    description: 'Questionário da aula.',
    default:
      'Qual comando utilizado para remover o primeiro item de uma lista?',
  })
  @IsString({ message: 'O questionário informado é inválido' })
  question: string;

  @ApiProperty({
    description: 'Alternativas de resposta para o questionário da aula.',
    default: '.slice()',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  @Type(() => CreateLessonOptionDto)
  options: CreateLessonOptionDto[];
}
