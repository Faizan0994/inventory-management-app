const express = require("express");
const app = express();
const itemsRouter = require("./routes/itemsRouter");
const categoriesRouter = require("./routes/categoriesRouter");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // the index route
  res.render("index");
});
app.get("/items", itemsRouter);
app.get("/categories", categoriesRouter);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`server listening on port ${PORT}`);
});
