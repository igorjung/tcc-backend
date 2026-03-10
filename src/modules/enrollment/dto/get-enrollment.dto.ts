import { IsOptional } from 'class-validator';

export class GetEnrollmentDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  subject?: string;

  @IsOptional()
  isCompleted?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
