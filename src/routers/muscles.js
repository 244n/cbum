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
          .get({ musclename: req.body.musclename })
          .then((muscle) => res.status(200).json(muscle));
      }
      return res.status(400).send(err.message);
    });
});

app.get("/:musclename", (req, res) => {
  const { musclename } = req.params;
  models.muscles
    .get({ musclename })
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

app.delete("/:musclename", (req, res) => {
  const { musclename } = req.params;
  models.muscles
    .delete({ musclename })
    .then(() => res.status(204).end())
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

app.patch("/:musclename", (req, res) => {
  const { musclename } = req.params;
  const patch = req.body;
  models.muscles
    .update({ musclename }, patch)
    .then(() => res.status(204).end())
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

module.exports = app;
