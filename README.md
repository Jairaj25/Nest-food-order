## Description

Back-End System for Food Order Website. CRUD APIs for Food Lists, User's Orders, User's Carts

## Installation

install Docker and pgAdmin.

Run below code to initiate docker container

```bash
$ docker run --name Nest-Postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```
Setup Database in pgAdmin with below details:

host: 'localhost',
port: 5432,
username: 'postgres',
password: 'postgres',
database: 'Food-order-management',


Install nest dependecies
```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
