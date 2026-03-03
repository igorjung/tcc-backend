import { IsOptional, IsUUID } from 'class-validator';

export class GetLessonDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsUUID()
  courseId?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
