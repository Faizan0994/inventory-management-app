const { body, validationResult } = require("express-validator");

// dummy data
const categories = [
  {
    name: "food",
    id: 1,
    items: [
      {
        item: "Bread",
        cat: "food",
        id: 1,
        catId: 1,
      },
      {
        item: "Biscuits",
        cat: "food",
        id: 2,
        catId: 1,
      },
    ],
  },
  {
    name: "stationery",
    id: 2,
    items: [
      {
        item: "Pens",
        cat: "stationery",
        id: 5,
        catId: 2,
      },
    ],
  },
  { name: "sports", id: 3, items: [] },
];

const validator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("please enter a name")
    .isAlphanumeric()
    .withMessage("item name can only contain alphabets or digits"),
];

exports.getCategories = (req, res) => {
  res.render("categories", { categories: categories });
};

exports.getAdd = (req, res) => {
  res.render("addCategory");
};

exports.postAdd = [
  validator,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addCategory", { errors: errors.array() });
    }
    // Handle category addition here
    res.redirect("/categories");
  },
];

exports.postDelete = (req, res) => {
  // Handle delete here
  res.redirect("/categories");
};
