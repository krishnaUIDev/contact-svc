// var url = "http://mylogger.io/log";

// const EventEmitter = require("events");

// class Logger extends EventEmitter {
//   log(message) {
//     this.emit("logging", { data: "test" });
//   }
// }

// module.exports = Logger;

function log(req, res, next) {
  console.log("Logging...");
  next();
}

module.exports = log;
