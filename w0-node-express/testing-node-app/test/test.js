// File: /test/test.js
// Created by: Max Manayan
// Assignment: mthree, Testing Node.js Application
// Date: August 26, 2021

// links
// Mocha docs = [ https://mochajs.org/#getting-started ]
// Chai docs = [ https://www.chaijs.com/ ]

// imports
const chai = require("chai");
const assert = chai.assert;
const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

assert.typeOf("foo", "string", "Does this work");
