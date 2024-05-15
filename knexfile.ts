import "dotenv/config";

import type { Knex } from "knex";
import path from "path";

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(
        process.cwd(),
        "src",
        "adapter",
        "infra",
        "pg",
        "migrations"
      ),
    },
  },
};

module.exports = config;
