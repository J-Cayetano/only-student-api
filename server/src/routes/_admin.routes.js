const router = require("express").Router();
const adminController = require("../controllers/_admin.controllers");


// Import Routers
var levelRouter = require('./s_level.routes');
var typeRouter = require('./s_type.routes');
var userRouter = require('./user.routes');
var categoryRouter = require('./s_category.routes');
var scheduleRouter = require('./s_schedule.routes');


// View
router.get('/', adminController.index);

// Routes for Setups (For Authentication)
router.use('/user', userRouter);
router.use('/level', levelRouter);
router.use('/type', typeRouter);
router.use('/category', categoryRouter);
router.use('/schedule', scheduleRouter);

// Routes for Transactions (For Authentication)


// Routes for Records (For Authentication)





module.exports = router;