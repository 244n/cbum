module.exports = (knex) => {
  return (params) => {
    const musclename = params.musclename;

    return knex("muscles")
      .where({ musclename: musclename.toLowerCase() })
      .select()
      .then((users) => {
        if (users.length) {
          return users.pop();
        }
        throw new Error(`Error finding muscle ${musclename}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
