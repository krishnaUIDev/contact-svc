const debug = require("debug")("app:startup");
//const dbDebugger = require("debug")("app:db");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const courses = require("./routes/courses");
const home = require("./routes/home");
const logger = require("./middleware/logger");

app.set("view engine", "pug");
app.set("views", "./views"); // to set default template
// to get env
// console.log("node path", process.env.NODE_PATH);
// console.log("env", app.get("env"));

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
  .catch((err) => console.log(err.message));

// routes setup
app.use("/api/courses", courses);
app.use("/", home);
// config

//console.log("application name" + config.get("name"));
//console.log("application name" + config.get("mail.host"));
//console.log("application name" + config.get("mail.password"));

// customer middleware functions
if (app.get("env") === "development") {
  //app.use(logger);
  app.use(morgan("tiny"));
  //debug("mogan enabled");
}

//db work

//dbDebugger("conected to the db");

// app.use((req, res, next) => {
//   console.log("Authencations...");
//   next();
// });

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listing on port ${port}`));
