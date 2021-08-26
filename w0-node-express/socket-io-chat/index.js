// File: index.js
// Created by: Max Manayan
// Assignment: mthree, socket.io chat
// Date: August 26, 2021

// links
// Socket.io chat docs - [ https://socket.io/get-started/chat ]

// imports
const express = require("express");
const app = express();
const http = require("http"); // what is this for?
const server = http.createServer(app);
const morgan = require("morgan");

// constants
const PORT = 3000;

// APIs and middleware
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// error handlers

// server startup
server.listen(PORT, () => {
  console.log(`Socket.io Chat listening on http://localhost:${PORT}`);
});
