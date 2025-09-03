const { body, validationResult } = require("express-validator");

// dummy data
const items = [
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
  {
    item: "Pens",
    cat: "stationery",
    id: 5,
    catId: 2,
  },
];

const validator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("please enter a name")
    .isAlphanumeric()
    .withMessage("item name can only contain alphabets or digits"),
];

exports.getItems = (req, res) => {
  res.render("items", { items: items });
};

exports.deleteItems = (req, res) => {
  // handle delete here
  res.redirect("/items");
};

exports.getModify = (req, res) => {
  res.render("modifyItem", {
    /* item data here */
  });
};

exports.postModify = (req, res) => {
  // handle modification here
  res.redirect("/items");
};

exports.getAdd = (req, res) => {
  res.render("addItem", {
    /* categories info here */
  });
};

exports.postAdd = [
  validator,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addItem", {
        errors: errors.array(),
        /* categories info here */
      });
    }
    // handle item addition here
    res.redirect("/items");
  },
];
