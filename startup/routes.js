const express = require("express");
const cors = require("cors");

const courses = require("../routes/courses");
const home = require("../routes/home");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const getConfig = require("../routes/getConfig");
const getFeb = require("../routes/feb");
const loadTest = require("../routes/loadTest");

module.exports = function (app) {
  app.use(express.json()); // req.body
  app.use(cors());
  // app.use(helmet());
  app.use(express.urlencoded({ extended: true })); // to loges the reqest into terminal
  app.use(express.static("public")); // to server static content
  // routes setup
  app.use("/api/courses", courses);
  app.use("/", home);
  // autheiticatoin
  app.use("/api/users", users);
  app.use("/api/getConfig", getConfig);
  app.use("/api/auth", auth);
  // logger
  //testing clusters
  app.use("/api/fibonacci", getFeb);
  app.use("/api/loadTest", loadTest);

  app.use(error);
};
