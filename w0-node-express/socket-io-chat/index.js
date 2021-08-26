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

// constants
const PORT = 3000;

// APIs and middleware

// routes
app.get("/", (req, res) => {
  res.send("<h1>Socket.io Chat App</h1>");
});

// error handlers

// server startup
server.listen(PORT, () => {
  console.log(`Socket.io Chat listening on http://localhost:${PORT}`);
});
