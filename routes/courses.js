const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "krishna" },
  { id: 2, name: "kanth" },
  { id: 3, name: "kondoju" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  const { error } = validateCouse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course id not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

router.get("/:id", (req, res) => {
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

module.exports = router;
