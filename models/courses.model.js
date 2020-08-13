const mongoose = require("mongoose");
const Joi = require("joi");

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

function validateCouse(arg) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    //  name: Joi.objectId().min(3).required(),
    phone: Joi.number(),
    isGold: Joi.boolean(),
    category: Joi.array(),
  });
  return schema.validate(arg);
}

exports.Course = Course;
exports.validate = validateCouse;
