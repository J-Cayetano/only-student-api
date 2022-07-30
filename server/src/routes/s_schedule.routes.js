const router = require("express").Router();
const scheduleController = require("../controllers/s_schedule.controllers");

router.get("/", scheduleController.findAll);
router.post("/", scheduleController.create);
router.get("/table", scheduleController.findDataTable);
router.get("/:id", scheduleController.findOne);
router.put("/:id", scheduleController.update);
router.delete("/:id", scheduleController.delete);


module.exports = router;