const router = require("express").Router();
const signupController = require("../controllers/signup.controllers");


router.post("/", signupController.create);


module.exports = router;