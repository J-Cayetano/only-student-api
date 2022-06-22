const router = require("express").Router();
const categoryController = require("../controllers/s_category.controller");

router.get("/", categoryController.findAll);
router.post("/", categoryController.create);
router.get("/all", categoryController.findDataTable);
router.get("/:id", categoryController.findOne);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);


module.exports = router;