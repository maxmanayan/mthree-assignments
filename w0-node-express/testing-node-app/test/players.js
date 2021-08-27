// File: /test/players.js
// Created by: Max Manayan
// Assignment: mthree, Testing Node.js Application
// Date: August 26, 2021

// links
// Mocha (test runner) docs = [ https://mochajs.org/#getting-started ]
// Chai (assertion library) docs = [ https://www.chaijs.com/ ]
// Chai HTTP docs - [ https://www.chaijs.com/plugins/chai-http/ ]
// Setup Testing YT Tutorial - [ https://www.youtube.com/watch?v=MLTRHc5dk6s ]
// Testing REST Api Blog - [ https://dev.to/mhmdlotfy96/testing-a-rest-api-in-node-js-with-express-using-mocha-and-chai-1258 ]

// SO links
// app.address error - [ https://stackoverflow.com/questions/33986863/mocha-api-testing-getting-typeerror-app-address-is-not-a-function ]

// By default, Mocha will look for a folder called 'test'
// imports
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const { v4: uuidv4 } = require("uuid");

// middleware
chai.should(); // sets up all test as default should assertions
chai.use(chaiHttp);

// REST API tests
describe("REST APIs", () => {
  describe("GET ALL endpoint", () => {
    it("Should return whole array of player objects", (done) => {
      chai
        .request(server)
        .get("/api/players")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eq(0);
          // res.body.should.equal(nbaPlayers); // would work by uuid changes
          done();
        });
    });

    it("If the page is not found", (done) => {
      chai
        .request(server)
        .get("/api/player")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("GET ONE endpoint", () => {
    it("It should get one player object by id", (done) => {
      const playerId = 1;
      chai
        .request(server)
        .get(`/api/players/player/${playerId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("testId");
          res.body.should.have.property("name");
          res.body.should.have.property("team");
          res.body.should.have.property("jerseyNum");
          res.body.should.have.property("testId").eq(playerId);
          done();
        });
    });

    it("If player object is not specified", (done) => {
      chai
        .request(server)
        .get("/api/players/player/")
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it("If player object is not in DB", (done) => {
      const playerId = 1124132512351235;
      chai
        .request(server)
        .get(`/api/players/player/${playerId}`)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe("GET query filter endpoint", () => {
    it("Should return array of player objects that match queries", (done) => {
      const name = "Kevin Durant";
      const team = "Lakers";
      const jerseyNum = 0;
      chai
        .request(server)
        .get(
          `/api/players/player?name=${name}&team=${team}&jerseyNum=${jerseyNum}`
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eq(0);
          done();
        });
    });

    it("If player query is not specified", (done) => {
      chai
        .request(server)
        .get("/api/players/player?")
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe("POST endpoint", () => {
    it("Should return an object with all properties", (done) => {
      const player = {
        _id: uuidv4(),
        testId: 1,
        name: "Lebron James",
        team: "Lakers",
        jerseyNum: 23,
      };
      chai
        .request(server)
        .post("/api/players/player/")
        .send(player)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("testId").eq(1);
          res.body.should.have.property("name").eq("Lebron James");
          res.body.should.have.property("team").eq("Lakers");
          res.body.should.have.property("jerseyNum").eq(23);
          done();
        });
    });

    // negative
    // have no validation on api
  });

  describe("PUT endpoint", () => {
    it("Should return an object with all properties", (done) => {
      const playerId = 1;
      const updatedPlayer = {
        name: "King James",
        team: "Heat",
        jerseyNum: 6,
      };
      chai
        .request(server)
        .put(`/api/players/player/${playerId}`)
        .send(updatedPlayer)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eq("King James");
          res.body.should.have.property("team").eq("Heat");
          res.body.should.have.property("jerseyNum").eq(6);
          done();
        });
    });

    it("If no player ID is selected", (done) => {
      const playerId = undefined;
      const updatedPlayer = {
        name: "King James",
        team: "Heat",
        jerseyNum: 6,
      };
      chai
        .request(server)
        .put(`/api/players/player/${playerId}`)
        .send(updatedPlayer)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it("If player is not in DB", (done) => {
      const playerId = 12351243512341523;
      const updatedPlayer = {
        name: "King James",
        team: "Heat",
        jerseyNum: 6,
      };
      chai
        .request(server)
        .put(`/api/players/player/${playerId}`)
        .send(updatedPlayer)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });

    describe("DELETE endpoint", () => {
      it("It should return deleted player object", (done) => {
        const playerId = 3;
        chai
          .request(server)
          .delete(`/api/players/player/${playerId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("_id");
            res.body.should.have.property("testId").eq(3);
            res.body.should.have.property("name").eq("Giannis Antetokounmpo");
            res.body.should.have.property("team").eq("Bucks");
            res.body.should.have.property("jerseyNum").eq(34);
            done();
          });
      });

      it("If there is no player ID", (done) => {
        const playerId = undefined;
        chai
          .request(server)
          .delete(`/api/players/player/${playerId}`)
          .end((err, res) => {
            res.should.have.status(500);
            done();
          });
      });

      it("If the player is not in the DB", (done) => {
        const playerId = 12353462365;
        chai
          .request(server)
          .delete(`/api/players/player/${playerId}`)
          .end((err, res) => {
            res.should.have.status(500);
            done();
          });
      });
    });
  });
});
