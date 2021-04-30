require("dotenv").config();
const express = require("express");
const app = express();
var app_instance = process.argv.NODE_APP_INSTANCE;
process.argv.NODE_APP_INSTANCE = "";
const config = require("config");
process.argv.NODE_APP_INSTANCE = app_instance;
//const pool = require("./startup/pgdb");
// const cluster = require("cluster");
// const totalCpus = require("os").cpus().length;

app.set("view engine", "pug");
app.set("views", "./views"); // to set default template

// if (cluster.isMaster) {
//   console.log(`Total number of cpus Count is ${totalCpus}`);
//   for (var i = 0; i < totalCpus; i++) {
//     cluster.fork();
//   }
//   cluster.on("online", (worker) => {
//     console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid}`);
//   });
//   cluster.on("exit", (worker) => {
//     console.log(
//       `Worker Id is ${worker.id} and PID is ${worker.process.pid} is offline`
//     );
//     console.log("Lets fork new worker");
//     cluster.fork();
//   });
// } else {
//   require("./startup/logging")();
//   require("./startup/routes")(app);
//   require("./startup/db")();
//   require("./startup/config")();
//   require("./startup/validation")();
//   require("./startup/prod")(app);
//   const port = process.env.PORT || config.get("PORT");
//   app.listen(port, () => console.log(`Listening on port ${port}...`));
// }

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || config.get("PORT");
app.listen(port, () => console.log(`Listening on port ${port}...`));
