module.exports = (knex) => {
  return {
    create: require("./create")(knex),
    list: require("./list")(knex),
    get: require("./get")(knex),
  };
};
