exports.up = function(knex) {
  // create the 'muscles' table with three columns
  return knex.schema.createTable("muscles", (t) => {
    t.integer("id", 3) // auto-incrementing id column
      .primary() // primary key
      .index(); // index this column

    t.string("name", 20) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    t.integer("part_id", 2) // maximum length of 15 characters
      .notNullable() // add a not-null constraint to this column
      .references("id") // add foreign constraint
      .inTable("parts");
  });
};

exports.down = function(knex) {
  // undo this migration by destroying the 'muscles' table
  return knex.schema.dropTable("muscles");
};
