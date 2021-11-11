const config = require("../config");
const knex = require("knex")(config.db);

const ignoreError = () => {
  // do nothing
};

const clearTable = (tableName) =>
  knex(tableName)
    .del()
    .catch(ignoreError);

const tables = ["muscles", "parts"];

Promise.all(tables.map(clearTable)).then(process.exit);

const resetSeq = async (kenx) => {
  await knex.raw("select setval('muscles_id_seq', 1)");
};
resetSeq(knex);