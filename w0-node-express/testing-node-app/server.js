// File: server.js
// Created by: Max Manayan
// Assignment: mthree, Testing Node.js Application
// Date: August 26, 2021

// links
// Default error handler docs - [ https://expressjs.com/en/guide/error-handling.html ]
// Default error handler YT tutorial - [ https://www.youtube.com/watch?v=deZP3Z33DJ4 ]

// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const playersRouter = require("./routes/players");

// constants
const PORT = 3001;

// APIs and middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", playersRouter); // linking players express router APIs

// routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Testing Node.js Application</h1>");
});

// error handling
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// server start up
module.exports = app.listen(PORT, () => {
  console.log(`Testing Node.js App listening at http://localhost:${PORT}`);
});
