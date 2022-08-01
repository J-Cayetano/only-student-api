const router = require("express").Router();
const adminController = require("../controllers/_admin.controllers");


// Import Routers - Setups
var levelRouter = require('./s_level.routes');
var typeRouter = require('./s_type.routes');
var userRouter = require('./user.routes');
var tutorRequirementRouter = require('./t_tutor_requirements.routes');


// Routes for Setups (For Authentication)
router.use('/user', userRouter);
router.use('/level', levelRouter);
router.use('/type', typeRouter);


// Routes for Transactions (For Authentication)
router.use('/tutorrequirement', tutorRequirementRouter);






module.exports = router;