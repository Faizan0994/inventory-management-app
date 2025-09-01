const { Router } = require("express");
const controllers = require("../controllers/categoriesController");

const router = Router();

router.get("/", controllers.getCategories);

module.exports = router;
