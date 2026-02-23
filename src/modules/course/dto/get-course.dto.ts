import { IsOptional } from 'class-validator';
import { UpdateCourseDto } from './update-course.dto';
import { CourseSubject } from 'src/enum/course.enum';

export class GetCourseDto extends UpdateCourseDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  subject?: CourseSubject;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
