module.exports = (knex) => {
  return () => {
    return Promise.resolve(
      knex("menus")
        .select()
        .then((menus) => menus)
    );
  };
};
