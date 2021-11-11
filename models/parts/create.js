module.exports = (knex) => {
  return (params) => {
    const { id, partname } = params;

    return knex("parts")
      .insert({ id, partname: partname.toLowerCase() })
      .then(() => {
        return knex("parts")
          .where({ partname: partname.toLowerCase() })
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
