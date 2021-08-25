// File: server.js
// Created by: Max Manayan
// Assignment: mthree, todo-express
// Date: August 25, 2021

// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");

// constants, variable
const PORT = 3000;

const todos = [
  {
    _id: uuidv4(),
    text: "This is todo 1",
    complete: false,
    testId: 1,
  },
  {
    _id: uuidv4(),
    text: "This is todo 2",
    complete: false,
    testId: 2,
  },
  {
    _id: uuidv4(),
    text: "This is todo 3",
    complete: false,
    testId: 3,
  },
  {
    _id: uuidv4(),
    text: "This is todo 4",
    complete: false,
    testId: 4,
  },
  {
    _id: uuidv4(),
    text: "This is todo 5",
    complete: false,
    testId: 5,
  },
];

console.log(todos);

// middleware/api
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.get("/app", (req, res, next) => {
  res.status(200).send("Todo-Express");
});

// EP - POST(create) new todo to array
// YT Tutorial - [ https://www.youtube.com/watch?v=1cjdlfB11Ss ]
// notes - needed to enable url and json middleware to accept json
app.post("/app", (req, res, next) => {
  const newTodo = req.body;
  newTodo["_id"] = uuidv4(); // adding unique id to json object
  todos.push(newTodo);
  console.log(todos);
  res.status(200).send(JSON.stringify(todos, null, 2));
});

// EP - PUT(update) current todo in array
app.put("/app/:testId", (req, res, next) => {
  todos.map((t) => {
    if (t.testId === Number(req.params.testId)) {
      t.text = req.body.text;
      t.complete = Boolean(req.body.complete);
    }
  });
  console.log(todos);
  res.status(200).send(JSON.stringify(todos, null, 2));
}); // works with testId, but uuid updates every refresh in development (difficult to test with postman)

// EP - DELETE(delete) current todo in array
app.delete("/app/:testId", (req, res, next) => {
  let todoId = Number(req.params.testId);
  let newTodos = todos.filter((t) => (t.testId !== todoId ? t : ""));
  console.log(newTodos);
  res.status(200).send(JSON.stringify(newTodos, null, 2));
}); // works with testId, but uuid updates every refresh in development (difficult to test with postman)

// EP - GET ONE(read) current todo in array
app.get("/app/:testId", (req, res, next) => {
  todos.forEach((t) => {
    if (t.testId === Number(req.params.testId)) {
      res.status(200).send(JSON.stringify(t, null, 2));
    }
  });
});

// error handles

// server startup
app.listen(PORT, () => {
  console.log(`Todo-Express listening on http://localhost:${PORT}`);
});
