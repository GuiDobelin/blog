<h1 align="center">📝 Blog API: Microsserviços</h1>

<p align="center">
  API de blog dividida em três microsserviços independentes (<b>usuários</b>, <b>posts</b> e <b>comentários</b>), com autenticação JWT, PostgreSQL e Docker Compose.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=sequelize&logoColor=white" alt="Sequelize">
  <img src="https://img.shields.io/badge/PostgreSQL_15-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT">
</p>

---

## 📚 Sumário

- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Como executar](#-como-executar)
- [Endpoints](#-endpoints)
- [Exemplos de uso](#-exemplos-de-uso)
- [Postman](#-postman)
- [Estrutura de pastas](#-estrutura-de-pastas)

## 🏗️ Arquitetura

```
                ┌──────────────┐
                │   Cliente    │
                └──────┬───────┘
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
 ┌────────────┐ ┌────────────┐ ┌────────────┐
 │   users    │ │   posts    │ │  comments  │
 │   :3001    │ │   :3002    │ │   :3003    │
 └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
       └──────────────┼──────────────┘
                      ▼
              ┌───────────────┐
              │ PostgreSQL 15 │
              └───────────────┘
```

- **users**: cadastro e login; gera o token JWT.
- **posts**: CRUD de posts (rotas protegidas por JWT). Só o autor pode editar ou remover o próprio post.
- **comments**: CRUD de comentários nos posts (rotas protegidas por JWT). Só o autor pode editar ou remover o próprio comentário.

### Modelagem do banco

<img width="946" alt="Diagrama do banco de dados" src="https://github.com/user-attachments/assets/a0fe751f-e2e8-49c6-9e3f-df1354857b73" />

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| ORM / migrations | Sequelize + Sequelize CLI |
| Banco de dados | PostgreSQL 15 |
| Autenticação | JSON Web Token + bcrypt |
| Infraestrutura | Docker e Docker Compose |

## ▶️ Como executar

**Pré-requisitos:** [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/).

```bash
# 1. Clone o repositório
git clone https://github.com/GuiDobelin/blog.git
cd blog

# 2. Suba os containers
docker compose up --build

# 3. Para parar e remover
docker compose down
```

Serviços disponíveis:

| Serviço | URL |
|---|---|
| users | http://localhost:3001 |
| posts | http://localhost:3002 |
| comments | http://localhost:3003 |
| PostgreSQL | `localhost:5439` |

> ℹ️ Os arquivos `.env` estão versionados de propósito para facilitar a execução local. Eles contêm apenas valores de desenvolvimento e **não devem ser usados em produção**.

## 🔗 Endpoints

🔒 = requer header `Authorization: Bearer <token>`

| Método | Rota | Serviço | Descrição |
|---|---|---|---|
| `POST` | `/auth/register` | users | Cria um usuário |
| `POST` | `/auth/login` | users | Faz login e retorna o token |
| `GET` | `/posts` | posts | Lista posts 🔒 |
| `POST` | `/posts` | posts | Cria um post 🔒 |
| `PUT` | `/posts/:id` | posts | Atualiza um post 🔒 |
| `DELETE` | `/posts/:id` | posts | Remove um post 🔒 |
| `GET` | `/comments?postId=` | comments | Lista comentários (filtro opcional por post) 🔒 |
| `POST` | `/comments` | comments | Cria um comentário 🔒 |
| `PUT` | `/comments/:id` | comments | Atualiza um comentário 🔒 |
| `DELETE` | `/comments/:id` | comments | Remove um comentário 🔒 |

## 💡 Exemplos de uso

<details>
<summary><b>1. Cadastrar usuário</b>: <code>POST :3001/auth/register</code></summary>

```json
{
  "name": "name",
  "email": "name@email.com",
  "password": "password"
}
```

**Resposta** (`201 Created`)
```json
{
  "message": "Usuário registrado com sucesso",
  "user": { "id": "seu_id", "name": "name", "email": "name@email.com" }
}
```
</details>

<details>
<summary><b>2. Login</b>: <code>POST :3001/auth/login</code></summary>

**Requisição**
```json
{
  "email": "name@email.com",
  "password": "password"
}
```

**Resposta**
```json
{
  "message": "Login bem-sucedido",
  "token": "seu_token",
  "user": { "id": "seu_id", "name": "name", "email": "name@email.com" }
}
```
</details>

<details>
<summary><b>3. Criar post</b>: <code>POST :3002/posts</code> 🔒</summary>

**Requisição**
```json
{
  "title": "title",
  "content": "content"
}
```

**Resposta**
```json
{
  "id": "postId",
  "userId": "userId",
  "title": "title",
  "content": "content",
  "updatedAt": "datetime",
  "createdAt": "datetime"
}
```
</details>

<details>
<summary><b>4. Atualizar post</b>: <code>PUT :3002/posts/:id</code> 🔒</summary>

```json
{
  "title": "new title",
  "content": "content updated"
}
```
</details>

<details>
<summary><b>5. Remover post</b>: <code>DELETE :3002/posts/:id</code> 🔒</summary>

```json
{ "message": "Post deletado com sucesso" }
```
</details>

<details>
<summary><b>6. Criar comentário</b>: <code>POST :3003/comments</code> 🔒</summary>

```json
{
  "postId": "postId",
  "content": "content"
}
```

O autor do comentário (`userId`) é obtido automaticamente do token.
</details>

<details>
<summary><b>7. Atualizar comentário</b>: <code>PUT :3003/comments/:id</code> 🔒</summary>

```json
{ "content": "New content updated" }
```
</details>

<details>
<summary><b>8. Remover comentário</b>: <code>DELETE :3003/comments/:id</code> 🔒</summary>

```json
{ "message": "Comentario deletado com sucesso" }
```
</details>

## 📮 Postman

A coleção está em [`docs/blog.postman_collection.json`](docs/blog.postman_collection.json).

1. No Postman, vá em **File → Import** e selecione o arquivo.
2. Crie um ambiente chamado `blog-api`.
3. Adicione a variável `token` e cole o token recebido no login (precedido de `Bearer `) em **Current value**.

<img width="1496" alt="Configuração do ambiente no Postman" src="https://github.com/user-attachments/assets/81f25119-dffc-46fa-bde9-a719be0658a8" />

## 📁 Estrutura de pastas

```
blog/
├── docker-compose.yml
├── docs/                 # Coleção do Postman
├── users/                # Serviço de usuários e autenticação
│   ├── src/              # controllers, routes, models, index.js
│   ├── migrations/
│   └── Dockerfile
├── posts/                # Serviço de posts
│   ├── src/
│   ├── middlewares/      # Validação do JWT
│   ├── migrations/
│   └── Dockerfile
└── comments/             # Serviço de comentários
    ├── src/
    ├── middleware/       # Validação do JWT
    ├── migrations/
    └── Dockerfile
```

---

<p align="center">Feito por <a href="https://github.com/GuiDobelin">Guilherme Dobelin</a></p>
