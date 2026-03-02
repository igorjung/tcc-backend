import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Id do curso.',
    default: '1',
  })
  @IsUUID('4', { each: true })
  courseId: string;
}
