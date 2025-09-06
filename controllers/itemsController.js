const { body, validationResult } = require("express-validator");
const db = require("../database/queries");

const validator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("please enter a name")
    .isAlphanumeric()
    .withMessage("item name can only contain alphabets or digits"),
];

exports.getItems = async (req, res) => {
  const items = await db.getAllItemsWithCategories();
  res.render("items", { items: items });
};

exports.deleteItems = async (req, res) => {
  const id = +req.params.id;
  await db.deleteItem(id);
  res.redirect("/items");
};

exports.getModify = async (req, res) => {
  const id = +req.params.id;
  const item = await db.getItemById(id);
  console.log(item);
  const categories = await db.getAllCategories();
  res.render("modifyItem", {
    item: item,
    categories: categories,
  });
};

exports.postModify = async (req, res) => {
  const itemId = +req.params.id;
  const catId = req.body.category;
  await db.changeCategory(itemId, catId);
  res.redirect("/items");
};

exports.getAdd = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("addItem", {
    categories: categories,
  });
};

exports.postAdd = [
  validator,
  async (req, res) => {
    const categories = await db.getAllCategories();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addItem", {
        errors: errors.array(),
        categories: categories,
      });
    }
    const name = req.body.name;
    const catId = +req.body.category;
    await db.addItem(name, catId);
    res.redirect("/items");
  },
];
