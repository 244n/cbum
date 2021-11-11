module.exports = (knex) => {
  return (params, patch) => {
    const { musclename } = params;
    return knex("muscles")
      .where({ musclename: musclename.toLowerCase() })
      .select()
      .then((muscle) => {
        if (muscle.length) {
          return knex("muscles")
            .where({ musclename: musclename.toLowerCase() })
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
