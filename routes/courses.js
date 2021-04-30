const { Course, validate } = require("../models/courses.model");
const express = require("express");
const router = express.Router();
const redis = require("redis");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const keys = require("../extra/keys");
const redisMiddleware = require("../middleware/redis-middleware");

router.use(redisMiddleware);

let client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
});

router.get("/", async (req, res) => {
  const courses = await Course.find().sort("name");
  client.set("courses", courses);
  res.send(courses);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = new Course({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
    category: req.body.category,
  });
  await course.save();
  res.send(course);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = await Course.findByIdAndUpdate(
    req.param.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!course) return res.status(404).send("The course id not found");
  res.send(course);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  if (!course) return res.status(404).send("The course id not found");
  res.send(course);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send("The course id not found"); // 404 not found
  res.send(course);
});

module.exports = router;
