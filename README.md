# Sistema de Delivery - FIAP (Tech Challenge)

Esse projeto visa disponibilizar um sistema de controle de pedidos para uma lanchonete. Inicialmente o projeto conterá apenas o backend(API) sem feedback visual, ou seja, o backend é acessível através de ferramentas como cURL, Insomnia e Postman, porém não terá uma interface visual para o usuário neste momento.

## Pré-requisitos

#### É necessário possuir Git instalado em sua máquina.

Saiba mais: https://git-scm.com/downloads

#### É necessário possuir Docker e Docker Compose instalados em sua máquina.

Saiba mais: https://docs.docker.com/get-docker/

#### É necessário possuir Node instalado em sua máquina.

Saiba mais: https://nodejs.org/en/download/package-manager

Nota: Você também pode instalar o Node utilizando NVM.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env, as mesmas são vitais para o funcionamento da aplicação.

Variáveis para o banco de dados:

`POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`

Variáveis para o servidor HTTP:

`APP_PORT`

É possível encontrar exemplos dessas variáveis no arquivo `.env.sample`. Valores para essas variáveis também serão disponibilizados na entrega da atividade em um arquivo `.env` para facilitar o setup.

## Rodando localmente

- **NOTA: Todos os passos são vitais para o funcionamento da aplicação, não pule nenhum.**

- Clone o projeto

```bash
  git clone https://github.com/devandrews/fiap-desafio.git
```

- Entre no diretório do projeto

```bash
  cd fiap-desafio
```

- Instale as dependências

```bash
  npm install
```

- Copie o arquivo `.env` disponibilizado na entrega da atividade. Ou se preferir, copie e cole o arquivo `.env.sample` e renomeie para `.env`.

- Inicie o servidor e a database utilizando Docker Compose

```bash
  docker compose up --build
```

## Rodando com Kubernetes (Local)

- Certifique-se de ter Docker Desktop com Kubernetes instalado, ou minikube. O passo-a-passo será elaborado baseando-se em um ambiente com Docker Desktop + Kubernetes.

- Certifique-se de seguir os passos anteriores e ter na raiz do diretório o arquivo .env atualizado.

- Rode o seguinte comando para criar um arquivo de secrets que será utilizado na aplicação k8s:

```bash
  kubectl create secret generic api-secrets --from-env-file=.env
```

- Após isso podemos aplicar todos os nossos arquivo yaml de uma só vez rodando o seguinte comando(atenção: pode demorar alguns minutos para o k8s terminar de preparar a aplicação):

```bash
  kubectl apply -f k8s
```

## Documentação

Você pode acessar a documentação dos endpoints em: http://localhost:3000/docs logo após rodar sua aplicação com Docker Compose, descrito nos passos anteriores.

## Diagramação

![alt text](diagram.png)
![alt text](diagram-k8s.png)

## Funcionalidades

- Endpoints para criação e visualização de `Usuários`.
- Endpoints para criação, atualização, remoção e visualização de `Produtos`.
- Endpoints para criação atualização, e visualização de `Pedidos`.

## Stack utilizada

**Back-end:** Typescript, Node, Express, Postgres, Knex, Openapi e Zod.

## Autor

- Andrews Patrick Arnhold Scherer - [@devandrews](https://www.github.com/devandrews)

## Vídeos (etapa 02)

- https://www.youtube.com/watch?v=Btv5d2MxxBk
- https://www.youtube.com/watch?v=ijVEVbPBOdI
