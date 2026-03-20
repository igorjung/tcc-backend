import { IsOptional } from 'class-validator';

export class GetCourseDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  subject?: string;

  @IsOptional()
  showEnrolled?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
