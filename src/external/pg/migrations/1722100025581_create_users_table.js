exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", notNull: true, unique: true },
    cpf: { type: "varchar(11)", notNull: true, unique: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    updated_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    deleted_at: { type: "timestamp" },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
