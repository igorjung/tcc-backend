## Descrição

Esse repositório contém o código-fonte do **backend** do projeto TCC desenvolvido pelos alunos **Igor Cássio Jung Silva** e **Matheus Apolinario**, do curso de **Sistema de Informações** da instituição **UGB - Volta Redonda**.

O projeto consiste em uma API **RESTful** desenvolvida com **Nest.js**, utilizando **TypeOrm** e integrada com um banco de dados **PostgresSQL**.

## Requisitos

Antes de inciar, é necessário ter instalado em seu máquina: 
- [Node](jshttps://www.nodejs.tech/pt-br/download)
- [Docker Compose](https://docs.docker.com/compose/install/)


## Configuração do ambiente

1. Copiei o arquivo do arquivo `env.example` para um novo arquivo `.env`
2. Edite o arquivo `.env` adicionando suas variáveis locais, como porta, banco de dados, usuário e senha:

```.env
# Banco de dados - PostgreSQL
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=senha
DB_NAME=nome_do_banco
DB_ADMIN_EMAIL=admin@root.com

# Bcrypt
SALT_PASSWORD=senha_secreta

# JWT
JWT_SECRET=segredo_secreto
```

## Instalação do projeto

```bash
$ npm install
```

## Configuração do docker

```bash
$ docker compose up -d
```

## Configuração do banco de dados

1. Acesse o PgAdmin em http://localhost:8081/
2. Faça login utilizando as credências definidas no arquivo `.env`
3. Registre um servidor novo
4. Crie um banco de dados com o nome definido no arquivo `.env`

## Execução de migrações pro banco de dados

Verifique se existem migrações pendentes:
```bash
$ npm run typeorm migration:show
```

Se houve migrações pendentes, execute:
```bash
$ npm run typeorm migration:run
```

## Execução da API

```bash
# densenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev

# modo de produção
$ npm run start:prod
```

## Estrutura do Projeto
```text
src/
├── config/         # Configurações gerais do projeto
├── db/             # Data source e migrações do banco de dados
├── enum/           # Arquivos do tipo enum, utilizados em todo projeto
├── modules/        # Módulos da aplicação (Controllers, Serviços, Entidades e DTOs)
├── resources/      # Recursos compartilhados do projeto
│   ├── decorators/          
│   ├── filters/          
│   ├── guards/         
│   ├── interceptors          
│   ├── pipes/    
└── main.ts          # Arquivo principal da aplicação    

```

## Autores
**- Igor Cássio Jung Silva**
**- Matheus Apolinario**
