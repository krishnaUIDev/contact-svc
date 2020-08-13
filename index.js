require("dotenv").config();
const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

//  exceptions
// process.on("uncaughtException", (ex) => {
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// jwt initialization

app.set("view engine", "pug");
app.set("views", "./views"); // to set default template

// const port = process.env.PORT || 3001;
// app.listen(port, () => winston.info(`Listing on port ${port}`));

const server_port = process.env.YOUR_PORT || process.env.PORT || 3001;
const server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, function () {
  console.log("Listening on port %d", server_port);
});
