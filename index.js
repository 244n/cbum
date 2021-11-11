const { setupServer } = require("./server");
const config = require("./config");

const server = setupServer();
server.listen(config.express.port, () => {
  console.log(`Server up and listening on port ${config.express.port}`);
});
