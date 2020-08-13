const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, PrettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex;
  });

  // log transporter to the local file
  winston.configure({
    transports: [new winston.transports.File({ filename: "logfile.log" })],
  });
  //db logger transport
  winston.configure({
    transports: [
      new winston.transports.MongoDB({
        db: "mongodb://localhost/logs",
        level: "error",
      }),
    ],
  });
};
