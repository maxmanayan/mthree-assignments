// File: server.js
// Created by: Max Manayan
// Assignment: mthree, thing-finder
// Date: August 25, 2021

// imports
const express = require('express')
const app = express()
const morgan = require('morgan') // http req logger middleware - [ https://www.npmjs.com/package/morgan ]
const { v4: uuidv4 } = require('uuid'); // random UUID generator - [ https://github.com/uuidjs/uuid ]

// variables
const PORT = 3000

const pokemon = [
  {
    name: 'Pikachu',
    type: 'electric',
    evolutions: 3,
    starter: false,
    _id: uuidv4(),
  },
  {
    name: 'Bulbasaur',
    type: 'grass',
    evolutions: 3,
    starter: true,
    _id: uuidv4(),
  },
  {
    name: 'Squirtle',
    type: 'water',
    evolutions: 3,
    starter: true,
    _id: uuidv4(),
  },
  {
    name: 'Charmander',
    type: 'fire',
    evolutions: 3,
    starter: true,
    _id: uuidv4(),
  },
  {
    name: 'Tailow',
    type: 'flying',
    evolutions: 2,
    starter: false,
    _id: uuidv4(),
  },
  {
    name: 'Mudkip',
    type: 'water',
    evolutions: 3,
    starter: true,
    _id: uuidv4(),
  },
  {
    name: 'Groudon',
    type: 'fire',
    evolutions: 1,
    starter: false,
    _id: uuidv4(),
  },
  {
    name: 'Snivy',
    type: 'grass',
    evolutions: 3,
    starter: true,
    _id: uuidv4(),
  },
  {
    name: 'Mankey',
    type: 'fighting',
    evolutions: 2,
    starter: false,
    _id: uuidv4(),
  },
  {
    name: 'Dratini',
    type: 'water',
    evolutions: 3,
    starter: false,
    _id: uuidv4(),
  },
]

// apis/middleware
app.use(morgan('dev'))


// routes
// setting root path
app.get('/', (req, res, next) => {
  res.status(200).send('This is the Thing-Finder!')
})

// GET ALL
app.get('/pokemon', (req, res, next) => {
  res.status(200).send(JSON.stringify(pokemon, null, 2))
})

// GET ONE
app.get('/pokemon/name/:name', (req, res, next) => {
  console.log(req.params.name);
  pokemon.forEach(p => {
    if (req.params.name === p.name.toLowerCase()) {
      console.log(p);
      res.status(200).send(JSON.stringify(p, null, 2))
    } 
  })
})

// QUERY ROUTE
app.get('/pokemon/type', (req, res, next) => {
  console.log(req.query.type);
  const typeArr = []
  pokemon.forEach(p => {
    if (req.query.type === p.type.toLowerCase()) {
      console.log(p);
      typeArr.push(p)
    } 
  })
  res.status(200).send(JSON.stringify(typeArr, null, 2))
})


// server start up
app.listen(PORT, () => {
  console.log(`Thing-Finder listening at http://localhost:${PORT}`);
})