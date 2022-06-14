# Microservice com NodeJs

### Requisitos
- docker - v20.10
- docker-compose - v2.6.0


### Iniciando o projeto
- Renomeie o arquite `.env.exemple` para `.env` na raiz do projeto e adicione os valores para as variaveis de ambiente;
  - obs: pode colocar qualquer valor nas variáveis, uma vez que o docker-compose usará esse valores para adicionar nos containers;
- abra um terminal/cmd na raiz do projeto e execute o comando `docker-compose up -d`;
- aguarde a inicialização dos containers;
- acesse o container da api de employee utilizando o comando `docker exec api_employee bash -c "npm run db:create && npm start"`;
- acesse o container da api de enterprise utilizando o comando `docker exec api_enterprise bash -c "npm run db:create && npm start"`;
- Caso alguma apresente erro, aguarde alguns instantes (os serviços só inicializam quando as filas do rabbitMQ são criadas);
- Utilize o arquivo `Microserviços.postman_collection` no postman para vizualizar as rotas da aplicação.

### Dúvidas
- Basta entrar em contato comigo 😄

