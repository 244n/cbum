// devendencies
const config = require("../../config");
const knex = require("knex")(config.db);
const models = require("../../models")(knex);

// express router
const express = require("express");
const app = express.Router();

app.post("/", (req, res) => {
  models.menus
    .create(req.body)
    .then((menu) => res.status(201).json(menu))
    .catch((err) => {
      if (err.message === "That menu already exists") {
        return res.status(400).send(err.message);
      }
      return res.status(400).send(err.message);
    });
});

app.get("/", (req, res) => {
  models.menus
    .list()
    .then((menus) => res.status(200).json(menus))
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

app.get("/:name", (req, res) => {
  const { name } = req.params;
  models.menus
    .get({ name })
    .then((menu) => res.status(200).json(menu))
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

module.exports = app;
