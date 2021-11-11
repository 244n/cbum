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
console.log(server)
describe("", () => {
  let request1;
  let request2;
  beforeEach(() => {
    // Setup
    request1 = chai.request(server);
    request2 = chai.request(server);
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
    // TODO; fix `Error: Server is not listening`
    // describe("#create", () => {
    //   it("able to create muscle", async () => {
    //     // Exercise
    //     const muscle = {"musclename":"muscle1"}
    //     const res1 = await request1.post("/api/muscles").send(muscle);
    //     const res2 = await request1.get("/api/muscles").send(muscle);

    //     // Assert
    //     res1.should.have.status(201);
    //     res1.should.be.json;
    //     JSON.parse(res2.text).should.deep.equal(muscle);
    //   });
    // });
  });
});
