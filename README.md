# Backend da Aplicação Festiva

## Descrição

**Festiva** é uma aplicação para criar eventos online e enviar convites personalizados via WhatsApp. O backend foi desenvolvido com NestJS e inclui funcionalidades como criação e gerenciamento de eventos, envio de convites via API do WhatsApp, e administração de usuários.

## Tecnologias Utilizadas

- 🚀 **NestJS**: Framework para construção de aplicações server-side eficientes.
- 🔐 **JWT (JSON Web Token)**: Autenticação segura baseada em tokens.
- ✨ **Handlebars**: Motor de templates para e-mails personalizados e mensagens.
- 📧 **Nodemailer**: Biblioteca para envio de e-mails.
- 🗃️ **TypeORM**: ORM para gerenciamento de banco de dados.
- 🐘 **PostgreSQL**: Banco de dados relacional.
- 📱 **API do WhatsApp**: Integração para envio de convites via WhatsApp.
- 🐳 **Docker**: Containerização da aplicação para fácil deploy e ambiente de desenvolvimento consistente.

## Rotas da API

### Autenticação

- `POST /auth/login`: Gera um token JWT para autenticação. O tempo de expiração do token é definido na configuração do projeto.
- `POST /auth/verifyemail`: Verifica o e-mail do usuário utilizando um código enviado anteriormente. O código deve ser passado no corpo da requisição (`body`).
- `POST /auth/resetpassword`: Envia um e-mail para redefinição de senha. O e-mail do usuário deve ser passado no corpo da requisição (`body`).

### Usuários

- `POST /users/createUser`: Registra um novo usuário no banco de dados. O corpo da requisição (`body`) deve conter `email`, `username` e `senha`.
- `POST /users/banUser`: Bane um usuário específico, desativando seu acesso ao sistema.
- `DELETE /users/removeUser`: Remove um usuário do banco de dados.

### Eventos

- `POST /events/createEvent`: Cria um novo evento. O corpo da requisição (`body`) deve incluir os detalhes do evento como `nome`, `data`, `local`, e `descrição`.
- `GET /events/listEvents`: Retorna uma lista de eventos criados pelo usuário autenticado.
- `PUT /events/updateEvent/:id`: Atualiza os detalhes de um evento existente. O `id` do evento deve ser passado como parâmetro na URL.
- `DELETE /events/deleteEvent/:id`: Remove um evento existente do banco de dados.

### Convites

- `POST /invites/sendInvite`: Envia um convite para um número de WhatsApp. O corpo da requisição (`body`) deve incluir o `eventId`, `numeroDoWhatsApp`, e `mensagemPersonalizada`.
- `GET /invites/inviteStatus/:inviteId`: Verifica o status de um convite enviado. O `inviteId` deve ser passado como parâmetro na URL.

## Como Rodar

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/festiva-backend.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd festiva-backend
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`.

4. Suba os containers com Docker:

   ```bash
   docker-compose up -d
   ```

5. Acesse a aplicação em `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.
