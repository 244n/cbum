module.exports = (knex) => {
  return (params) => {
    const musclename = params.musclename;

    return knex("muscles")
      .where({ musclename: musclename.toLowerCase() })
      .del()
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
