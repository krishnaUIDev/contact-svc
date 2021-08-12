"use strict";

const autocannon = require("autocannon");

autocannon(
  {
    url: "http://localhost:3001/api/courses",
    connections: 10, //default
    pipelining: 1, // default
    duration: 10, // default
    amount: 100,
  },
  console.log
);
