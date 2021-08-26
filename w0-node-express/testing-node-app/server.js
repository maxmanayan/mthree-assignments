// File: server.js
// Created by: Max Manayan
// Assignment: mthree, Testing Node.js Application
// Date: August 26, 2021

// links

// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const playersRouter = require("./routes/players");

// constants
const PORT = 3000;

// APIs and middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", playersRouter); // linking players express router APIs

// routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Testing Node.js Application</h1>");
});

// error handles

// server start up
module.exports = app.listen(PORT, () => {
  console.log(`Testing Node.js App listening at http://localhost:${PORT}`);
});
