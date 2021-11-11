module.exports = (knex) => {
  return {
    muscles: require("./muscles")(knex),
    parts: require("./parts")(knex),
    menus: require("./menus")(knex),
  };
};
