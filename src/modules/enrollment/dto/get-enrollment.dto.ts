import { IsOptional } from 'class-validator';

export class GetEnrollmentDto {
  @IsOptional()
  isCompleted?: number;
}
