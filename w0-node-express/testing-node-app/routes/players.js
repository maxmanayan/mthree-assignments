// File: /routes/players.js
// Created by: Max Manayan
// Assignment: mthree, Testing Node.js Application
// Date: August 26, 2021

// links
// Express docs - [ https://expressjs.com/en/api.html#router ]
// Example Repo w/ Chai and Mocha - [ https://github.com/mohamedlotfe/unit-testing-api-nodejs/tree/master ]

// imports
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

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

// routes
// Create - POST
router.post("/players/player", (req, res, next) => {
  const newPlayer = req.body;
  newPlayer._id = uuidv4();
  nbaPlayers.push(newPlayer);
  res.status(200).send(newPlayer);
});

// Read - GET ALL
router.get("/players", (req, res, next) => {
  res.status(200).send(nbaPlayers);
});

// Read - GET ONE
router.get("/players/player/:testId", (req, res, next) => {
  let playerId = Number(req.params.testId);
  let error = true;
  nbaPlayers.forEach((p) => {
    if (p.testId === playerId) {
      error = false;
      res.status(200).send(p);
    }
  });
  if (res.status(400)) res.send("Player Not Available");
});

// Read - GET query filter
router.get("/players/player", (req, res, next) => {
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

  res.status(200).send(playerResArr);
});

// Update - PUT
router.put("/players/player/:testId", (req, res, next) => {
  nbaPlayers.forEach((p) => {
    if (p.testId === Number(req.params.testId)) {
      p.name = req.body.name;
      p.team = req.body.team;
      p.jerseyNum = req.body.jerseyNum;
      res.status(200).send(p);
    }
  });
});

// Delete - DELETE
router.delete("/players/player/:testId", (req, res, next) => {
  nbaPlayers.map((p, i) => {
    if (p.testId === Number(req.params.testId)) {
      nbaPlayers.splice(i, 1);
      res.status(200).send(p);
    }
  });
});

module.exports = router;
