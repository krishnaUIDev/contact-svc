const express = require("express");
const cors = require("cors");

const courses = require("../routes/courses");
const home = require("../routes/home");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json()); // req.body
  app.use(cors());
  app.use(express.urlencoded({ extended: true })); // to loges the reqest into terminal
  app.use(express.static("public")); // to server static content
  // routes setup
  app.use("/api/courses", courses);
  app.use("/", home);
  // autheiticatoin
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  // logger
  app.use(error);
};
