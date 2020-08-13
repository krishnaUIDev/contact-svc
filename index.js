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

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", function () {
  winston.error(`Listing on port ${port}`);
});
