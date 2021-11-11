// devendencies
const config = require("../../config");
const knex = require("knex")(config.db);
const models = require("../../models")(knex);

// express router
const express = require("express");
const app = express.Router();

app.post("/", (req, res) => {
  models.muscles
    .create(req.body)
    .then((muscle) => res.status(201).json(muscle))
    .catch((err) => {
      if (err.message === "That muscle already exists") {
        return models.muscles
          .get({ name: req.body.name })
          .then((muscle) => res.status(200).json(muscle));
      }
      return res.status(400).send(err.message);
    });
});

app.get("/:name", (req, res) => {
  const { name } = req.params;
  models.muscles
    .get({ name })
    .then((muscle) => res.status(200).json(muscle))
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

app.get("/", (req, res) => {
  models.muscles
    .list()
    .then((muscles) => res.status(200).json(muscles))
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

app.delete("/:name", (req, res) => {
  const { name } = req.params;
  models.muscles
    .delete({ name })
    .then(() => res.status(204).end())
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

app.patch("/:name", (req, res) => {
  const { name } = req.params;
  const patch = req.body;
  models.muscles
    .update({ name }, patch)
    .then(() => res.status(204).end())
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

module.exports = app;
