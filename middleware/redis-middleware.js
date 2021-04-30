const redis = require("redis");
const keys = require("../extra/keys");

let client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
});

function redisMiddleware(req, res, next) {
  console.log(req.url);
  switch (req.url) {
    case "/":
      client.get("courses", (err, reply) => {
        if (err) res.status(500).send("<h4>failed</h4>");
        if (reply !== null) {
          res.send(reply);
          console.log("from redis");
        } else {
          next();
        }
      });
  }
}

module.exports = redisMiddleware;
