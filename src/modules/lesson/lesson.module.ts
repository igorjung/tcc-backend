import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonEntity } from './entities/lesson.entity';
import { LessonOptionEntity } from './entities/lessonOption.entity';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    CourseModule,
    TypeOrmModule.forFeature([LessonEntity, LessonOptionEntity]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
