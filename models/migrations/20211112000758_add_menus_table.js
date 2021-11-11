exports.up = function(knex) {
  // create the 'menus' table with three columns
  return knex.schema.createTable("menus", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("name", 20)
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    t.integer("sets", 3).notNullable(); // add a not-null constraint to this column

    t.integer("reps", 3).notNullable(); // add a not-null constraint to this column

    t.integer("muscle_id", 2)
      .notNullable() // add a not-null constraint to this column
      .references("id") // add foreign constraint
      .inTable("muscles");
  });
};

exports.down = function(knex) {
  // undo this migration by destroying the 'menus' table
  return knex.schema.dropTable("menus");
};
