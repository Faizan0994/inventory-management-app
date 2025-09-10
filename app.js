const express = require("express");
const app = express();
const path = require("path");
const itemsRouter = require("./routes/itemsRouter");
const categoriesRouter = require("./routes/categoriesRouter");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // the index route
  res.render("index");
});
app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`server listening on port ${PORT}`);
});
