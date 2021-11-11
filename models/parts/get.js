module.exports = (knex) => {
  return (params) => {
    const name = params.name;

    return knex("parts")
      .where({ name: name.toLowerCase() })
      .select()
      .then((menus) => {
        if (menus.length) {
          return menus.pop();
        }
        throw new Error(`Error finding menu ${name}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
