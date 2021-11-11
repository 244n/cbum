module.exports = (knex) => {
  return (params) => {
    const { id, name } = params;

    return knex("parts")
      .insert({ id, name: name.toLowerCase() })
      .then(() => {
        return knex("parts")
          .where({ name: name.toLowerCase() })
          .select();
      })
      .then((parts) => parts.pop())
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        ) {
          return Promise.reject(new Error("That part already exists"));
        }

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
