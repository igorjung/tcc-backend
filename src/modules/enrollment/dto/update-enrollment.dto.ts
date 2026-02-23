import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateEnrollmentDto {
  @ApiProperty({
    description: 'Nota do usuário no curso',
    default: 8.0,
  })
  @IsNumber({}, { message: 'A nota do usuário deve ser um valor numérico' })
  @Min(0, { message: 'A nota do usuário não pode ser negativa' })
  @Max(10, { message: 'A nota do usuário não pode ser maior que 10' })
  grade: number;

  @ApiProperty({
    description: 'O usuário finalizou o curso?',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
