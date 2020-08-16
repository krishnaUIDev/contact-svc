require("dotenv").config();
const express = require("express");
const app = express();
const config = require("config");
//const pool = require("./startup/pgdb");

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
// app.listen(port, "0.0.0.0", function () {
//   winston.error(`Listing on port ${port}`);
// });
// app.get("/todos", async (req, res) => {
//   try {
//     const data = await pool.query("SELECT * FROM courses");
//   } catch (ex) {
//     console.log(ex);
//   }
// });

const port = process.env.PORT || config.get("PORT");
app.listen(port, () => console.log(`Listening on port ${port}...`));
