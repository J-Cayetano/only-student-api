const router = require("express").Router();
const loginController = require("../controllers/login.controller");

router.get('/', loginController.index);
router.post("/", loginController.login);

module.exports = router;
