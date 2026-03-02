import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonEntity } from './entities/lesson.entity';
import { LessonQuestionEntity } from './entities/lessonOption.entity';
import { CourseModule } from '../course/course.module';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';

@Module({
  imports: [
    CourseModule,
    TypeOrmModule.forFeature([LessonEntity, LessonQuestionEntity]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
