module.exports = (knex) => {
  return {
    create: require("./create")(knex),
    get: require("./get")(knex),
    list: require("./list")(knex),
  };
};
