const redis = require("redis");
const keys = require("../extra/keys");

let client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
});

function redisMiddleware(req, res, next) {
  switch (req.url) {
    case "/":
      client.get("courses", (err, reply) => {
        if (err) res.status(500).send("<h4>failed</h4>");
        if (reply !== null) {
          res.send(reply);
        } else {
          next();
        }
      });
  }
}

module.exports = redisMiddleware;
