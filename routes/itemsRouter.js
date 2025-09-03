const { Router } = require("express");
const controllers = require("../controllers/itemsController");

const router = Router();

router.get("/", controllers.getItems);
router.get("/add", controllers.getAdd);
router.post("/add", controllers.postAdd);
router.get("/:id/modify", controllers.getModify);
router.post("/:id/modify", controllers.postModify);
router.post("/:id/delete", controllers.deleteItems);

module.exports = router;
