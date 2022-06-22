const router = require("express").Router();
const subjectController = require("../controllers/s_subject.controller");

router.get("/", subjectController.findAll);
router.post("/", subjectController.create);
router.get("/all", subjectController.findDataTable);
router.get("/:id", subjectController.findOne);
router.get("/level/:level", subjectController.findAllLevel);
router.get("/category/:category", subjectController.findAllCategory);
router.put("/:id", subjectController.update);
router.delete("/:id", subjectController.delete);


module.exports = router;