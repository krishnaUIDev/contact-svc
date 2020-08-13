const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const dbConnection = config.get("mongoConnection");
  mongoose
    .connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("conneted to mogodb.."))
    .catch((err) => winston.info("Connected to Mongo"));
  mongoose.set("useCreateIndex", true);
};
