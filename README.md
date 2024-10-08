# Projeto Laravel 11

- :movie_camera: [Video demonstrativo](https://youtu.be/RAJ797r1o2I).


# Objetivos

# Regras para o usuário

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter o resumo da sua conta;
- [x] O usuário deve poder listar todas das transações que já ocorreram;;
- [x] O usuário deve poder visualizar uma transação única;

# Regras para a aplicação 

- [x] A transação pode ser do tipo crédito que somará o valor total ou débito que subtrairá;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar transações o qual ele criou.


## Passo a passo para rodar o projeto
Clone o projeto

```sh
cd api-rest-nodejs/
```


Rode a diretiva de desenvolvimento
```sh
npm run dev
```

Realize as operações utilizando um gerenciador de requisições (Hoppscotch, Insominio, Postman ou similares)

# Operações:

## Realizar uma transação
Post: 
  http://localhost:3333/transactions
Corpo: 
  {
    "title": "Nome da operação",
      "amount": valor,
      "type": "credit ou debit"
  }

## Ver lista de transações realizadas
Get:
  http://localhost:3333/transactions

## Verificar transação especifica
Get:
  http://localhost:3333/transactions/id-da-transação

## Resumo (total acumulado das transações)
Get:
  http://localhost:3333/transactions/summary
