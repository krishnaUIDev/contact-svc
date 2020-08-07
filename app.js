// // const Logger = require("./logger");
// // const path = require("path");
// // const os = require("os");
// // const fs = require("fs");
// //const pathObj = path.parse(__filename);
// //console.log(pathObj);
// //console.log(__filename, "__filename");
// //log("test");

// // var totalMem = os.totalmem();
// // var fremem = os.freemem();

// //console.log(totalMem, fremem);

// const files = fs.readdirSync("./");
// //console.log(files);

// // const files1 = fs.readdir("#", (err, res) => {
// //   if (err) console.log(err);
// //   else console.log(res, "res");
// // });

// // console.log(files1);

// const EventEmitter = require("events");

// // register a listner

// const logger = new Logger();
// logger.on("logging", (e) => {
//   console.log(e);
// });
// logger.log("tet");

// // emit making a noise, produce- singneling

// const http = require("http");
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("test");
//     res.end();
//   }
//   if ((req.url = "/api/courses")) {
//     res.write(JSON.stringify([1, 2, 3, 3]));
//     res.end();
//   }
// });

// server.on("connection", (socket) => {
//   console.log("new connection");
// });
// server.listen(3001);

// console.log("Listen on port 300 .. ");
