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
## CRUD de Veículos

- Temos três possíveis status para veículos: sold, reserved e available(status default ao criar um veículo)
- Deixei para o status do veículo ser alterado de acordo com a operação de venda ou de reserva. 
- Lembre-se: apenas admin users podem criar ou deletar veículos
- chassis é um campo único. É exclusivo para cada veículo

### Criar Veículo (CREATE)
``` json
endpoints: [
  {
    "name": "criar veículo",
    "method": "POST",
    "endpoint": "http://localhost:3000/vehicles",
    "requestBody": {
      "brand": "brand_test",
      "model": "model_test",
      "year": 2002,
      "km": "14000",
      "color": "white",
      "chassis": "0908",
      "sale_price": 19999,
      "cost_price": 5000
      }
  }, 
```

### Obtemos como Resposta
``` json
{
	"createdAt": "2022-04-24T16:03:09.814Z",
	"updatedAt": "2022-04-24T16:03:09.814Z",
	"status": "available",
	"id": 4,
	"brand": "brand_test",
	"model": "model_test",
	"year": 2002,
	"km": "14000",
	"color": "white",
	"chassis": "0908",
	"sale_price": 19999,
	"cost_price": 5000
}
```

### Listar todos os veículos

- Essa rota está paginada. Podemos utilizar query params para definir um limite de quantos usuários queremos que a rota retorne
- Como ainda não realizamos nenhuma reserva ou venda, apenas veículos marcados como "available" serão apresentados

``` bash
http://localhost:3000/vehicles?page=1&limit=5
```

``` json
{
    "name": "buscar todos os veículos",
    "method": "GET",
    "endpoint": "http://localhost:3000/vehicles?page=1&limit=2",
    "responseBody": 
    [
      {
        "id": 1,
        "status": "available",
        "brand": "Chevrolet",
        "model": "Onyx",
        "year": 2020,
        "km": "20000",
        "color": "Blue",
        "chassis": "0101",
        "sale_price": 50000,
        "cost_price": 20000,
        "createdAt": "24/04/2022",
        "updatedAt": "24/04/2022"
      },
      {
        "id": 2,
        "status": "available",
        "brand": "Fiat",
        "model": "Uno",
        "year": 2009,
        "km": "27500",
        "color": "white",
        "chassis": "0202",
        "sale_price": 12000,
        "cost_price": 5000,
        "createdAt": "24/04/2022",
        "updatedAt": "24/04/2022"
      }
    ]
}
```

### Buscar veículo pelo Id

``` json
{
  "name": "buscar veículo por id",
  "method": "GET",
  "endpoint": "http://localhost:3000/vehicles/:id",
  "responseBody": [
    {
      "id": 1,
      "status": "available",
      "brand": "Chevrolet",
      "model": "Onyx",
      "year": 2020,
      "km": "20000",
      "color": "Blue",
      "chassis": "0101",
      "sale_price": 50000,
      "cost_price": 20000,
      "createdAt": "2022-04-24T14:37:55.878Z",
      "updatedAt": "2022-04-24T14:37:55.878Z"
    }
  ]
}
```

### Podemos também buscar veículos por chassis e por status

``` bash
  http://localhost:3000/vehicles/chassis/:chassisNumber
  http://localhost:3000/vehicles/status/:status
```

## Cadastrando Reservas

- Para fins de teste, vamos nos autenticar com o employee de name 'Aristóteles Ferreira'

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

- Agora com o token em mãos iremos reservar um veículo para este usuário.
- Não é possível reservar um carro com status de 'reserved' ou de 'sold', o carro deve está marcado como available
- reservaremos o carro de id 1

``` json
{
	"id": 1,
	"status": "available",
	"brand": "Chevrolet",
	"model": "Onyx",
	"year": 2020,
	"km": "20000",
	"color": "Blue",
	"chassis": "0101",
	"sale_price": 50000,
	"cost_price": 20000,
	"createdAt": "2022-04-24T14:37:55.878Z",
	"updatedAt": "2022-04-24T14:37:55.878Z"
}
```

- Na rota de reservas...

``` json
{
  "name": "cadastrar uma reserva",
  "method": "POST",
  "endpoint": "http://localhost:3000/reservations",
  "requestBody": {
    {
	    "userId": 1,
	    "vehicleId": 1
    }
  }
}
```

- Se tudo correr bem obtemos como resposta:

``` json
{
	"reservationDate": "2022-04-24T17:13:45.636Z",
	"id": 1,
	"userId": 1,
	"vehicleId": 1,
	"vehicleStatus": "reserved",
	"reservationValue": 1000
}
```

- Perceba que o veículo que reservamos agora possui status "reserved"


``` json
{
	"id": 1,
	"status": "reserved",
	"brand": "Chevrolet",
	"model": "Onyx",
	"year": 2020,
	"km": "20000",
	"color": "Blue",
	"chassis": "0101",
	"sale_price": 50000,
	"cost_price": 20000,
	"createdAt": "2022-04-24T14:37:55.878Z",
	"updatedAt": "2022-04-24T17:13:45.634Z"
}
```

- Agora vejamos na Lista de reservas, a reserva que acabamos de criar:

### Listando todas as reservas

``` json
{
  "name": "listar todas as reservas",
  "method": "GET",
  "endpoint": "http://localhost:3000/reservations",
  "responseBody": {
    [
      {
        "id": 1,
        "reservationDate": "24/04/2022",
        "vehicleStatus": "reserved",
        "reservationValue": 1000,
        "userId": 1,
        "vehicleId": 1
      }
    ]
  }
}
```

### Veja a reserva criada pelo nosso usuário 'aristóteles'

``` json
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
		"reservations": [
			{
				"id": 1,
				"reservationDate": "2022-04-24T17:13:45.636Z",
				"vehicleStatus": "reserved",
				"reservationValue": 1000,
				"userId": 1,
				"vehicleId": 1
			}
		]
	}
```

### Podemos também buscar reservas pelo seu id

``` bash
  http://localhost:3000/reservations/:id
```

## Cadastrando vendas
- Uma das partes mais importantes do sistema. 
- Um veículo marcado como 'available' pode ser vendido por qualquer user
- Um veículo marcado como 'reserved' só pode ser vendido por quem o reservou
- Caso um user reserve um veículo e este user venha a ser excluído(deletado), nessa condição um outro user poderá efetuar a venda do veículo reservado

### Faça o seguinte teste:

- autentique o user de name 'Charles chaplin'
- reserve, com este user, algum veículo marcado como available

``` json
{
  "name": "cadastrar uma reserva",
  "method": "POST",
  "endpoint": "http://localhost:3000/reservations",
  "requestBody": {
    {
	    "userId": 2,
	    "vehicleId": 2
    }
  },
  "responseBody": {
    {
      "reservationDate": "2022-04-24T17:31:55.419Z",
      "id": 2,
      "userId": 2,
      "vehicleId": 2,
      "vehicleStatus": "reserved",
      "reservationValue": 240
    }  
  }
}
```

- após isso, tente vender esse mesmo veículo, só que no corpo da requisição do endpoint de vendas, passe como 'userId' um outro user que não seja o 'chaplin' e obtenha o seguinte erro:

``` json
{
  "name": "cadastrar uma venda",
  "method": "POST",
  "endpoint": "http://localhost:3000/sales",
  "requestBody": {
    {
      "userId": 1,
      "vehicleId": 2
    }
  }
```

### Erro

``` bash
"apenas o usuário que o reservou poderá vender esse veículo"
```

- Para realizar a venda, só precisamos passar o userId do user que reservou o veículo, assim:

``` json
{
  "name": "cadastrar uma venda",
  "method": "POST",
  "endpoint": "http://localhost:3000/sales",
  "requestBody": {
    {
      "userId": 2,
      "vehicleId": 2
    }
  }
```

- E obtemos como resposta:

``` json
{
	"saleDate": "2022-04-24T17:38:59.262Z",
	"id": 1,
	"userId": 2,
	"vehicleId": 2,
	"vehicleStatus": "sold",
	"price": 12000
}
```
## Listando todas as vendas

- Procure no endpoint de listar todas as vendas:

``` json
{
  "name": "listar todas as vendas",
  "method": "GET",
  "endpoint": "http://localhost:3000/sales",
  "responseBody": {
    [
      {
        "id": 1,
        "saleDate": "24/04/2022",
        "vehicleStatus": "sold",
        "price": 12000,
        "userId": 2,
        "vehicleId": 2
      }
    ]
  }
}
```

### Podemos também buscar vendas pelo seu id

``` bash
  http://localhost:3000/sales/:id
```

## Veículos reservados e vendidos por um user

- Faça algum user realizar algumas vendas e reservas de veículos (se necessário cadastre alguns veículos) e após isso, pesquise o mesmo pelo id e obtenha como resposta:

``` json
{
  "name": "buscar usuário pelo id",
  "method": "GET",
  "endpoint": "http://localhost:3000/users/1",
  "responseBody": {
    [
      {
        "id": 1,
        "email": "aristoteles@email.com",
        "name": "Aristóteles Ferreira",
        "cpf": "11111",
        "biography": "Software Enginner",
        "value": 1000000,
        "avatar": null,
        "roleId": 1,
        "sales": [
          {
            "vehicleStatus": "sold",
            "vehicle": {
              "brand": "brand_test",
              "model": "model_test",
              "year": 2002,
              "km": "14000",
              "color": "white",
              "chassis": "0911",
              "sale_price": 19999
            }
          },
          {
            "vehicleStatus": "sold",
            "vehicle": {
              "brand": "brand_test",
              "model": "model_test",
              "year": 2002,
              "km": "14000",
              "color": "white",
              "chassis": "0912",
              "sale_price": 19999
            }
          },
          {
            "vehicleStatus": "sold",
            "vehicle": {
              "brand": "Chevrolet",
              "model": "Onyx",
              "year": 2020,
              "km": "20000",
              "color": "Blue",
              "chassis": "0101",
              "sale_price": 50000
            }
          }
        ],
        "reservations": [
          {
            "vehicleStatus": "reserved",
            "reservationValue": 399.98,
            "vehicle": {
              "brand": "brand_test",
              "model": "model_test",
              "year": 2002,
              "km": "14000",
              "color": "white",
              "chassis": "0909",
              "sale_price": 19999
            }
          },
          {
            "vehicleStatus": "reserved",
            "reservationValue": 399.98,
            "vehicle": {
              "brand": "brand_test",
              "model": "model_test",
              "year": 2002,
              "km": "14000",
              "color": "white",
              "chassis": "0910",
              "sale_price": 19999
            }
          }
        ]
      }
    ]
  }
}
```

### Perceba que os dados retornados condizem com a tela de listagem de veículos reservados e vendidos por um user

<img src="./auxiliares/listagem-vendidos-reservados.png">

### Neste ponto já temos veículos com todos os três status

- liste todos os veículos no endpoint
``` bash
http://localhost:3000/vehicles?page=1&limit=7
```

- Obtenha como resposta:

``` json
[
	{
		"id": 3,
		"status": "available",
		"brand": "Volkswagen",
		"model": "Gol",
		"year": 2016,
		"km": "13765",
		"color": "red",
		"chassis": "0303",
		"sale_price": 50000,
		"cost_price": 22000,
		"createdAt": "24/04/2022",
		"updatedAt": "24/04/2022"
	},
	{
		"id": 4,
		"status": "available",
		"brand": "brand_test",
		"model": "model_test",
		"year": 2002,
		"km": "14000",
		"color": "white",
		"chassis": "0908",
		"sale_price": 19999,
		"cost_price": 5000,
		"createdAt": "24/04/2022",
		"updatedAt": "24/04/2022"
	},
	{
		"id": 2,
		"status": "sold",
		"brand": "Fiat",
		"model": "Uno",
		"year": 2009,
		"km": "27500",
		"color": "white",
		"chassis": "0202",
		"sale_price": 12000,
		"cost_price": 5000,
		"createdAt": "24/04/2022",
		"updatedAt": "24/04/2022"
	},
	{
		"id": 5,
		"status": "reserved",
		"brand": "brand_test",
		"model": "model_test",
		"year": 2002,
		"km": "14000",
		"color": "white",
		"chassis": "0909",
		"sale_price": 19999,
		"cost_price": 5000,
		"createdAt": "24/04/2022",
		"updatedAt": "24/04/2022"
	},
	{
		"id": 6,
		"status": "reserved",
		"brand": "brand_test",
		"model": "model_test",
		"year": 2002,
		"km": "14000",
		"color": "white",
		"chassis": "0910",
		"sale_price": 19999,
		"cost_price": 5000,
		"createdAt": "24/04/2022",
		"updatedAt": "24/04/2022"
	},
	{
		"id": 7,
		"status": "sold",
		"brand": "brand_test",
		"model": "model_test",
		"year": 2002,
		"km": "14000",
		"color": "white",
		"chassis": "0911",
		"sale_price": 19999,
		"cost_price": 5000,
		"createdAt": "24/04/2022",
		"updatedAt": "24/04/2022"
	},
	{
		"id": 8,
		"status": "sold",
		"brand": "brand_test",
		"model": "model_test",
		"year": 2002,
		"km": "14000",
		"color": "white",
		"chassis": "0912",
		"sale_price": 19999,
		"cost_price": 5000,
		"createdAt": "24/04/2022",
		"updatedAt": "24/04/2022"
	}
]
```

### Perceba que os dados retornados condizem com a tela de listagem geral de veículos

<img src="./auxiliares/listagem-todos-os-veiculos.png">