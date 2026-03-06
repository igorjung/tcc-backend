import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonAttemptEntity } from './entities/lessonAttempt.entity';
import { LessonAttemptService } from './lessonAttempt.service';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { LessonModule } from '../lesson/lesson.module';
import { LessonAttemptController } from './lessonAttempt.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    EnrollmentModule,
    LessonModule,
    UserModule,
    TypeOrmModule.forFeature([LessonAttemptEntity]),
  ],
  controllers: [LessonAttemptController],
  providers: [LessonAttemptService],
  exports: [LessonAttemptService],
})
export class LessonAttemptModule {}
