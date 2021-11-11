// Update with your config settings.
const config = require("../config");

module.exports = {
  client: "postgresql",
  connection: config.db.connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
};
