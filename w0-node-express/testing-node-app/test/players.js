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
const { expect } = require("chai");
const { v4: uuidv4 } = require("uuid");
const { response } = require("express");

// constants
const nbaPlayers = [
  {
    _id: uuidv4(),
    testId: 1,
    name: "Lebron James",
    team: "Lakers",
    jerseyNum: 23,
  },
  {
    _id: uuidv4(),
    testId: 2,
    name: "Kevin Durant",
    team: "Nets",
    jerseyNum: 7,
  },
  {
    _id: uuidv4(),
    testId: 3,
    name: "Giannis Antetokounmpo",
    team: "Bucks",
    jerseyNum: 34,
  },
  {
    _id: uuidv4(),
    testId: 4,
    name: "Russell Westbrook",
    team: "Lakers",
    jerseyNum: 0,
  },
  {
    _id: uuidv4(),
    testId: 5,
    name: "Damian Lillard",
    team: "Trail Blazers",
    jerseyNum: 0,
  },
];

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
});
