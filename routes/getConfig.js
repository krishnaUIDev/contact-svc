const express = require("express");
const router = express.Router();
const config = require("config");
const fs = require("fs");
const ourConfigDir = config.util.getEnv("NODE_CONFIG_DIR");
const env = config.util.getEnv("NODE_CONFIG_ENV");

let obj;

fs.readFile(`${ourConfigDir}/${env}.json`, "utf8", function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

function pick(object, keys) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key) && key != "") {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

router.get("/:id", (req, res) => {
  const value = req.params.id;
  const keys = value.split(",");
  if (value) {
    const filterdVal = pick(obj, keys);
    res.send(filterdVal);
    return;
  }
});

module.exports = router;
