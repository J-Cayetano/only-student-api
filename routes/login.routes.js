const router = require("express").Router();
const loginController = require("../controllers/login.controllers");

router.get('/', loginController.index);
router.post("/", loginController.login);

module.exports = router;
