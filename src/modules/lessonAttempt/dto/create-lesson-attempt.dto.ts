import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateLessonAttemptDto {
  @ApiProperty({
    description: 'Id da matrícula.',
    default: '1',
  })
  @IsUUID('4', { each: true })
  enrollmentId: string;

  @ApiProperty({
    description: 'Id da aula.',
    default: '1',
  })
  @IsUUID('4', { each: true })
  lessonId: string;

  @ApiProperty({
    description: 'Id da alternativa respondida.',
    default: '1',
  })
  @IsUUID('4', { each: true })
  lessonOptionId: string;
}
