module.exports = (knex) => {
  return (params) => {
    const { musclename, parts } = params;

    return knex("muscles")
      .insert({ musclename: musclename.toLowerCase(), parts })
      .then(() => {
        return knex("muscles")
          .where({ musclename: musclename.toLowerCase() })
          .select();
      })
      .then((muscles) => muscles.pop())
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        ) {
          return Promise.reject(new Error("That muscle already exists"));
        }

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
