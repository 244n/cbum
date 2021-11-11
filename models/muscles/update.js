module.exports = (knex) => {
    return (params) => {
      const musclename = params.musclename;
  
      return knex("muscles")
        .where({ musclename: musclename.toLowerCase() })
        .select()
        .then((muscle) => {
          if (muscle.length) {
            return knex("muscles")
              .where({ musclename: musclename.toLowerCase() })
              .del()
              .catch((err) => {
                return Promise.reject(err);
              });
          } else {
            return Promise.reject(new Error("That muscle does not exists"));
          }
        });
    };
  };
  