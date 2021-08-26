// File: /test/serverTest.js
// Created by: Max Manayan
// Assignment: mthree, Testing Node.js Application
// Date: August 26, 2021

// links
// Mocha (test runner) docs = [ https://mochajs.org/#getting-started ]
// Chai (assertion library) docs = [ https://www.chaijs.com/ ]
// Setup Testing YT Tutorial - [ https://www.youtube.com/watch?v=MLTRHc5dk6s ]
// Testing REST Api Blog - [ https://dev.to/mhmdlotfy96/testing-a-rest-api-in-node-js-with-express-using-mocha-and-chai-1258 ]

// By default, Mocha will look for a folder called 'test'
// imports
const chai = require("chai");
const server = require("../server");
const { v4: uuidv4 } = require("uuid");

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

// REST API tests
describe("REST APIs", () => {
  describe("GET endpoints", () => {
    it("It should get whole sample data", (done) => {
      chai
        .request(server)
        .get("/players")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
