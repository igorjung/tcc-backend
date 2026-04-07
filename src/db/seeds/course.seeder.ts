//TODO: Remover comentários quando adicionar todas lessons ao arquivo seeder.

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { CourseEntity } from '../../modules/course/entities/course.entity';
import { CourseSubject } from '../../enum/course.enum';

export default class CourseSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const repo = dataSource.getRepository(CourseEntity);

    const courses: Partial<CourseEntity>[] = [
      {
        title: 'HTML - Estrutura Básica',
        description: 'Aprenda a estrutura essencial de um documento HTML.',
        subject: CourseSubject.HTML,
        difficulty: 0,
        requirements: [],
      },
      {
        title: 'HTML - Tags e Elementos',
        description: 'Conheça as principais tags HTML.',
        subject: CourseSubject.HTML,
        difficulty: 1,
        requirements: [],
      },
      {
        title: 'HTML - Links e Imagens',
        description: 'Aprenda a criar links e imagens.',
        subject: CourseSubject.HTML,
        difficulty: 2,
        requirements: [],
      },
      {
        title: 'HTML - Listas',
        description: 'Crie listas ordenadas e não ordenadas.',
        subject: CourseSubject.HTML,
        difficulty: 2,
        requirements: [],
      },
    ];
    await repo.save(courses);

    const map = new Map(courses.map((course) => [course.title, course]));
    const setReq = (course: string, reqs: string[]) => {
      const current = map.get(course);
      if (!current) return;

      current.requirements = reqs
        .map((r) => map.get(r))
        .filter(Boolean) as CourseEntity[];
    };

    setReq('HTML - Tags e Elementos', ['HTML - Estrutura Básica']);
    setReq('HTML - Links e Imagens', ['HTML - Tags e Elementos']);
    setReq('HTML - Listas', ['HTML - Tags e Elementos']);

    await repo.save([...map.values()]);
  }
}
