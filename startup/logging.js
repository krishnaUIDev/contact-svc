const winston = require("winston");
const config = require("config");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  const dbConnection = config.get("mongoConnection");
  const connection =
    "mongodb+srv://user:1234@cluster0.sln7s.mongodb.net/playground?retryWrites=true&w=majority";

  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, PrettyPrint: true }),
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
    })
  );

  process.on("unhandledRejection", (ex) => {
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex;
  });

  // log transporter to the local file
  winston.configure({
    transports: [
      new winston.transports.File({
        filename: "logfile.log",
      }),
    ],
  });
  //db logger transport
  winston.configure({
    transports: [
      new winston.transports.MongoDB({
        db: `${connection}/logs`,
        level: "error",
      }),
    ],
  });
};
