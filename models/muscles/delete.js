module.exports = (knex) => {
  return (params) => {
    const name = params.name;

    return knex("muscles")
      .where({ name: name.toLowerCase() })
      .select()
      .then((muscle) => {
        if (muscle.length) {
          return knex("muscles")
            .where({ name: name.toLowerCase() })
            .del()
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        return Promise.reject(new Error("That muscle does not exists"));
      });
  };
};
