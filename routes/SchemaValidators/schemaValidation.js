const { body } = require("express-validator");

const schema = [body("password").isLength({ min: 5 }).withMessage("required")];

module.exports = schema;
