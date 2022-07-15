const router = require("express").Router();
const feedController = require("../controllers/r_feedback.controllers");

router.get("/", feedController.findAll);
router.post("/", feedController.create);
router.get("/table", feedController.findDataTable);
router.get("/:id", feedController.findOne);
router.put("/:id", feedController.update);
router.delete("/:id", feedController.delete);


module.exports = router;