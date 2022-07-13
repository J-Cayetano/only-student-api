const router = require("express").Router();
const categoryController = require("../controllers/s_category.controllers");

router.get("/", categoryController.findAll);
router.post("/", categoryController.create);
router.get("/table", categoryController.findDataTable);
router.get("/:id", categoryController.findOne);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);


module.exports = router;