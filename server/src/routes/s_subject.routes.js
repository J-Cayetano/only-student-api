const router = require("express").Router();
const subjectController = require("../controllers/s_subject.controllers");

router.get("/", subjectController.findAll);
router.post("/", subjectController.create);
router.get("/table", subjectController.findDataTable);
router.get("/:id", subjectController.findOne);
router.put("/:id", subjectController.update);
router.delete("/:id", subjectController.delete);


module.exports = router;