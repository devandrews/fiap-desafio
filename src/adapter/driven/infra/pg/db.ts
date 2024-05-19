import knex from "knex";

const db = knex(require("../../../../knexfile")["development"]);

export default db;
