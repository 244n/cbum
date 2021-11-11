module.exports = (knex) => {
  return () => {
    return Promise.resolve(
      knex("parts")
        .select()
        .then((parts) => parts)
    );
  };
};
