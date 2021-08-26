// File: index.js
// Created by: Max Manayan
// Assignment: mthree, socket.io chat
// Date: August 26, 2021

// links
// Socket.io chat docs - [ https://socket.io/get-started/chat ]

// imports
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app); // creates http server
const morgan = require("morgan");
const { Server } = require("socket.io");
const io = new Server(server); // initializes new instance of socket.io by passing the HTTP server object

// constants
const PORT = 3000;

// APIs and middleware
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

// error handlers

// server startup
io.on("connection", (socket) => {
  console.log("a user connected");
}); // listens on the 'connection' event for incoming sockets

server.listen(PORT, () => {
  console.log(`Socket.io Chat listening on http://localhost:${PORT}`);
});
