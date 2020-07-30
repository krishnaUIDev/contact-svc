const debug = require("debug")("app:startup");
//const dbDebugger = require("debug")("app:db");
const express = require("express");
const Joi = require("joi");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const logger = require("./logger");

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

// config

//console.log("application name" + config.get("name"));
//console.log("application name" + config.get("mail.host"));
//console.log("application name" + config.get("mail.password"));

// customer middleware functions
if (app.get("env") === "development") {
  //app.use(logger);
  app.use(morgan("tiny"));
  debug("mogan enabled");
}

//db work

//dbDebugger("conected to the db");

app.use((req, res, next) => {
  console.log("Authencations...");
  next();
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listing on port ${port}`));

const courses = [
  { id: 1, name: "krishna" },
  { id: 2, name: "kanth" },
  { id: 3, name: "kondoju" },
];

app.get("/", (req, res) => {
  //res.send("tset");
  res.render("index", { title: "My express app", message: "helo" });
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCouse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course id not found");
  const { error } = validateCouse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = (req && req.body && req.body.name) || null;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course id not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course id not found"); // 404 not found
  res.send(course);
});

function validateCouse(arg) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(arg);
}
