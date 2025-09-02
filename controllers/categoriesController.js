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

exports.getCategories = (req, res) => {
  res.render("categories", { categories: categories });
};
