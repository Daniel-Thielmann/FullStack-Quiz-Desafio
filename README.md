# Sistema de Quiz Interativo

## Descrição das Funcionalidades Principais

O sistema é um quiz interativo que permite aos usuários responderem a perguntas de múltipla escolha e visualizar os resultados ao final. As funcionalidades incluem:

- **Início do Quiz**: O usuário insere seu nome e começa a responder às perguntas.
- **Respostas e Pontuação**: As respostas são validadas, e uma pontuação é calculada com base nas respostas corretas.
- **Banco de Dados**: As perguntas e resultados são armazenados em um banco SQLite para persistência de dados.

## Tecnologias e Bibliotecas Utilizadas

### **Frontend**

- **React**: Biblioteca para construção de interfaces.
- **React Router**: Gerenciamento de rotas.
- **Tailwind CSS**: Estilização do layout.
- **TypeScript**: Adiciona tipagem ao JavaScript para maior segurança.

### **Backend**

- **Node.js**: Ambiente de execução do backend.
- **Express**: Framework para criação de rotas e APIs.
- **SQLite**: Banco de dados leve e embutido.

## Passos para Rodar o Sistema Localmente

### **Pré-requisitos**

- Node.js instalado ([Download Node.js](https://nodejs.org/)).
- SQLite instalado ([Guia SQLite](https://sqlite.org/download.html)).

### **1. Clone o repositório**

```bash
$ git clone https://github.com/seu-usuario/seu-repositorio.git
$ cd seu-repositorio
```

### **2. Instale as dependências**

#### Backend

```bash
$ cd backend
$ npm install
```

#### Frontend

```bash
$ cd ../frontend
$ npm install
```

### **3. Configure o banco de dados**

Certifique-se de que o arquivo `quiz.db` esteja na pasta `backend/db`. Se precisar recriar as tabelas:

```bash
$ sqlite3 backend/db/quiz.db
.read backend/db/migrations/01_create_tables.sql
.read backend/db/migrations/02_seed_data.sql
.exit
```

### **4. Inicie o servidor**

#### Backend

```bash
$ cd backend
$ npm start
```

#### Frontend

```bash
$ cd ../frontend
$ npm run dev
```

#### Para ligar ambos ao mesmo tempo temos a ajuda do concurrentl, basta dar npm run dev na pasta raíz do projeto

```bash
$ cd processo-seletivo-codi-2025-1-Daniel-Thielmann
$ npm run dev
```

### **5. Acesse o sistema**

Abra o navegador e acesse:

- Frontend: `http://localhost:3000`
- Backend (API): `http://localhost:5000`

## Estrutura Definida para o Banco de Dados

### Tabela `perguntas`

| Coluna           | Tipo    | Descrição                             |
| ---------------- | ------- | ------------------------------------- |
| id               | INTEGER | Identificador único da pergunta (PK). |
| pergunta         | TEXT    | Texto da pergunta.                    |
| alternativas     | TEXT    | Alternativas da pergunta (em JSON).   |
| resposta_correta | INTEGER | Índice da alternativa correta.        |

Feito com muito esforço por Daniel Thielmann.
