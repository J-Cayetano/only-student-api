const router = require("express").Router();
const userController = require("../controllers/user.controllers");

router.get("/", userController.findAll);
router.post("/", userController.create);
router.get("/table", userController.findDataTable);
router.get("/:id", userController.findOne);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);


module.exports = router;