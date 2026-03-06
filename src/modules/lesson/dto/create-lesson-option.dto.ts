import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateLessonOptionDto {
  @ApiProperty({
    description: 'Conteúdo da alternativa de resposta.',
    default: '.slice()',
  })
  @IsString({ message: 'O conteúdo informado é inválido' })
  content: string;

  @ApiProperty({
    description: 'A resposta está correta?',
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Valor do campo isCorrect deve ser booleano' })
  isCorrect: boolean;
}
