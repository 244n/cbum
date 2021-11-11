module.exports = (knex) => {
  return () => {
    return Promise.resolve(
      knex("muscles")
        .select()
        .then((muscles) => muscles)
    );
  };
};
