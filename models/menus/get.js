module.exports = (knex) => {
  return (params) => {
    const name = params.name;

    return knex("menus")
      .where({ name: name.toLowerCase() })
      .select()
      .then((menus) => {
        if (menus.length) {
          return menus.pop();
        }
        throw new Error(`Error finding get ${name}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
