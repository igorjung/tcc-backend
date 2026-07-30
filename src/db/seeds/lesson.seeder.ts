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
        title: 'HTML - Estrutura do documento',
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
        title: 'HTML - Elemento head e metadados',
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
        title: 'HTML - Documento HTML completo',
        description: 'Construindo um documento HTML completo',
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
      É recomendado e considerado padrão moderno.
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
        title: 'HTML - Introdução a tags',
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
        title: 'HTML - Tags vs elementos',
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
        title: 'HTML - Elementos block e inline',
        description: 'Tipos de elementos HTML e organização do conteúdo',
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
        title: 'HTML - Criando links',
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
        title: 'HTML - Inserindo imagens',
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
        title: 'HTML - Boas práticas com links e imagens',
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
        title: 'HTML - Listas não ordenadas',
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
        title: 'HTML - Listas ordenadas',
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
        title: 'HTML - Listas avançadas',
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

      {
        course: 'HTML - Formulários',
        title: 'HTML - Introdução a formulários',
        description: 'Introdução aos formulários no HTML',
        content: `
    <h1>O que são Formulários?</h1>

    <p>
      Formulários são usados para coletar dados do usuário, como login,
      cadastro, pesquisas e muito mais.
    </p>

    <p>
      No HTML, usamos a tag <code>&lt;form&gt;</code> para criar um formulário.
    </p>

    <h2>Estrutura básica</h2>

    <pre><code>&lt;form&gt;
  &lt;input type="text" placeholder="Digite seu nome"&gt;
&lt;/form&gt;</code></pre>

    <h2>Elementos principais</h2>

    <ul>
      <li><code>&lt;form&gt;</code>: envolve todo o formulário</li>
      <li><code>&lt;input&gt;</code>: campo de entrada de dados</li>
    </ul>

    <h2>Tipos de input</h2>

    <ul>
      <li><code>text</code>: texto simples</li>
      <li><code>password</code>: senha</li>
      <li><code>email</code>: e-mail</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      Formulários permitem interação com o usuário e coleta de informações.
    </p>

  `,
        question: 'Qual tag define um formulário?',
        options: [
          { content: '<form>', isCorrect: true },
          { content: '<input>' },
          { content: '<div>' },
          { content: '<section>' },
        ],
        xp: 60,
      },
      {
        course: 'HTML - Formulários',
        title: 'HTML - Campos e atributos',
        description: 'Campos e atributos importantes em formulários',
        content: `
    <h1>Campos e Atributos</h1>

    <p>
      Os formulários possuem diversos atributos que ajudam a controlar
      o comportamento e a validação dos dados.
    </p>

    <h2>Exemplo completo</h2>

    <pre><code>&lt;form&gt;
  &lt;label&gt;Email:&lt;/label&gt;
  &lt;input type="email" required&gt;

  &lt;label&gt;Senha:&lt;/label&gt;
  &lt;input type="password" required&gt;

  &lt;button&gt;Enviar&lt;/button&gt;
&lt;/form&gt;</code></pre>

    <h2>Elementos novos</h2>

    <ul>
      <li><code>&lt;label&gt;</code>: descreve o campo</li>
      <li><code>&lt;button&gt;</code>: botão de envio</li>
    </ul>

    <h2>Atributos importantes</h2>

    <ul>
      <li><code>required</code>: campo obrigatório</li>
      <li><code>placeholder</code>: dica dentro do campo</li>
      <li><code>type</code>: define o tipo de dado</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      Labels e atributos tornam os formulários mais acessíveis e funcionais.
    </p>
  `,
        question: 'Qual atributo torna um campo obrigatório?',
        options: [
          { content: 'placeholder' },
          { content: 'type' },
          { content: 'required', isCorrect: true },
          { content: 'name' },
        ],
        xp: 60,
      },
      {
        course: 'HTML - Formulários',
        title: 'HTML - Inputs avançados e organização',
        description: 'Tipos avançados de campos e organização de formulários',
        content: `
      <h1>Formulários Avançados</h1>

      <p>
        O HTML oferece diversos tipos de campos para diferentes tipos de dados,
        tornando a experiência do usuário mais intuitiva.
      </p>

      <h2>Tipos avançados de input</h2>

      <pre><code>&lt;input type="checkbox"&gt; Aceito os termos
  &lt;input type="radio" name="sexo"&gt; Masculino
  &lt;input type="radio" name="sexo"&gt; Feminino
  &lt;input type="date"&gt;</code></pre>

      <ul>
        <li><code>checkbox</code>: seleção múltipla</li>
        <li><code>radio</code>: seleção única</li>
        <li><code>date</code>: seleção de data</li>
      </ul>

      <h2>Organização com fieldset</h2>

      <pre><code>&lt;fieldset&gt;
    &lt;legend&gt;Dados pessoais&lt;/legend&gt;
    &lt;input type="text" placeholder="Nome"&gt;
  &lt;/fieldset&gt;</code></pre>

      <p>
        O <code>&lt;fieldset&gt;</code> agrupa campos relacionados.
      </p>

      <h2>Boas práticas</h2>

      <ul>
        <li>Use labels sempre que possível</li>
        <li>Agrupe informações relacionadas</li>
        <li>Escolha o tipo correto de input</li>
      </ul>

      <h2>Resumo</h2>
      <p>
        Formulários bem estruturados melhoram a usabilidade e a experiência do usuário.
      </p>
    `,
        question: 'Qual tipo de input permite selecionar apenas uma opção?',
        options: [
          { content: 'checkbox' },
          { content: 'radio', isCorrect: true },
          { content: 'text' },
          { content: 'date' },
        ],
        xp: 80,
      },

      {
        course: 'CSS - Introdução',
        title: 'CSS - Introdução ao CSS',
        description: 'O que é CSS e para que serve',
        content: ` 
      <h1>O que é CSS?</h1>

      <p>
        CSS (Cascading Style Sheets) é a linguagem usada para estilizar páginas HTML.
        Enquanto o HTML define a estrutura, o CSS define a aparência.
      </p>

      <p>
        Com CSS, você pode alterar cores, tamanhos, espaçamentos, posições e muito mais.
      </p>

      <h2>Exemplo simples</h2>

      <pre><code>p {
    color: blue;
  }</code></pre>

      <p>
        Neste exemplo, todos os parágrafos ficarão com a cor azul.
      </p>

      <h2>Resumo</h2>
      <p>
        CSS é responsável por tornar as páginas bonitas e organizadas visualmente.
      </p>
    `,
        question: 'Qual é a função do CSS?',
        options: [
          { content: 'Criar a estrutura da página' },
          { content: 'Estilizar a página', isCorrect: true },
          { content: 'Executar lógica' },
          { content: 'Criar banco de dados' },
        ],
        xp: 10,
      },
      {
        course: 'CSS - Introdução',
        title: 'CSS - Integrando CSS ao HTML',
        description: 'Formas de aplicar CSS no HTML',
        content: `
      <h1>Como aplicar CSS</h1>

      <p>
        Existem três formas principais de aplicar CSS em uma página HTML.
      </p>

      <h2>1. Inline</h2>

      <pre><code>&lt;p style="color: red;"&gt;Texto&lt;/p&gt;</code></pre>

      <p>
        O estilo é aplicado diretamente no elemento.
      </p>

      <h2>2. Interno</h2>

      <pre><code>&lt;style&gt;
  p {
    color: green;
  }
  &lt;/style&gt;</code></pre>

      <p>
        O CSS fica dentro da tag <code>&lt;style&gt;</code>.
      </p>

      <h2>3. Externo</h2>

      <pre><code>&lt;link rel="stylesheet" href="style.css"&gt;</code></pre>

      <p>
        O CSS é separado em um arquivo próprio (melhor prática).
      </p>

      <h2>Resumo</h2>
      <p>
        O CSS externo é o mais recomendado por organização e reutilização.
      </p>
    `,
        question: 'Qual é a melhor prática para aplicar CSS?',
        options: [
          { content: 'Inline' },
          { content: 'Interno' },
          { content: 'Externo', isCorrect: true },
          { content: 'Script' },
        ],
        xp: 20,
      },
      {
        course: 'CSS - Introdução',
        title: 'CSS - Seletores',
        description: 'Seletores e sintaxe do CSS',
        content: `
      <h1>Seletores CSS</h1>

      <p>
        Seletores são usados para escolher quais elementos HTML serão estilizados.
      </p>

      <h2>Sintaxe básica</h2>

      <pre><code>seletor {
    propriedade: valor;
  }</code></pre>

      <h2>Tipos de seletores</h2>

      <ul>
        <li><strong>Elemento:</strong> <code>p</code>, <code>h1</code></li>
        <li><strong>Classe:</strong> <code>.classe</code></li>
        <li><strong>ID:</strong> <code>#id</code></li>
      </ul>

      <h2>Exemplo</h2>

      <pre><code>.titulo {
    color: red;
  }</code></pre>

      <p>
        Aplica estilo a todos elementos com a classe "titulo".
      </p>

      <h2>Resumo</h2>
      <p>
        Seletores permitem aplicar estilos de forma específica e organizada.
      </p>
    `,
        question: 'Qual seletor representa uma classe?',
        options: [
          { content: '#classe' },
          { content: 'classe' },
          { content: '*' },
          { content: '.classe', isCorrect: true },
        ],
        xp: 20,
      },

      {
        course: 'CSS - Cores e Background',
        title: 'CSS - Cores de texto',
        description: 'Aplicando cores no CSS',
        content: `
          <h1>Trabalhando com Cores no CSS</h1>

          <p>
            O CSS permite alterar as cores de textos, fundos e outros elementos,
            deixando a página mais atrativa.
          </p>

          <h2>Cor do texto</h2>

          <pre><code>p {
        color: red;
      }</code></pre>

          <p>
            Isso define a cor do texto como vermelho.
          </p>

          <h2>Formas de definir cores</h2>

          <ul>
            <li><strong>Nome:</strong> red, blue, green</li>
            <li><strong>Hexadecimal:</strong> #ff0000</li>
            <li><strong>RGB:</strong> rgb(255, 0, 0)</li>
          </ul>

          <h2>Resumo</h2>
          <p>
            A propriedade <code>color</code> define a cor do texto.
          </p>
        `,
        question: 'Qual propriedade define a cor do texto?',
        options: [
          { content: 'color', isCorrect: true },
          { content: 'background' },
          { content: 'font-color' },
          { content: 'text-style' },
        ],
        xp: 20,
      },
      {
        course: 'CSS - Cores e Background',
        title: 'CSS - Cores de fundo',
        description: 'Aplicando cores de fundo',
        content: `
          <h1>Background no CSS</h1>
          
          <p>
            Além da cor do texto, também podemos alterar o fundo dos elementos.
          </p>

          <h2>Cor de fundo</h2>

          <pre><code>div {
        background-color: lightgray;
      }</code></pre>

          <p>
            Isso define uma cor de fundo para o elemento.
          </p>

          <h2>Imagem de fundo</h2>

          <pre><code>body {
        background-image: url("fundo.jpg");
      }</code></pre>

          <h2>Outras propriedades úteis</h2>

          <ul>
            <li><code>background-repeat</code>: repetir imagem</li>
            <li><code>background-size</code>: tamanho da imagem</li>
            <li><code>background-position</code>: posição</li>
          </ul>

          <h2>Resumo</h2>
          <p>
            O background permite personalizar o fundo com cores e imagens.
          </p>
        `,
        question: 'Qual propriedade define a cor de fundo?',
        options: [
          { content: 'color' },
          { content: 'background-color', isCorrect: true },
          { content: 'bgcolor' },
          { content: 'background-style' },
        ],
        xp: 20,
      },
      {
        course: 'CSS - Cores e Background',
        title: 'CSS - Gradientes',
        description: 'Gradientes e boas práticas com cores',
        content: `
      <h1>Gradientes e Boas Práticas</h1>

      <p>
        Gradientes permitem criar transições suaves entre cores,
        deixando o design mais moderno.
      </p>

      <h2>Exemplo de gradiente</h2>

      <pre><code>div {
    background: linear-gradient(to right, blue, purple);
  }</code></pre>

      <p>
        Isso cria um fundo com transição de azul para roxo.
      </p>

      <h2>Boas práticas</h2>

      <ul>
        <li>Evite cores muito fortes juntas</li>
        <li>Garanta contraste entre texto e fundo</li>
        <li>Use cores consistentes no projeto</li>
      </ul>

      <h2>Resumo</h2>
      <p>
        Gradientes e boas escolhas de cores melhoram a estética e a legibilidade.
      </p>
    `,
        question: 'Qual função cria um gradiente no CSS?',
        options: [
          { content: 'color-gradient' },
          { content: 'gradient-color' },
          { content: 'linear-gradient', isCorrect: true },
          { content: 'fade' },
        ],
        xp: 60,
      },

      {
        course: 'CSS - Box Model',
        title: 'CSS - Introdução ao Box Model',
        description: 'Entendendo o conceito de Box Model',
        content: `
    <h1>O que é o Box Model?</h1>

    <p>
      No CSS, todo elemento é representado como uma caixa (box).
      Esse conceito é chamado de Box Model.
    </p>

    <p>
      Cada elemento ocupa um espaço na tela que pode ser controlado.
    </p>

    <h2>Estrutura do Box Model</h2>

    <ul>
      <li><strong>Content:</strong> conteúdo (texto, imagem)</li>
      <li><strong>Padding:</strong> espaço interno</li>
      <li><strong>Border:</strong> borda</li>
      <li><strong>Margin:</strong> espaço externo</li>
    </ul>

    <h2>Exemplo visual</h2>

    <pre><code>div {
  width: 200px;
  padding: 10px;
  border: 2px solid black;
  margin: 20px;
}</code></pre>

    <h2>Resumo</h2>
    <p>
      Todo elemento HTML funciona como uma caixa com camadas que controlam
      espaçamento e tamanho.
    </p>
  `,
        question: 'Qual parte do Box Model representa o espaço interno?',
        options: [
          { content: 'margin' },
          { content: 'border' },
          { content: 'content' },
          { content: 'padding', isCorrect: true },
        ],
        xp: 60,
      },
      {
        course: 'CSS - Box Model',
        title: 'CSS - Margin e padding',
        description: 'Trabalhando com margin e padding',
        content: `
    <h1>Margin vs Padding</h1>

    <p>
      Margin e padding são usados para controlar espaçamentos,
      mas possuem funções diferentes.
    </p>

    <h2>Padding</h2>

    <p>
      Espaço interno entre o conteúdo e a borda.
    </p>

    <pre><code>div {
  padding: 20px;
}</code></pre>

    <h2>Margin</h2>

    <p>
      Espaço externo entre elementos.
    </p>

    <pre><code>div {
  margin: 20px;
}</code></pre>

    <h2>Direções</h2>

    <pre><code>div {
  margin-top: 10px;
  padding-left: 15px;
}</code></pre>

    <h2>Resumo</h2>
    <p>
      Padding afasta o conteúdo da borda, enquanto margin afasta elementos entre si.
    </p>
  `,
        question: 'Qual propriedade controla o espaço externo?',
        options: [
          { content: 'padding' },
          { content: 'margin', isCorrect: true },
          { content: 'border' },
          { content: 'width' },
        ],
        xp: 60,
      },
      {
        course: 'CSS - Box Model',
        title: 'CSS - Box-sizing',
        description: 'Entendendo Box-sizing e cálculo de tamanho',
        content: `
    <h1>Box-sizing</h1>

    <p>
      Por padrão, o tamanho de um elemento considera apenas o conteúdo,
      ignorando padding e border.
    </p>

    <h2>Problema comum</h2>

    <pre><code>div {
  width: 200px;
  padding: 20px;
}</code></pre>

    <p>
      O elemento ficará maior que 200px por causa do padding.
    </p>

    <h2>Solução com box-sizing</h2>

    <pre><code>div {
  box-sizing: border-box;
}</code></pre>

    <p>
      Agora o tamanho inclui padding e border dentro da largura definida.
    </p>

    <h2>Boas práticas</h2>

    <pre><code>* {
  box-sizing: border-box;
}</code></pre>

    <ul>
      <li>Facilita o controle de layout</li>
      <li>Evita cálculos manuais</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      O <code>box-sizing</code> ajuda a controlar melhor o tamanho real dos elementos.
    </p>
  `,
        question: 'Qual valor faz o width incluir padding e border?',
        options: [
          { content: 'content-box' },
          { content: 'box-all' },
          { content: 'border-box', isCorrect: true },
          { content: 'full-box' },
        ],
        xp: 60,
      },

      {
        course: 'CSS - Display e Position',
        title: 'CSS - Display',
        description: 'Entendendo a propriedade display',
        content: `
    <h1>Propriedade Display</h1>

    <p>
      A propriedade <code>display</code> define como um elemento se comporta
      na página (linha, bloco, etc).
    </p>

    <h2>Principais valores</h2>

    <ul>
      <li><strong>block:</strong> ocupa toda a largura</li>
      <li><strong>inline:</strong> ocupa apenas o necessário</li>
      <li><strong>inline-block:</strong> mistura dos dois</li>
      <li><strong>none:</strong> remove o elemento da tela</li>
    </ul>

    <h2>Exemplo</h2>

    <pre><code>div {
  display: block;
}

span {
  display: inline;
}</code></pre>

    <h2>Resumo</h2>
    <p>
      O display controla como os elementos são exibidos e ocupam espaço.
    </p>
  `,
        question: 'Qual valor faz o elemento ocupar toda a largura?',
        options: [
          { content: 'inline' },
          { content: 'block', isCorrect: true },
          { content: 'none' },
          { content: 'inline-block' },
        ],
        xp: 80,
      },
      {
        course: 'CSS - Display e Position',
        title: 'CSS - Position',
        description: 'Introdução à propriedade position',
        content: `
    <h1>Propriedade Position</h1>

    <p>
      A propriedade <code>position</code> controla como um elemento
      é posicionado na página.
    </p>

    <h2>Principais tipos</h2>

    <ul>
      <li><strong>static:</strong> padrão</li>
      <li><strong>relative:</strong> relativo à posição original</li>
      <li><strong>absolute:</strong> relativo ao elemento pai</li>
      <li><strong>fixed:</strong> fixo na tela</li>
    </ul>

    <h2>Exemplo</h2>

    <pre><code>div {
  position: relative;
  top: 20px;
}</code></pre>

    <p>
      O elemento será deslocado 20px para baixo.
    </p>

    <h2>Resumo</h2>
    <p>
      Position permite mover elementos de forma controlada.
    </p>
  `,
        question: 'Qual posição fixa o elemento na tela?',
        options: [
          { content: 'relative' },
          { content: 'absolute' },
          { content: 'static' },
          { content: 'fixed', isCorrect: true },
        ],
        xp: 80,
      },
      {
        course: 'CSS - Display e Position',
        title: 'CSS - Z-index e camadas',
        description: 'Combinação de position e controle de camadas',
        content: `
    <h1>Position Avançado e Z-index</h1>

    <p>
      Quando usamos position, podemos controlar também a sobreposição
      de elementos com <code>z-index</code>.
    </p>

    <h2>Exemplo</h2>

    <pre><code>.box1 {
  position: absolute;
  z-index: 1;
}

.box2 {
  position: absolute;
  z-index: 2;
}</code></pre>

    <p>
      O elemento com maior z-index fica na frente.
    </p>

    <h2>Importante</h2>

    <ul>
      <li>z-index só funciona com position</li>
      <li>Valores maiores ficam acima</li>
    </ul>

    <h2>Exemplo prático</h2>

    <p>
      Muito usado em menus, modais e overlays.
    </p>

    <h2>Resumo</h2>
    <p>
      Position e z-index permitem criar layouts mais complexos e camadas visuais.
    </p>
  `,
        question: 'O que o z-index controla?',
        options: [
          { content: 'Cor do elemento' },
          { content: 'Tamanho do elemento' },
          { content: 'Sobreposição de elementos', isCorrect: true },
          { content: 'Margem do elemento' },
        ],
        xp: 100,
      },

      {
        course: 'CSS - Flexbox',
        title: 'CSS - Introdução ao Flexbox',
        description: 'Entendendo o que é Flexbox e para que serve',
        content: `
    <h1>O que é Flexbox?</h1>

    <p>
      Flexbox é um modelo de layout do CSS que facilita o alinhamento
      e a distribuição de elementos dentro de um container.
    </p>

    <p>
      Ele é muito usado para criar layouts modernos e responsivos.
    </p>

    <h2>Ativando o Flexbox</h2>

    <pre><code>div {
  display: flex;
}</code></pre>

    <p>
      Ao aplicar <code>display: flex</code>, o elemento se torna um container flex
      e seus filhos passam a ser itens flex.
    </p>

    <h2>Resumo</h2>
    <p>
      Flexbox facilita o posicionamento e alinhamento de elementos.
    </p>
  `,
        question: 'Qual propriedade ativa o Flexbox?',
        options: [
          { content: 'display: block' },
          { content: 'display: flex', isCorrect: true },
          { content: 'position: flex' },
          { content: 'flex: 1' },
        ],
        xp: 100,
      },
      {
        course: 'CSS - Flexbox',
        title: 'CSS - Alinhamento com Flexbox',
        description: 'Aprender a alinhar elementos utilizando Flexbox',
        content: `
    <h1>Alinhamento no Flexbox</h1>

    <p>
      Flexbox permite alinhar elementos de forma simples usando
      propriedades específicas.
    </p>

    <h2>Alinhamento horizontal</h2>

    <pre><code>div {
  display: flex;
  justify-content: center;
}</code></pre>

    <ul>
      <li><code>center</code>: centraliza</li>
      <li><code>space-between</code>: espaço entre itens</li>
      <li><code>space-around</code>: espaço ao redor</li>
    </ul>

    <h2>Alinhamento vertical</h2>

    <pre><code>div {
  display: flex;
  align-items: center;
}</code></pre>

    <ul>
      <li>Alinha os itens verticalmente</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      justify-content e align-items controlam o alinhamento dos elementos.
    </p>
  `,
        question: 'Qual propriedade alinha os itens horizontalmente?',
        options: [
          { content: 'align-items' },
          { content: 'flex-direction' },
          { content: 'display' },
          { content: 'justify-content', isCorrect: true },
        ],
        xp: 100,
      },
      {
        course: 'CSS - Flexbox',
        title: 'CSS - Flexbox avançado',
        description: 'Direção, espaçamento e controle dos itens',
        content: `
    <h1>Flexbox Avançado</h1>

    <p>
      Além do alinhamento, o Flexbox permite controlar a direção
      e o comportamento dos itens.
    </p>

    <h2>Direção dos itens</h2>

    <pre><code>div {
  display: flex;
  flex-direction: column;
}</code></pre>

    <ul>
      <li><code>row</code>: linha (padrão)</li>
      <li><code>column</code>: coluna</li>
    </ul>

    <h2>Espaçamento entre itens</h2>

    <pre><code>div {
  gap: 10px;
}</code></pre>

    <h2>Controle de tamanho</h2>

    <pre><code>.item {
  flex: 1;
}</code></pre>

    <p>
      Faz os itens crescerem igualmente.
    </p>

    <h2>Resumo</h2>
    <p>
      Flexbox permite controlar direção, espaçamento e proporção dos elementos.
    </p>
  `,
        question: 'Qual propriedade muda a direção dos itens?',
        options: [
          { content: 'justify-content' },
          { content: 'align-items' },
          { content: 'flex-direction', isCorrect: true },
          { content: 'gap' },
        ],

        xp: 100,
      },

      {
        course: 'JavaScript - Introdução',
        title: 'JavaScript - Introdução ao Javascript',
        description: 'O que é JavaScript e para que serve',
        content: `
    <h1>O que é JavaScript?</h1>

    <p>
      JavaScript é uma linguagem de programação usada para adicionar
      interatividade às páginas web.
    </p>

    <p>
      Enquanto o HTML estrutura e o CSS estiliza, o JavaScript controla
      o comportamento da página.
    </p>

    <h2>Exemplo simples</h2>

    <pre><code>alert("Olá, mundo!");</code></pre>

    <p>
      Esse código exibe uma mensagem na tela do usuário.
    </p>

    <h2>Resumo</h2>
    <p>
      JavaScript permite criar páginas dinâmicas e interativas.
    </p>
  `,
        question: 'Qual é a função do JavaScript?',
        options: [
          { content: 'Estruturar a página' },
          { content: 'Estilizar a página' },
          { content: 'Adicionar interatividade', isCorrect: true },
          { content: 'Criar banco de dados' },
        ],

        xp: 10,
      },
      {
        course: 'JavaScript - Introdução',
        title: 'JavaScript - Integrando Javascript no HTML',
        description: 'Como usar JavaScript no HTML',
        content: `
    <h1>Como usar JavaScript</h1>

    <p>
      O JavaScript pode ser adicionado ao HTML de diferentes formas.
    </p>

    <h2>Script interno</h2>

    <pre><code>&lt;script&gt;
alert("Olá!");
&lt;/script&gt;</code></pre>

    <h2>Script externo</h2>

    <pre><code>&lt;script src="script.js"&gt;&lt;/script&gt;</code></pre>

    <p>
      Essa é a forma mais recomendada.
    </p>

    <h2>Quando executar</h2>

    <p>
      Normalmente colocamos o script no final do body para garantir
      que o HTML já foi carregado.
    </p>

    <h2>Resumo</h2>
    <p>
      JavaScript pode ser usado dentro do HTML ou em arquivos separados.
    </p>
  `,
        question: 'Qual é a melhor prática para usar JavaScript?',
        options: [
          { content: 'Inline' },
          { content: 'Interno' },
          { content: 'CSS' },
          { content: 'Externo', isCorrect: true },
        ],
        xp: 10,
      },
      {
        course: 'JavaScript - Introdução',
        title: 'JavaScript - Interações com usuário',
        description: 'Interagindo com o usuário',
        content: `
    <h1>Interação com o Usuário</h1>

    <p>
      JavaScript permite interagir diretamente com o usuário.
    </p>

    <h2>Principais funções</h2>

    <ul>
      <li><code>alert()</code>: mostra uma mensagem</li>
      <li><code>prompt()</code>: pede um valor</li>
      <li><code>confirm()</code>: confirmação (true/false)</li>
    </ul>

    <h2>Exemplo</h2>

    <pre><code>let nome = prompt("Qual seu nome?");
alert("Olá, " + nome);</code></pre>

    <h2>Resumo</h2>
    <p>
      Essas funções permitem criar interações básicas com o usuário.
    </p>
  `,
        question: 'Qual função pede um valor ao usuário?',
        options: [
          { content: 'alert()' },
          { content: 'prompt()', isCorrect: true },
          { content: 'confirm()' },
          { content: 'input()' },
        ],
        xp: 20,
      },

      {
        course: 'JavaScript - Variáveis',
        title: 'JavaScript - Introdução a variáveis',
        description: 'O que são variáveis e para que servem',
        content: `
    <h1>O que são Variáveis?</h1>

    <p>
      Variáveis são usadas para armazenar dados que podem ser utilizados
      e modificados ao longo do programa.
    </p>

    <p>
      Pense nelas como "caixas" onde você guarda informações.
    </p>

    <h2>Exemplo</h2>

    <pre><code>let nome = "João";</code></pre>

    <p>
      Aqui criamos uma variável chamada <code>nome</code> e armazenamos um texto.
    </p>

    <h2>Resumo</h2>
    <p>
      Variáveis permitem guardar e reutilizar dados no código.
    </p>
  `,
        question: 'Para que servem as variáveis?',
        options: [
          { content: 'Estilizar a página' },
          { content: 'Criar HTML' },
          { content: 'Executar CSS' },
          { content: 'Armazenar dados', isCorrect: true },
        ],
        xp: 20,
      },
      {
        course: 'JavaScript - Variáveis',
        title: 'JavaScript - Declaração de variáveis',
        description: 'Tipos de declaração: var, let e const',
        content: `
    <h1>Tipos de Variáveis</h1>

    <p>
      No JavaScript, existem três formas principais de declarar variáveis:
    </p>

    <h2>var</h2>

    <pre><code>var idade = 25;</code></pre>

    <p>
      Forma antiga, hoje pouco utilizada.
    </p>

    <h2>let</h2>

    <pre><code>let cidade = "Rio";</code></pre>

    <p>
      Pode ter seu valor alterado.
    </p>

    <h2>const</h2>

    <pre><code>const pi = 3.14;</code></pre>

    <p>
      Não pode ser alterada após definida.
    </p>

    <h2>Resumo</h2>
    <p>
      Prefira usar <code>let</code> e <code>const</code> no desenvolvimento moderno.
    </p>
  `,
        question: 'Qual variável não pode ser alterada?',
        options: [
          { content: 'var' },
          { content: 'let' },
          { content: 'const', isCorrect: true },
          { content: 'set' },
        ],
        xp: 20,
      },
      {
        course: 'JavaScript - Variáveis',
        title: 'JavaScript - Escopo de variáveis',
        description: 'Escopo e boas práticas',
        content: `
    <h1>Escopo de Variáveis</h1>

    <p>
      O escopo define onde uma variável pode ser acessada no código.
    </p>

    <h2>Escopo de bloco</h2>

    <pre><code>{
  let x = 10;
}</code></pre>

    <p>
      A variável <code>x</code> só existe dentro desse bloco.
    </p>

    <h2>Diferença importante</h2>

    <ul>
      <li><code>let</code> e <code>const</code>: escopo de bloco</li>
      <li><code>var</code>: escopo global ou de função</li>
    </ul>

    <h2>Boas práticas</h2>

    <ul>
      <li>Prefira <code>const</code> sempre que possível</li>
      <li>Use <code>let</code> quando precisar alterar</li>
      <li>Evite <code>var</code></li>
    </ul>

    <h2>Resumo</h2>
    <p>
      Entender escopo evita erros e conflitos no código.
    </p>
  `,
        question: 'Qual tem escopo de bloco?',
        options: [
          { content: 'var' },
          { content: 'let', isCorrect: true },
          { content: 'function' },
          { content: 'global' },
        ],
        xp: 40,
      },

      {
        course: 'JavaScript - Tipos de Dados',
        title: 'JavaScript - Tipos primitivos',
        description: 'Tipos de dados básicos no JavaScript',
        content: `
    <h1>Tipos de Dados</h1>

    <p>
      Em JavaScript, os dados podem ter diferentes tipos.
      Isso define como eles serão usados no programa.
    </p>

    <h2>Principais tipos</h2>

    <ul>
      <li><strong>String:</strong> texto</li>
      <li><strong>Number:</strong> números</li>
      <li><strong>Boolean:</strong> verdadeiro ou falso</li>
    </ul>

    <h2>Exemplos</h2>

    <pre><code>let nome = "Maria";   // String
let idade = 30;       // Number
let ativo = true;     // Boolean</code></pre>

    <h2>Resumo</h2>
    <p>
      Cada tipo de dado representa uma forma diferente de informação.
    </p>
  `,
        question: 'Qual tipo representa verdadeiro ou falso?',
        options: [
          { content: 'String' },
          { content: 'Number' },
          { content: 'Boolean', isCorrect: true },
          { content: 'Array' },
        ],
        xp: 40,
      },
      {
        course: 'JavaScript - Tipos de Dados',
        title: 'JavaScript - Tipos especiais',
        description: 'Tipos especiais e typeof',
        content: `
    <h1>Tipos Especiais</h1>

    <p>
      Além dos tipos básicos, existem alguns tipos especiais no JavaScript.
    </p>

    <h2>Undefined</h2>

    <pre><code>let x;
console.log(x);</code></pre>

    <p>
      Variável declarada, mas sem valor.
    </p>

    <h2>Null</h2>

    <pre><code>let y = null;</code></pre>

    <p>
      Representa ausência intencional de valor.
    </p>

    <h2>Descobrindo o tipo</h2>

    <pre><code>typeof "Olá"; // string
typeof 10;    // number</code></pre>

    <h2>Resumo</h2>
    <p>
      Tipos especiais ajudam a lidar com ausência ou indefinição de dados.
    </p>
  `,
        question: 'Qual representa ausência intencional de valor?',
        options: [
          { content: 'undefined' },
          { content: 'null', isCorrect: true },
          { content: 'false' },
          { content: '0' },
        ],
        xp: 40,
      },
      {
        course: 'JavaScript - Tipos de Dados',
        title: 'JavaScript - Tipos complexos',
        description: 'Tipos complexos e coerção de tipos',
        content: `
    <h1>Tipos Complexos e Coerção</h1>

    <p>
      Além dos tipos simples, JavaScript possui tipos mais complexos.
    </p>

    <h2>Array</h2>

    <pre><code>let lista = ["Maçã", "Banana", "Laranja"];</code></pre>

    <h2>Object</h2>

    <pre><code>let pessoa = {
  nome: "João",
  idade: 25
};</code></pre>

    <h2>Coerção de tipos</h2>

    <pre><code>"5" + 2  // "52"
"5" - 2  // 3</code></pre>

    <p>
      O JavaScript pode converter tipos automaticamente.
    </p>

    <h2>Resumo</h2>
    <p>
      Arrays e objetos armazenam múltiplos valores, e a coerção pode gerar resultados inesperados.
    </p>
  `,
        question: 'Qual estrutura armazena múltiplos valores em lista?',
        options: [
          { content: 'String' },
          { content: 'Array', isCorrect: true },
          { content: 'Boolean' },
          { content: 'Null' },
        ],
        xp: 60,
      },

      {
        course: 'JavaScript - Condicionais',
        title: 'JavaScript - If e else',
        description: 'Introdução ao if e else',
        content: `
    <h1>Estruturas Condicionais</h1>

    <p>
      Condicionais permitem que o programa tome decisões com base em condições.
    </p>

    <h2>Estrutura básica</h2>

    <pre><code>if (condicao) {
  // código executado se for verdadeiro
} else {
  // código executado se for falso
}</code></pre>

    <h2>Exemplo</h2>

    <pre><code>let idade = 18;

if (idade >= 18) {
  console.log("Maior de idade");
} else {
  console.log("Menor de idade");
}</code></pre>

    <h2>Resumo</h2>
    <p>
      O <code>if</code> executa código com base em uma condição.
    </p>
  `,
        question: 'Quando o bloco do if é executado?',
        options: [
          { content: 'Quando a condição é falsa' },
          { content: 'Quando a condição é verdadeira', isCorrect: true },
          { content: 'Sempre' },
          { content: 'Nunca' },
        ],
        xp: 60,
      },
      {
        course: 'JavaScript - Condicionais',
        title: 'JavaScript - Operadores de comparação',
        description: 'O que são operadores de comparação e para que servem',
        content: `
    <h1>Operadores de Comparação</h1>

    <p>
      Para criar condições, usamos operadores de comparação.
    </p>

    <h2>Principais operadores</h2>

    <ul>
      <li><code>==</code>: igual</li>
      <li><code>===</code>: igual e mesmo tipo</li>
      <li><code>!=</code>: diferente</li>
      <li><code>&gt;</code>: maior que</li>
      <li><code>&lt;</code>: menor que</li>
    </ul>

    <h2>Exemplo</h2>

    <pre><code>let numero = 10;

if (numero === 10) {
  console.log("Igual a 10");
}</code></pre>

    <h2>Resumo</h2>
    <p>
      Operadores de comparação ajudam a criar condições mais precisas.
    </p>
  `,
        question: 'Qual operador compara valor e tipo?',
        options: [
          { content: '==' },
          { content: '===', isCorrect: true },
          { content: '=' },
          { content: '!=' },
        ],
        xp: 60,
      },
      {
        course: 'JavaScript - Condicionais',
        title: 'JavaScript - Condicionais múltiplas',
        description: 'Entendendo condicionais múltiplas e operador ternário',
        content: `
    <h1>Condicionais Avançadas</h1>

    <p>
      Podemos criar múltiplas condições usando <code>else if</code>
      ou simplificar com o operador ternário.
    </p>

    <h2>Else if</h2>

    <pre><code>let nota = 7;

if (nota >= 9) {
  console.log("Excelente");
} else if (nota >= 6) {
  console.log("Aprovado");
} else {
  console.log("Reprovado");
}</code></pre>

    <h2>Operador ternário</h2>

    <pre><code>let idade = 18;

let status = idade >= 18 ? "Maior" : "Menor";</code></pre>

    <p>
      Forma reduzida de escrever um if/else.
    </p>

    <h2>Resumo</h2>
    <p>
      Condicionais avançadas permitem decisões mais complexas e código mais compacto.
    </p>
  `,
        question: 'Qual operador é usado como forma reduzida do if?',
        options: [
          { content: '? :', isCorrect: true },
          { content: '&&' },
          { content: '||' },
          { content: '==' },
        ],
        xp: 80,
      },

      {
        course: 'JavaScript - Funções',
        title: 'JavaScript - Introdução a funções',
        description: 'O que são funções e para que servem',
        content: `
    <h1>O que são Funções?</h1>

    <p>
      Funções são blocos de código reutilizáveis que executam uma tarefa específica.
    </p>

    <p>
      Elas ajudam a organizar o código e evitar repetição.
    </p>

    <h2>Exemplo</h2>

    <pre><code>function saudacao() {
  console.log("Olá!");
}</code></pre>

    <p>
      Para executar a função:
    </p>

    <pre><code>saudacao();</code></pre>

    <h2>Resumo</h2>
    <p>
      Funções permitem reutilizar código e organizar melhor o programa.
    </p>
  `,
        question: 'Para que servem as funções?',
        options: [
          { content: 'Estilizar a página' },
          { content: 'Reutilizar código', isCorrect: true },
          { content: 'Criar HTML' },
          { content: 'Armazenar dados' },
        ],
        xp: 80,
      },
      {
        course: 'JavaScript - Funções',
        title: 'JavaScript - Parâmetros e retorno',
        description: 'Entendendo parâmetros e retorno de funções',
        content: `
    <h1>Parâmetros e Retorno</h1>

    <p>
      Funções podem receber dados (parâmetros) e retornar resultados.
    </p>

    <h2>Exemplo com parâmetros</h2>

    <pre><code>function soma(a, b) {
  return a + b;
}</code></pre>

    <p>
      Chamando a função:
    </p>

    <pre><code>let resultado = soma(2, 3);</code></pre>

    <p>
      O valor retornado será 5.
    </p>

    <h2>Resumo</h2>
    <p>
      Parâmetros recebem dados e <code>return</code> devolve um resultado.
    </p>
  `,
        question: 'Qual palavra retorna um valor em uma função?',
        options: [
          { content: 'console' },
          { content: 'function' },
          { content: 'let' },
          { content: 'return', isCorrect: true },
        ],
        xp: 80,
      },
      {
        course: 'JavaScript - Funções',
        title: 'JavaScript - Arrow functions',
        description: 'Conhecendo arrow functions e boas práticas',
        content: `
    <h1>Funções Avançadas</h1>

    <p>
      JavaScript moderno permite escrever funções de forma mais curta
      usando arrow functions.
    </p>

    <h2>Exemplo</h2>

    <pre><code>const soma = (a, b) => {
  return a + b;
};</code></pre>

    <p>
      Forma simplificada:
    </p>

    <pre><code>const soma = (a, b) => a + b;</code></pre>

    <h2>Boas práticas</h2>

    <ul>
      <li>Use nomes claros para funções</li>
      <li>Evite funções muito grandes</li>
      <li>Prefira arrow functions quando possível</li>
    </ul>

    <h2>Resumo</h2>
    <p>
      Arrow functions tornam o código mais moderno e conciso.
    </p>
  `,
        question: 'Qual sintaxe representa uma arrow function?',
        options: [
          { content: 'function() {}' },
          { content: '=>', isCorrect: true },
          { content: '<>' },
          { content: '::' },
        ],
        xp: 100,
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
