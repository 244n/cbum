module.exports = (knex) => {
  return (params) => {
    const { name, sets, reps, muscle_id } = params;

    return knex("menus")
      .insert({
        name: name.toLowerCase(),
        sets,
        reps,
        muscle_id,
      })
      .then(() => {
        return knex("menus")
          .where({ name: name.toLowerCase() })
          .select();
      })
      .then((menus) => menus.pop())
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        ) {
          return Promise.reject(new Error("That menu already exists"));
        }

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
