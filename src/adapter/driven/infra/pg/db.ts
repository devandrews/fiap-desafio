import knex from 'knex'

const {
  POSTGRES_HOST,
  POSTGRES_PORT = 5432,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} = process.env

const db = knex({
  client: 'postgresql',
  connection: {
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  }
})

export default db
