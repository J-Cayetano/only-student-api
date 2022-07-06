const router = require("express").Router();
const levelController = require("../controllers/s_level.controller");

router.get("/", levelController.findAll);
router.post("/", levelController.create);
router.get("/table", levelController.findDataTable);
router.get("/:id", levelController.findOne);
router.put("/:id", levelController.update);
router.delete("/:id", levelController.delete);


module.exports = router;