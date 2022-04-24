# AutoLuby Teste

## Tecnologias utilizadas
- NodeJs
- Express
- Sequelize
- PostgreSQL
- Typescript

## Features adicionais
- Migrations 


## Como rodar o projeto?
- Clone o projeto
- Instale as dependências do package.json
- Execute as migrations 
- Popule o banco com algumas seeds que usaremos para os testes
- Der um run no projeto
```bash 
  git clone https://github.com/IssacCabral/join-AutoLuby.git

  npm install

  npx sequelize-cli db:migrate

  npx sequelize-cli db:seed:all

  npm run dev
 ```
 
## Diagrama lógico do banco
<img src="./auxiliares/AutoLuby-Modelagem.png">
<img src="./auxiliares/AutoLuby-Modelagem-Tabelas.png">

## Autenticação
```bash
http://localhost:3000/auth
```
- Inicialmente, escolhi deixar livre a rota de criação de usuários. Todas as outras necessitamos estar autenticados
- Para autenticar, basta realizar uma requisição para o endpoint abaixo como exemplo
```json
endpoints: [
  {
    "name": "autenticação de usuário,
    "method": "POST",
    "endpoint": "http://localhost:3000/auth",
    "requestBody": {
        "email": "chaplin@email.com",
        "password": "123456"
    }
  },
]
```

- E como resposta da autenticação, caso tudo esteja válido será devolvida a seguinte reposta:

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiY2hhcGxpbkBlbWFpbC5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2NTA4MDg2NTAsImV4cCI6MTY1MDgxMjI1MH0.7cYSIpKBPiYdqbMj0W9Bygltzpn5z55iimu6R4pXK2g"
}
```

## Endpoints que requerem autenticação do usuário

- Para realizar essas operações, antes de enviar a requisição, é necessário incluir o token nos headers (Bearer token);

## Usuários
- Nós temos dois tipos de usuários no sistema: admin e employee
- É restrito à usuários admin:
  - Deletar(demitir) outros usuários
  - Criar(adquirir) veículos para o sistema
  - Deletar veículos do sistema
- as operações de vendas e reservas são permitidas para ambos os usuários. Porém, todos devem estar autenticados no sistema  
- quando um novo usuário é criado, por default ele é um employee

## CRUD de Usuários
- Estamos logados com um user(chaplin) employee. Tentaremos acessar o endpoint de deleção de um outro user pelo id.  

```json
{
  {
    "name": "deleção de usuário,
    "method": "DELETE",
    "endpoint": "http://localhost:3000/users/3"
  },
}
```
- E como resposta para a requisição obteremos:
```json
{
	"error": "Você não tem permissão para deletar usuários"
}
```
- Justamente o que queremos. Agora logaremos com um usuário admin(aristóteles) para conseguir deletar o user de mesmo id

```json
endpoints: [
  {
    "name": "autenticação de usuário,
    "method": "POST",
    "endpoint": "http://localhost:3000/auth",
    "requestBody": {
        "email": "aristoteles@email.com",
        "password": "123456"
    }
  },
]
```
- Com um usuário admin logado, agora acessaremos a mesma rota de deleção de usuário passando o mesmo id

```json
{
  {
    "name": "deleção de usuário,
    "method": "DELETE",
    "endpoint": "http://localhost:3000/users/3"
  },
}
```

- E agora obtemos como resposta:

```json
"Usuário removido!"
```

- Abaixo segue os outros endpoints do CRUD de usuários:

### Criar Usuário (CREATE)
``` json
endpoints: [
  {
    "name": "criar usuário",
    "method": "POST",
    "endpoint": "http://localhost:3000/users",
    "requestBody": {
        "email": "useremail",
        "password": "password",
        "name": "user name",
        "cpf": "01010101",
        "biography": "Lorem Ipsum",
        "avatar": "ava",
        "value": 1000.50
      }
  }, 
```

### Obtemos como Resposta
``` json
{
	"id": 4,
	"email": "useremail",
	"name": "user name",
	"cpf": "01010101",
	"biography": "Lorem Ipsum",
	"value": 1000.5,
	"avatar": "ava",
	"createdAt": "2022-04-24T15:01:48.369Z",
	"updatedAt": "2022-04-24T15:01:48.369Z",
	"roleId": 2
}
```

### Buscar todos os usuários

- Essa rota está paginada. Podemos utilizar query params para definir um limite de quantos usuários queremos que a rota retorne
- Formatei as datas na forma DD/MM/yyyy
``` bash
http://localhost:3000/users?page=1&limit=5
```

``` json
{
    "name": "buscar todos os usuários",
    "method": "GET",
    "endpoint": "http://localhost:3000/users?page=1&limit=5",
    "responseBody": [
      {
        "id": 1,
        "email": "aristoteles@email.com",
        "name": "Aristóteles Ferreira",
        "cpf": "11111",
        "biography": "Software Enginner",
        "value": 1000000,
        "avatar": null,
        "createdAt": "24/04/2022",
        "updatedAt": "24/04/2022",
        "roleId": 1
      },
      {
        "id": 2,
        "email": "chaplin@email.com",
        "name": "Charles Chaplin",
        "cpf": "22222",
        "biography": "Dev",
        "value": 10000,
        "avatar": null,
        "createdAt": "24/04/2022",
        "updatedAt": "24/04/2022",
        "roleId": 2
      },
      {
        "id": 4,
        "email": "useremail",
        "name": "user name",
        "cpf": "01010101",
        "biography": "Lorem Ipsum",
        "value": 1000.5,
        "avatar": "ava",
        "createdAt": "24/04/2022",
        "updatedAt": "24/04/2022",
        "roleId": 2
      }
    ]
}
```

- Perceba que os dados de usuário retornados condizem com a tela de listagem de funcionários do protótipo

<img src="./auxiliares/listagem-funcionarios.png">

### Atualizar usuário (UPDATE)

- O email de um user é um campo único. Logo, se estamos logados com um certo user e tentarmos atualizar o email para um mesmo email de um outro user, obtemos a seguinte mensagem:
``` json
"O email já existe no banco"
```
- Neste endpoint podemos alterar a senha(passando a atual e nova), email, biografia, nome, e o salário. 
 
``` json
  {
    "name": "atualizar usuário",
    "method": "PUT",
    "endpoint": "http://localhost:3000/users/:id",
    "requestBody": {
      "email": "aristoteles@email.com",
	    "currentlyPassword": "123456",
	    "newPassword": "123456",
	    "name": "Aristóteles F.",
	    "biography": "Uma nova biografia",
	    "value": 100000
    }
  },
```
### Buscar usuário pelo id
- Deve ser possível visualizar um único funcionário e as vendas/reservas de veículos deste.
- Como ainda não cadastramos nenhuma reserva ou venda, obtemos o usuário com sales e reservations vazios.
``` json
{
  "name": "buscar usuário por id",
  "method": "GET",
  "endpoint": "http://localhost:3000/users/:id",
  "responseBody": [
    {
      "id": 1,
      "email": "aristoteles@email.com",
      "name": "Aristóteles Ferreira",
      "cpf": "11111",
      "biography": "Software Enginner",
      "value": 1000000,
      "avatar": null,
      "roleId": 1,
      "sales": [],
      "reservations": []
	  }
  ]
},

```

