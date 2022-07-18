const router = require("express").Router();
const tutrController = require("../controllers/t_tutor.controllers");

router.get("/", tutrController.findAll);
router.post("/", tutrController.create);
router.get("/table", tutrController.findDataTable);
router.get("/:id", tutrController.findOne);
router.put("/:id", tutrController.update);
router.delete("/:id", tutrController.delete);


module.exports = router;