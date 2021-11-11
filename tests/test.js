// chai
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

// devendencies
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);
const { setupServer } = require("../server");

// test
const server = setupServer();
describe("", () => {
  let request;
  beforeEach(() => {
    // Setup
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {
    // Teardown
    request.close();
  });

  describe("muscles", () => {
    describe("setup", () => {
      it("able to connect to database", () =>
        knex
          .raw("select 1+1 as result")
          .catch(() => assert.fail("unable to connect to db")));

      it("has run the initial migrations", () =>
        knex("muscles")
          .select()
          .catch(() => assert.fail("muscles table is not found.")));
    });

    describe("#create", () => {
      it("able to create muscle", async () => {
        // Exercise
        const muscle = { musclename: "muscle1", parts: 1 };
        const res1 = await request.post("/api/muscles").send(muscle);
        const res2 = await request.get("/api/muscles/" + muscle.musclename);

        // Assert
        res1.should.have.status(201);
        JSON.parse(res2.text).musclename.should.equal(muscle.musclename);
      });
    });

    describe("#update", () => {
      it("able to update muscle", async () => {
        // Exercise
        const patch = { parts: 3 };
        const res1 = await request.update("/api/muscles/muscle1").send(patch);
        const res2 = await request.get("/api/muscles/muscle1");

        // Assert
        res1.should.have.status(204);
        JSON.parse(res2.text).parts.should.equal(patch.parts);
      });
    });

    describe("#delete", () => {
      it("able to delete muscle", async () => {
        // Exercise
        const res1 = await request.delete("/api/muscles/muscle1");
        const res2 = await request.get("/api/muscles/muscle1");

        // Assert
        res1.should.have.status(204);
        res2.text.should.equal("Error finding muscle muscle1");
      });
    });
  });
});
