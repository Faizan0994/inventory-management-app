const { Pool } = require("pg");
require("dotenv").config({ path: ".env" });

console.log(process.env.localDB);

const pool = new Pool({
  connectionString: process.env.localDB,
});

module.exports = pool;
