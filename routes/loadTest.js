const express = require("express");
const router = express.Router();
const autocannon = require("autocannon");
const { freememPercentage, cpuUsage } = require("./cpuUtils");
const os = require("os");
async function execute(options, cb) {
  const {
    url = "http://localhost:3001/api/courses",
    connections = 1000,
    pipelining = 2,
    duration = 10,
    timeout,
    title,
    headers,
    body,
    renderProgressBar = false,
    renderLatencyTable = false,
    renderResultsTable = false,
    json = true,
  } = options;

  const instance = autocannon(
    {
      url,
      connections,
      pipelining,
      duration,
      timeout,
      title,
      headers,
      body,
      json,
    },
    cb
  );

  process.once("SIGINT", () => {
    instance.stop();
  });

  autocannon.track(instance, {
    renderProgressBar,
    renderLatencyTable,
    renderResultsTable,
  });

  return instance;
}

router.post("/", async (req, res, next) => {
  try {
    let a = freememPercentage();
    const options = { ...req.body };
    let result = await execute(options);
    let b;

    console.log(os.cpus());
    console.log(os.totalmem());
    console.log(os.freemem());

    res.json({ result, a, b });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
