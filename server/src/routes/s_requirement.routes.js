const router = require("express").Router();
const requController = require("../controllers/s_requirement.controllers");

router.get("/", requController.findAll);
router.post("/", requController.create);
router.get("/table", requController.findDataTable);
router.get("/:id", requController.findOne);
router.put("/:id", requController.update);
router.delete("/:id", requController.delete);


module.exports = router;