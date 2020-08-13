require("dotenv").config();
const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const courses = require("./routes/courses");
const home = require("./routes/home");
const users = require("./routes/users");
const auth = require("./routes/auth");
const logger = require("./middleware/logger");

// jwt initialization

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

app.set("view engine", "pug");
app.set("views", "./views"); // to set default template

app.use(express.json()); // req.body
app.use(helmet()); //to secure http request
// to loges the reqest into terminal
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // to server static content

// mongoose connection'

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conneted to mogodb.."))
  .catch((err) => console.log("could not connect to mongo.."));
mongoose.set("useCreateIndex", true);

// routes setup
app.use("/api/courses", courses);
app.use("/", home);
// autheiticatoin
app.use("/api/users", users);
app.use("/api/auth", auth);

// customer middleware functions
if (app.get("env") === "development") {
  //app.use(logger);
  app.use(morgan("tiny"));
  //debug("mogan enabled");
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listing on port ${port}`));
