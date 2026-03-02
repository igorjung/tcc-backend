import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { UserPayload } from '../auth/auth.service';
// import { CourseService } from '../course/course.service';
// import { UserRole } from 'src/enum/user.enum';
import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly respository: Repository<LessonEntity>,
    // private courseService: CourseService,
  ) {}

  async create(data: CreateLessonDto) {
    const entity = new LessonEntity();
    Object.assign(entity, { ...data });
    return await this.respository.save(entity);
  }

  async findAll() {
    return await this.respository.find({ where: { deletedAt: undefined } });
  }

  async findByCourse(courseId: string) {
    return await this.respository.find({
      where: {
        deletedAt: undefined,
        courseId,
      },
      relations: ['course'],
    });
  }

  async findOne(id: string) {
    const where = {
      id,
      deletedAt: undefined,
    };

    const enrollment = await this.respository.findOne({
      where,
      relations: ['course'],
    });
    if (!enrollment) throw new NotFoundException(`Aula não encontrada.`);
    return enrollment;
  }

  async update(id: string, data: UpdateLessonDto) {
    const lesson = await this.respository.findOneBy({ id });
    if (lesson === null)
      throw new NotFoundException('A aula não foi encontrada.');
    Object.assign(lesson, data);
    return this.respository.save(lesson);
  }

  async remove(id: string) {
    await this.findOne(id);

    const response = await this.respository.delete(id);
    if (!response.affected) throw new NotFoundException('Aula não encontrada.');
  }
}
