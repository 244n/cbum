// chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const deepEqualInAnyOrder = require("deep-equal-in-any-order");
chai.use(chaiHttp);
chai.use(deepEqualInAnyOrder);
chai.should();

// devendencies
const config = require("../config");
const knex = require("knex")(config.db);
const { setupServer } = require("../src/server");
const data = require("../data");

// test
const server = setupServer();
describe("API Test", () => {
  let request;

  before(() => {
    request = chai.request(server).keepOpen();
    // pre-set parts
    const createPart = async (part) => await request.post("/api/parts").send(part);
    Promise.all(data.parts.map(createPart));
    // pre-set muscles
    const createMuscle = async (muscle) => await request.post("/api/muscles").send(muscle);
    Promise.all(data.muscles.map(createMuscle));
  });

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
          .catch(() => chai.assert.fail("unable to connect to db")));

      it("has run the initial migrations", () =>
        knex("parts")
          .select()
          .catch(() => chai.assert.fail("parts table is not found.")));

      it("has run the second migrations", () =>
        knex("muscles")
          .select()
          .catch(() => chai.assert.fail("muscles table is not found.")));
    });

    describe("#create", () => {
      it("able to create muscle", async () => {
        // Exercise
        const muscle = { name: "muscle1", part_id: 1 };
        const res1 = await request.post("/api/muscles").send(muscle);
        const res2 = await request.get(`/api/muscles/${muscle.name}`);

        // Assert
        res1.should.have.status(201);
        JSON.parse(res2.text).name.should.equal(muscle.name);
      });
    });

    describe("#update", () => {
      it("able to update muscle", async () => {
        // Exercise
        const patch = { part_id: 3 };
        const res1 = await request.patch("/api/muscles/muscle1").send(patch);
        const res2 = await request.get("/api/muscles/muscle1");

        // Assert
        res1.should.have.status(204);
        JSON.parse(res2.text).part_id.should.equal(patch.part_id);
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

    describe("#list", () => {
      it("able to list muscles", async () => {
        // Exercise
        const res1 = await request.get("/api/muscles");

        // Assert
        res1.should.have.status(200);
      });
    });
  });

  describe("parts", () => {
    describe("#list", () => {
      it("able to list parts", async () => {
        // Exercise
        const res1 = await request.get("/api/parts");

        // Assert
        res1.should.have.status(200);
        JSON.parse(res1.text).should.deep.equalInAnyOrder(data.parts);
      });
    });
  });

  //TODO getを実装したあとで実装する
  // describe("menus", () => {
  //   describe("#create", () => {
  //     it("able to create menus", async () => {
  //       // Exercise
  //       const menu = { menuname: "benchpress",  muscleid : 1};
  //       const res1 = await request.post("/api/menus").send(menu);
  //       const res2 = await request.get(`/api/menus/${menu.menuname}`);

  //       // Assert
  //       res1.should.have.status(201);
  //       JSON.parse(res2.text).menuname.should.equal(menu.menuname);
  //     });
  //   });
  // });
});
