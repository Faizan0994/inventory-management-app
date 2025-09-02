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

exports.getItems = (req, res) => {
  res.render("items", { items: items });
};
