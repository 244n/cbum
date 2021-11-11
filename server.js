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
      .then((muscle) => res.status(201).json(muscle));
  });

  return app;
};

module.exports = { setupServer };
