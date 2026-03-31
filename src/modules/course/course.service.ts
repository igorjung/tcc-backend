import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';
import { GetCourseDto } from './dto/get-course.dto';
import { CourseSubject } from 'src/enum/course.enum';
import { UserPayload } from '../auth/auth.service';

interface RequirementCountRow {
  rootCourseId: string;
  total: string;
}

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly repository: Repository<CourseEntity>,
  ) {}

  private async getCourseRequirements(data: CreateCourseDto) {
    const requirements = await this.repository.find({
      where: {
        id: In(data.requirementsId),
      },
    });
    if (data.requirementsId.length && !requirements.length)
      throw new NotFoundException(`Requisitos não encontrados.`);
    return requirements;
  }

  async create(data: CreateCourseDto) {
    const requirements = await this.getCourseRequirements(data);
    const entity = new CourseEntity();
    Object.assign(entity, { ...data, requirements });
    return await this.repository.save(entity);
  }

  async findAll(queryParams: GetCourseDto, payload?: UserPayload) {
    const queryBuilder = this.repository.createQueryBuilder('course');

    if (queryParams.title) {
      queryBuilder.andWhere('course.title ILIKE :title', {
        title: `%${queryParams.title}%`,
      });
    }

    if (payload?.sub) {
      if (!queryParams.showEnrolled) {
        queryBuilder
          .andWhere((qb) => {
            const subQuery = qb
              .subQuery()
              .select('1')
              .from('enrollments', 'enrollment')
              .where('enrollment.courseId = course.id')
              .andWhere('enrollment.userId = :userId')
              .getQuery();

            return `NOT EXISTS ${subQuery}`;
          })
          .setParameter('userId', payload.sub);
      } else {
        queryBuilder.leftJoinAndSelect(
          'course.enrollments',
          'enrollment',
          'enrollment.userId = :userId',
          { userId: payload.sub },
        );
      }
    }

    if (queryParams.subject?.length) {
      const validSubject = queryParams.subject
        .split(',')
        .filter((subject) =>
          Object.values(CourseSubject).includes(subject as CourseSubject),
        );

      if (validSubject.length) {
        queryBuilder.andWhere('course.subject IN (:...status)', {
          status: validSubject,
        });
      }
    }

    if (queryParams.limit) {
      queryBuilder.take(queryParams.limit);
    }

    if (queryParams.offset) {
      queryBuilder.skip(queryParams.offset);
    }

    queryBuilder
      .leftJoinAndSelect('course.requirements', 'course_requirements')
      .orderBy('course.createdAt', 'ASC');

    const [courses, total] = await queryBuilder.getManyAndCount();

    const courseIds = courses.map((c) => c.id);

    if (!courseIds.length) {
      return [[], total];
    }

    const requirementCount = await this.repository.query<RequirementCountRow[]>(
      `
        WITH RECURSIVE requirement_tree AS (
          SELECT
            cr.course_id AS "rootCourseId",
            cr.requirement_id AS "requirementId"
          FROM course_requirements cr
          WHERE cr.course_id = ANY($1)

          UNION ALL

          SELECT
            rt."rootCourseId",
            cr.requirement_id
          FROM requirement_tree rt
          JOIN course_requirements cr
            ON cr.course_id = rt."requirementId"
        )
        SELECT
          "rootCourseId",
          COUNT(DISTINCT "requirementId")::int AS "total"
        FROM requirement_tree
        GROUP BY "rootCourseId";
      `,
      [courseIds],
    );

    const countMap = new Map(
      requirementCount.map((c) => [c.rootCourseId, Number(c.total)]),
    );

    const data = courses.map((course) => {
      const count = countMap.get(course.id) ?? 0;

      return {
        ...course,
        requirementCount: count,
      };
    });

    return [data, total];
  }

  async findOne(id: string) {
    const course = await this.repository.findOne({
      where: { id, deletedAt: undefined },
      relations: ['requirements', 'lessons'],
    });
    if (!course) throw new NotFoundException(`Curso não encontrado.`);
    return course;
  }

  async update(id: string, data: UpdateCourseDto) {
    const course = await this.repository.findOneBy({ id });
    if (course === null)
      throw new NotFoundException('O curso não foi encontrado.');
    Object.assign(course, data);
    return this.repository.save(course);
  }

  async remove(id: string) {
    const response = await this.repository.delete(id);
    if (!response.affected)
      throw new NotFoundException('O curso não foi encontrado.');
  }
}
