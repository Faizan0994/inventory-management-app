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

exports.getCategories = async (req, res) => {
  const categories = await db.getAllCategoriesWithItems();
  res.render("categories", { categories: categories });
};

exports.getAdd = (req, res) => {
  res.render("addCategory");
};

exports.postAdd = [
  validator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addCategory", { errors: errors.array() });
    }
    const name = req.body.name;
    await db.addCategory(name);
    res.redirect("/categories");
  },
];

exports.postDelete = async (req, res) => {
  const id = +req.params.id;
  await db.deleteCategory(id);
  res.redirect("/categories");
};
