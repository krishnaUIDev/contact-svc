const express = require("express");
const router = express.Router();

function fibonacci(n) {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

router.get("/", async (req, res) => {
  const val = fibonacci(Number.parseInt(req.query.number));
  res.send({ val });
});

module.exports = router;
