const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Krishna@1",
  host: "localhost",
  port: 5432,
  database: "playground",
});

module.exports = pool;
