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

// const clearSequence = (tableName) =>
//   knex(tableName)
//     .select( setval(0) )
//     .catch(ignoreError);

// const tables2 = ["muscles_id_seq", "parts_id_seq"];

// Promise.all(tables2.map(clearSequence)).then(process.exit);
