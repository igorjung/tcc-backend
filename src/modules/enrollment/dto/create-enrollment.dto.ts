import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateEnrollmentDto {
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
}
