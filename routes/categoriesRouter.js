const { Router } = require("express");
const controllers = require("../controllers/categoriesController");

const router = Router();

router.get("/", controllers.getCategories);
router.get("/add", controllers.getAdd);
router.post("/add", controllers.postAdd);
router.post("/:id/delete", controllers.postDelete);

module.exports = router;
