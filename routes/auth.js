const _ = require("lodash");
const { Users } = require("../models/users.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
//const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invlid email or password");
  // compare passwords
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invlid email or password");

  // getting jwt
  const token = user.generateAuthToken();
  // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.send(token);
});

// Infromation Expert Principle

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
