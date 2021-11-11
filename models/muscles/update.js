module.exports = (knex) => {
  return (params, patch) => {
    const { name } = params;
    return knex("muscles")
      .where({ name: name.toLowerCase() })
      .select()
      .then((muscle) => {
        if (muscle.length) {
          return knex("muscles")
            .where({ name: name.toLowerCase() })
            .update(patch)
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        return Promise.reject(new Error("That muscle does not exists"));
      })
      .catch();
  };
};
