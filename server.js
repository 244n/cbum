// devendencies
const config = require("./config");
const knex = require("knex")(config.db);

// Express Server
const express = require("express");
const models = require("./models")(knex);
const app = express();

const setupServer = () => {
  // Midleware
  app.use(express.json({ type: "application/json", limit: "50mb" }));

  // API
  app.post("/api/muscles", (req, res) => {
    models.muscles
      .create({ musclename: req.body.musclename })
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

  app.get("/api/muscles/:musclename", (req, res) => {
    const { musclename } = req.params;
    models.muscles
      .get({ musclename: musclename })
      .then((muscle) => res.status(200).json(muscle))
      .catch((err) => {
        return res.status(400).send(err.message);
      });
  });

  app.get("/api/muscles", (req, res) => {
    models.muscles
      .list()
      .then((muscles) => res.status(200).json(muscles))
      .catch((err) => {
        return res.status(400).send(err.message);
      });
  });

  app.delete("/api/muscles/:musclename", (req, res) => {
    const {musclename} = req.params
    models.muscles
      .delete({ musclename: musclename })
      .then(() => res.status(204).end())
      .catch((err) => {
        return res.status(400).send(err.message);
      });
  });

  return app;
};

module.exports = { setupServer };
