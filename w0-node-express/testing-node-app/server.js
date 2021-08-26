// File: server.js
// Created by: Max Manayan
// Assignment: mthree, Testing Node.js Application
// Date: August 26, 2021

// links

// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");

// constants
const PORT = 3000;

const nbaPlayers = [
  {
    _id: uuidv4(),
    testId: 1,
    name: "Lebron James",
    team: "Lakers",
    jerseyNum: 6,
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

// APIs and middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Testing Node.js Application</h1>");
});

// Create - POST
app.post("/players/player", (req, res, next) => {
  const newPlayerJSON = req.body;
  newPlayerJSON._id = uuidv4();
  nbaPlayers.push(newPlayerJSON);
  res.status(200).send(JSON.stringify(nbaPlayers, null, 2));
});

// Read - GET ALL
app.get("/players", (req, res, next) => {
  res.status(200).send(JSON.stringify(nbaPlayers, null, 2));
});

// Read - GET ONE
app.get("/players/player/:testId", (req, res, next) => {
  let playerId = Number(req.params.testId);
  nbaPlayers.forEach((p) => {
    if (p.testId === playerId) {
      res.status(200).send(JSON.stringify(p, null, 2));
    }
  });
});

// Read - GET query filter
app.get("/players/player", (req, res, next) => {
  let queryJerseyNum = Number(req.query.jerseyNum);
  let queryName = req.query.name;
  let queryTeam = req.query.team;

  const playerResArr = [];
  nbaPlayers.forEach((p) => {
    if (
      p.jerseyNum === queryJerseyNum ||
      p.name === queryName ||
      p.team === queryTeam
    ) {
      playerResArr.push(p);
    }
  });

  res.status(200).send(JSON.stringify(playerResArr, null, 2));
});

// Update - PUT

// Delete - DELETE

// error handles

// server start up
app.listen(PORT, () => {
  console.log(`Testing Node.js App listening at http://localhost:${PORT}`);
});
