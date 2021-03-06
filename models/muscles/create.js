module.exports = (knex) => {
  return (params) => {
    const { id, name, part_id } = params;

    return knex("muscles")
      .insert({ id, name: params.name.toLowerCase(), part_id })
      .then(() => {
        return knex("muscles")
          .where({ name: name.toLowerCase() })
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
