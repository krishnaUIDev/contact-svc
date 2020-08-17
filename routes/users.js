const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const auth = require("../middleware/auth");
const mailer = require("./mailer");
const {
  Users,
  validate,
  validateAddress,
  Address,
} = require("../models/users.model");

router.get("/me", auth, async (req, res) => {
  const user = await Users.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registred");
  user = new Users(_.pick(req.body, ["name"], ["email"], ["password"]));
  await mailer(user.email);
  //hasing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/address", async (req, res) => {
  const { error } = validateAddress(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const address = new Address({
    street: req.body.street,
    country: req.body.country,
    city: req.body.city,
    state: req.body.state,
  });

  if (req.body.verified) await address.save();
  if (req.body.verified) {
    res.send(address);
  } else {
    res.send({ providedAddress: address, suggestedAddress: "heloworld" });
  }
});

module.exports = router;
