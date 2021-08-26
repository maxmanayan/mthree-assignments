// File: server.js
// Created by: Max Manayan
// Assignment: mthree, Testing Node.js Application
// Date: August 26, 2021

// links

// imports
const express = require("express");
const app = express();
const morgan = require("morgan");

// constants
const PORT = 3000;

const nbaPlayers = [
  {
    _id: "uuid",
    testId: 1,
    name: "Lebron James",
    team: "Lakers",
    jerseyNum: 6,
  },
  {
    _id: "uuid",
    testId: 2,
    name: "Kevin Durant",
    team: "Nets",
    jerseyNum: 7,
  },
  {
    _id: "uuid",
    testId: 3,
    name: "Giannis Antetokounmpo",
    team: "Bucks",
    jerseyNum: 34,
  },
  {
    _id: "uuid",
    testId: 4,
    name: "Russell Westbrook",
    team: "Lakers",
    jerseyNum: 0,
  },
  {
    _id: "uuid",
    testId: 5,
    name: "Damian Lillard",
    team: "Trail Blazers",
    jerseyNum: 0,
  },
];

// APIs and middleware
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.status(200).send("Testing Node.js App");
});

// error handles

// server start up
app.listen(PORT, () => {
  console.log(`Testing Node.js App listening at http://localhost:${PORT}`);
});
