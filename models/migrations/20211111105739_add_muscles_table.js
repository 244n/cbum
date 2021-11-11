
exports.up = function(knex, Promise) {
  // create the 'muscles' table with three columns
  return knex.schema.createTable("muscles", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("musclename", 20) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'muscles' table
  return knex.schema.dropTable("muscles");
};
