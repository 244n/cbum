// Express Server
const express = require("express");
const app = express();

// router
const partsRouter = require("./routers/parts");
const musclesRouter = require("./routers/muscles");

const setupServer = () => {
  // Midleware
  app.use(express.json());

  // router
  app.use("/api/parts", partsRouter);
  app.use("/api/muscles", musclesRouter);

  return app;
};

module.exports = { setupServer };
