import type { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  await knex.schema.createTable('users', (table) => {
    table.string('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.string('cpf').notNullable().unique()
    table.string('email').notNullable().unique()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
