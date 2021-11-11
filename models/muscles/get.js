module.exports = (knex) => {
  return (params) => {
    const name = params.name;

    return knex("muscles")
      .where({ name: name.toLowerCase() })
      .select()
      .then((users) => {
        if (users.length) {
          return users.pop();
        }
        throw new Error(`Error finding muscle ${name}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
