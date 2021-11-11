module.exports = (knex) => {
  return {
    muscles: require("./muscles")(knex),
  };
};
