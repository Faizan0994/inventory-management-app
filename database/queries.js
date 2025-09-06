const { query } = require("pg");
const pool = require("./pool");

async function getAllItems() {
  const items = await pool.query("SELECT * FROM items;");
  return items.rows;
}

async function getAllItemsWithCategories() {
  const items = await pool.query(
    "SELECT items.id, item, catId, category FROM items JOIN categories ON items.catId = categories.id"
  );
  return items.rows;
}

async function getItemById(id) {
  const item = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return item.rows[0]; // only a single row
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id=$1", [id]);
}

async function changeCategory(itemId, catId) {
  await pool.query("UPDATE items SET catid = $1 WHERE id = $2", [
    catId,
    itemId,
  ]);
}

async function addItem(name, catId) {
  await pool.query("INSERT INTO items (item, catid) VALUES ($1, $2)", [
    name,
    catId,
  ]);
}

async function getAllCategories() {
  const categories = await pool.query("SELECT * FROM categories");
  return categories.rows;
}

async function getAllCategoriesWithItems() {
  const categories = await pool.query(`
    SELECT c.id,
      c.category,
      COALESCE(
        json_agg(
          json_build_object('id', i.id, 'name', i.item)
        ) FILTER (WHERE i.id IS NOT NULL),
        '[]'
      ) AS items
    FROM categories c
    LEFT JOIN items i ON c.id = i.catId
    GROUP BY c.id, c.category
    ORDER BY c.id;
  `);
  return categories.rows;
}

async function addCategory(name) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [name]);
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

module.exports = {
  getAllItems,
  getAllItemsWithCategories,
  getItemById,
  deleteItem,
  changeCategory,
  addItem,
  getAllCategories,
  getAllCategoriesWithItems,
  addCategory,
  deleteCategory,
};
