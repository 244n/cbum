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
        const muscle = { musclename: "muscle1" };
        const res1 = await request.post("/api/muscles").send(muscle);
        const res2 = await request.get("/api/muscles").send(muscle);

        // Assert
        res1.should.have.status(201);
        res1.should.be.json;
        JSON.parse(res2.text).musclename.should.equal(muscle.musclename);
      });
    });
  });
});
