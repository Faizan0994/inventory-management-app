const { Router } = require("express");
const controllers = require("../controllers/itemsController");

const router = Router();

router.get("/", controllers.getItems);

module.exports = router;
