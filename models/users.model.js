const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Users = mongoose.model("users", userSchema);

function validateUser(arg) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity({
      min: 8,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }).required(),
  });
  return schema.validate(arg);
}

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true, minlength: 5, maxlength: 50 },
  country: { type: String, minlength: 1, required: true },
  city: { type: String, required: true, maxlength: 1024 },
  state: { type: String, required: true, maxlength: 1024 },
  verified: Boolean,
});
const Address = mongoose.model("address", addressSchema);

function validateAddress(arg) {
  const schema = Joi.object({
    street: Joi.string().min(5).max(50).required(),
    country: Joi.string().min(1).max(255).required(),
    city: Joi.string().min(5).required(),
    state: Joi.string().min(3).required(),
    verified: Joi.bool(),
  });
  return schema.validate(arg);
}

exports.Users = Users;
exports.Address = Address;
exports.validateAddress = validateAddress;
exports.validate = validateUser;
