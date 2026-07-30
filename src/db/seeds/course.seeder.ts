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
      {
        title: 'HTML - Formulários',
        description: 'Aprenda como criar corretamente um formulário HTML.',
        subject: CourseSubject.HTML,
        difficulty: 2,
        requirements: [],
      },

      {
        title: 'CSS - Introdução',
        description: 'Entenda como funciona e quando usar CSS.',
        subject: CourseSubject.CSS,
        difficulty: 0,
        requirements: [],
      },
      {
        title: 'CSS - Cores e Background',
        description: 'Aprenda como usar cores no CSS.',
        subject: CourseSubject.CSS,
        difficulty: 1,
        requirements: [],
      },
      {
        title: 'CSS - Box Model',
        description:
          'Descubra o que é e quando usar box model, margin e padding.',
        subject: CourseSubject.CSS,
        difficulty: 1,
        requirements: [],
      },
      {
        title: 'CSS - Display e Position',
        description: 'Entenda como usar a propriedade display e position.',
        subject: CourseSubject.CSS,
        difficulty: 2,
        requirements: [],
      },
      {
        title: 'CSS - Flexbox',
        description:
          'Conheça o flexbox e como alinhar seus elementos usando-o.',
        subject: CourseSubject.CSS,
        difficulty: 3,
        requirements: [],
      },

      {
        title: 'JavaScript - Introdução',
        description: 'Entenda o que é JavaScript e para que serve.',
        subject: CourseSubject.JS,
        difficulty: 1,
        requirements: [],
      },
      {
        title: 'JavaScript - Variáveis',
        description: 'O que são variáveis e como usar-las.',
        subject: CourseSubject.JS,
        difficulty: 2,
        requirements: [],
      },
      {
        title: 'JavaScript - Tipos de Dados',
        description: 'Tipos de dados no JavaScript',
        subject: CourseSubject.JS,
        difficulty: 3,
        requirements: [],
      },
      {
        title: 'JavaScript - Condicionais',
        description:
          'Aprenda a utilizar if e else, operadores de comparação, condicionais múltiplas e mais.',
        subject: CourseSubject.JS,
        difficulty: 4,
        requirements: [],
      },
      {
        title: 'JavaScript - Funções',
        description:
          'Aprenda a criar funções da maneira correta e utilizando boas práticas.',
        subject: CourseSubject.JS,
        difficulty: 5,
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

    setReq('JavaScript - Introdução', ['HTML - Estrutura Básica']);
    setReq('JavaScript - Variáveis', ['JavaScript - Introdução']);
    setReq('JavaScript - Tipos de Dados', ['JavaScript - Variáveis']);
    setReq('JavaScript - Condicionais', ['JavaScript - Tipos de Dados']);
    setReq('JavaScript - Funções', ['JavaScript - Condicionais']);

    await repo.save([...map.values()]);
  }
}
