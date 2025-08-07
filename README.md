# blog

Desafio Técnico - Desenvolvedor Back-end Jr

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração e Execução com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/GuiDobelin/blog.git
```

### 2. Construção e execução dos containers

```bash
docker-compose up --build
```

### 3. Parar e remover os containers

```bash
docker-compose down
```

### 4. Acessando a aplicação

Após iniciar os containers, os  microsserviços estarão disponíveis em (http://localhost:3001), (http://localhost:3002), (http://localhost:3003).

## Modelagem do Banco de Dados
<img width="946" height="548" alt="Diagrama de banco de dados" src="https://github.com/user-attachments/assets/a0fe751f-e2e8-49c6-9e3f-df1354857b73" />

## Postman Collection

Aqui tem collention para baixar  ➝ [docs](docs/blog.postman_collection.json.)

### Importar a Coleção no Postman

1. Abra o Postman.
2. Vá até "File" > "Import".
3. Selecione a aba "Upload Files".
4. Escolha o arquivo `.json` baixado.

### Configurando o Ambiente no Postman

1. No Postman, clique em "Environments" no painel à esquerda.
2. Clique em "Add" para criar um novo ambiente.
3. Nomeie o ambiente como `blog-api`.
4. Adicione uma nova variável chamada `token`, onde você deve colar o token de autenticação obtido após o login, precedido por Bearer.
5. Salve as mudanças.

### Passo a Passo: 
## 1 - Criação de Usuário e token

   Para criar um novo usuário, envie uma requisição POST para a rota `/auth/register` com os seguintes campos no corpo da requisição:

**Exemplo de Requisição:**

POST http://localhost:3001/auth/register
- Body: raw
- Content-Type: application/json

```json
{
  "name": "name",
  "email": "name@email.com",
  "password": "password"
}
```
  Após criar o usuário, você precisará realizar o login para obter o token de autenticação. Envie uma requisição POST para a rota `auth/login` com as credenciais de username e password.

**Exemplo de Requisição:**

POST http://localhost:3001/auth/login
- Body: raw
- Content-Type: application/json

```json
{
  "email": "name@email.com",
  "password": "password"
}
```

**Exemplo de Resposta:**

```json
{
    "message": "Login bem-sucedido",
    "token": "seu_token",
    "user": {
        "id": "seu_id",
        "name": "name",
        "email": "name@email.com"
    }
}
```

  Com o token em mãos, você pode realizar requisições para as rotas protegidas da aplicação. Para isso, inclua o token na variavel que foi criada em blog-api e coloque em current value
  <img width="1496" height="204" alt="image" src="https://github.com/user-attachments/assets/81f25119-dffc-46fa-bde9-a719be0658a8" />

## 2 - Criação de posts e Autenticação

   Para criar um novo posts, envie uma requisição POST para a rota `/posts` com os seguintes campos no corpo da requisição:

**Exemplo de Requisição:**

POST http://localhost:3002/posts
- Body: raw
- Content-Type: application/json
- Authorization: Bearer Token

```json
{
  "title": "title ",
  "content": "content"
}
```
**Exemplo de Resposta:**
```json
{
    "id": "postId",
    "userId": "userId",
    "title": "title ",
    "content": "content",
    "updatedAt": "datetime",
    "createdAt": "datetime"
}
```
### Update de posts e Autenticação

   Para atualizar um post, envie uma requisição PUT para a rota `/posts/{ id do post }` com os seguintes campos no corpo da requisição:

**Exemplo de Requisição:**

PUT http://localhost:3002/posts/{ id do post }
- Body: raw
- Content-Type: application/json
- Authorization: Bearer Token

```json
{
  "title": "new title",
  "content": "content updated"
}
```
**Exemplo de Resposta:**
```json
{
    "id": "id do post",
    "userId": "userId",
    "title": "new title",
    "content": "content updated",
    "createdAt": "datetime",
    "updatedAt": "datetime"
}
```
### delete de posts e Autenticação

   Para atualizar um post, envie uma requisição DELETE para a rota `/posts/{id do post}` com os seguintes campos no corpo da requisição:

**Exemplo de Requisição:**

DELETE http://localhost:3002/posts/{ id do post }
- Body: raw
- Content-Type: application/json
- Authorization: Bearer Token

**Exemplo de Resposta:**
```json
{
    "message": "Post deletado com sucesso"
}
```

## 3 - Criação de comments e Autenticação

   Para criar um novo comentario, envie uma requisição POST para a rota `/comments` com os seguintes campos no corpo da requisição:

**Exemplo de Requisição:**

POST http://localhost:3003/comments
- Body: raw
- Content-Type: application/json
- Authorization: Bearer Token

```json
{
  "postId": "postId",
  "userId": "userId",
  "content": "content"
}
```
**Exemplo de Resposta:**
```json
{
    "id": "id",
    "postId": "postId",
    "userId": "userId",
    "content": "content",
    "updatedAt": "datetime",
    "createdAt": "datetime"
}
```
### Update de comments e Autenticação

   Para atualizar um comentario, envie uma requisição PUT para a rota `/comments/{id do comentario}` com os seguintes campos no corpo da requisição:

**Exemplo de Requisição:**

PUT http://localhost:3003/comments/{id do comentario}
- Body: raw
- Content-Type: application/json
- Authorization: Bearer Token

```json
{
  "content": "New content updated"
}

```
**Exemplo de Resposta:**
```json
{
    "id": "id",
    "postId": "postId",
    "userId": "userId",
    "content": "New content updated",
    "updatedAt": "datetime",
    "createdAt": "datetime"
}
```
### delete de comments e Autenticação

   Para deletar um comments, envie uma requisição DELETE para a rota `/comments/{id do comentario}` com os seguintes campos no corpo da requisição:

**Exemplo de Requisição:**

DELETE http://localhost:3003/comments/{id do comentario}
- Body: raw
- Content-Type: application/json
- Authorization: Bearer Token

**Exemplo de Resposta:**
```json
{
    "message": "Comentario deletado com sucesso"
}
```

### Observações

O arquivo `.env` foi incluído no repositório para facilitar o uso e configuração do projeto. Ele contém as variáveis de ambiente necessárias para a execução do banco de dados PostgreSQL e configurações do Node.js.
