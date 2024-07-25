import type { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  await knex.schema.createTable('products', (table) => {
    table.string('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.string('category').notNullable()
    table.decimal('price').notNullable()
    table.text('description').notNullable()
    table.specificType('images', 'text[]').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('products')
}
