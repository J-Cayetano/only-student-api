const router = require("express").Router();
const classController = require("../controllers/t_class.controllers");

router.get("/", classController.findAll);
router.post("/", classController.create);
router.get("/table", classController.findDataTable);
router.get("/:id", classController.findOne);
router.put("/:id", classController.update);
router.delete("/:id", classController.delete);


module.exports = router;