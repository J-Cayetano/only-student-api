const router = require("express").Router();
const indexController = require("../controllers/_index.controllers");

// Landing Page
router.get('/', indexController.index);


module.exports = router;
