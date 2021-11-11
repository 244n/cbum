exports.up = function(knex) {
  // create the 'parts' table with three columns
  return knex.schema.createTable("parts", (t) => {
    t.integer("id", 3) // auto-incrementing id column
      .primary() // primary key
      .index(); // index this column

    t.string("name", 20) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it
  });
};

exports.down = function(knex) {
  // undo this migration by destroying the 'parts' table
  return knex.schema.dropTable("parts");
};
