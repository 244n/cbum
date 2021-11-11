// devendencies
const config = require("../../config");
const knex = require("knex")(config.db);
const models = require("../../models")(knex);

// express router
const express = require("express");
const app = express.Router();

app.post("/", (req, res) => {
  models.parts
    .create(req.body)
    .then((part) => res.status(201).json(part))
    .catch((err) => {
      if (err.message === "That part already exists") {
        return models.parts
          .get(req.body)
          .then((part) => res.status(409).json(part));
      }
      return res.status(400).send(err.message);
    });
});

app.get("/", (req, res) => {
  models.parts
    .list()
    .then((parts) => res.status(200).json(parts))
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

module.exports = app;
