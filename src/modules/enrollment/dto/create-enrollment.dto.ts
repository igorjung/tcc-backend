import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({
    description: 'Id do usuário.',
    default: '1',
  })
  @IsUUID('4', { each: true })
  userId: string;

  @ApiProperty({
    description: 'Id do curso.',
    default: '1',
  })
  @IsUUID('4', { each: true })
  courseId: string;
}
