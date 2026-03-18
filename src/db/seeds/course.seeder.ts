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
        requirements: [],
      },
      {
        title: 'HTML - Tags e Elementos',
        description: 'Conheça as principais tags HTML.',
        subject: CourseSubject.HTML,
        requirements: [],
      },
      {
        title: 'HTML - Links e Imagens',
        description: 'Aprenda a criar links e imagens.',
        subject: CourseSubject.HTML,
        requirements: [],
      },
      {
        title: 'HTML - Listas',
        description: 'Crie listas ordenadas e não ordenadas.',
        subject: CourseSubject.HTML,
        requirements: [],
      },
      {
        title: 'HTML - Formulários',
        description: 'Introdução a formulários HTML.',
        subject: CourseSubject.HTML,
        requirements: [],
      },

      {
        title: 'CSS - Introdução',
        description: 'Primeiros passos com CSS.',
        subject: CourseSubject.CSS,
        requirements: [],
      },
      {
        title: 'CSS - Cores e Background',
        description: 'Trabalhando com cores e fundos.',
        subject: CourseSubject.CSS,
        requirements: [],
      },
      {
        title: 'CSS - Box Model',
        description: 'Modelo de caixa no CSS.',
        subject: CourseSubject.CSS,
        requirements: [],
      },
      {
        title: 'CSS - Display e Position',
        description: 'Display e posicionamento.',
        subject: CourseSubject.CSS,
        requirements: [],
      },
      {
        title: 'CSS - Flexbox',
        description: 'Layout com Flexbox.',
        subject: CourseSubject.CSS,
        requirements: [],
      },

      {
        title: 'JavaScript - Introdução',
        description: 'Primeiro contato com JavaScript.',
        subject: CourseSubject.JS,
        requirements: [],
      },
      {
        title: 'JavaScript - Variáveis',
        description: 'var, let e const.',
        subject: CourseSubject.JS,
        requirements: [],
      },
      {
        title: 'JavaScript - Tipos de Dados',
        description: 'Tipos primitivos e objetos.',
        subject: CourseSubject.JS,
        requirements: [],
      },
      {
        title: 'JavaScript - Condicionais',
        description: 'if, else e switch.',
        subject: CourseSubject.JS,
        requirements: [],
      },
      {
        title: 'JavaScript - Funções',
        description: 'Criação e uso de funções.',
        subject: CourseSubject.JS,
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
    setReq('HTML - Formulários', ['HTML - Tags e Elementos']);

    setReq('CSS - Cores e Background', ['CSS - Introdução']);
    setReq('CSS - Box Model', ['CSS - Introdução']);
    setReq('CSS - Display e Position', ['CSS - Box Model']);
    setReq('CSS - Flexbox', ['CSS - Display e Position']);

    setReq('JavaScript - Variáveis', ['JavaScript - Introdução']);
    setReq('JavaScript - Tipos de Dados', ['JavaScript - Variáveis']);
    setReq('JavaScript - Condicionais', ['JavaScript - Tipos de Dados']);
    setReq('JavaScript - Funções', ['JavaScript - Condicionais']);

    await repo.save([...map.values()]);
  }
}
