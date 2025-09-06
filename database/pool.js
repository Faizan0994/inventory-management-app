const { Pool } = require("pg");
require("dotenv").config({ path: ".env" });

const pool = new Pool({
  connectionString: process.env.localDB,
});

module.exports = pool;
