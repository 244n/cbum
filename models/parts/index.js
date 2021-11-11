module.exports = (knex) => {
  return {
    create: require("./create")(knex),
  };
};
