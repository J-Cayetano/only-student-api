const router = require("express").Router();
const adminController = require("../controllers/_admin.controllers");


// Import Routers - Setups
var levelRouter = require('./s_level.routes');
var typeRouter = require('./s_type.routes');
var userRouter = require('./user.routes');
var categoryRouter = require('./s_category.routes');


// View
router.get('/', adminController.index);

// Routes for Setups (For Authentication)
router.use('/user', userRouter);
router.use('/level', levelRouter);
router.use('/type', typeRouter);
router.use('/category', categoryRouter);






module.exports = router;