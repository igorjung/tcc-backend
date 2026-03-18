import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { LessonEntity } from '../../modules/lesson/entities/lesson.entity';
import { CourseEntity } from '../../modules/course/entities/course.entity';
import { LessonOptionEntity } from '../../modules/lesson/entities/lessonOption.entity';

export default class LessonSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const courseRepo = dataSource.getRepository(CourseEntity);
    const lessonRepo = dataSource.getRepository(LessonEntity);
    const optionRepo = dataSource.getRepository(LessonOptionEntity);

    const courses = await courseRepo.find();
    const map = new Map(courses.map((course) => [course.title, course]));

    const lessonsData = [
      {
        course: 'HTML - Estrutura Básica',
        title: 'HTML - Estrutura 01',
        description: 'Entendendo a estrutura fundamental de um documento HTML',
        content: `
    <h1>Estrutura básica de um documento HTML</h1>

    <p>
      Todo documento HTML segue uma estrutura padrão que define como o conteúdo será interpretado pelo navegador.
      Essa estrutura é composta por três elementos principais: <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> e <code>&lt;body&gt;</code>.
    </p>

    <h2>&lt;html&gt;</h2>
    <p>
      É o elemento raiz do documento. Todo o conteúdo HTML deve estar dentro dessa tag.
    </p>

    <pre><code>&lt;html&gt;
  ...
&lt;/html&gt;
    </code></pre>

    <h2>&lt;head&gt;</h2>
    <p>
      Contém metadados sobre a página, como título, codificação de caracteres, links para estilos (CSS) e scripts.
      O conteúdo dentro de <code>&lt;head&gt;</code> não é exibido diretamente na página.
    </p>

    <pre><code>&lt;head&gt;
  &lt;title&gt;Minha página&lt;/title&gt;
&lt;/head&gt;
    </code></pre>

    <h2>&lt;body&gt;</h2>
    <p>
      Contém todo o conteúdo visível da página, como textos, imagens, links e outros elementos que o usuário vê.
    </p>

    <pre><code>&lt;body&gt;
  &lt;h1&gt;Olá mundo&lt;/h1&gt;
  &lt;p&gt;Este é um parágrafo.&lt;/p&gt;
&lt;/body&gt;
    </code></pre>

    <h2>Exemplo completo</h2>

    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Exemplo&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Minha primeira página&lt;/h1&gt;
    &lt;p&gt;Bem-vindo!&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
    </code></pre>

    <h2>Resumo</h2>
    <ul>
      <li><code>&lt;html&gt;</code>: raiz do documento</li>
      <li><code>&lt;head&gt;</code>: metadados (não visível)</li>
      <li><code>&lt;body&gt;</code>: conteúdo visível</li>
    </ul>
  `,
        question: 'Qual tag contém o conteúdo visível da página?',
        options: [
          { content: '<head>' },
          { content: '<meta>' },
          { content: '<body>', isCorrect: true },
          { content: '<title>' },
        ],
      },
      {
        course: 'HTML - Estrutura Básica',
        title: 'HTML - Estrutura 02',
        description: 'Hierarquia básica',
        content: 'Organização do documento',
        question: 'Qual é a raiz do HTML?',
        options: [
          { content: '<body>' },
          { content: '<html>', isCorrect: true },
          { content: '<head>' },
          { content: '<div>' },
        ],
      },

      {
        course: 'CSS - Introdução',
        title: 'CSS - Básico 01',
        description: 'Aplicando CSS',
        content: 'Seletores básicos',
        question: 'Como selecionar uma classe?',
        options: [
          { content: '#classe' },
          { content: '.classe', isCorrect: true },
          { content: 'classe' },
          { content: '*classe' },
        ],
      },
      {
        course: 'CSS - Introdução',
        title: 'CSS - Básico 02',
        description: 'Cascata',
        content: 'Ordem de prioridade',
        question: 'Qual tem maior prioridade?',
        options: [
          { content: 'Classe' },
          { content: 'Tag' },
          { content: 'Inline', isCorrect: true },
          { content: 'Herança' },
        ],
      },

      {
        course: 'JavaScript - Introdução',
        title: 'JS - Básico 01',
        description: 'Primeiro código',
        content: 'console.log',
        question: 'Como imprimir no console?',
        options: [
          { content: 'print()' },
          { content: 'echo()' },
          { content: 'console.log()', isCorrect: true },
          { content: 'log()' },
        ],
      },
      {
        course: 'JavaScript - Introdução',
        title: 'JS - Básico 02',
        description: 'Execução',
        content: 'Rodando JS',
        question: 'Onde roda JS no browser?',
        options: [
          { content: 'Banco de dados' },
          { content: 'Servidor' },
          { content: 'Engine JS', isCorrect: true },
          { content: 'CSS' },
        ],
      },
    ];

    for (const item of lessonsData) {
      const course = map.get(item.course);
      if (!course) continue;

      const lesson = lessonRepo.create({
        title: item.title,
        description: item.description,
        content: item.content,
        question: item.question,
        courseId: course.id,
      });

      const savedLesson = await lessonRepo.save(lesson);

      const options = item.options.map((opt) =>
        optionRepo.create({
          content: opt.content,
          isCorrect: !!opt.isCorrect,
          lessonId: savedLesson.id,
        }),
      );

      await optionRepo.save(options);
    }
  }
}
