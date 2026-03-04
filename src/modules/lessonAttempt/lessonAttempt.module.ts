import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonAttemptEntity } from './entities/lessonAttempt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonAttemptEntity])],
})
export class LessonAttemptModule {}
