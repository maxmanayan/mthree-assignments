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
