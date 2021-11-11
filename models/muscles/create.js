module.exports = (knex) => {
  return (params) => {
    const musclename = params.musclename;

    
    return knex("muscles")
      .insert({ musclename: musclename.toLowerCase() })
      .then(() => {
        return knex("muscles")
          .where({ musclename: musclename.toLowerCase() })
          .select();
      })
      .then((muscles) => muscles.pop())
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
