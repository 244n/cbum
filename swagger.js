const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "cbum",
    description: " API Documentation for Muscle API",
  },
  host: "localhost:4000",
  basePath: "/",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./src/server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
