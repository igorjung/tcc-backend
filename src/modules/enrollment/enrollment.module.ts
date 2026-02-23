import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnrollmentController } from './enrollment.controller';
import { EnrollmentEntity } from './entities/enrollmen.entity';
import { EnrollmentService } from './enrollment.service';
import { UserModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    UserModule,
    CourseModule,
    TypeOrmModule.forFeature([EnrollmentEntity]),
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
