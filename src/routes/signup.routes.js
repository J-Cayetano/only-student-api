const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get('/', userController.index);
router.post('/', userController.create);

module.exports = router;
