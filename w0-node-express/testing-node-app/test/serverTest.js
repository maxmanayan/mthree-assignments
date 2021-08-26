// File: /test/serverTest.js
// Created by: Max Manayan
// Assignment: mthree, Testing Node.js Application
// Date: August 26, 2021

// links
// Mocha (test runner) docs = [ https://mochajs.org/#getting-started ]
// by default, Mocha will look for a folder called 'test'
// Chai (assertion library) docs = [ https://www.chaijs.com/ ]

// imports
const assert = require("chai").assert;
const { sayHello } = require("../server");

describe("Server", function () {
  it("function should say hello", function () {
    assert.equal(sayHello(), "Hello");
  });
});
