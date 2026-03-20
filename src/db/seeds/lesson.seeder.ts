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
        title: 'HTML - Documento HTML',
        description: 'Entendendo a estrutura fundamental de um documento HTML',
        content: `
    <h1>Estrutura básica de um documento HTML</h1>

    <p>
      Todo documento HTML segue uma estrutura padrão que permite ao navegador entender
      como o conteúdo deve ser exibido. Essa estrutura funciona como o "esqueleto"
      da página.
    </p>

    <h2>Principais elementos</h2>

    <ul>
      <li><code>&lt;html&gt;</code>: elemento raiz que envolve toda a página</li>
      <li><code>&lt;head&gt;</code>: contém informações e configurações</li>
      <li><code>&lt;body&gt;</code>: contém o conteúdo visível</li>
    </ul>

    <h2>Exemplo básico</h2>

    <pre><code>&lt;html&gt;
  &lt;head&gt;&lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Olá mundo&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;
    </code></pre>

    <h2>Resumo</h2>
    <p>
      A estrutura HTML é essencial para qualquer página web e deve sempre ser respeitada.
    </p>
  `,
        question: 'Qual tag contém o conteúdo visível da página?',
        options: [
          { content: '<head>' },
          { content: '<meta>' },
          { content: '<body>', isCorrect: true },
          { content: '<title>' },
        ],
        xp: 10,
      },
      {
        course: 'HTML - Estrutura Básica',
        title: 'HTML - Head e Matadados',
        description: 'Entendendo o papel do head e dos metadados',
        content: `
    <h1>O elemento &lt;head&gt; e os metadados</h1>

    <p>
      Dentro de um documento HTML, o elemento <code>&lt;head&gt;</code> é responsável por armazenar
      informações sobre a página que não são exibidas diretamente ao usuário.
    </p>

    <p>
      Essas informações são chamadas de <strong>metadados</strong> e ajudam o navegador,
      mecanismos de busca e outros sistemas a entender melhor o conteúdo da página.
    </p>

    <h2>Exemplo básico</h2>

    <pre><code>&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Minha página&lt;/title&gt;
&lt;/head&gt;
    </code></pre>

    <h2>Principais elementos do &lt;head&gt;</h2>

    <h3>&lt;meta charset="UTF-8"&gt;</h3>
    <p>
      Define a codificação de caracteres da página.
      Isso garante que acentos e caracteres especiais sejam exibidos corretamente.
    </p>

    <h3>&lt;title&gt;</h3>
    <p>
      Define o título da página, que aparece na aba do navegador.
    </p>

    <h2>Outros usos do &lt;head&gt;</h2>

    <ul>
      <li>Importar arquivos CSS</li>
      <li>Adicionar scripts JavaScript</li>
      <li>Definir configurações de responsividade</li>
    </ul>

    <h2>Resumo</h2>

    <ul>
      <li>O <code>&lt;head&gt;</code> não aparece visualmente</li>
      <li>Contém configurações importantes da página</li>
      <li>É essencial para funcionamento correto do site</li>
    </ul>
  `,
        question: 'Qual elemento define o título exibido na aba do navegador?',
        options: [
          { content: '<meta>' },
          { content: '<head>' },
          { content: '<body>' },
          { content: '<title>', isCorrect: true },
        ],
        xp: 10,
      },
      {
        course: 'HTML - Estrutura Básica',
        title: 'HTML - Boas Práticas',
        description: 'Documento completo e boas práticas modernas',
        content: `
    <h1>Estrutura completa de um documento HTML</h1>

    <p>
      Agora vamos ver como montar um documento HTML completo seguindo boas práticas modernas.
      Esse é o padrão utilizado em praticamente todos os sites atuais.
    </p>

    <h2>Exemplo completo</h2>

    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="pt-BR"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Meu site&lt;/title&gt;
  &lt;/head&gt;

  &lt;body&gt;
    &lt;h1&gt;Bem-vindo&lt;/h1&gt;
    &lt;p&gt;Este é um exemplo completo de página HTML&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
    </code></pre>

    <h2>Novos conceitos importantes</h2>

    <h3>&lt;!DOCTYPE html&gt;</h3>
    <p>
      Informa ao navegador que o documento utiliza HTML5.
      É obrigatório e deve sempre aparecer na primeira linha.
    </p>

    <h3>Atributo lang</h3>
    <p>
      Define o idioma da página, ajudando em acessibilidade e SEO.
      Exemplo: <code>lang="pt-BR"</code>
    </p>

    <h3>Meta viewport</h3>
    <p>
      Controla como a página se comporta em dispositivos móveis,
      sendo essencial para layouts responsivos.
    </p>

    <h2>Boas práticas</h2>

    <ul>
      <li>Usar indentação para organizar o código</li>
      <li>Manter estrutura clara e consistente</li>
      <li>Adicionar metadados corretamente</li>
      <li>Definir idioma da página</li>
    </ul>

    <h2>Resumo</h2>

    <p>
      Um documento HTML bem estruturado garante melhor funcionamento,
      melhor SEO e melhor experiência para o usuário.
    </p>
  `,
        question: 'Para que serve o DOCTYPE?',
        options: [
          { content: 'Informar a versão do HTML', isCorrect: true },
          { content: 'Definir estilo da página' },
          { content: 'Executar JavaScript' },
          { content: 'Criar conteúdo visível' },
        ],
        xp: 20,
      },

      {
        course: 'HTML - Tags e Elementos',
        title: 'HTML - Tags HTML',
        description: 'Entendendo o que são tags HTML',
        content: `
    <h1>O que são Tags HTML?</h1>

    <p>
      As tags HTML são os blocos fundamentais de qualquer página web. Elas são usadas
      para estruturar e organizar o conteúdo que será exibido no navegador.
    </p>

    <p>
      Uma tag geralmente possui uma abertura e um fechamento, envolvendo um conteúdo.
      Isso ajuda o navegador a entender o papel daquele conteúdo na página.
    </p>

    <h2>Exemplo de uma tag</h2>

    <pre><code>&lt;p&gt;Este é um parágrafo&lt;/p&gt;</code></pre>

    <p>
      Neste exemplo:
    </p>

    <ul>
      <li><code>&lt;p&gt;</code> é a tag de abertura</li>
      <li><code>&lt;/p&gt;</code> é a tag de fechamento</li>
      <li>O texto entre elas é o conteúdo</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      Tags são usadas para definir o tipo de conteúdo e sua função dentro da página.
    </p>
  `,
        question: 'O que uma tag HTML faz?',
        options: [
          {
            content: 'Define a estrutura e o significado do conteúdo',
            isCorrect: true,
          },
          { content: 'Adiciona estilo à página' },
          { content: 'Executa código JavaScript' },
          { content: 'Cria conexões com banco de dados' },
        ],
        xp: 20,
      },
      {
        course: 'HTML - Tags e Elementos',
        title: 'HTML - Elemento HTML',
        description: 'Conhecendo elementos HTML e sua estrutura completa',
        content: `
    <h1>Tags vs Elementos HTML</h1>

    <p>
      Muitas vezes usamos "tag" e "elemento" como se fossem a mesma coisa, mas existe
      uma pequena diferença importante.
    </p>

    <h2>Diferença</h2>

    <ul>
      <li><strong>Tag:</strong> é o marcador (ex: &lt;p&gt;)</li>
      <li><strong>Elemento:</strong> é o conjunto completo (tag + conteúdo + fechamento)</li>
    </ul>

    <h2>Exemplo</h2>

    <pre><code>&lt;p&gt;Aprendendo HTML&lt;/p&gt;</code></pre>

    <p>
      Nesse caso, todo o conjunto forma um elemento HTML.
    </p>

    <h2>Elementos com atributos</h2>

    <p>
      Alguns elementos possuem atributos, que adicionam informações extras.
    </p>

    <pre><code>&lt;a href="https://google.com"&gt;Ir para o Google&lt;/a&gt;</code></pre>

    <ul>
      <li><code>href</code> é um atributo</li>
      <li>Ele define o destino do link</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      Elementos são compostos por tags e podem conter atributos para adicionar mais funcionalidades.
    </p>
  `,
        question: 'O que compõe um elemento HTML completo?',
        options: [
          { content: 'Apenas a tag de abertura' },
          {
            content: 'Tag de abertura, conteúdo e tag de fechamento',
            isCorrect: true,
          },
          { content: 'Somente atributos' },
          { content: 'Somente texto' },
        ],
        xp: 20,
      },
      {
        course: 'HTML - Tags e Elementos',
        title: 'HTML - Tipos de Elementos HTML',
        description: 'Tipos de elementos e organização no HTML',
        content: `
    <h1>Tipos de Elementos HTML</h1>

    <p>
      Os elementos HTML podem ser classificados de acordo com seu comportamento
      na página. Os dois principais tipos são: elementos de bloco e elementos inline.
    </p>

    <h2>Elementos de Bloco</h2>

    <p>
      Ocupam toda a largura disponível e começam em uma nova linha.
    </p>

    <pre><code>&lt;div&gt;Bloco&lt;/div&gt;
&lt;p&gt;Parágrafo&lt;/p&gt;</code></pre>

    <h2>Elementos Inline</h2>

    <p>
      Ocupam apenas o espaço necessário e ficam na mesma linha.
    </p>

    <pre><code>&lt;span&gt;Texto&lt;/span&gt;
&lt;a href="#"&gt;Link&lt;/a&gt;</code></pre>

    <h2>Elementos vazios (self-closing)</h2>

    <p>
      Alguns elementos não possuem conteúdo e não precisam de fechamento.
    </p>

    <pre><code>&lt;br&gt;
&lt;img src="imagem.jpg" alt="Imagem"&gt;</code></pre>

    <h2>Resumo</h2>
    <p>
      Entender os tipos de elementos é essencial para estruturar corretamente
      o layout e o comportamento da página.
    </p>
  `,
        question: 'Qual elemento é considerado inline?',
        options: [
          { content: '<div>' },
          { content: '<span>', isCorrect: true },
          { content: '<p>' },
          { content: '<section>' },
        ],
        xp: 40,
      },

      {
        course: 'HTML - Links e Imagens',
        title: 'HTML - Tag <a>',
        description: 'Criando links com a tag <a>',
        content: `
    <h1>Criando Links no HTML</h1>

    <p>
      Links são fundamentais na web, pois permitem navegar entre páginas.
      No HTML, usamos a tag <code>&lt;a&gt;</code> (âncora) para criar links.
    </p>

    <h2>Estrutura básica</h2>

    <pre><code>&lt;a href="https://www.google.com"&gt;Ir para o Google&lt;/a&gt;</code></pre>

    <p>
      Neste exemplo:
    </p>

    <ul>
      <li><code>&lt;a&gt;</code> é a tag de link</li>
      <li><code>href</code> define o destino do link</li>
      <li>O texto entre as tags é o conteúdo clicável</li>
    </ul>

    <h2>Links internos</h2>

    <p>
      Você também pode criar links para páginas do seu próprio site:
    </p>

    <pre><code>&lt;a href="contato.html"&gt;Ir para Contato&lt;/a&gt;</code></pre>

    <h2>Resumo</h2>
    <p>
      A tag <code>&lt;a&gt;</code> é usada para navegação e o atributo <code>href</code>
      define para onde o usuário será levado.
    </p>
  `,
        question: 'Qual atributo define o destino de um link?',
        options: [
          { content: 'src' },
          { content: 'href', isCorrect: true },
          { content: 'link' },
          { content: 'url' },
        ],
        xp: 40,
      },
      {
        course: 'HTML - Links e Imagens',
        title: 'HTML - Imagens no HTML',
        description: 'Trabalhando com imagens no HTML',
        content: `
    <h1>Inserindo Imagens no HTML</h1>

    <p>
      Imagens são essenciais para enriquecer o conteúdo visual de uma página.
      No HTML, usamos a tag <code>&lt;img&gt;</code>.
    </p>

    <h2>Estrutura básica</h2>

    <pre><code>&lt;img src="imagem.jpg" alt="Descrição da imagem"&gt;</code></pre>

    <p>
      Diferente de outras tags, <code>&lt;img&gt;</code> é um elemento vazio
      (não possui fechamento).
    </p>

    <h2>Atributos importantes</h2>

    <ul>
      <li><code>src</code>: caminho da imagem</li>
      <li><code>alt</code>: descrição da imagem (acessibilidade)</li>
    </ul>

    <h2>Por que usar alt?</h2>

    <p>
      O atributo <code>alt</code> é importante porque:
    </p>

    <ul>
      <li>Ajuda leitores de tela</li>
      <li>Aparece se a imagem não carregar</li>
      <li>Melhora SEO</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      A tag <code>&lt;img&gt;</code> permite adicionar imagens, sendo essencial
      definir corretamente o <code>src</code> e o <code>alt</code>.
    </p>
  `,
        question: 'Qual atributo descreve a imagem para acessibilidade?',
        options: [
          { content: 'src' },
          { content: 'title' },
          { content: 'alt', isCorrect: true },
          { content: 'href' },
        ],
        xp: 40,
      },
      {
        course: 'HTML - Links e Imagens',
        title: 'HTML - Atributos avançados',
        description: 'Atributos avançados e boas práticas com links e imagens',
        content: `
    <h1>Boas práticas com Links e Imagens</h1>

    <p>
      Além do básico, existem atributos e técnicas que melhoram a experiência
      do usuário e a segurança da aplicação.
    </p>

    <h2>Abrindo links em nova aba</h2>

    <pre><code>&lt;a href="https://example.com" target="_blank"&gt;Abrir site&lt;/a&gt;</code></pre>

    <ul>
      <li><code>target="_blank"</code> abre o link em uma nova aba</li>
    </ul>

    <h2>Imagens com tamanho</h2>

    <pre><code>&lt;img src="imagem.jpg" alt="Exemplo" width="200"&gt;</code></pre>

    <p>
      Você pode definir o tamanho da imagem com atributos ou CSS.
    </p>

    <h2>Link com imagem</h2>

    <p>
      É possível transformar uma imagem em link:
    </p>

    <pre><code>&lt;a href="https://example.com"&gt;
  &lt;img src="logo.png" alt="Logo"&gt;
&lt;/a&gt;</code></pre>

    <h2>Boas práticas</h2>

    <ul>
      <li>Sempre use <code>alt</code> nas imagens</li>
      <li>Evite links quebrados</li>
      <li>Use nomes de arquivos descritivos</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      Combinar links e imagens corretamente melhora a navegação, acessibilidade
      e qualidade da página.
    </p>
  `,
        question: 'O que o atributo target="_blank" faz?',
        options: [
          { content: 'Fecha a página' },
          { content: 'Abre o link na mesma aba' },
          { content: 'Remove o link' },
          { content: 'Abre o link em uma nova aba', isCorrect: true },
        ],
        xp: 60,
      },

      {
        course: 'HTML - Listas',
        title: 'HTML - Listas Não Ordenada',
        description: 'Criando listas não ordenadas no HTML',
        content: `
    <h1>Listas Não Ordenadas</h1>

    <p>
      Listas são usadas para organizar informações de forma clara.
      No HTML, usamos a tag <code>&lt;ul&gt;</code> para criar listas não ordenadas.
    </p>

    <h2>Estrutura básica</h2>

    <pre><code>&lt;ul&gt;
  &lt;li&gt;Item 1&lt;/li&gt;
  &lt;li&gt;Item 2&lt;/li&gt;
  &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;</code></pre>

    <p>
      Neste exemplo:
    </p>

    <ul>
      <li><code>&lt;ul&gt;</code>: define a lista</li>
      <li><code>&lt;li&gt;</code>: representa cada item da lista</li>
    </ul>

    <h2>Quando usar</h2>

    <p>
      Use listas não ordenadas quando a ordem dos itens não importa.
    </p>

    <h2>Exemplo real</h2>

    <ul>
      <li>Maçã</li>
      <li>Banana</li>
      <li>Laranja</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      A tag <code>&lt;ul&gt;</code> organiza itens sem ordem específica,
      usando <code>&lt;li&gt;</code> para cada elemento.
    </p>
  `,
        question: 'Qual tag representa cada item da lista?',
        options: [
          { content: '<ul>' },
          { content: '<li>', isCorrect: true },
          { content: '<list>' },
          { content: '<item>' },
        ],
        xp: 60,
      },
      {
        course: 'HTML - Listas',
        title: 'HTML - Listas Ordenada',
        description: 'Criando listas ordenadas no HTML',
        content: `
    <h1>Listas Ordenadas</h1>

    <p>
      Quando a ordem dos itens é importante, usamos listas ordenadas
      com a tag <code>&lt;ol&gt;</code>.
    </p>

    <h2>Estrutura básica</h2>

    <pre><code>&lt;ol&gt;
  &lt;li&gt;Primeiro passo&lt;/li&gt;
  &lt;li&gt;Segundo passo&lt;/li&gt;
  &lt;li&gt;Terceiro passo&lt;/li&gt;
&lt;/ol&gt;</code></pre>

    <p>
      Os itens são automaticamente numerados pelo navegador.
    </p>

    <h2>Tipos de numeração</h2>

    <p>
      Você pode alterar o tipo de numeração:
    </p>

    <pre><code>&lt;ol type="A"&gt;
  &lt;li&gt;Item A&lt;/li&gt;
  &lt;li&gt;Item B&lt;/li&gt;
&lt;/ol&gt;</code></pre>

    <ul>
      <li><code>1</code>: números (padrão)</li>
      <li><code>A</code>: letras maiúsculas</li>
      <li><code>a</code>: letras minúsculas</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      A tag <code>&lt;ol&gt;</code> é usada quando a sequência dos itens é importante.
    </p>
  `,
        question: 'Qual tag cria uma lista ordenada?',
        options: [
          { content: '<ol>', isCorrect: true },
          { content: '<ul>' },
          { content: '<li>' },
          { content: '<dl>' },
        ],
        xp: 60,
      },
      {
        course: 'HTML - Listas',
        title: 'HTML - Listas Avançadas',
        description: 'Listas aninhadas e listas de definição',
        content: `
    <h1>Listas Avançadas no HTML</h1>

    <p>
      Além das listas básicas, o HTML permite criar estruturas mais complexas,
      como listas dentro de listas e listas de definição.
    </p>

    <h2>Listas aninhadas</h2>

    <p>
      Você pode colocar uma lista dentro de outra:
    </p>

    <pre><code>&lt;ul&gt;
  &lt;li&gt;Frutas
    &lt;ul&gt;
      &lt;li&gt;Maçã&lt;/li&gt;
      &lt;li&gt;Banana&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>

    <p>
      Isso é útil para criar hierarquias.
    </p>

    <h2>Listas de definição</h2>

    <p>
      Usadas para definir termos e descrições:
    </p>

    <pre><code>&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;Linguagem de marcação&lt;/dd&gt;
&lt;/dl&gt;</code></pre>

    <ul>
      <li><code>&lt;dl&gt;</code>: lista de definição</li>
      <li><code>&lt;dt&gt;</code>: termo</li>
      <li><code>&lt;dd&gt;</code>: descrição</li>
    </ul>

    <h2>Boas práticas</h2>

    <ul>
      <li>Use listas para organizar conteúdo</li>
      <li>Evite usar listas apenas para layout</li>
      <li>Mantenha a estrutura clara</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      Listas podem ser combinadas e usadas de forma mais avançada
      para representar informações estruturadas.
    </p>
  `,
        question: 'Qual tag representa a descrição em uma lista de definição?',
        options: [
          { content: '<dt>' },
          { content: '<dd>', isCorrect: true },
          { content: '<dl>' },
          { content: '<li>' },
        ],
        xp: 80,
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
        xp: item.xp,
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
