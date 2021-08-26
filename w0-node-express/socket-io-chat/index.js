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
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // sends the message event to all connected sockets
  });
}); // listens on the 'connection' event for incoming sockets, once socket is established, listens for new chat messages

server.listen(PORT, () => {
  console.log(`Socket.io Chat listening on http://localhost:${PORT}`);
});
