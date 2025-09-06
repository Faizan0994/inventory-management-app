#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS items(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item VARCHAR(255),
    catId INTEGER
);

CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY GENERATED ALWAyS AS IDENTITY,
    category VARCHAR(255)
);

INSERT INTO categories (category) VALUES ('food'), ('stationery'), ('sports');

INSERT INTO items (item, catId) VALUES 
('Bread', 1), ('Biscuits', 1), ('Noodles', 1),
('Pencils', 2), ('Erasers', 2), ('Pens', 2),
('Football', 3), ('Cricket Bat', 3), ('Tennis Ball', 3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
