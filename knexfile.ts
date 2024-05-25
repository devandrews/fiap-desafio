import "dotenv/config";

import type { Knex } from "knex";
import path from "path";

const {
  POSTGRES_HOST,
  POSTGRES_PORT = 5432,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export const config: { [key: string]: Knex.Config } = {
  default: {
    client: "postgresql",
    connection: {
      host: POSTGRES_HOST,
      port: +POSTGRES_PORT,
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
        "driven",
        "infra",
        "pg",
        "migrations"
      ),
    },
  },
};

module.exports = config;
