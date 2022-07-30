const router = require("express").Router();
const typeController = require("../controllers/s_type.controllers");

router.get("/", typeController.findAll);
router.post("/", typeController.create);
router.get("/table", typeController.findDataTable);
router.get("/:id", typeController.findOne);
router.put("/:id", typeController.update);
router.delete("/:id", typeController.delete);


module.exports = router;