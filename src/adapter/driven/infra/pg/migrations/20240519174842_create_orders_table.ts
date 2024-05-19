import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTable("orders", (table) => {
    table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("status").notNullable();
    table.decimal("total").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("order_items", (table) => {
    table.string("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("order_id").notNullable();
    table.string("product_id").notNullable();
    table.integer("quantity").notNullable();
    table.decimal("price").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.foreign("order_id").references("orders.id");
    table.foreign("product_id").references("products.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("order_items");
  await knex.schema.dropTable("orders");
}
