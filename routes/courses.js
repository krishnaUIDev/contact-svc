const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const Course = mongoose.model(
  "courses",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: { type: Number, required: true, minlength: 9 },
    isGold: Boolean,
    // category: {
    //   type: String,
    //   enum: ["JS", "WEB", "ANGULAR"],
    //   required: true,
    //   trim: true,
    // },
    category: Array,
  })
);

router.get("/", async (req, res) => {
  const courses = await Course.find().sort("name");
  res.send(courses);
});

router.post("/", async (req, res) => {
  const { error } = validateCouse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let course = new Course({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
    category: req.body.category,
  });
  course = await course.save();
  res.send(course);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCouse(req.body);
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

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  if (!course) return res.status(404).send("The course id not found");
  res.send(course);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send("The course id not found"); // 404 not found
  res.send(course);
});

function validateCouse(arg) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.number(),
    isGold: Joi.boolean(),
    category: Joi.array(),
  });
  return schema.validate(arg);
}

module.exports = router;
