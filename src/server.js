// Express Server
const express = require("express");
const app = express();

// router
const partsRouter = require("./routers/parts");
const musclesRouter = require("./routers/muscles");
const menusRouter = require("./routers/menus");

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");

const setupServer = () => {
  // Midleware
  app.use(express.json());
  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  // router
  app.use("/api/parts", partsRouter);
  app.use("/api/muscles", musclesRouter);
  app.use("/api/menus", menusRouter);

  return app;
};

module.exports = { setupServer };
